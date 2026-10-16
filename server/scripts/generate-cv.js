import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PDFDocument from 'pdfkit';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from 'docx';
import { cvData } from './cv.data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '../assets/cv');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pdfPath = path.join(outputDir, 'Vishal_Sharma_CV.pdf');
const docxPath = path.join(outputDir, 'Vishal_Sharma_CV.docx');

// --- 1. GENERATE PDF ---
async function generatePDF() {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 36, bottom: 36, left: 36, right: 36 },
      info: {
        Title: `${cvData.name} - CV`,
        Author: cvData.name,
        Subject: 'Curriculum Vitae',
      },
    });

    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    const contentWidth = 595.28 - 72; // A4 width minus margins
    const leftMargin = 36;

    // Helper: section title with divider rule
    function addSectionTitle(title) {
      doc.moveDown(0.5);
      doc
        .font('Helvetica-Bold')
        .fontSize(10.5)
        .fillColor('#166A45')
        .text(title.toUpperCase(), { tracking: 1 });
      doc
        .strokeColor('#D9D4C7')
        .lineWidth(0.75)
        .moveTo(leftMargin, doc.y + 2)
        .lineTo(leftMargin + contentWidth, doc.y + 2)
        .stroke();
      doc.moveDown(0.35);
    }

    // Name & Title
    doc
      .font('Helvetica-Bold')
      .fontSize(20)
      .fillColor('#12141A')
      .text(cvData.name, { align: 'left' });

    doc
      .font('Helvetica')
      .fontSize(11)
      .fillColor('#166A45')
      .text(cvData.role, { align: 'left' });

    // Contact line
    const contactLine = `${cvData.contact.location}  |  ${cvData.contact.email}  |  ${cvData.contact.github}  |  ${cvData.contact.linkedin}`;
    doc
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor('#4A4F5C')
      .text(contactLine, { align: 'left' });

    // Summary
    addSectionTitle('Professional Summary');
    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor('#12141A')
      .lineGap(1.5)
      .text(cvData.summary, { align: 'justify' });

    // Education
    addSectionTitle('Education');
    cvData.education.forEach((edu) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(9.5)
        .fillColor('#12141A')
        .text(edu.degree, { continued: true })
        .font('Helvetica')
        .fontSize(8.5)
        .fillColor('#4A4F5C')
        .text(`  —  ${edu.duration}`, { align: 'left' });

      doc
        .font('Helvetica')
        .fontSize(9)
        .fillColor('#4A4F5C')
        .text(`${edu.institution}  (${edu.status})`);
    });

    // Technical Skills
    addSectionTitle('Technical Skills');
    const skillsList = [
      ['Languages', cvData.skills.languages.join(', ')],
      ['Frameworks & APIs', cvData.skills.frameworksAndApis.join(', ')],
      ['Databases', cvData.skills.databases.join(', ')],
      ['Tools & Workflow', cvData.skills.toolsAndWorkflow.join(', ')],
    ];

    skillsList.forEach(([label, value]) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(8.5)
        .fillColor('#12141A')
        .text(`• ${label}: `, { continued: true })
        .font('Helvetica')
        .fillColor('#4A4F5C')
        .text(value);
    });

    // Projects
    addSectionTitle('Projects');
    cvData.projects.forEach((proj, idx) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(9.5)
        .fillColor('#12141A')
        .text(proj.name, { continued: true })
        .font('Helvetica')
        .fontSize(8.5)
        .fillColor('#166A45')
        .text(`  [${proj.tech.join(', ')}]`);

      doc
        .font('Helvetica')
        .fontSize(8.5)
        .fillColor('#4A4F5C')
        .lineGap(1)
        .text(proj.description);

      doc
        .font('Helvetica-Oblique')
        .fontSize(8)
        .fillColor('#166A45')
        .text(proj.links);

      if (idx < cvData.projects.length - 1) {
        doc.moveDown(0.25);
      }
    });

    // Competencies
    addSectionTitle('Core Competencies & Focus Areas');
    doc
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor('#12141A')
      .text(cvData.competencies.join('   •   '));

    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', reject);
  });
}

// --- 2. GENERATE DOCX ---
async function generateDOCX() {
  const borderRule = {
    bottom: {
      color: 'D9D4C7',
      space: 1,
      style: BorderStyle.SINGLE,
      size: 6,
    },
  };

  function createSectionHeading(text) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      border: borderRule,
      spacing: { before: 140, after: 60 },
      children: [
        new TextRun({
          text: text.toUpperCase(),
          bold: true,
          size: 20, // 10pt
          color: '166A45',
        }),
      ],
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 576, bottom: 576, left: 576, right: 576 }, // 0.4 in in dxa
          },
        },
        children: [
          // Header: Name
          new Paragraph({
            spacing: { before: 0, after: 20 },
            children: [
              new TextRun({
                text: cvData.name,
                bold: true,
                size: 38, // 19pt
                color: '12141A',
              }),
            ],
          }),
          // Title
          new Paragraph({
            spacing: { before: 0, after: 40 },
            children: [
              new TextRun({
                text: cvData.role,
                bold: true,
                size: 22, // 11pt
                color: '166A45',
              }),
            ],
          }),
          // Contact
          new Paragraph({
            spacing: { before: 0, after: 100 },
            children: [
              new TextRun({
                text: `${cvData.contact.location}  |  ${cvData.contact.email}  |  ${cvData.contact.github}  |  ${cvData.contact.linkedin}`,
                size: 17, // 8.5pt
                color: '4A4F5C',
              }),
            ],
          }),

          // Summary
          createSectionHeading('Professional Summary'),
          new Paragraph({
            spacing: { before: 40, after: 80 },
            children: [
              new TextRun({
                text: cvData.summary,
                size: 18, // 9pt
                color: '12141A',
              }),
            ],
          }),

          // Education
          createSectionHeading('Education'),
          new Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new TextRun({
                text: cvData.education[0].degree,
                bold: true,
                size: 19, // 9.5pt
                color: '12141A',
              }),
              new TextRun({
                text: `  —  ${cvData.education[0].duration}`,
                size: 17,
                color: '4A4F5C',
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 0, after: 80 },
            children: [
              new TextRun({
                text: `${cvData.education[0].institution} (${cvData.education[0].status})`,
                size: 18,
                color: '4A4F5C',
              }),
            ],
          }),

          // Skills
          createSectionHeading('Technical Skills'),
          ...[
            ['Languages', cvData.skills.languages.join(', ')],
            ['Frameworks & APIs', cvData.skills.frameworksAndApis.join(', ')],
            ['Databases', cvData.skills.databases.join(', ')],
            ['Tools & Workflow', cvData.skills.toolsAndWorkflow.join(', ')],
          ].map(
            ([label, val]) =>
              new Paragraph({
                spacing: { before: 20, after: 20 },
                children: [
                  new TextRun({
                    text: `• ${label}: `,
                    bold: true,
                    size: 17,
                    color: '12141A',
                  }),
                  new TextRun({
                    text: val,
                    size: 17,
                    color: '4A4F5C',
                  }),
                ],
              })
          ),

          // Projects
          createSectionHeading('Projects'),
          ...cvData.projects.flatMap((proj) => [
            new Paragraph({
              spacing: { before: 40, after: 20 },
              children: [
                new TextRun({
                  text: proj.name,
                  bold: true,
                  size: 19,
                  color: '12141A',
                }),
                new TextRun({
                  text: `  [${proj.tech.join(', ')}]`,
                  size: 17,
                  color: '166A45',
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 20 },
              children: [
                new TextRun({
                  text: proj.description,
                  size: 17,
                  color: '4A4F5C',
                }),
              ],
            }),
            new Paragraph({
              spacing: { before: 0, after: 60 },
              children: [
                new TextRun({
                  text: proj.links,
                  italics: true,
                  size: 16,
                  color: '166A45',
                }),
              ],
            }),
          ]),

          // Competencies
          createSectionHeading('Core Competencies & Focus Areas'),
          new Paragraph({
            spacing: { before: 40, after: 40 },
            children: [
              new TextRun({
                text: cvData.competencies.join('   •   '),
                size: 17,
                color: '12141A',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(docxPath, buffer);
}

async function run() {
  console.log('[cv] Generating CV in PDF and DOCX formats...');
  await generatePDF();
  console.log('[cv] PDF generated at:', pdfPath);
  await generateDOCX();
  console.log('[cv] DOCX generated at:', docxPath);
}

run().catch((err) => {
  console.error('[cv] Failed to generate CV files:', err);
  process.exit(1);
});
