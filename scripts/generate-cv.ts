import fs from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { content } from '../src/data/content';
import { CVDocument } from '../src/components/cv/CVDocument';

async function main() {
  for (const language of ['en', 'es'] as const) {
    const data = content[language];
    const blob = await pdf(React.createElement(CVDocument, { data, language })).toBlob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    const output = path.resolve('public/cv', `zozimo-fernandez-cv-${language}.pdf`);
    await fs.writeFile(output, buffer);
    console.log(`written ${output} (${buffer.length} bytes)`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
