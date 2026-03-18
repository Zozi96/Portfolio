import { pdf } from "@react-pdf/renderer";
import React from "react";
import { CVDocument } from "../components/cv/CVDocument";
import { content } from "../data/content";

export type Language = "en" | "es";

export interface CVResult {
  buffer: ArrayBuffer;
  fileName: string;
}

interface CVGeneratorOptions {
  language: Language;
}

/**
 * Generates a CV PDF using react-pdf components.
 * This function is designed to run in a Web Worker.
 */
export async function generateCV({ language }: CVGeneratorOptions): Promise<CVResult> {
  const data = content[language];
  
  // Create the PDF blob
  const blob = await pdf(
    React.createElement(CVDocument, { data, language })
  ).toBlob();

  // Convert blob to ArrayBuffer for transferability between worker and main thread
  const buffer = await blob.arrayBuffer();

  const fileName = `${data.hero.name.replace(/\s+/g, "_")}_CV_${language.toUpperCase()}.pdf`;

  return { buffer, fileName };
}
