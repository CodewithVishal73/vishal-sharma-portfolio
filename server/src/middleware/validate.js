import { z } from 'zod';

function stripControlChars(str) {
  if (typeof str !== 'string') return '';
  // Strip control characters except newline and tab
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

const contactSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .transform((val) => stripControlChars(val).trim())
    .refine((val) => val.length >= 2, { message: 'Name must be at least 2 characters' })
    .refine((val) => val.length <= 80, { message: 'Name cannot exceed 80 characters' }),
  email: z
    .string({ required_error: 'Email is required' })
    .transform((val) => val.trim().toLowerCase())
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), { message: 'Invalid email address' }),
  message: z
    .string({ required_error: 'Message is required' })
    .transform((val) => stripControlChars(val).trim())
    .refine((val) => val.length >= 10, { message: 'Message must be at least 10 characters' })
    .refine((val) => val.length <= 2000, { message: 'Message cannot exceed 2000 characters' }),
  website: z.string().optional(),
});

export const validateContact = (req, res, next) => {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    const fields = {};
    for (const issue of result.error.issues) {
      const fieldName = issue.path[0] || 'general';
      if (!fields[fieldName]) {
        fields[fieldName] = issue.message;
      }
    }
    return res.status(400).json({
      ok: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        fields,
      },
    });
  }

  req.validatedBody = result.data;
  next();
};
