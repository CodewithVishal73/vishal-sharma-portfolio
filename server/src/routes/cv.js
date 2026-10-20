import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve authentic CV file from known locations
function resolveCvPath(filename) {
  const candidateDirs = [
    path.resolve(__dirname, '../../assets/cv'),
    path.resolve(__dirname, '../../../client/public'),
    path.resolve(process.cwd(), 'server/assets/cv'),
    path.resolve(process.cwd(), 'assets/cv'),
    path.resolve(process.cwd(), 'client/public'),
  ];

  for (const dir of candidateDirs) {
    const fullPath = path.join(dir, filename);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

// GET /api/cv/pdf
router.get('/pdf', (req, res, next) => {
  const filePath = resolveCvPath('Vishal_Sharma_CV.pdf');

  if (!filePath) {
    return res.status(404).json({
      ok: false,
      error: {
        code: 'CV_NOT_FOUND',
        message: 'Authoritative CV PDF file not found on server.',
      },
    });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.download(filePath, 'Vishal_Sharma_CV.pdf', (err) => {
    if (err && !res.headersSent) {
      next(err);
    }
  });
});

// GET /api/cv/docx
router.get('/docx', (req, res, next) => {
  const filePath = resolveCvPath('Vishal_Sharma_CV.docx');

  if (!filePath) {
    return res.status(404).json({
      ok: false,
      error: {
        code: 'CV_NOT_FOUND',
        message: 'Authoritative CV DOCX file not found on server.',
      },
    });
  }

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.download(filePath, 'Vishal_Sharma_CV.docx', (err) => {
    if (err && !res.headersSent) {
      next(err);
    }
  });
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
