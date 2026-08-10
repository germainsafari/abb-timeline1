# ABB Timeline

Interactive timeline showcasing ABB's history from 1965 to 2026, built with React and Vite.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Timeline content and images are loaded from `public/data/`.

To use edit mode (upload images, reposition content), run the API server in a second terminal:

```bash
npm run server
```

Edits are saved to `public/data/` locally.

## Deploy on Render (with persistent disk)

Uploads and edit-mode changes are stored on a **Render persistent disk**, not inside the container. Redeploying the app does **not** delete your data.

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push -u origin main
```

### Step 2 — Create the web service

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repository
3. Settings:
   - **Runtime:** Node
   - **Plan:** Starter or higher (required for persistent disks and SSH)
   - **Build command:** `npm install && npm run build`
   - **Start command:** `npm start`
4. Add environment variable:
   - **Key:** `PERSISTENT_DATA_DIR`
   - **Value:** `/var/data`

Or click **Apply** on the included `render.yaml` Blueprint (already configured).

### Step 3 — Attach a persistent disk

1. Open your service in the Render dashboard
2. Go to **Disks** → **Add disk**
3. Configure:
   - **Name:** `abb-timeline-data`
   - **Mount path:** `/var/data`
   - **Size:** 1 GB (increase if you expect many large images)
4. Save — Render will redeploy the service

On first boot with an empty disk, the server automatically copies bundled data from `public/data/` into `/var/data/`. After that, all reads and writes go to the disk.

### Step 4 — Verify persistence

1. Open your deployed site and use **Edit Mode** to upload an image or change text
2. Trigger a manual redeploy from the Render dashboard
3. Confirm your changes are still there after the deploy finishes

You can also check the server logs on startup — you should see either:
- `Persistent data found at /var/data — skipping seed` (disk already has data), or
- `Seeding persistent disk from ...` (first boot only)

Hit `GET /api/health` on your service to confirm `"persistent": true` and `"dataDir": "/var/data"`.

### Step 5 — SSH in and download data

Render SSH requires a **paid** web service (Starter or above).

1. Install the [Render CLI](https://render.com/docs/cli) or use **Shell** in the dashboard
2. Connect:

```bash
render ssh abb-timeline
```

3. Your timeline data lives at:

```
/var/data/
├── 1965/
│   ├── content.json
│   └── images/
├── 1982/
...
└── explore/
    └── positions.json
```

4. Download everything to your machine (from your local terminal, not inside SSH):

```bash
# Using Render CLI
render ssh abb-timeline -- "tar -czf - -C /var/data ." > abb-timeline-backup.tar.gz

# Or with scp-style copy via SSH (if configured)
scp -r render@your-service:/var/data ./abb-timeline-backup
```

5. To inspect a single year while connected via SSH:

```bash
ls -la /var/data/1965/images/
cat /var/data/1965/content.json
```

### Important notes

| What | Where it lives | Survives redeploy? |
|------|----------------|--------------------|
| Uploaded images | `/var/data/{year}/images/` | Yes (on disk) |
| Edited text / positions | `/var/data/{year}/content.json` | Yes (on disk) |
| Explore layout | `/var/data/explore/positions.json` | Yes (on disk) |
| App code (React build) | Container filesystem | Rebuilt each deploy |

- **Do not** change the disk mount path after going live without migrating data first.
- **Do not** delete the disk unless you have a backup — that removes all uploads.
- Bundled data in `public/data/` in Git is only used as a **seed** when the disk is empty. Once the disk has data, deploys never overwrite it.

## Project structure

- `public/data/{year}/content.json` — bundled seed data (copied to disk on first boot)
- `public/data/{year}/images/` — bundled seed images
- `lib/persistent-data.js` — disk path resolution and first-boot seeding
- `server.js` — Express server; all production reads/writes use the persistent disk
- `src/` — React UI

## Data format

Each year's `content.json` includes:

- `title`, `text`, `funFact`, `funFactSource`
- `images[]` with `id`, `src`, `x`, `y`, `width`, `height`, `caption` (positions are percentages)
- `funFactImage` — optional image path under `/data/{year}/images/funfact/`
