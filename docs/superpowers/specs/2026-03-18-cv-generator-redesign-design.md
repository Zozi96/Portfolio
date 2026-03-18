# Design Spec: CV Generator Redesign with React-PDF

## 1. Overview
Replace the existing imperative `jsPDF` implementation with a modern, declarative approach using `@react-pdf/renderer`. The goal is to produce a high-fidelity, professional CV for a Senior Software Engineer that aligns with the portfolio's aesthetic while being more maintainable and visually sophisticated.

## 2. Design Goals
*   **Aesthetic:** "Professional Engineering" — high information density, clean hierarchy, and subtle tech accents.
*   **Palette:**
    *   Primary (Indigo): `#1e1b4b` (Text headers, Timeline nodes)
    *   Secondary (Slate): `#334155` (Body text, Borders)
    *   Accent (Sky): `#0ea5e9` (Interactive elements, Project accents)
    *   Surface: `#f8fafc` (Sidebar background, Card fills)
*   **Typography:** Modern Sans-Serif (**Inter**).
*   **Layout:** Two-column "Modern Tech" Sidebar (30/70 split).

## 3. Architecture
The CV generation will remain off-main-thread using the existing Web Worker pattern (`src/workers/pdf.worker.ts`).

### 3.1 Components
*   **`CVDocument`**: Main wrapper component managing metadata and page setup.
*   **`Sidebar`**: Left-hand column containing contact details, technical skills (grouped by category), and languages.
*   **`MainContent`**: Right-hand column featuring the professional summary, experience timeline, and key projects.
*   **`Timeline` & `TimelineItem`**: Modular components for the professional experience section.
*   **`ProjectCard`**: Styled component for showcasing key client and personal projects.

### 3.2 Data Mapping
Mapping logic in `src/utils/cvGenerator.ts` will be refactored to pass `content` data from `src/data/content.ts` into React components rather than imperative drawing calls.

## 4. Technical Constraints
*   **Library:** `@react-pdf/renderer` for component-based PDF generation.
*   **Icons:** Use SVG paths (manually extracted or from a lightweight set) as `@react-pdf/renderer` does not support standard React icon libraries like `lucide-react` directly.
*   **Performance:** Maintain the use of Web Workers to prevent blocking the UI during generation.
*   **Deployment:** Ensure dependencies are correctly bundled for production.

## 5. Success Criteria
*   PDF matches the approved "Modern Tech" sidebar layout.
*   Text is sharp, selectable, and searchable.
*   Generation process is smooth and doesn't block the main thread.
*   Full support for both English and Spanish localized content.
