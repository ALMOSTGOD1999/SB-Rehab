import { z } from "zod";

export const MAX_REVIEW_WORDS = 75;

export const reviewSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(100),
  address: z.string().trim().min(1).max(250),
  rating: z.number().int().min(1).max(5),
  review: z
    .string()
    .trim()
    .min(1)
    .max(1000)
    .refine((text) => text.split(/\s+/).filter(Boolean).length <= MAX_REVIEW_WORDS),
  publicConsent: z.literal(true),
});

export type ReviewSubmission = z.infer<typeof reviewSubmissionSchema>;

export function countReviewWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}