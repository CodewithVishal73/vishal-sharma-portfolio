import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cvDir = path.resolve(__dirname, '../../assets/cv');

// GET /api/cv/pdf
router.get('/pdf', (req, res) => {
  const filePath = path.join(cvDir, 'Vishal_Sharma_CV.pdf');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      ok: false,
      error: {
        code: 'CV_NOT_FOUND',
        message: 'CV PDF file not found on server.',
      },
    });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Disposition', 'attachment; filename="Vishal_Sharma_CV.pdf"');
  res.download(filePath, 'Vishal_Sharma_CV.pdf');
});

// GET /api/cv/docx
router.get('/docx', (req, res) => {
  const filePath = path.join(cvDir, 'Vishal_Sharma_CV.docx');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      ok: false,
      error: {
        code: 'CV_NOT_FOUND',
        message: 'CV DOCX file not found on server.',
      },
    });
  }

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Disposition', 'attachment; filename="Vishal_Sharma_CV.docx"');
  res.download(filePath, 'Vishal_Sharma_CV.docx');
});

// Catch-all for unsupported CV routes/formats
router.all('*', (req, res) => {
  res.status(404).json({
    ok: false,
    error: {
      code: 'CV_NOT_FOUND',
      message: 'Unsupported CV format requested. Supported formats: pdf, docx',
    },
  });
});

export default router;
