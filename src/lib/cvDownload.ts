export type Language = "en" | "es";

interface DownloadableCvFile {
  language: Language;
  href: string;
  filename: string;
}

const downloadableCvFiles: Record<Language, DownloadableCvFile> = {
  en: {
    language: "en",
    href: "/cv/zozimo-fernandez-cv-en.pdf",
    filename: "Zozimo_Fernandez_CV_EN.pdf",
  },
  es: {
    language: "es",
    href: "/cv/zozimo-fernandez-cv-es.pdf",
    filename: "Zozimo_Fernandez_CV_ES.pdf",
  },
};

export function getCvFile(language: Language): DownloadableCvFile {
  return downloadableCvFiles[language] ?? downloadableCvFiles.en;
}

export function downloadCvFile(language: Language): void {
  const file = getCvFile(language);
  const anchor = document.createElement("a");
  anchor.href = file.href;
  anchor.download = file.filename;
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}
