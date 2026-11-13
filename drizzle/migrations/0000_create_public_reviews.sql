CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  rating integer NOT NULL,
  review text NOT NULL,
  public_consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT reviews_name_length CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
  CONSTRAINT reviews_address_length CHECK (char_length(btrim(address)) BETWEEN 1 AND 250),
  CONSTRAINT reviews_rating_range CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT reviews_text_length CHECK (char_length(btrim(review)) BETWEEN 1 AND 1000),
  CONSTRAINT reviews_word_limit CHECK (cardinality(regexp_split_to_array(btrim(review), '[[:space:]]+')) <= 75),
  CONSTRAINT reviews_public_consent_required CHECK (public_consent IS TRUE)
);
GRANT SELECT, INSERT ON public.reviews TO anon, authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read public reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Visitors can submit consented reviews" ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (public_consent IS TRUE);