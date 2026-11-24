# quick-study-timer

## Overview

A lightweight browser study timer built with vanilla HTML, CSS, and JavaScript.
It saves completed focus and break sessions in localStorage so you can track
daily study blocks without a backend, and includes a Python helper for quick
command-line session summaries.

## Features

- Focus and Break timer modes with custom minute input
- Start, pause, and reset controls with live MM:SS countdown
- Automatic localStorage session history (last 12 sessions)
- Clean dark theme using CSS custom properties and grid/flex layout
- Responsive single-card UI for desktop and mobile viewports
- Python CLI utility to aggregate focus and break minutes

## Usage

1. Serve the folder locally (e.g. `npx vite` or `python3 -m http.server`).
2. Pick **Focus** or **Break**, optionally set minutes, and click **Start**.
3. Pipe exported JSON session arrays into `python3 scripts/stats.py` for totals.
