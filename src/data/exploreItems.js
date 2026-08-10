// Explore Freely — 64 items mapped from the panoramic reference image (20748 x 3840)
// x/y = percentage position on the 540vh-wide canvas (matches panoramic proportions)
// w = card width in vh units

const EXPLORE_ITEMS = [
  // ── 1965 (8 items) ────────────────────────────────────────
  { id: 1,  img: 'explore-15.png', desc: 'The plug-in static protective relay model 1967', year: 1965, x: 0.3, y: 7.0, w: 8.5 },
  { id: 2,  img: 'explore-65.png', desc: 'SACO alarm system in a typical ship installation', year: 1965, x: 3.2, y: 4.5, w: 12.0 },
  { id: 3,  img: 'explore-13.png', desc: 'A range of light control equipment', year: 1965, x: 4.4, y: 13.5, w: 7.4 },
  { id: 4,  img: 'explore-45.png', desc: 'Rolf Holmberg is assembling a Salwico-Strömberg fire alarm system SPSP20E at the electronics factory in Vaasa', year: 1965, x: 0.9, y: 18.5, w: 7.5 },
  { id: 5,  img: 'explore-02.png', desc: '225 channel SRHA alarm system, model with the annunciator lamps in a separate panel', year: 1965, x: 3.1, y: 22.0, w: 4.5 },
  { id: 6,  img: 'explore-14.png', desc: 'Fire alarm system SPSP100B', year: 1965, x: 0.3, y: 29.5, w: 5.9 },
  { id: 7,  img: 'explore-20.png', desc: 'Year 1965 prototype for the static or electronic protective relay', year: 1965, x: 2.9, y: 35.0, w: 4.1 },
  { id: 8,  img: 'explore-16.png', desc: 'Fire alarm system installed on a ship', year: 1965, x: 4.9, y: 38.8, w: 6.8 },

  // ── 1982 (2 items) ────────────────────────────────────────
  { id: 9,  img: 'explore-07.png', desc: 'The first microprocessor based protective relay SPAJ 3M5 J3, deliveries started 28.02.1982', year: 1982, x: 6.8, y: 5.4, w: 12.5 },
  { id: 10, img: 'explore-19.png', desc: 'The 1980 prototype for a microprocessor based protective relay', year: 1982, x: 5.5, y: 26.5, w: 10.9 },

  // ── 1985 (7 items) ────────────────────────────────────────
  { id: 11, img: 'explore-40.png', desc: 'The communicating feeder protection unit SPAA 320 C included in the launch of the SPACOM secondary equipment family in 1985', year: 1985, x: 16.9, y: 6.5, w: 8.5 },
  { id: 12, img: 'explore-44.png', desc: 'Standard monitoring system SWRK10A1 for 10 analogue channels', year: 1985, x: 19.7, y: 5.3, w: 7.8 },
  { id: 13, img: 'explore-41.png', desc: 'SETELI award winners 1985 for the SPACOM design, from left to right; Seppo Pettissalo, Henrik Sundell and Tapio Hakola (Tapio Ylöstalo is missing from the picture)', year: 1985, x: 17.6, y: 16.3, w: 12.3 },
  { id: 14, img: 'explore-25.png', desc: 'Strömberg Control System (SCS) delivered to Laitilan Sähkö Oy in 1985', year: 1985, x: 19.2, y: 25.8, w: 7.9 },
  { id: 15, img: 'explore-08.png', desc: 'The SPACOM system launched 1985', year: 1985, x: 16.2, y: 28.3, w: 5.0 },
  { id: 16, img: 'explore-mu-gold-relay.png', desc: 'The µ-Gold relay for P&B and the same relay under the Strömberg brand', year: 1985, x: 7.8, y: 39.3, w: 6.8 },
  { id: 17, img: 'explore-63.png', desc: 'Complete protection panels built by the Strömberg Electronics Group Top: Tainionkoski Hydro Power Plant, Finland Lower left: Protection, measurement and control for a small steam power plant, Adra Sugar Co in Syria Lower right: Protection for a compensating station in Luano, Zambia', year: 1985, x: 18.2, y: 34.3, w: 10.0 },

  // ── 1987 (5 items) ────────────────────────────────────────
  { id: 18, img: 'explore-spac-520c-1987.png', desc: 'SPAC 520C feeder terminal used in the Örnsköldsvik installation 1987, the terminal in the picture is provided with an add-on disturbance recorder module (could be inserted into any SPACOM protection assembly)', year: 1987, x: 21.1, y: 17.0, w: 10.0 },
  { id: 19, img: 'explore-22.png', desc: 'In 1988 the SPACOM system won the first price in the "Productive Idea" competition (to the left Seppo Pettissalo and to the right Jukka Soininen)', year: 1987, x: 22.5, y: 6.0, w: 13.4 },
  { id: 20, img: 'explore-27.png', desc: 'Original chart of the Örnsköldsvik system', year: 1987, x: 22.2, y: 26.8, w: 11.4 },
  { id: 21, img: 'explore-66.png', desc: 'SPAG generator protection and SPAJ 140 C feeder protection', year: 1987, x: 20.8, y: 39.5, w: 9.9 },
  { id: 22, img: 'explore-28.png', desc: 'Packet radio', year: 1987, x: 23.7, y: 41.5, w: 7.8 },

  // ── 1989 (5 items) ────────────────────────────────────────
  { id: 23, img: 'explore-67.png', desc: 'Control and supervision for a disconnector station from the early 1990\'s', year: 1989, x: 33.1, y: 3.4, w: 7.8 },
  { id: 24, img: 'explore-68.png', desc: 'Earlier products in the new color', year: 1989, x: 24.2, y: 18.5, w: 8.8 },
  { id: 25, img: 'explore-43.png', desc: 'The MicroSCADA project team rewarded by SETELI in December 1990. From left to right Carl-Göran Österbacka, Erkki Antila and Pentti Mäenpää', year: 1989, x: 34.6, y: 14.5, w: 11.5 },
  { id: 26, img: 'explore-69.png', desc: '16 channel analogue alarm annunciator', year: 1989, x: 32.8, y: 27.8, w: 8.0 },
  { id: 27, img: 'explore-26.png', desc: 'Application of MicroSCADA technology at different levels in power distribution', year: 1989, x: 33.6, y: 37.0, w: 9.8 },

  // ── 1995 (4 items) ────────────────────────────────────────
  { id: 28, img: 'explore-30.png', desc: 'Feeder terminals REF 541, REF 543 and REF 545', year: 1995, x: 36.4, y: 4.1, w: 11.5 },
  { id: 29, img: 'explore-29.png', desc: 'In 1995 the Panorama concept was launched by the Network Control and Protection business area. Panorama was a total system concept including everything from metering and load management up to energy trading systems.', year: 1995, x: 38.4, y: 14.3, w: 11.9 },
  { id: 30, img: 'explore-37.png', desc: 'REF 541 was also available with a detachable local HMI', year: 1995, x: 36.1, y: 28.8, w: 10.0 },
  { id: 31, img: 'explore-70.png', desc: 'RED 500 became the new standard device replacing the earlier SPAC terminals.', year: 1995, x: 37.0, y: 39.0, w: 9.8 },

  // ── 2003 (4 items) ────────────────────────────────────────
  { id: 32, img: 'explore-71.png', desc: 'The 610 series included protection relays for feeder protection, motor protection and general system voltage supervision.', year: 2003, x: 40.5, y: 3.8, w: 11.3 },
  { id: 33, img: 'explore-72.png', desc: 'REM610 motor protection relay for the protection, measurement and supervision of medium-sized and large asynchronous LV and HV motors.', year: 2003, x: 49.3, y: 19.3, w: 7.0 },
  { id: 34, img: 'explore-10.png', desc: 'DTU feeder automation assemblies', year: 2003, x: 39.6, y: 29.3, w: 11.0 },
  { id: 35, img: 'explore-57.png', desc: 'Units in the REA arc protection family', year: 2003, x: 41.3, y: 42.8, w: 6.0 },

  // ── 2004 (4 items) ────────────────────────────────────────
  { id: 36, img: 'explore-60.png', desc: 'Example of the MicroSCADA Pro display', year: 2004, x: 50.6, y: 4.8, w: 9.9 },
  { id: 37, img: 'explore-09.png', desc: 'The first COM 610 unit with industrial embedded hardware.', year: 2004, x: 52.5, y: 15.5, w: 10.0 },
  { id: 38, img: 'explore-59.png', desc: 'COM 610 evolved into the station automation device COM600 for utility and industrial distribution substations.', year: 2004, x: 50.2, y: 28.8, w: 12.3 },
  { id: 39, img: 'explore-61.png', desc: 'MicroSCADA Pro and a DMS600 view', year: 2004, x: 53.6, y: 36.0, w: 11.0 },

  // ── 2007 (4 items) ────────────────────────────────────────
  { id: 40, img: 'explore-73.png', desc: 'One single tool, PCM600, for managing relay settings, signal configuration and disturbance handling.', year: 2007, x: 53.9, y: 3.1, w: 10.5 },
  { id: 41, img: 'explore-33.png', desc: 'REF615 inherited the plug-in design from the 610 series relays, enabling a variety of mounting methods and fast installation, routine testing and maintenance.', year: 2007, x: 54.4, y: 22.5, w: 8.3 },
  { id: 42, img: 'explore-18.png', desc: 'Included functionality in the first REF615 relay', year: 2007, x: 56.5, y: 22.0, w: 11.8 },
  { id: 43, img: 'explore-34.png', desc: 'Re-engineered from the ground up, the feeder protection relay was designed to unleash the full potential of the IEC 61850 standard for communication and interoperability of substation automation devices.', year: 2007, x: 56.3, y: 36.0, w: 12.8 },

  // ── 2009 (4 items) ────────────────────────────────────────
  { id: 44, img: 'explore-04.png', desc: 'The 150,000th Relion 615 series protection relay was delivered to Enerjisa Başkent Elektrik in Türkiye.', year: 2009, x: 57.8, y: 3.3, w: 5.9 },
  { id: 45, img: 'explore-55.png', desc: 'The Relion family included devices for both medium-voltage and high-voltage power systems.', year: 2009, x: 56.2, y: 15.0, w: 12.4 },
  { id: 46, img: 'explore-54.png', desc: 'The switching substation at Helsinki-Vantaa airport was equipped with new switchgear and advanced IEC 61850 compliant Relion 630 series protection and control relays.', year: 2009, x: 66.4, y: 19.5, w: 13.4 },
  { id: 47, img: 'explore-46.png', desc: 'ORES reduced substation wiring costs with IEC 61850 compliant 615 series relays in the multi-functional complex of Médiacité.', year: 2009, x: 66.8, y: 31.3, w: 14.0 },

  // ── 2019 (5 items) ────────────────────────────────────────
  { id: 48, img: 'explore-74.png', desc: 'REX640 was an all-in-one protection for advanced power generation and distribution applications.', year: 2019, x: 68.2, y: 9.3, w: 9.8 },
  { id: 49, img: 'explore-75.png', desc: 'The Sonkajärvi substation took full advantage of the REX640 relays and utilized multi-frequency admittance-based earth-fault protection.', year: 2019, x: 70.2, y: 14.8, w: 10.8 },
  { id: 50, img: 'explore-06.png', desc: 'The centralized protection and control solution, SSC600, offered station-wide visibility and fully modular software for maximum flexibility during the entire lifetime of the substation.', year: 2019, x: 68.2, y: 41.5, w: 10.0 },
  { id: 51, img: 'explore-76.png', desc: 'SSC600 pilot at Caruna\'s Noormarkku substation in western Finland.', year: 2019, x: 71.0, y: 23.8, w: 11.5 },
  { id: 52, img: 'explore-77.png', desc: 'Savon Voima Verkko selected REX640 protection relay technology to renew substations in Eastern Finland.', year: 2019, x: 70.6, y: 33.5, w: 9.8 },

  // ── 2022 (4 items) ────────────────────────────────────────
  { id: 53, img: 'explore-56.png', desc: 'The Ultimate Sophistication - Simplicity', year: 2022, x: 71.0, y: 3.8, w: 12.5 },
  { id: 54, img: 'explore-78.png', desc: 'REX610 offered smooth replacement of SPACOM with REX610 relays.', year: 2022, x: 72.4, y: 14.5, w: 13.8 },
  { id: 55, img: 'explore-79.png', desc: 'REX610 featured a withdrawable plug-in unit for swift replacement, short meantime to repair, and minimized costly downtime.', year: 2022, x: 74.1, y: 22.0, w: 7.8 },
  { id: 56, img: 'explore-21.png', desc: 'During the pandemic almost everything became virtual. In May 2021, all lights were on the virtual launch of REX610.', year: 2022, x: 73.1, y: 38.0, w: 12.5 },

  // ── 2023 (2 items) ────────────────────────────────────────
  { id: 57, img: 'explore-49.png', desc: 'SSC600 SW is the virtualized version of the SSC600 turnkey device. ABB\'s virtualized protection and control, SSC600 SW, can be installed on the hardware of our customers\' choice gaining access to the same proven protection and control functionality as with ABB\'s turnkey solution, SSC600.', year: 2023, x: 82.8, y: 3.4, w: 13.4 },
  { id: 58, img: 'explore-53.png', desc: 'Centralized protection and control bring scalability and flexibility in digital substations.', year: 2023, x: 83.1, y: 31.3, w: 13.3 },

  // ── 2024 (3 items) ────────────────────────────────────────
  { id: 59, img: 'explore-50.png', desc: 'When an aging distribution substation needed modernization, Swedish utility Jämtkraft Elnät chose to upgrade with REX615 protection relays from ABB.', year: 2024, x: 83.7, y: 16.9, w: 11.0 },
  { id: 60, img: 'explore-51.png', desc: 'A convenient application package concept makes it possible for REX615 to cover the same application areas as all 615 and 620 series relays together. Support for IEC, ANSI and CN standards and conventions ensures global coverage.', year: 2024, x: 86.6, y: 21.0, w: 10.8 },
  { id: 61, img: 'explore-47.png', desc: 'Preconfigurations, intended as guiding examples, facilitate engineering and are conveniently accessible via ABB\'s relay setting and configuration tool, PCM600.', year: 2024, x: 86.1, y: 35.5, w: 13.3 },

  // ── 2026 (3 items) ────────────────────────────────────────
  { id: 62, img: 'explore-48.png', desc: 'The opening of the laboratories and the visitor balcony, by Adrian Guggisberg, Sami Raitakoski and Antti Hakala-Ranta in May 2026, highlighted the first step of the factory relocation.', year: 2026, x: 86.8, y: 3.4, w: 13.5 },
  { id: 63, img: 'explore-52.png', desc: 'The renovation of the KT-building into a modern office and production facility enables the expansion of the relay production in Vaasa.', year: 2026, x: 89.5, y: 19.8, w: 11.4 },
  { id: 64, img: 'explore-80.png', desc: 'REX600 replaces the SMU615 merging unit, and complies with the latest standards for interoperability in digital substations.', year: 2026, x: 89.6, y: 34.5, w: 10.4 },
]

export default EXPLORE_ITEMS
