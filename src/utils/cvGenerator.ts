import jsPDF from "jspdf";
import { content } from "../data/content";

export type Language = "en" | "es";

interface CVGeneratorOptions {
  language: Language;
}

export function generateCV({ language }: CVGeneratorOptions): void {
  const data = content[language];
  const doc = new jsPDF();

  type ColorTuple = [number, number, number];

  interface Colors {
    accent: ColorTuple;
    bg: ColorTuple;
    surface: ColorTuple;
    text: ColorTuple;
    textSecondary: ColorTuple;
    border: ColorTuple;
  }

  const colors: Colors = {
    accent: [50, 50, 50],
    bg: [255, 255, 255],
    surface: [238, 238, 238],
    text: [20, 20, 20],
    textSecondary: [100, 100, 100],
    border: [200, 200, 200],
  };

  const drawBackground = () => {
    doc.setFillColor(...colors.bg);
    doc.rect(0, 0, 210, 297, "F");

    doc.setFillColor(...colors.surface);
    doc.rect(0, 0, 65, 297, "F");

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

    doc.setFillColor(220, 220, 220);
    doc.roundedRect(x, y - 3.5, width, height, 1, 1, "F");

    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(text, x + padding, y);

    return width + 2;
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

  setupPage();

  let sidebarY = 20;
  const sidebarX = 8;
  const sidebarWidth = 49;

  doc.setFontSize(13);
  doc.setTextColor(...colors.accent);
  doc.setFont("helvetica", "bold");
  const nameLines = doc.splitTextToSize(data.hero.name, sidebarWidth);
  doc.text(nameLines, sidebarX, sidebarY);
  sidebarY += nameLines.length * 6;

  doc.setFontSize(8);
  doc.setTextColor(...colors.textSecondary);
  doc.setFont("helvetica", "normal");
  const titleLines = doc.splitTextToSize(data.hero.title, sidebarWidth);
  doc.text(titleLines, sidebarX, sidebarY);
  sidebarY += titleLines.length * 4 + 7;

  doc.setDrawColor(...colors.border);
  doc.setLineWidth(0.3);
  doc.line(sidebarX, sidebarY, sidebarX + sidebarWidth, sidebarY);
  sidebarY += 6;

  doc.setFontSize(9);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "CONTACT" : "CONTACTO", sidebarX, sidebarY);
  sidebarY += 6;

  const contactInfo = [
    { label: "Email", value: data.footer.email },
    { label: "Github", value: data.footer.github.replace("https://", "") },
    { label: "LinkedIn", value: data.footer.linkedin.replace("https://", "") },
  ];

  contactInfo.forEach((info) => {
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.text);
    doc.text(info.label, sidebarX, sidebarY);
    sidebarY += 3.5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.textSecondary);
    const valLines = doc.splitTextToSize(info.value, sidebarWidth);
    doc.text(valLines, sidebarX, sidebarY);
    sidebarY += valLines.length * 3.5 + 3;
  });

  sidebarY += 3;

  doc.setFontSize(9);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "LANGUAGES" : "IDIOMAS", sidebarX, sidebarY);
  sidebarY += 6;

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...colors.textSecondary);
  doc.text(
    language === "en" ? "English (Professional)" : "Inglés (Profesional)",
    sidebarX,
    sidebarY,
  );
  sidebarY += 4;
  doc.text(
    language === "en" ? "Spanish (Native)" : "Español (Nativo)",
    sidebarX,
    sidebarY,
  );
  sidebarY += 10;

  doc.setFontSize(9);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "EXPERTISE" : "ESPECIALIDAD", sidebarX, sidebarY);
  sidebarY += 6;

  data.focus.areas.forEach((area) => {
    doc.setFontSize(7.5);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "bold");
    doc.text(`• ${area.title}`, sidebarX, sidebarY);
    sidebarY += 5;
  });

  sidebarY += 5;

  doc.setFontSize(9);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "SUMMARY" : "RESUMEN", sidebarX, sidebarY);
  doc.setDrawColor(...colors.accent);
  doc.setLineWidth(0.8);
  doc.line(sidebarX, sidebarY + 2, sidebarX + 12, sidebarY + 2);
  sidebarY += 8;

  doc.setFontSize(7.5);
  doc.setTextColor(...colors.textSecondary);
  doc.setFont("helvetica", "normal");
  const summaryLines = doc.splitTextToSize(data.hero.subtitle, sidebarWidth);
  doc.text(summaryLines, sidebarX, sidebarY);
  sidebarY += summaryLines.length * 3.8 + 8;

  doc.setFontSize(9);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "TECH STACK" : "STACK TÉCNICO", sidebarX, sidebarY);
  doc.setDrawColor(...colors.accent);
  doc.setLineWidth(0.8);
  doc.line(sidebarX, sidebarY + 2, sidebarX + 12, sidebarY + 2);
  sidebarY += 8;

  data.techStack.categories.forEach((category) => {
    doc.setFontSize(7.5);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "bold");
    doc.text(category.name, sidebarX, sidebarY);
    sidebarY += 5;

    let currentX = sidebarX;
    category.items.forEach((skill) => {
      const badgeWidth = drawBadge(skill, currentX, sidebarY);
      currentX += badgeWidth;
      if (currentX > sidebarX + sidebarWidth - 5) {
        currentX = sidebarX;
        sidebarY += 6;
      }
    });
    sidebarY += 9;
  });

  let mainY = 20;
  const mainX = 75;
  const contentWidth = 120;

  doc.setFontSize(26);
  doc.setTextColor(...colors.accent);
  doc.setFont("helvetica", "bold");
  doc.text(data.hero.name, mainX, mainY);

  mainY += 9;
  doc.setFontSize(13);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "normal");
  doc.text(data.hero.title, mainX, mainY);

  mainY += 14;

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
    doc.setTextColor(...colors.textSecondary);
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
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "italic");
    doc.text(project.category, mainX, mainY);
    mainY += 5;

    doc.setFontSize(8.5);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "normal");
    const projDescLines = doc.splitTextToSize(project.description, contentWidth);
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
