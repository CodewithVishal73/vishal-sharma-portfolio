import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, '..');
const cvDir = path.join(clientRoot, 'public', 'cv');

if (!fs.existsSync(cvDir)) {
  fs.mkdirSync(cvDir, { recursive: true });
}

async function generateCV() {
  console.log('Generating starter CV files...');

  const profileMod = await import('../src/data/profile.js');
  const skillsMod = await import('../src/data/skills.js');
  const profile = profileMod.profile || profileMod.default;
  const skills = skillsMod.skills || skillsMod.default;

  // 1. Generate PDF
  const pdfPath = path.join(cvDir, 'Vishal_Sharma_CV.pdf');
  const doc = new PDFDocument({ margin: 50 });
  const pdfStream = fs.createWriteStream(pdfPath);
  doc.pipe(pdfStream);

  doc.fontSize(24).font('Helvetica-Bold').text(profile.name, { align: 'left' });
  doc.fontSize(12).font('Helvetica').text(profile.designation, { align: 'left' });
  doc.fontSize(10).text(`Location: ${profile.location} | Status: ${profile.status}`, { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica-Bold').text('Overview');
  doc.fontSize(10).font('Helvetica').text(profile.bio);
  doc.moveDown();

  doc.fontSize(14).font('Helvetica-Bold').text('Technical Focus & Skills');
  for (const layer of skills.layers || []) {
    const skillList = (layer.items || []).map((i) => `${i.name} (${i.level})`).join(', ');
    doc.fontSize(11).font('Helvetica-Bold').text(`${layer.layerName} (${layer.category})`);
    doc.fontSize(10).font('Helvetica').text(skillList);
    doc.moveDown(0.5);
  }

  doc.end();

  // 2. Generate DOCX
  const docxPath = path.join(cvDir, 'Vishal_Sharma_CV.docx');
  const docxDoc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: profile.name,
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: profile.designation, bold: true }),
              new TextRun({ text: ` | ${profile.location} | ${profile.status}` }),
            ],
          }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Overview',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({ text: profile.bio }),
          new Paragraph({ text: '' }),
          new Paragraph({
            text: 'Technical Focus & Skills',
            heading: HeadingLevel.HEADING_1,
          }),
          ...(skills.layers || []).map(
            (layer) =>
              new Paragraph({
                children: [
                  new TextRun({ text: `${layer.layerName} (${layer.category}): `, bold: true }),
                  new TextRun({
                    text: (layer.items || []).map((i) => `${i.name} (${i.level})`).join(', '),
                  }),
                ],
              })
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(docxDoc);
  fs.writeFileSync(docxPath, buffer);

  console.log(`✓ PDF CV written to: ${pdfPath}`);
  console.log(`✓ DOCX CV written to: ${docxPath}`);
}

generateCV().catch((err) => {
  console.error('Error generating CV:', err);
  process.exit(1);
});
