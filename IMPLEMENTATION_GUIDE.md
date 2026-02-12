# 🎨 Guía de Uso - Sistema de Colores

## 📋 Cómo Implementar en tus Componentes

### Opción 1: Usando Clases de Tailwind (Recomendado)

```tsx
// Hero Section
<section className="bg-light-background dark:bg-dark-background min-h-screen">
  <div className="max-w-6xl mx-auto px-6">
    <h1 className="text-5xl font-bold text-light-text-primary dark:text-dark-text-primary">
      Backend Engineer
    </h1>
    <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mt-4">
      Building scalable systems with modern technologies
    </p>
  </div>
</section>

// Card Component
<div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border 
                rounded-lg p-6 shadow-card dark:shadow-card-dark 
                hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-shadow">
  <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
    Project Title
  </h3>
  <p className="text-light-text-muted dark:text-dark-text-muted mt-2">
    Last updated 2 hours ago
  </p>
</div>

// Button Component
<button className="bg-light-accent-primary dark:bg-dark-accent-primary 
                   hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover
                   text-white font-medium px-6 py-3 rounded-lg 
                   transition-colors duration-200">
  Contact Me
</button>

// Badge/Tag
<span className="inline-block px-3 py-1 rounded-full text-sm font-medium
                 bg-light-accent-light dark:bg-dark-accent-dark 
                 text-light-accent-primary dark:text-dark-accent-primary">
  TypeScript
</span>
```

---

### Opción 2: Usando CSS Variables (Para casos especiales)

```tsx
// En tu componente TypeScript
const Card = () => {
  return (
    <div style={{
      backgroundColor: 'var(--color-card)',
      borderColor: 'var(--color-border)',
      color: 'var(--color-text-primary)'
    }}>
      <h3>Title</h3>
      <p style={{ color: 'var(--color-text-muted)' }}>
        Metadata
      </p>
    </div>
  );
};

// O en CSS/SCSS modules
.myCard {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  
  &:hover {
    border-color: var(--color-accent-primary);
  }
}
```

---

## 🔄 Migración de Código Existente

### Buscar y Reemplazar

```bash
# Fondos
bg-white          → bg-light-card dark:bg-dark-card
bg-gray-50        → bg-light-background dark:bg-dark-background
bg-gray-100       → bg-light-surface dark:bg-dark-surface

# Texto
text-gray-900     → text-light-text-primary dark:text-dark-text-primary
text-gray-700     → text-light-text-secondary dark:text-dark-text-secondary
text-gray-500     → text-light-text-muted dark:text-dark-text-muted
text-black        → text-light-text-primary dark:text-dark-text-primary

# Bordes
border-gray-200   → border-light-border dark:border-dark-border
border-gray-300   → border-light-border dark:border-dark-border

# Acentos (si usabas primary-*)
bg-primary-500    → bg-light-accent-primary dark:bg-dark-accent-primary
text-primary-600  → text-light-accent-primary dark:text-dark-accent-primary
hover:bg-primary-600 → hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover
```

---

## 🎯 Ejemplos de Layouts Comunes

### 1. Página Completa con Secciones

```tsx
function Portfolio() {
  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Hero Section */}
      <section className="bg-light-surface dark:bg-dark-surface py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-light-text-primary dark:text-dark-text-primary">
            John Doe
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary mt-4">
            Backend Engineer specializing in distributed systems
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-12">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

### 2. Componente de Tarjeta (Card)

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  lastUpdated: string;
}

function ProjectCard({ title, description, tags, lastUpdated }: ProjectCardProps) {
  return (
    <div className="bg-light-card dark:bg-dark-card 
                    border border-light-border dark:border-dark-border 
                    rounded-lg p-6 
                    shadow-card dark:shadow-card-dark 
                    hover:shadow-card-hover dark:hover:shadow-card-dark-hover 
                    transition-all duration-200">
      
      {/* Header */}
      <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">
        {description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} 
                className="inline-block px-3 py-1 rounded-full text-sm font-medium
                           bg-light-accent-light dark:bg-dark-accent-dark 
                           text-light-accent-primary dark:text-dark-accent-primary">
            {tag}
          </span>
        ))}
      </div>
      
      {/* Footer */}
      <div className="pt-4 border-t border-light-border-subtle dark:border-dark-border-subtle">
        <p className="text-sm text-light-text-muted dark:text-dark-text-muted">
          Updated {lastUpdated}
        </p>
      </div>
    </div>
  );
}
```

---

### 3. Botones y Acciones

```tsx
// Primary Button
<button className="bg-light-accent-primary dark:bg-dark-accent-primary 
                   hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover
                   text-white font-medium px-6 py-3 rounded-lg 
                   transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-light-accent-primary dark:focus:ring-dark-accent-primary focus:ring-offset-2">
  Get Started
</button>

// Secondary Button (Outline)
<button className="border-2 border-light-accent-primary dark:border-dark-accent-primary 
                   text-light-accent-primary dark:text-dark-accent-primary
                   hover:bg-light-accent-light dark:hover:bg-dark-accent-dark
                   font-medium px-6 py-3 rounded-lg 
                   transition-colors duration-200">
  Learn More
</button>

// Ghost Button
<button className="text-light-text-secondary dark:text-dark-text-secondary
                   hover:text-light-accent-primary dark:hover:text-dark-accent-primary
                   hover:bg-light-surface dark:hover:bg-dark-surface
                   font-medium px-4 py-2 rounded-lg 
                   transition-colors duration-200">
  Cancel
</button>

// Link Style
<a href="#" className="text-light-accent-primary dark:text-dark-accent-primary 
                       hover:text-light-accent-hover dark:hover:text-dark-accent-hover
                       underline underline-offset-4 transition-colors">
  View on GitHub →
</a>
```

---

### 4. Navegación (Navbar)

```tsx
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 
                    bg-light-card/80 dark:bg-dark-card/80 backdrop-blur-lg
                    border-b border-light-border dark:border-dark-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
            JD
          </a>
          
          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" 
               className="text-light-text-secondary dark:text-dark-text-secondary 
                          hover:text-light-accent-primary dark:hover:text-dark-accent-primary 
                          transition-colors">
              About
            </a>
            <a href="#projects" 
               className="text-light-text-secondary dark:text-dark-text-secondary 
                          hover:text-light-accent-primary dark:hover:text-dark-accent-primary 
                          transition-colors">
              Projects
            </a>
            <a href="#contact" 
               className="bg-light-accent-primary dark:bg-dark-accent-primary 
                          hover:bg-light-accent-hover dark:hover:bg-dark-accent-hover
                          text-white px-4 py-2 rounded-lg transition-colors">
              Contact
            </a>
          </div>
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
```

---

### 5. Theme Toggle Component

```tsx
import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDark(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg 
                 bg-light-surface dark:bg-dark-surface 
                 border border-light-border dark:border-dark-border
                 text-light-text-primary dark:text-dark-text-primary
                 hover:bg-light-card dark:hover:bg-dark-card
                 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
```

---

## 📐 Sistema de Espaciado y Elevación

### Jerarquía Visual con Sombras

```tsx
// Nivel 0: Plano (sin sombra)
<div className="bg-light-surface dark:bg-dark-surface">
  Base surface
</div>

// Nivel 1: Elevación Sutil
<div className="bg-light-card dark:bg-dark-card shadow-card dark:shadow-card-dark">
  Cards, lists
</div>

// Nivel 2: Elevación Media (hover)
<div className="bg-light-card dark:bg-dark-card 
                shadow-card dark:shadow-card-dark 
                hover:shadow-card-hover dark:hover:shadow-card-dark-hover">
  Interactive cards
</div>

// Nivel 3: Elevación Alta
<div className="bg-light-card dark:bg-dark-card shadow-lg">
  Modals, dropdowns
</div>
```

---

## ✅ Checklist de Implementación

Cuando migres componentes, asegúrate de:

- [ ] Todos los fondos usan `bg-light-* dark:bg-dark-*`
- [ ] Todo el texto usa `text-light-text-* dark:text-dark-text-*`
- [ ] Bordes usan `border-light-border* dark:border-dark-border*`
- [ ] Botones y enlaces usan los colores de acento
- [ ] Hover states definidos para ambos modos
- [ ] Focus states para accesibilidad (keyboard navigation)
- [ ] Sombras apropiadas para la jerarquía visual
- [ ] Transiciones suaves entre estados

---

## 🚀 Próximos Pasos

1. **Implementar Theme Toggle**: Crea el componente de arriba
2. **Migrar componentes existentes**: Empieza por los más visibles (Hero, Navbar)
3. **Verificar contraste**: Usa herramientas como [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
4. **Test en ambos modos**: Verifica que todo se vea bien en Light y Dark
5. **Eliminar colores legacy**: Una vez migrado, remover variables antiguas
