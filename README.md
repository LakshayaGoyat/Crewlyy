# Crewlyy

Static HTML/CSS/JavaScript reference implementation for the Crewlyy workspace access page.

## Structure

```text
Crewlyy/
├── index.html          # Workspace authentication and access portal
├── teamBuilder.html    # Team Builder Studio page (Step 01: Squad builder & recruitment)
├── css/
│   ├── styles.css      # Authentication and global base styles
│   └── teamBuilder.css # Team Builder Studio layout, cards, and theme
├── js/
│   └── main.js         # Small interactions and form behavior
```

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static file server. No build step or framework is required.

## Conventions

- Keep page markup in HTML, visual rules in `css/styles.css`, and behavior in `js/main.js`.
- Use semantic HTML and accessible labels for new form controls.
- Add new pages as separate HTML files and reuse shared CSS/JavaScript modules where practical.
- Keep external dependencies out of the project unless the team agrees otherwise.
