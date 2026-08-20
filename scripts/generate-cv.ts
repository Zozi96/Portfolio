import fs from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';
import type { Content } from '../src/data/content';
import { content } from '../src/data/content';
import { ATSDocument } from '../src/components/cv/ATSDocument';
import { CVDocument } from '../src/components/cv/CVDocument';

type Language = 'en' | 'es';

interface CvComponentProps {
  data: Content;
  language: Language;
}

async function writePdf(
  Component: React.ComponentType<CvComponentProps>,
  props: CvComponentProps,
  output: string,
) {
  const element = React.createElement(Component, props) as React.ReactElement<DocumentProps>;
  const blob = await pdf(element).toBlob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  await fs.writeFile(output, buffer);
  console.log(`written ${output} (${buffer.length} bytes)`);
}

async function main() {
  for (const language of ['en', 'es'] as const) {
    const data = content[language];

    // ATS-optimized CV — default download for every "Download CV" CTA.
    await writePdf(
      ATSDocument,
      { data, language },
      path.resolve('public/cv', `zozimo-fernandez-cv-${language}.pdf`),
    );

    // Styled CV — linked from the footer only.
    await writePdf(
      CVDocument,
      { data, language },
      path.resolve('public/cv', `zozimo-fernandez-cv-${language}-styled.pdf`),
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
