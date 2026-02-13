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

  const colors = {
    primary: [16, 185, 129] as [number, number, number],
    accent: [52, 211, 153] as [number, number, number],
    bg: isDark ? ([18, 18, 18] as [number, number, number]) : ([255, 255, 255] as [number, number, number]),
    text: isDark ? ([244, 244, 245] as [number, number, number]) : ([24, 24, 27] as [number, number, number]),
    textSecondary: isDark ? ([161, 161, 170] as [number, number, number]) : ([113, 113, 122] as [number, number, number]),
  };

  if (isDark) {
    doc.setFillColor(...colors.bg);
    doc.rect(0, 0, 210, 297, "F");
  }

  let yPosition = 25;

  const drawSectionDivider = (y: number) => {
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y);
  };

  doc.setFontSize(32);
  doc.setTextColor(...colors.primary);
  doc.setFont("helvetica", "bold");
  doc.text(data.hero.name, 20, yPosition);

  yPosition += 10;
  doc.setFontSize(16);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "normal");
  doc.text(data.hero.title, 20, yPosition);

  yPosition += 8;
  doc.setFontSize(9);
  doc.setTextColor(...colors.textSecondary);
  doc.text(data.footer.email, 20, yPosition);
  doc.text(`${data.footer.github}  |  ${data.footer.linkedin}`, 20, yPosition + 4);

  yPosition += 12;
  drawSectionDivider(yPosition);
  yPosition += 8;

  doc.setFontSize(12);
  doc.setTextColor(...colors.primary);
  doc.setFont("helvetica", "bold");
  doc.text(language === "en" ? "PROFESSIONAL SUMMARY" : "RESUMEN PROFESIONAL", 20, yPosition);
  
  yPosition += 6;
  doc.setFontSize(9.5);
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica", "normal");
  const summaryLines = doc.splitTextToSize(data.hero.subtitle, 170);
  doc.text(summaryLines, 20, yPosition);
  yPosition += summaryLines.length * 5 + 6;

  drawSectionDivider(yPosition);
  yPosition += 8;

  doc.setFontSize(12);
  doc.setTextColor(...colors.primary);
  doc.setFont("helvetica", "bold");
  doc.text(
    language === "en" ? "CORE COMPETENCIES" : "COMPETENCIAS PRINCIPALES",
    20,
    yPosition
  );
  yPosition += 6;

  data.focus.areas.forEach((area) => {
    doc.setFontSize(10);
    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    
    doc.setFillColor(...colors.primary);
    doc.circle(17, yPosition - 1.5, 1.2, "F");
    
    doc.text(area.title, 22, yPosition);
    yPosition += 5;

    doc.setFontSize(9);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(area.description, 168);
    doc.text(descLines, 22, yPosition);
    yPosition += descLines.length * 4.5 + 4;
  });

  yPosition += 2;
  drawSectionDivider(yPosition);
  yPosition += 8;

  doc.setFontSize(12);
  doc.setTextColor(...colors.primary);
  doc.setFont("helvetica", "bold");
  doc.text(
    language === "en" ? "TECHNICAL SKILLS" : "HABILIDADES TÉCNICAS",
    20,
    yPosition
  );
  yPosition += 6;

  data.techStack.categories.forEach((category) => {
    doc.setFontSize(10);
    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(`${category.name}`, 20, yPosition);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...colors.text);
    const skillsText = category.items.join("  •  ");
    const skillLines = doc.splitTextToSize(skillsText, 170);
    doc.text(skillLines, 20, yPosition + 4);
    yPosition += 4 + skillLines.length * 4.5 + 3;
  });

  if (yPosition > 250) {
    doc.addPage();
    if (isDark) {
      doc.setFillColor(...colors.bg);
      doc.rect(0, 0, 210, 297, "F");
    }
    yPosition = 20;
  } else {
    yPosition += 2;
  }

  drawSectionDivider(yPosition);
  yPosition += 8;

  doc.setFontSize(12);
  doc.setTextColor(...colors.primary);
  doc.setFont("helvetica", "bold");
  doc.text(
    language === "en" ? "PROFESSIONAL EXPERIENCE" : "EXPERIENCIA PROFESIONAL",
    20,
    yPosition
  );
  yPosition += 6;

  data.experience.roles.forEach((role) => {
    const estimatedHeight = 20 + (role.description.length * 10);
    
    if (yPosition + estimatedHeight > 275) {
      doc.addPage();
      if (isDark) {
        doc.setFillColor(...colors.bg);
        doc.rect(0, 0, 210, 297, "F");
      }
      yPosition = 20;
    }

    doc.setFontSize(11);
    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(role.title, 20, yPosition);
    
    yPosition += 5;
    doc.setFontSize(9.5);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "italic");
    doc.text(`${role.company}  |  ${role.period}`, 20, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(...colors.text);
    doc.setFont("helvetica", "normal");
    
    role.description.forEach((item) => {
      const itemLines = doc.splitTextToSize(item, 165);
      
      if (yPosition + itemLines.length * 4.5 > 280) {
        doc.addPage();
        if (isDark) {
          doc.setFillColor(...colors.bg);
          doc.rect(0, 0, 210, 297, "F");
        }
        yPosition = 20;
      }
      
      doc.setFillColor(...colors.primary);
      doc.circle(17, yPosition - 1, 0.8, "F");
      
      doc.text(itemLines, 22, yPosition);
      yPosition += itemLines.length * 4.5 + 2;
    });

    yPosition += 4;
  });

  if (yPosition > 230) {
    doc.addPage();
    if (isDark) {
      doc.setFillColor(...colors.bg);
      doc.rect(0, 0, 210, 297, "F");
    }
    yPosition = 20;
  } else {
    yPosition += 2;
  }

  drawSectionDivider(yPosition);
  yPosition += 8;

  doc.setFontSize(12);
  doc.setTextColor(...colors.primary);
  doc.setFont("helvetica", "bold");
  doc.text(
    language === "en" ? "KEY CLIENT PROJECTS" : "PROYECTOS CLAVE DE CLIENTES",
    20,
    yPosition
  );
  yPosition += 6;

  data.projects.items.forEach((project) => {
    const estimatedHeight = 30;
    
    if (yPosition + estimatedHeight > 270) {
      doc.addPage();
      if (isDark) {
        doc.setFillColor(...colors.bg);
        doc.rect(0, 0, 210, 297, "F");
      }
      yPosition = 20;
    }

    doc.setFontSize(10.5);
    doc.setTextColor(...colors.accent);
    doc.setFont("helvetica", "bold");
    doc.text(project.title, 20, yPosition);
    
    yPosition += 4.5;
    doc.setFontSize(9);
    doc.setTextColor(...colors.primary);
    doc.setFont("helvetica", "italic");
    doc.text(project.category, 20, yPosition);
    
    yPosition += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...colors.text);
    const projDescLines = doc.splitTextToSize(project.description, 170);
    doc.text(projDescLines, 20, yPosition);
    yPosition += projDescLines.length * 4.5 + 3;

    doc.setFontSize(8.5);
    doc.setTextColor(...colors.textSecondary);
    doc.setFont("helvetica", "bold");
    const techText = `${language === "en" ? "Tech Stack" : "Stack Técnico"}: `;
    doc.text(techText, 20, yPosition);
    
    const techWidth = doc.getTextWidth(techText);
    doc.setFont("helvetica", "normal");
    doc.text(project.stack.join("  •  "), 20 + techWidth, yPosition);
    yPosition += 7;
  });

  const fileName = `${data.hero.name.replace(/\s+/g, "_")}_CV_${language.toUpperCase()}.pdf`;
  doc.save(fileName);
}
