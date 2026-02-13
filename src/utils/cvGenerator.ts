import jsPDF from "jspdf";
import { content } from "../data/content";

export type Language = "en" | "es";
export type Theme = "light" | "dark";

interface CVGeneratorOptions {
  language: Language;
  theme: Theme;
}

export function generateCV({ language, theme }: CVGeneratorOptions): void {
  const data = content[language];
  const doc = new jsPDF();
  const isDark = theme === "dark";

  type ColorTuple = [number, number, number];

  interface Colors {
    accent: ColorTuple;
    bg: ColorTuple;
    surface: ColorTuple;
    text: ColorTuple;
    textSecondary: ColorTuple;
    border: ColorTuple;
  }

  // Apple-inspired premium palette
  const colors: Colors = {
    accent: isDark ? [16, 185, 129] : [5, 150, 105],
    bg: isDark ? [0, 0, 0] : [251, 251, 253],
    surface: isDark ? [29, 29, 31] : [245, 245, 247],
    text: isDark ? [245, 245, 247] : [29, 29, 31],
    textSecondary: isDark ? [161, 161, 170] : [66, 66, 69],
    border: isDark ? [50, 50, 50] : [210, 210, 215],
  };

  const drawBackground = () => {
    // Fill main background
    doc.setFillColor(...colors.bg);
    doc.rect(0, 0, 210, 297, "F");

    // Add subtle dot pattern (simulating the site)
    doc.setFillColor(...colors.accent);
    const dotOpacity = 0.05;

    interface GState {
      new (options: { opacity: number }): unknown;
    }

    const ExtendedDoc = doc as jsPDF & {
      GState?: GState;
      setGState?: (state: unknown) => jsPDF;
    };

    const ExtendedConstructor = jsPDF as unknown as {
      GState?: GState;
    };

    const GStateClass = ExtendedDoc.GState || ExtendedConstructor.GState;

    if (GStateClass && ExtendedDoc.setGState) {
      try {
        ExtendedDoc.setGState(new GStateClass({ opacity: dotOpacity }));
      } catch {
        // Fallback if GState fails
      }
    }

    for (let x = 0; x < 210; x += 15) {
      for (let y = 0; y < 297; y += 15) {
        doc.circle(x, y, 0.15, "F");
      }
    }

    if (GStateClass && ExtendedDoc.setGState) {
      try {
        ExtendedDoc.setGState(new GStateClass({ opacity: 1.0 }));
      } catch {
        // Fallback
      }
    }

    // Draw sidebar background
    doc.setFillColor(...colors.surface);
    doc.rect(0, 0, 65, 297, "F");

    // Sidebar border
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.1);
    doc.line(65, 0, 65, 297);
  };

  const drawBadge = (text: string, x: number, y: number): number => {
    doc.setFontSize(7);
    const textWidth = doc.getTextWidth(text);
    const padding = 2;
    const width = textWidth + padding * 2;
    const height = 5;

    const badgeBg: ColorTuple = isDark ? [30, 40, 35] : [236, 253, 245];
    doc.setFillColor(...badgeBg);
    doc.roundedRect(x, y - 3.5, width, height, 1, 1, "F");

    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(text, x + padding, y);

    return width + 2; // Return total width consumed + gap
  };

  const drawSectionHeader = (text: string, x: number, y: number) => {
    doc.setFontSize(11);
    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(text.toUpperCase(), x, y);

    doc.setDrawColor(...colors.accent);
    doc.setLineWidth(0.8);
    doc.line(x, y + 2, x + 15, y + 2);
  };

  const setupPage = () => {
    drawBackground();
  };

  // Initial page setup
  setupPage();

  // --- SIDEBAR CONTENT ---
  let sidebarY = 25;

  // Profile Photo Placeholder or Initial
  doc.setFillColor(...colors.accent);
  doc.roundedRect(15, sidebarY, 35, 35, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  const nameInitial = data.hero.name.charAt(0);
  const initialWidth = doc.getTextWidth(nameInitial);
  doc.text(nameInitial, 15 + (35 - initialWidth) / 2, sidebarY + 23);

  sidebarY += 45;

  // Contact Info
  doc.setFontSize(10);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "CONTACT" : "CONTACTO", 15, sidebarY);
  sidebarY += 7;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.textSecondary);

  const contactInfo = [
    { label: "Email", value: data.footer.email },
    { label: "Github", value: data.footer.github.replace("https://", "") },
    { label: "Linkedin", value: data.footer.linkedin.replace("https://", "") },
  ];

  contactInfo.forEach((info) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.text);
    doc.text(info.label, 15, sidebarY);
    sidebarY += 4;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.textSecondary);
    doc.text(info.value, 15, sidebarY);
    sidebarY += 7;
  });

  sidebarY += 5;

  // Languages (Hardcoded for now as it is not in content.ts directly in a list format, but we can add it)
  doc.setFontSize(10);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "LANGUAGES" : "IDIOMAS", 15, sidebarY);
  sidebarY += 7;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.textSecondary);
  doc.text(
    language === "en" ? "English (Professional)" : "Inglés (Profesional)",
    15,
    sidebarY,
  );
  sidebarY += 4;
  doc.text(
    language === "en" ? "Spanish (Native)" : "Español (Nativo)",
    15,
    sidebarY,
  );
  sidebarY += 12;

  // Skills as list in sidebar
  doc.setFontSize(10);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "EXPERTISE" : "ESPECIALIDAD", 15, sidebarY);
  sidebarY += 7;

  data.focus.areas.forEach((area) => {
    doc.setFontSize(8);
    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(area.title, 15, sidebarY);
    sidebarY += 5;
  });

  // --- MAIN CONTENT ---
  let mainY = 25;
  const mainX = 75;
  const contentWidth = 120;

  // Header
  doc.setFontSize(28);
  doc.setTextColor(...colors.accent);
  doc.setFont("helvetica", "bold");
  doc.text(data.hero.name, mainX, mainY);

  mainY += 10;
  doc.setFontSize(14);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "normal");
  doc.text(data.hero.title, mainX, mainY);

  mainY += 15;

  // Summary
  drawSectionHeader(
    language === "en" ? "Professional Summary" : "Resumen Profesional",
    mainX,
    mainY,
  );
  mainY += 10;

  doc.setFontSize(9);
  doc.setTextColor(...colors.textSecondary);
  doc.setFont("helvetica", "normal");
  const summaryLines = doc.splitTextToSize(data.hero.subtitle, contentWidth);
  doc.text(summaryLines, mainX, mainY);
  mainY += summaryLines.length * 4.5 + 12;

  // Technical Skills (Badges)
  drawSectionHeader(
    language === "en" ? "Technical Stack" : "Stack Técnico",
    mainX,
    mainY,
  );
  mainY += 10;

  data.techStack.categories.forEach((category) => {
    doc.setFontSize(9);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "bold");
    doc.text(category.name, mainX, mainY);
    mainY += 6;

    let currentX = mainX;
    category.items.forEach((skill) => {
      const badgeWidth = drawBadge(skill, currentX, mainY);
      currentX += badgeWidth;
      if (currentX > mainX + contentWidth - 10) {
        currentX = mainX;
        mainY += 7;
      }
    });
    mainY += 10;
  });

  // Experience
  if (mainY > 200) {
    doc.addPage();
    setupPage();
    mainY = 25;
  }

  drawSectionHeader(
    language === "en" ? "Experience" : "Experiencia",
    mainX,
    mainY,
  );
  mainY += 10;

  data.experience.roles.forEach((role) => {
    const roleTitleLines = doc.splitTextToSize(role.title, contentWidth);

    if (mainY + 20 > 280) {
      doc.addPage();
      setupPage();
      mainY = 25;
    }

    doc.setFontSize(10);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "bold");
    doc.text(roleTitleLines, mainX, mainY);
    mainY += roleTitleLines.length * 5;

    doc.setFontSize(8.5);
    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(`${role.company}  |  ${role.period}`, mainX, mainY);
    mainY += 6;

    doc.setFontSize(8.5);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "normal");

    role.description.forEach((item) => {
      const itemLines = doc.splitTextToSize(item, contentWidth - 5);
      if (mainY + itemLines.length * 4 > 285) {
        doc.addPage();
        setupPage();
        mainY = 25;
      }

      doc.setFillColor(...colors.accent);
      doc.circle(mainX + 1.5, mainY - 1, 0.5, "F");
      doc.text(itemLines, mainX + 5, mainY);
      mainY += itemLines.length * 4 + 2;
    });
    mainY += 4;
  });

  // Projects
  if (mainY > 220) {
    doc.addPage();
    setupPage();
    mainY = 25;
  }

  drawSectionHeader(
    language === "en" ? "Key Projects" : "Proyectos Clave",
    mainX,
    mainY,
  );
  mainY += 10;

  data.projects.items.forEach((project) => {
    if (mainY + 25 > 280) {
      doc.addPage();
      setupPage();
      mainY = 25;
    }

    doc.setFontSize(10);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "bold");
    doc.text(project.title, mainX, mainY);
    mainY += 5;

    doc.setFontSize(8);
    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "italic");
    doc.text(project.category, mainX, mainY);
    mainY += 5;

    doc.setFontSize(8.5);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "normal");
    const projDescLines = doc.splitTextToSize(
      project.description,
      contentWidth,
    );
    doc.text(projDescLines, mainX, mainY);
    mainY += projDescLines.length * 4 + 3;

    let currentX = mainX;
    project.stack.forEach((tech) => {
      const badgeWidth = drawBadge(tech, currentX, mainY);
      currentX += badgeWidth;
      if (currentX > mainX + contentWidth - 10) {
        currentX = mainX;
        mainY += 7;
      }
    });
    mainY += 12;
  });

  const fileName = `${data.hero.name.replace(/\s+/g, "_")}_CV_${language.toUpperCase()}.pdf`;
  doc.save(fileName);
}
