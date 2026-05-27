# ScholarWeb — AI-Powered Syllabus-Mapped Education Platform

ScholarWeb is a premium, high-conversion AI SaaS platform designed for high-stakes university exam prep. It turns the entire internet into a personalized, textbook-verified college university mapped directly to a student's actual syllabus.

---

## 🎨 Visual Design Language & Aesthetics

ScholarWeb intentionally shifts away from generic neon cyber-dark "AI template" visuals to a minimal, human-designed light cream canvas inspired by the aesthetics of Notion, Linear, and Tailwind UI:
*   **Color Palette**: Clean Ivory Cream background (`#FAF9F6`) combined with premium Retro Navy (`#1E3A8A`), Warm Amber (`#B45309`), Muted Forest Green (`#166534`), and Slate Charcoal typography (`#1A1A1A`).
*   **Layout Micro-Imperfections**: Features a repeating **Dot-Matrix Background Canvas** (`bg-dot-matrix`) bound by clean `1.5px` border grids replacing heavy drop shadows.
*   **Spotlight Mouse Tracking**: Equipped with a GPU-accelerated **Warm Amber Cursor Spotlight** (`CursorGlow.tsx`) that dynamically tracks the user's mouse coordinates at a smooth 60+ FPS rate without triggering React state re-renders.

---

## 🚀 Core Interactive Features & Simulators

This repository features a fully integrated, state-driven interactive presentation showcasing all core startup services in real-time:

### 1. The Active PDF Upload Simulator (`DemoSlides.tsx`)
*   **Drag-Anywhere HTML5 dropzone**: Drag and drop *any* local PDF syllabus file anywhere within the gray visual sandbox. The container automatically responds to drag hover events with scaling card transitions and amber border pulses.
*   **Native File Selection Dialog**: Click on the dashed uploader card to trigger your native operating system file explorer and select local PDF files.
*   **AI Indexing Scanner**: Simulates multi-stage OCR extraction, mapping, and units compilation, dynamically displaying your actual dropped filename.

### 2. The Browser Extension Overlay Simulator (`InteractiveMockup.tsx`)
*   **Dual-Panel Split View**: 
    - **Left Panel**: Renders a serif-based mock Wikipedia page discussing *Nucleophilic Substitution (SN2)* with clickable, highlighted conceptual passages.
    - **Right Panel**: A docked browser extension overlay that reactively syncs with the highlighted clicks—displaying matching syllabus topics, exam weight percentages, textbook warning safeguards, and flashcard triggers.

### 3. The Notion-Style SaaS Dashboard (`LiveDashboardPreview.tsx`)
*   **Course Indexing Selector**: Switch between *Organic Chemistry (CHEM 301)*, *Quantum Physics (PHYS 401)*, and *Cognitive Neurobiology (NEUR 350)* to view dynamic exam dates, mastery ratings, and weak topics.
*   **Syllabus-Aligned Practice Quiz Engine**: Open the review console to study **12 highly comprehensive predicted exam questions** (4 per subject) compiled in the custom TypeScript database [practiceData.ts](src/components/practiceData.ts). Test written answers against consensus expected keys, view predicted weights, and read critical warning guidelines where peers typically drop points.

---

## 🛠️ Technology Stack

*   **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Logic & Typing**: TypeScript
*   **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icon Library**: [Lucide React](https://lucide-react.dev/)
*   **Animations**: [Framer Motion v12](https://www.framer.com/motion/)

---

## ⚙️ Development & Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Start the Development Server
Launch the local dev server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the active prototype.

### 3. Compile Production Build
Create an optimized production bundle:
```bash
npm run build
```
The project compiles with 100% success on Next.js Turbopack compilers.

---

## 🏛️ Backend System Design

For a full structural walkthrough of the production-grade, microservice-friendly backend design, please refer to the dedicated architect blueprint:
👉 **[backend_architecture_blueprint.md](backend_architecture_blueprint.md)**

It details the microservices layout, scalable PostgreSQL schema, zero-trust token auth system, recursive knowledge graph topological algorithms, RAG textbook vector search queries, and BullMQ background queue pipelines!

---

## 📚 User Guide & Interaction Matrix

For an instructional step-by-step walkthrough of how students leverage the platform to prepare for high-stakes exams, refer to the user manual:
👉 **[scholarweb_user_guide.md](scholarweb_user_guide.md)**
