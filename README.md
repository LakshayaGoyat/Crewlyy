# Crewlyy

Static HTML/CSS/JavaScript reference implementation for the Crewlyy platform.

## Structure

```text
Crewlyy/
├── index.html            # Workspace Access & Authentication Terminal
├── squad-matrix.html     # Squad Matrix & Team Exploration Engine
├── explore-teams.html    # Alias redirecting to squad-matrix.html
├── assets/               # Squad and platform SVG vector graphics
├── css/
│   ├── styles.css        # Layout and styles for Workspace Access (index.html)
│   └── squad-matrix.css  # Layout, theme, and components for Squad Matrix (squad-matrix.html)
└── js/
    ├── main.js           # Form handling and interactions for Workspace Access
    └── squad-matrix.js   # Dynamic role filtering, search, pagination, and modals
```

## Run locally

Open `index.html` or `squad-matrix.html` directly in a browser, or serve the folder with any static file server. No build step or framework is required.

## Conventions

- Keep page markup in HTML, visual rules in `css/`, and behavior in `js/`.
- Use semantic HTML and accessible labels for new form controls.
- Add new pages as separate HTML files and modularize page-specific CSS/JavaScript in their respective folders.
- Keep external dependencies out of the project unless the team agrees otherwise.
