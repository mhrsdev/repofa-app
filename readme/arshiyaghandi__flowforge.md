# FlowForge — AI Developer Operating System

> **Tagline**: *Forge Your Workflow. Build Without Friction.*

FlowForge is a production-grade Developer Operating System that unifies everything a software engineer needs in one cohesive, dark-themed, glassmorphic application.

---

## Features Implemented

### 1. Dashboard
- **Greeting & Date** with active coding streak indicator.
- **Pomodoro Focus Mode** with start/pause/reset controls.
- **Active Sprint Overview** with progress bars & SP completion tracking.
- **Projects Catalog** with priority badges and tech stack pills.
- **Git Commit History** with short SHA highlights and current branch detection.
- **Docker Containers** real-time status tracker.
- **Open Pull Requests & Deadlines Timeline**.
- **Interactive Recharts**: Sprint Burndown Chart & Weekly Productivity Bar Chart.
- **365-day Contribution Heatmap** (GitHub style).
- **AI Suggestion Box** with code refactoring advice.
- **Quick Scratchpad** for temporary notes.

### 2. Global Task Management (Kanban Board)
- 6 columns: `Backlog`, `To Do`, `In Progress`, `Code Review`, `Testing`, `Done`.
- Full Drag-and-Drop support powered by `@hello-pangea/dnd`.
- Filter tasks by project or priority.
- Slide-in **Task Detail Panel** with checklist, subtasks, related branch, and comment thread.

### 3. Git Integration Hub
- Multi-repository switcher with active branch selection.
- Commit history log viewer.
- Visual Code Diff Inspector with syntax highlighted added/removed lines.
- Quick action buttons (Push, Pull, Fetch).

### 4. Documentation & Knowledge Base
- Split-pane Markdown Editor with live preview.
- Markdown syntax support (Code blocks, Blockquotes, Lists, Tables).
- Tree navigation by project folders.

### 5. Sprint & Release Calendar
- Full month grid view with day events.
- Color-coded events: `Sprint`, `Meeting`, `Deadline`, `Release`.

### 6. Productivity & Code Analytics
- Key performance metrics: Total Coding Hours, Tasks Completed, Total Commits, Sprint Velocity.
- Recharts visualizations: Daily Activity Breakdown & Monthly Focus Area Chart.

### 7. Built-in AI Copilot
- AI Chat interface with typing indicators and prompt suggestions:
  - *Generate Commit Messages*
  - *Code Review & Security Analysis*
  - *Generate API Documentation*
  - *Identify Technical Debt*

### 8. Docker Container Hub
- Container listing with status indicators (Running/Stopped).
- Live container logs console output.
- Quick start/stop toggle controls.

### 9. Integrated Developer Terminal
- Multi-tab terminal emulator (`zsh`, `bash`, `docker`).
- Built-in command interpreter supporting `ls`, `git status`, `docker ps`, `help`, and `clear`.

### 10. Notes & Knowledge Base
- Tag-filtered notes list with pin/unpin capability.
- Full Markdown view for architectural decision records.

### 11. Command Palette (`Ctrl+K` / `⌘K`)
- Fuzzy search overlay across all pages, projects, tasks, and notes.

---

## System Architecture

```
FlowFogre/
├── flowforge-backend/        # Java 21 + Spring Boot 3.3
│   ├── src/main/java/        # Clean Architecture (Auth, Project, Task, Git, Docker, Notes, Analytics, AI)
│   ├── src/main/resources/   # Flyway DB Migrations (V1 to V7)
│   └── pom.xml               # Maven configuration
│
├── flowforge-frontend/       # React 18 + Vite
│   ├── src/components/       # Layout, Kanban Board, Task Detail, Command Palette
│   ├── src/pages/            # 14 Full Pages (Dashboard, Projects, Git, Docs, AI, etc.)
│   ├── src/styles/           # Glassmorphism Design System (globals.css)
│   ├── src/store/            # Zustand global state management
│   └── src/data/             # Mock Data provider
│
└── docker-compose.yml        # Orchestration (PostgreSQL, Redis, Backend, Frontend)
```

---

## How to Run Locally

### 1. Run Frontend (React + Vite)
```bash
cd flowforge-frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### 2. Run Backend (Spring Boot)
Ensure PostgreSQL is running locally on port 5432 or via Docker:
```bash
cd flowforge-backend
mvn clean spring-boot:run
```
Swagger API docs available at: `http://localhost:8080/swagger-ui.html`

### 3. Run Full Stack with Docker Compose
```bash
docker-compose up --build
```