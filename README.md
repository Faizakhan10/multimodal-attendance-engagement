# Attendly — Multimodal Attendance & Engagement System

A responsive, frontend-only prototype for a student project. It demonstrates attendance tracking and manually recorded engagement indicators in a classroom dashboard.

## Features
- Dashboard summary for total students, present/absent/late, attendance rate, and average engagement score.
- Add and edit student records.
- Attendance status and engagement score fields.
- Search students by name, roll number, or status.
- Sort the table by attendance or engagement using the navigation tabs.
- Export student records to CSV.
- Persists demo records in browser `localStorage`.
- Responsive layout for desktop and mobile.

## Run locally
1. Download and unzip the project folder.
2. Open `index.html` in a modern browser. No build step is required.
3. For a local web server, run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.

## Demo data and limitations
- The included records are fictional sample data.
- Engagement values are manually entered illustrative scores. This prototype does not use a camera, microphone, facial recognition, or AI inference.
- Data is stored only in the current browser's local storage. It is not a production database and will not sync between devices.
- Do not enter real or sensitive student information into this demo.

## Publish a live demo
### GitHub Pages
1. Create a GitHub repository named `multimodal-attendance-engagement`.
2. Upload `index.html`, `styles.css`, `app.js`, and `README.md` to the repository root.
3. Open **Settings → Pages** in the repository.
4. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
5. Wait for GitHub Pages to publish. Copy the URL shown in the Pages section; it will usually look like `https://YOUR-USERNAME.github.io/multimodal-attendance-engagement/`.

### GitHub repository
Create the repository while signed into your own GitHub account. Its URL will look like:
`https://github.com/YOUR-USERNAME/multimodal-attendance-engagement`

Replace `YOUR-USERNAME` with your actual GitHub username. These are URL templates, not already-published links.

## Suggested project description
**Multimodal Attendance & Engagement System** is a responsive web application prototype designed to help educators review student attendance and engagement indicators from a single dashboard. It provides student record management, attendance status tracking, engagement score summaries, search, and CSV reporting. This version demonstrates the user interface and client-side workflow; a production implementation would need authentication, a secure backend/database, privacy controls, and validated data collection methods.

## Suggested future improvements
- Backend API and database with role-based access.
- Teacher login and class management.
- Date-wise attendance history and monthly reports.
- Accessible charts and downloadable PDF reports.
- Carefully evaluated, consent-based engagement inputs with clear privacy safeguards.
