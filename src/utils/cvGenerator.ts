import { content } from "../data/content";

export type Language = "en" | "es";

export interface CVResult {
  buffer: ArrayBuffer;
  fileName: string;
}

interface CVGeneratorOptions {
  language: Language;
}

export async function generateCV({ language }: CVGeneratorOptions): Promise<CVResult> {
  const { default: jsPDF } = await import("jspdf");
  const data = content[language];
  const doc = new jsPDF();

  /*
   * Custom Font Injection (optional):
   * To replace 'helvetica' with a custom font like 'Inter', add the base64-encoded
   * font file via doc.addFileToVFS() and doc.addFont(), then call doc.setFont().
   * Example:
   *   import interBase64 from './Inter-Regular-base64';
   *   doc.addFileToVFS('Inter-Regular.ttf', interBase64);
   *   doc.addFont('Inter-Regular.ttf', 'Inter', 'normal');
   *   doc.setFont('Inter', 'normal');
   */

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
    accent: [16, 185, 129],
    bg: [255, 255, 255],
    surface: [248, 250, 252],
    text: [15, 23, 42],
    textSecondary: [71, 85, 105],
    border: [226, 232, 240],
  };

  const drawBackground = () => {
    doc.setFillColor(...colors.bg);
    doc.rect(0, 0, 210, 297, "F");

    doc.setFillColor(...colors.surface);
    doc.rect(0, 0, 70, 297, "F");
  };

  const drawBadge = (text: string, x: number, y: number): number => {
    doc.setFontSize(7.5);
    const textWidth = doc.getTextWidth(text);
    const padding = 3;
    const width = textWidth + padding * 2;
    const height = 5.5;

    doc.setFillColor(238, 242, 255);
    doc.roundedRect(x, y - 4, width, height, 1.5, 1.5, "F");

    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(text, x + padding, y);

    return width + 2.5;
  };

  const drawSectionHeader = (text: string, x: number, y: number) => {
    doc.setFontSize(12);
    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(text.toUpperCase(), x, y);

    doc.setDrawColor(...colors.accent);
    doc.setLineWidth(1.2);
    doc.line(x, y + 2.5, x + 18, y + 2.5);
  };

  const drawTimelineNode = (x: number, y: number, height: number, isLast: boolean, index: number) => {
    if (!isLast) {
      doc.setDrawColor(...colors.border);
      doc.setLineWidth(0.5);
      doc.line(x, y + 3, x, y + height);
    }
    if (index === 0) {
      doc.setFillColor(...colors.accent);
      doc.circle(x, y, 1.5, "F");
      doc.setFillColor(255, 255, 255);
      doc.circle(x, y, 0.7, "F");
    } else {
      doc.setFillColor(...colors.border);
      doc.circle(x, y, 1.5, "F");
    }
  };

  const drawProjectCard = (x: number, y: number, width: number, height: number) => {
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(x, y, width, height, 2, 2, "F");

    doc.setDrawColor(...colors.accent);
    doc.setLineWidth(0.8);
    doc.line(x, y + 2, x, y + 10);
  };

  const setupPage = () => {
    drawBackground();
  };

  setupPage();

  let sidebarY = 15;
  const sidebarX = 10;
  const sidebarWidth = 50;

  doc.setFontSize(14);
  doc.setTextColor(...colors.accent);
  doc.setFont("helvetica", "bold");
  const nameLines = doc.splitTextToSize(data.hero.name, sidebarWidth);
  doc.text(nameLines, sidebarX, sidebarY);
  sidebarY += nameLines.length * 6;

  doc.setFontSize(9);
  doc.setTextColor(...colors.textSecondary);
  doc.setFont("helvetica", "normal");
  const titleLines = doc.splitTextToSize(data.hero.title, sidebarWidth);
  doc.text(titleLines, sidebarX, sidebarY);
  sidebarY += titleLines.length * 4 + 8;

  doc.setDrawColor(...colors.border);
  doc.setLineWidth(0.3);
  doc.line(sidebarX, sidebarY, sidebarX + sidebarWidth, sidebarY);
  sidebarY += 6;

  doc.setFontSize(9);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "CONTACT" : "CONTACTO", sidebarX, sidebarY);
  sidebarY += 6;

  const githubSlug = data.footer.github.replace("https://", "");
  const linkedinSlug = data.footer.linkedin.replace("https://", "");
  const contactInfo = [
    { label: "Email", value: data.footer.email, url: `mailto:${data.footer.email}` },
    { label: "Github", value: githubSlug, url: `https://${githubSlug}` },
    { label: "LinkedIn", value: linkedinSlug, url: `https://${linkedinSlug}` },
  ];

  contactInfo.forEach((info) => {
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...colors.text);
    doc.text(info.label, sidebarX, sidebarY);
    sidebarY += 3.5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.accent);
    const valLines = doc.splitTextToSize(info.value, sidebarWidth);
    doc.textWithLink(valLines[0], sidebarX, sidebarY, { url: info.url });
    if (valLines.length > 1) {
      for (let i = 1; i < valLines.length; i++) {
        doc.text(valLines[i], sidebarX, sidebarY + i * 3.5);
      }
    }
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
      doc.setFontSize(7.5);
      const textWidth = doc.getTextWidth(skill);
      const expectedBadgeWidth = textWidth + 6 + 2.5;

      if (currentX + expectedBadgeWidth > sidebarX + sidebarWidth) {
        currentX = sidebarX;
        sidebarY += 6.5;
      }
      
      const badgeWidth = drawBadge(skill, currentX, sidebarY);
      currentX += badgeWidth;
    });
    sidebarY += 9;
  });

  let mainY = 15;
  const mainX = 80;
  const contentWidth = 115;

  drawSectionHeader(
    language === "en" ? "Experience" : "Experiencia",
    mainX,
    mainY,
  );
  mainY += 10;

  data.experience.roles.forEach((role, index) => {
    const isLast = index === data.experience.roles.length - 1;
    const roleTitleLines = doc.splitTextToSize(role.title, contentWidth - 10);
    const timelineX = mainX;
    const contentStartX = mainX + 8;

    let roleHeight = roleTitleLines.length * 5 + 6;
    role.description.forEach((item) => {
      const itemLines = doc.splitTextToSize(item, contentWidth - 14);
      roleHeight += itemLines.length * 4.5 + 2;
    });

    if (mainY + roleHeight > 280) {
      doc.addPage();
      setupPage();
      mainY = 15;
    }

    drawTimelineNode(timelineX, mainY + 1.5, roleHeight, isLast, index);

    doc.setFontSize(10.5);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "bold");
    doc.text(roleTitleLines, contentStartX, mainY + 2);
    mainY += roleTitleLines.length * 5;

    doc.setFontSize(8.5);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "bold");
    doc.text(`${role.company}  |  ${role.period}`, contentStartX, mainY + 2);
    mainY += 7;

    doc.setFontSize(8.5);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "normal");

    role.description.forEach((item) => {
      const itemLines = doc.splitTextToSize(item, contentWidth - 14);
      doc.setFillColor(...colors.accent);
      doc.circle(contentStartX + 1, mainY - 1.2, 0.6, "F");
      doc.text(itemLines, contentStartX + 5, mainY);
      mainY += itemLines.length * 5.5 + 2;
    });
    mainY += 4;
  });

  if (mainY > 220) {
    doc.addPage();
    setupPage();
    mainY = 15;
  }

  drawSectionHeader(
    language === "en" ? "Key Projects" : "Proyectos Clave",
    mainX,
    mainY,
  );
  mainY += 10;

  data.projects.items.forEach((project) => {
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    const projDescLines = doc.splitTextToSize(project.description, contentWidth - 12);
    let techLinesCount = 1;
    let currentTempX = mainX + 4;
    project.stack.forEach((tech) => {
      doc.setFontSize(7.5);
      const textWidth = doc.getTextWidth(tech);
      const expectedBadgeWidth = textWidth + 6 + 2.5 + 3.5;

      if (currentTempX + expectedBadgeWidth > mainX + contentWidth - 4) {
        currentTempX = mainX + 4;
        techLinesCount++;
      }
      currentTempX += expectedBadgeWidth;
    });

    const projectHeight = 5 + 5 + projDescLines.length * 4.5 + 3 + techLinesCount * 8.5 + 4;

    if (mainY + projectHeight > 280) {
      doc.addPage();
      setupPage();
      mainY = 15;
    }

    drawProjectCard(mainX, mainY - 4, contentWidth, projectHeight);

    doc.setFontSize(10.5);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "bold");
    doc.text(project.title, mainX + 4, mainY + 2);
    mainY += 6;

    doc.setFontSize(8);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "italic");
    doc.text(project.category, mainX + 4, mainY + 2);
    mainY += 6;

    doc.setFontSize(8.5);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "normal");
    doc.text(projDescLines, mainX + 4, mainY + 2);
    mainY += projDescLines.length * 4.5 + 3;

    let currentX = mainX + 4;
    project.stack.forEach((tech) => {
      doc.setFontSize(7.5);
      const textWidth = doc.getTextWidth(tech);
      const expectedBadgeWidth = textWidth + 6 + 2.5 + 3.5;

      if (currentX + expectedBadgeWidth > mainX + contentWidth - 4) {
        currentX = mainX + 4;
        mainY += 8.5;
      }

      const badgeWidth = drawBadge(tech, currentX, mainY + 2);
      currentX += badgeWidth + 3.5;
    });
    mainY += 15;
  });

  const fileName = `${data.hero.name.replace(/\s+/g, "_")}_CV_${language.toUpperCase()}.pdf`;
  return { buffer: doc.output("arraybuffer"), fileName };
}
