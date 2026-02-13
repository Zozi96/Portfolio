# 💼 Professional Portfolio - Zozimo Fernández

A modern, responsive portfolio website built for showcasing expertise in full-stack development, data engineering, and cloud architecture.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 Features

- **🎨 Modern Design System**: Professional color palette optimized for both light and dark modes with WCAG AA accessibility compliance
- **🌍 Internationalization**: Built-in multi-language support (English/Spanish) with context-based translation system
- **🌓 Theme Switching**: Seamless dark/light mode toggle with persistent user preferences
- **⚡ Performance Optimized**: Built with Vite for lightning-fast development and optimized production builds
- **📱 Fully Responsive**: Mobile-first design that works beautifully on all devices
- **✨ Smooth Animations**: Powered by Framer Motion for professional micro-interactions
- **♿ Accessible**: WCAG compliant with proper semantic HTML and ARIA attributes
- **🎯 SEO Ready**: Optimized meta tags and semantic structure

---

## 🛠️ Tech Stack

### Core Technologies
- **React 19.2** - Latest React with improved performance and features
- **TypeScript 5.9** - Type-safe development with latest TypeScript features
- **Vite 7** - Next-generation frontend tooling for fast development

### Styling & UI
- **TailwindCSS 4** - Utility-first CSS framework with custom design system
- **Framer Motion 12** - Production-ready animation library
- **Lucide React** - Beautiful, consistent icon set
- **clsx + tailwind-merge** - Efficient className management

### Code Quality
- **ESLint 9** - Modern linting with flat config
- **TypeScript ESLint** - Type-aware linting rules
- **React Hooks ESLint** - Enforce hooks best practices

---

## 📁 Project Structure

```
Portfolio/
├── public/
│   └── favicon.png          # Site favicon
├── src/
│   ├── assets/              # Static assets (images, fonts)
│   ├── components/
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   └── ui/              # Reusable UI components (Button, Card, Badge)
│   ├── context/             # React Context providers (Theme, Language)
│   ├── data/
│   │   └── content.ts       # Internationalized content data
│   ├── sections/            # Main page sections (Hero, Projects, Experience)
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and Tailwind imports
├── DESIGN_SYSTEM.md         # Comprehensive design system documentation
├── IMPLEMENTATION_GUIDE.md  # Implementation details and guides
├── VISUAL_ANALYSIS.md       # Visual design analysis and decisions
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zozi96/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript compilation + Vite build) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

---

## 🎨 Customization

### Theme Configuration

The design system is built on a professional color palette defined in `DESIGN_SYSTEM.md`. Key theme colors:

- **Light Mode**: Zinc-based neutrals with Indigo accent (#4F46E5)
- **Dark Mode**: Deep Zinc backgrounds with luminous Indigo (#6366F1)

Theme switching is handled via React Context in `src/context/ThemeContext.tsx`.

### Content Management

All portfolio content is centralized in `src/data/content.ts`:

```typescript
export const content = {
  en: { /* English content */ },
  es: { /* Spanish content */ }
};
```

Update this file to customize:
- Personal information
- Project descriptions
- Skills and experience
- Navigation labels

### Adding a New Section

1. Create a new component in `src/sections/`
2. Import and add to `App.tsx`
3. Add corresponding content to `src/data/content.ts`
4. Update navigation in both language versions

---

## 🌐 Internationalization

The portfolio supports multiple languages through a custom Context system:

- **Default Language**: English (EN)
- **Available Languages**: English, Spanish
- **Language Switching**: Automatic UI updates without page reload
- **Storage**: User preference persisted in localStorage

To add a new language:
1. Add translations to `src/data/content.ts`
2. Update `LanguageContext.tsx` to include the new language
3. Add language toggle in the Navbar component

---

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory with:
- Minified JavaScript and CSS
- Code splitting for optimal loading
- Asset optimization and compression

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### GitHub Pages
```bash
# Build the project
npm run build

# Deploy dist folder to gh-pages branch
npx gh-pages -d dist
```

### Environment Variables

Create a `.env` file in the root directory if you need environment-specific configurations:

```env
VITE_APP_TITLE=Your Portfolio Title
VITE_GITHUB_USERNAME=YourUsername
```

---

## 🎯 Design System

This portfolio implements a comprehensive design system documented in `DESIGN_SYSTEM.md`:

- **Color Palette**: Professional Indigo accent with Zinc neutrals
- **Typography**: System font stack optimized for readability
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable UI components with variants
- **Accessibility**: WCAG AA compliant color contrasts

For detailed information, see:
- [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) - Complete color palette and design tokens
- [VISUAL_ANALYSIS.md](./VISUAL_ANALYSIS.md) - Visual design decisions and analysis
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Implementation details

---

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Contact

**Zozimo Fernández** - Senior Software Engineer

- GitHub: [@Zozi96](https://github.com/Zozi96)
- Portfolio: [Live Demo](#) <!-- Add your deployed URL here -->

---

## 🙏 Acknowledgments

- Design inspiration from modern portfolio best practices
- Icon set by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)
- Styled with [TailwindCSS](https://tailwindcss.com/)

---

<p align="center">Made with ❤️ and React</p>
