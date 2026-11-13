import { describe, expect, it } from "vitest";
import { countReviewWords, reviewSubmissionSchema } from "@/lib/reviews";

const validReview = {
  name: "A visitor",
  address: "Berhampore",
  rating: 5,
  review: "Helpful support from the team.",
  publicConsent: true as const,
};

describe("public review validation", () => {
  it("accepts a review of exactly 75 words and rejects 76", () => {
    const seventyFiveWords = Array.from({ length: 75 }, () => "care").join(" ");
    const seventySixWords = `${seventyFiveWords} more`;

    expect(countReviewWords(seventyFiveWords)).toBe(75);
    expect(reviewSubmissionSchema.safeParse({ ...validReview, review: seventyFiveWords }).success).toBe(true);
    expect(countReviewWords(seventySixWords)).toBe(76);
    expect(reviewSubmissionSchema.safeParse({ ...validReview, review: seventySixWords }).success).toBe(false);
  });

  it.each([1, 5])("accepts the %i-star rating boundary", (rating) => {
    expect(reviewSubmissionSchema.safeParse({ ...validReview, rating }).success).toBe(true);
  });

  it.each([0, 6])("rejects a rating outside 1–5: %i", (rating) => {
    expect(reviewSubmissionSchema.safeParse({ ...validReview, rating }).success).toBe(false);
  });

  it("requires consent to publish name, address, and review", () => {
    expect(
      reviewSubmissionSchema.safeParse({ ...validReview, publicConsent: false }).success,
    ).toBe(false);
  });
});