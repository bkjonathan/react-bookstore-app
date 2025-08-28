import { z } from 'zod';

const objectIdRegex = /^[a-f\d]{24}$/i;

export const RegisterSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const MeQuerySchema = z.object({
  userId: z.string().regex(objectIdRegex, 'Invalid user id'),
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
