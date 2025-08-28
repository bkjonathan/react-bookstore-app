import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const CreateBookSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  caption: z.string().trim().optional().default(''),
  image: z.string().url('image must be a valid URL').optional().or(z.literal('')),
  rating: z
    .number({ invalid_type_error: 'rating must be a number' })
    .min(0, 'rating must be between 0 and 5')
    .max(5, 'rating must be between 0 and 5')
    .optional()
    .default(0),
});

export const UpdateBookSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    caption: z.string().trim().optional(),
    image: z.string().url('image must be a valid URL').optional().or(z.literal('')),
    rating: z.number().min(0).max(5).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
    path: [],
  });

export const ListQuerySchema = z
  .object({
    page: z
      .string()
      .optional()
      .transform((v) => (v === undefined ? undefined : Number(v)))
      .refine((v) => v === undefined || (Number.isInteger(v) && v > 0), 'page must be a positive integer'),
    limit: z
      .string()
      .optional()
      .transform((v) => (v === undefined ? undefined : Number(v)))
      .refine((v) => v === undefined || (Number.isInteger(v) && v > 0 && v <= 100), 'limit must be 1..100'),
  })
  .transform((q) => ({
    page: q.page ?? 1,
    limit: q.limit ?? 20,
  }));

export const IdParamSchema = z.object({ id: z.string().regex(objectIdRegex, 'Invalid id') });
