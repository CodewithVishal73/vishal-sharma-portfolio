import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cvDir = path.resolve(__dirname, '../../assets/cv');

router.get('/pdf', (req, res) => {
  const filePath = path.join(cvDir, 'Vishal_Sharma_CV.pdf');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      ok: false,
      error: {
        code: 'NOT_FOUND',
        message: 'CV PDF file not found',
      },
    });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.download(filePath, 'Vishal_Sharma_CV.pdf');
});

router.get('/docx', (req, res) => {
  const filePath = path.join(cvDir, 'Vishal_Sharma_CV.docx');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      ok: false,
      error: {
        code: 'NOT_FOUND',
        message: 'CV DOCX file not found',
      },
    });
  }

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  res.download(filePath, 'Vishal_Sharma_CV.docx');
});

export default router;
