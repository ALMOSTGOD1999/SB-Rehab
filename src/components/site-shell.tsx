import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Clock3,
  Facebook,
  Heart,
  HandHeart,
  MapPin,
  Menu,
  MessageCircle,
  Puzzle,
  Phone,
  Smile,
  Star,
  X,
} from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { countReviewWords, reviewSubmissionSchema, type ReviewSubmission } from "@/lib/reviews";
import therapyRoom from "@/assets/sb-rehab-therapy.jpg";
import gallerySensoryRoom from "@/assets/gallery-sensory-room.jpg";
import gallerySpeechSession from "@/assets/gallery-speech-session.jpg";
import galleryLearningCorner from "@/assets/gallery-learning-corner.jpg";
import galleryReception from "@/assets/gallery-reception.jpg";

type SitePath = "/" | "/about" | "/services" | "/team" | "/stories" | "/gallery" | "/contact";

const navigation: { label: string; to: SitePath }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Therapies", to: "/services" },
  { label: "Our approach", to: "/team" },
  { label: "Gallery", to: "/gallery" },
  { label: "For families", to: "/stories" },
  { label: "Contact", to: "/contact" },
];

export const centreAddress =
  "Maankumari Rd, between Swarnamoye and Sriguru Pathshala road, near Murshidabad Medical College and Hospital, Berhampore, West Bengal 742101, India";

export const centreMapUrl = "https://www.google.com/maps?q=24.0819012,88.2555541&z=17&hl=en";

const phoneListings = [
  { display: "+91 99385 49104", tel: "+919938549104" },
  { display: "+91 82496 24162", tel: "+918249624162" },
];

const facebookUrl = "https://www.facebook.com/p/SB-REHAB-Centre-61560863715301/";

export function CentreMark({ small = false }: { small?: boolean }) {
  return (
    <Link to="/" className="brand-lockup" aria-label="SB REHAB CENTRE home">
      <span className={`brand-symbol${small ? " brand-symbol-small" : ""}`} aria-hidden="true">
        <span>SB</span>
        <i />
      </span>
      <span className="brand-name">
        <strong>SB REHAB</strong>
        <span>CENTRE</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <div className="topline hidden sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <span className="flex items-center gap-2"><MapPin size={14} /> Berhampore, West Bengal</span>
          <a href={facebookUrl} target="_blank" rel="noreferrer" className="topline-link">
            Find us on Facebook <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between sm:px-6">
          <CentreMark />
          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {navigation.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link${pathname === to ? " nav-link-active" : ""}`}
                aria-current={pathname === to ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden h-10 rounded-full px-5 sm:inline-flex">
              <Link to="/contact">Get in touch <ArrowRight size={15} /></Link>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-10 rounded-full border-border lg:hidden"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {mobileOpen && (
          <nav aria-label="Mobile navigation" className="mobile-nav lg:hidden">
            {navigation.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`mobile-nav-link${pathname === to ? " mobile-nav-link-active" : ""}`}
                aria-current={pathname === to ? "page" : undefined}
              >
                {label}<ArrowRight size={15} />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_1fr]">
          <div>
            <CentreMark />
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
              A local centre for therapy and learning support in Berhampore. Get in touch to ask about current services and availability.
            </p>
          </div>
          <div>
            <h2 className="footer-heading">Explore</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
              {navigation.slice(1).map(({ label, to }) => (
                <Link key={to} to={to} className="footer-link">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="footer-heading">Visit the centre</h2>
            <a href={centreMapUrl} target="_blank" rel="noreferrer" className="footer-link mt-4 flex items-start gap-2 leading-6">
              <MapPin size={16} className="mt-1 shrink-0 text-primary" />
              <span>{centreAddress}</span>
            </a>
            <a href={facebookUrl} target="_blank" rel="noreferrer" className="footer-link mt-4 inline-flex items-center gap-2">
              <Facebook size={16} /> Facebook <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
          Independently listed contact details and timings may change. Please confirm before visiting.
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children, current }: { children: ReactNode; current?: "home" }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      {current === "home" && <WelcomeAnimation />}
      <SiteFooter />
    </>
  );
}

const therapies = [
  {
    title: "Physiotherapy",
    note: "Movement, mobility and physical rehabilitation.",
    icon: Activity,
    number: "01",
  },
  {
    title: "Occupational Therapy",
    note: "Support with everyday activities and participation.",
    icon: HandHeart,
    number: "02",
  },
  {
    title: "Speech Therapy",
    note: "Communication and speech-language support.",
    icon: MessageCircle,
    number: "03",
  },
  {
    title: "Special Education",
    note: "Individualised support for learning and development.",
    icon: Brain,
    number: "04",
  },
  {
    title: "Sensory Integration Therapy",
    note: "Support for engaging with sensory experiences.",
    icon: Puzzle,
    number: "05",
  },
  {
    title: "Behavioral Therapy",
    note: "Positive support for behaviour, emotions and daily routines.",
    icon: Smile,
    number: "06",
  },
];

const proofPoints = [
  { icon: Heart, title: "People first", text: "Thoughtful support starts by listening to the person and their family." },
  { icon: HandHeart, title: "Everyday focus", text: "Therapy is connected to the activities and moments that matter day to day." },
  { icon: Activity, title: "Many ways to grow", text: "Different disciplines can support different parts of each person’s journey." },
];

export function HomePage() {
  return (
    <SiteLayout current="home">
      <section className="home-hero">
        <div className="home-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> CARE THAT MEETS YOU WHERE YOU ARE</div>
          <h1>Support for every <span>step forward.</span></h1>
          <p className="home-lead">
            Physiotherapy, occupational therapy, speech therapy and more, in a welcoming centre in Berhampore.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild className="h-12 rounded-full px-6">
              <Link to="/services">Explore therapies <ArrowRight size={16} /></Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-border bg-background/70 px-6">
              <Link to="/contact">Visit the centre</Link>
            </Button>
          </div>
          <div className="hero-trust-line">
            <MapPin size={16} /> <span>Local care, right here in Berhampore</span>
          </div>
        </div>
        <div className="home-photo-wrap">
          <img
            src={therapyRoom}
            alt="A child practising supported movement with a therapist while a family member watches nearby"
            width={1536}
            height={1024}
            fetchPriority="high"
            className="home-photo"
          />
          <div className="photo-caption"><span className="photo-caption-icon"><Heart size={18} /></span><span><strong>Growing at your own pace</strong><small>Therapy and support for real life</small></span></div>
          <span className="photo-index">BERHAMPORE · WEST BENGAL</span>
        </div>
      </section>

      <section className="therapy-teaser section-wrap">
        <div className="section-heading-row">
          <div><p className="eyebrow">SUPPORT UNDER ONE ROOF</p><h2 className="section-title">Different needs.<br /><span>Thoughtful support.</span></h2></div>
          <Button asChild variant="outline" className="hidden rounded-full sm:inline-flex">
            <Link to="/services">View all therapies <ArrowRight size={15} /></Link>
          </Button>
        </div>
        <div className="therapy-teaser-grid">
          {therapies.map(({ title, icon: Icon, number }) => (
            <Link key={title} to="/services" className="therapy-teaser-item">
              <span className="therapy-number">{number}</span>
              <span className="therapy-icon"><Icon size={21} strokeWidth={1.8} /></span>
              <span className="therapy-item-title">{title}</span>
              <ArrowUpRight className="therapy-item-arrow" size={18} />
            </Link>
          ))}
        </div>
        <Button asChild variant="link" className="mt-6 px-0 text-primary sm:hidden">
          <Link to="/services">View all therapies <ArrowRight size={15} /></Link>
        </Button>
      </section>

      <section className="approach-band">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20 lg:py-24">
          <div>
            <p className="eyebrow">A PLACE TO BEGIN</p>
            <h2 className="section-title">Progress looks different for everyone.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">A good first step is a conversation: tell us what you’re looking for and ask which support may be available.</p>
            <Button asChild className="mt-7 h-11 rounded-full px-5">
              <Link to="/about">Get to know us <ArrowRight size={15} /></Link>
            </Button>
          </div>
          <div className="proof-list">
            {proofPoints.map(({ icon: Icon, title, text }, index) => (
              <div className="proof-item" key={title}>
                <span className="proof-number">0{index + 1}</span>
                <span className="proof-icon"><Icon size={20} /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
                <ArrowUpRight className="proof-arrow" size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="visit-band">
        <div className="mx-auto grid max-w-7xl items-center gap-7 px-5 py-12 sm:px-6 md:grid-cols-[1fr_auto] lg:py-16">
          <div><p className="eyebrow">YOUR NEXT STEP</p><h2 className="section-title">Let’s start with a hello.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Find the centre in Berhampore, or get in touch to ask about services and availability.</p></div>
          <Button asChild className="h-12 rounded-full px-6"><Link to="/contact">Contact the centre <ArrowRight size={16} /></Link></Button>
        </div>
      </section>
    </SiteLayout>
  );
}

type PublicReview = {
  id: string;
  name: string;
  address: string;
  rating: number;
  review: string;
  created_at: string;
};

const emptyReview: ReviewSubmission = {
  name: "",
  address: "",
  rating: 0,
  review: "",
  publicConsent: false as never,
};

function ReviewsSection() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [form, setForm] = useState({ name: "", address: "", rating: 0, review: "", publicConsent: false });
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const reviewWordCount = countReviewWords(form.review);

  useEffect(() => {
    let active = true;

    const loadReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, name, address, rating, review, created_at")
        .order("created_at", { ascending: false })
        .limit(6);

      if (!active) return;
      if (error) {
        setFeedback("Visitor reviews are temporarily unavailable.");
      } else {
        setReviews(data ?? []);
      }
      setLoading(false);
    };

    void loadReviews();
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback("");

    const parsed = reviewSubmissionSchema.safeParse(form);
    if (!parsed.success) {
      setFeedback("Please complete every field, choose a 1–5 star rating, agree to public display, and keep your review within 75 words.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      name: parsed.data.name,
      address: parsed.data.address,
      rating: parsed.data.rating,
      review: parsed.data.review,
      public_consent: true,
    });

    if (error) {
      setFeedback("Your review could not be submitted right now. Please try again.");
      setSubmitting(false);
      return;
    }

    setReviews((current) => [
      {
        id: `new-${Date.now()}`,
        name: parsed.data.name,
        address: parsed.data.address,
        rating: parsed.data.rating,
        review: parsed.data.review,
        created_at: new Date().toISOString(),
      },
      ...current,
    ].slice(0, 6));
    setForm({ name: "", address: "", rating: 0, review: "", publicConsent: false });
    setFeedback("Thank you. Your rating and review are now public.");
    setSubmitting(false);
  };

  return (
    <section className="reviews-band" aria-labelledby="reviews-heading">
      <div className="reviews-inner">
        <div className="reviews-intro">
          <p className="eyebrow">VISITOR VOICES</p>
          <h2 id="reviews-heading" className="section-title">Your experience <span>matters.</span></h2>
          <p className="reviews-lead">Share a rating and a few words about your visit.</p>
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="review-field">
              <Label htmlFor="review-name">Your name</Label>
              <Input id="review-name" autoComplete="name" maxLength={100} required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
            </div>
            <div className="review-field">
              <Label htmlFor="review-address">Your address</Label>
              <Input id="review-address" autoComplete="street-address" maxLength={250} required value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} />
            </div>
            <fieldset className="review-field review-star-field">
              <legend>Your rating</legend>
              <div className="review-star-picker" role="radiogroup" aria-label="Choose a rating from 1 to 5 stars">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`review-star-button${form.rating >= rating ? " review-star-selected" : ""}`}
                    role="radio"
                    aria-checked={form.rating === rating}
                    aria-label={`${rating} ${rating === 1 ? "star" : "stars"}`}
                    onClick={() => setForm((current) => ({ ...current, rating }))}
                  >
                    <Star fill="currentColor" />
                  </Button>
                ))}
              </div>
            </fieldset>
            <div className="review-field">
              <Label htmlFor="review-text">Your review</Label>
              <Textarea
                id="review-text"
                required
                maxLength={1000}
                rows={4}
                value={form.review}
                aria-describedby="review-word-count"
                onChange={(event) => setForm((current) => ({ ...current, review: event.target.value }))}
              />
              <p id="review-word-count" className={`review-word-count${reviewWordCount > 75 ? " review-word-count-over" : ""}`} aria-live="polite">
                {reviewWordCount} / 75 words
              </p>
            </div>
            <div className="review-consent-row">
              <Checkbox
                id="review-public-consent"
                checked={form.publicConsent}
                onCheckedChange={(checked) => setForm((current) => ({ ...current, publicConsent: checked === true }))}
              />
              <Label htmlFor="review-public-consent">I agree to show my name, address, rating, and review publicly.</Label>
            </div>
            <Button type="submit" disabled={submitting} className="h-11 rounded-full px-5">
              {submitting ? "Submitting…" : "Submit rating & review"}
            </Button>
            {feedback && <p className="review-feedback" role="status">{feedback}</p>}
          </form>
        </div>

        <div className="reviews-list" aria-label="Recent visitor reviews">
          <div className="reviews-list-heading">
            <h3>Recent reviews</h3>
            {reviews.length > 0 && <span>{reviews.length} shown</span>}
          </div>
          {loading ? (
            <p className="reviews-empty" role="status">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p className="reviews-empty">No reviews yet. You can be the first to share your experience.</p>
          ) : (
            <div className="reviews-items">
              {reviews.map((review) => (
                <article className="review-item" key={review.id}>
                  <div className="review-item-stars" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: review.rating }, (_, index) => <Star key={index} fill="currentColor" aria-hidden="true" />)}
                  </div>
                  <p className="review-item-text">{review.review}</p>
                  <p className="review-item-author">{review.name}</p>
                  <p className="review-item-address">{review.address}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <SiteLayout>
      <PageIntro label="ABOUT THE CENTRE" title={<>A local place for <span>care and learning.</span></>} description="SB REHAB CENTRE brings together therapy and learning support for people and families in Berhampore." />
      <section className="inner-section mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="about-photo-wrap"><img src={therapyRoom} alt="A therapist supporting a child's movement practice in a bright room" loading="lazy" width={1536} height={1024} /><span>SUPPORT FOR PEOPLE AND FAMILIES</span></div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">OUR PURPOSE</p><h2 className="section-title">Care shaped around real life.</h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground">Finding the right support can feel like a big step. The centre brings different therapy disciplines together in one local place, so families can start by asking questions and learning what may be available.</p>
          <div className="about-note"><Heart size={19} /><p>Every person’s needs are different. Please speak with a qualified clinician about what is right for you.</p></div>
          <Button asChild className="mt-6 h-11 w-fit rounded-full px-5"><Link to="/services">Meet the therapies <ArrowRight size={15} /></Link></Button>
        </div>
      </section>
      <section className="approach-band mt-16"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
        <p className="eyebrow">WHAT GUIDES US</p><h2 className="section-title max-w-xl">A more human way to begin.</h2>
        <div className="values-grid mt-9">{proofPoints.map(({ icon: Icon, title, text }) => <article key={title} className="value-item"><Icon size={22} /><h3>{title}</h3><p>{text}</p></article>)}</div>
      </div></section>
      <section className="team-section mt-16"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
        <p className="eyebrow">OUR TEAM</p><h2 className="section-title max-w-xl">The people behind the support.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Different specialists work side by side at the centre, so your questions can be answered by the right person. Ask us who would be part of your or your child's sessions.</p>
        <div className="team-grid mt-10">
          {therapies.map(({ title, note, icon: Icon, number }) => (
            <article className="team-card" key={title}>
              <span className="team-card-top"><span className="therapy-icon"><Icon size={20} strokeWidth={1.8} /></span><span className="therapy-number">{number}</span></span>
              <h3>{title}</h3>
              <p>{note}</p>
            </article>
          ))}
        </div>
        <p className="team-note"><Heart size={17} /> Individual team member profiles are being prepared. Public directory reviews mention Dr. Soumya among the centre's clinicians; please contact the centre to know who would be involved in your care.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="h-11 rounded-full px-5"><Link to="/contact">Ask about the team <ArrowRight size={15} /></Link></Button>
          <Button asChild variant="outline" className="h-11 rounded-full border-border"><Link to="/gallery">See the centre <ArrowRight size={15} /></Link></Button>
        </div>
      </div></section>
      <ContactBand />
    </SiteLayout>
  );
}

export function ServicesPage() {
  return (
    <SiteLayout>
      <PageIntro label="OUR THERAPIES" title={<>Different ways to <span>find support.</span></>} description="The centre is publicly listed as offering these therapy and education services. Contact the team to confirm current availability and the right next step." />
      <section className="service-list mx-auto max-w-7xl px-5 sm:px-6">
        {therapies.map(({ title, note, icon: Icon, number }, index) => (
          <article key={title} className="service-row">
            <span className="service-row-number">{number}</span>
            <span className={`service-symbol service-symbol-${index + 1}`}><Icon size={26} strokeWidth={1.7} /></span>
            <div className="service-row-copy"><h2>{title}</h2><p>{note}</p></div>
            <Link to="/contact" aria-label={`Ask about ${title}`} className="service-row-action"><ArrowRight size={20} /></Link>
          </article>
        ))}
      </section>
      <section className="clinical-note mx-auto max-w-7xl px-5 sm:px-6"><span><Heart size={18} /></span><p>Services and availability can change. Please speak with the centre to check current offerings; a clinician can advise whether a particular therapy may suit your needs.</p></section>
      <ContactBand />
    </SiteLayout>
  );
}

export function TeamPage() {
  return (
    <SiteLayout>
      <PageIntro label="OUR APPROACH" title={<>Good support starts <span>with listening.</span></>} description="A thoughtful introduction to the people and questions that can be part of your care." />
      <section className="inner-section mx-auto max-w-7xl px-5 sm:px-6">
        <div className="approach-feature">
          <div className="approach-feature-art"><span className="approach-circle"><Heart size={42} strokeWidth={1.4} /></span><span className="approach-art-label">A PERSON-CENTRED APPROACH</span></div>
          <div className="approach-feature-copy"><p className="eyebrow">PEOPLE & PARTNERSHIP</p><h2 className="section-title">Your questions belong here.</h2><p>Finding your way through different therapies can bring up lots of questions. Start with the goals, concerns or everyday routines you would like to talk about.</p><p>Public directory reviews mention a clinician named Dr. Soumya. Current team membership, qualifications and availability should be confirmed directly with the centre.</p><Button asChild className="mt-5 h-11 w-fit rounded-full px-5"><Link to="/contact">Ask the centre <ArrowRight size={15} /></Link></Button></div>
        </div>
      </section>
      <section className="approach-band mt-16"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20"><p className="eyebrow">A SHARED CONVERSATION</p><h2 className="section-title">A few useful things to ask.</h2><div className="question-grid mt-9"><article><span>01</span><h3>Which services are available?</h3><p>Ask about the therapy you have in mind and when it may be available.</p></article><article><span>02</span><h3>Who would I meet?</h3><p>Ask about the person supporting you and their relevant qualifications.</p></article><article><span>03</span><h3>What should I bring?</h3><p>Check whether any information or documents would be useful for a first conversation.</p></article></div></div></section>
      <ContactBand />
    </SiteLayout>
  );
}

export function StoriesPage() {
  return (
    <SiteLayout>
      <PageIntro label="FOR PEOPLE & FAMILIES" title={<>Small steps matter <span>in everyday life.</span></>} description="Support is personal. The most useful place to begin is with what matters to you and the questions you want answered." />
      <section className="family-story mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="family-story-image"><img src={therapyRoom} alt="A family member is present while a therapist supports a child's movement practice" loading="lazy" width={1536} height={1024} /><div className="family-image-note"><Heart size={16} /> Every journey is personal</div></div>
        <div className="flex flex-col justify-center"><p className="eyebrow">A FAMILY-CENTRED START</p><h2 className="section-title">Bring the whole picture.</h2><p className="mt-4 text-base leading-8 text-muted-foreground">The routines, people and moments in someone’s life help shape the questions to ask. Share what you have noticed, what feels important, and what you hope to understand.</p><p className="mt-4 text-base leading-8 text-muted-foreground">There is no need to have all the answers before you get in touch. Begin with a simple conversation about what support may be available.</p><Button asChild className="mt-6 h-11 w-fit rounded-full px-5"><Link to="/contact">Plan a conversation <ArrowRight size={15} /></Link></Button></div>
      </section>
      <section className="approach-band mt-16"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20"><p className="eyebrow">A THOUGHTFUL FIRST STEP</p><h2 className="section-title max-w-2xl">What matters to you is a good place to start.</h2><div className="family-steps mt-8"><div><span>01</span><p>Share the questions on your mind.</p></div><div><span>02</span><p>Ask which support is currently available.</p></div><div><span>03</span><p>Discuss next steps with the centre and your clinician.</p></div></div></div></section>
      <ContactBand />
    </SiteLayout>
  );
}

const galleryPhotos = [
  { src: therapyRoom, alt: "A child practising supported movement with a therapist while a family member watches nearby", caption: "Movement & physiotherapy support" },
  { src: gallerySensoryRoom, alt: "A sensory integration room with floor mats, a sensory swing, a ball pit and soft play blocks", caption: "Sensory integration space" },
  { src: gallerySpeechSession, alt: "A speech therapist and a child working together with picture cards at a small table", caption: "Speech & communication practice" },
  { src: galleryLearningCorner, alt: "A special education learning corner with a child-height desk, visual cards and learning materials", caption: "Special education corner" },
  { src: galleryReception, alt: "A welcoming reception and waiting area with chairs and plants", caption: "Reception & waiting area" },
];

export function GalleryPage() {
  return (
    <SiteLayout>
      <PageIntro label="GALLERY" title={<>A look around <span>the centre.</span></>} description="Get a feel for the rooms and spaces where therapy and learning support happens at SB REHAB CENTRE." />
      <section className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="gallery-grid">
          {galleryPhotos.map(({ src, alt, caption }, index) => (
            <figure key={caption} className={`gallery-item gallery-item-${index + 1}`}>
              <img src={src} alt={alt} loading="lazy" width={1024} height={1024} />
              <figcaption><span>{caption}</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="gallery-note"><MapPin size={17} /><p>These photographs are illustrative impressions of the centre, not actual photos. Come visit in Berhampore to see the real spaces for yourself.</p></div>
      </section>
      <ContactBand />
    </SiteLayout>
  );
}

export function ContactPage() {
  return (
    <SiteLayout>
      <PageIntro label="CONTACT & LOCATION" title={<>Start with a <span>conversation.</span></>} description="Contact the centre in Berhampore to ask about therapies, availability and how to plan a visit." />
      <section className="contact-grid mx-auto max-w-7xl px-5 sm:px-6">
        <div className="contact-details">
          <p className="eyebrow">FIND YOUR WAY HERE</p><h2 className="section-title">Visit SB REHAB CENTRE.</h2>
          <div className="contact-detail-row"><span><MapPin size={20} /></span><div><h3>Address</h3><p>{centreAddress}</p><a href={centreMapUrl} target="_blank" rel="noreferrer">Open map <ArrowUpRight size={14} /></a></div></div>
          <div className="contact-detail-row"><span><Phone size={20} /></span><div><h3>Phone</h3><p>Two different numbers appear in public directories. Please confirm which one is current.</p><div className="phone-options">{phoneListings.map(({ display, tel }) => <a key={tel} href={`tel:${tel}`}><Phone size={14} /> {display}</a>)}</div></div></div>
          <div className="contact-detail-row"><span><Clock3 size={20} /></span><div><h3>Listed opening hours</h3><p>9:00 am–6:00 pm, Monday–Friday and Sunday. Saturday listed as closed. Hours may change; please call ahead.</p></div></div>
          <div className="contact-detail-row"><span><Facebook size={20} /></span><div><h3>Facebook</h3><p>See the centre’s page and updates.</p><a href={facebookUrl} target="_blank" rel="noreferrer">Visit Facebook <ArrowUpRight size={14} /></a></div></div>
        </div>
        <aside className="contact-map-panel">
          <div className="map-art"><span className="map-road map-road-one" /><span className="map-road map-road-two" /><span className="map-road map-road-three" /><span className="map-pin"><MapPin size={25} fill="currentColor" /></span><span className="map-label map-label-one">MAANKUMARI RD</span><span className="map-label map-label-two">BERHAMPORE</span><span className="map-grid-dot dot-one" /><span className="map-grid-dot dot-two" /><span className="map-grid-dot dot-three" /></div>
          <div className="map-info"><div><p className="eyebrow">MURSHIDABAD · WEST BENGAL</p><h2>SB REHAB CENTRE</h2></div><a href={centreMapUrl} target="_blank" rel="noreferrer" aria-label="Open directions in Google Maps"><ArrowUpRight size={20} /></a></div>
          <Button asChild variant="outline" className="mt-3 h-11 w-full rounded-full"><a href={centreMapUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a></Button>
        </aside>
      </section>
      <div className="directory-note mx-auto max-w-7xl px-5 sm:px-6">Contact details and listed hours are based on public third-party listings and may be out of date.</div>
    </SiteLayout>
  );
}

export function PageIntro({ label, title, description }: { label: string; title: ReactNode; description: string }) {
  return (
    <section className="page-intro"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:py-24"><p className="eyebrow">{label}</p><h1>{title}</h1><p className="page-intro-description">{description}</p><div className="page-intro-rule"><span /></div></div></section>
  );
}

function ContactBand() {
  return <section className="visit-band"><div className="mx-auto grid max-w-7xl items-center gap-7 px-5 py-12 sm:px-6 md:grid-cols-[1fr_auto] lg:py-16"><div><p className="eyebrow">HERE WHEN YOU’RE READY</p><h2 className="section-title">Have a question?</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Reach out to ask about current services and availability.</p></div><Button asChild className="h-12 rounded-full px-6"><Link to="/contact">Get in touch <ArrowRight size={16} /></Link></Button></div></section>;
}

export function WelcomeAnimation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("sb-rehab-welcome-seen") === "yes") return;
      window.sessionStorage.setItem("sb-rehab-welcome-seen", "yes");
    } catch {
      // The opening moment should still work when browser storage is unavailable.
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 4100);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="welcome-screen" role="dialog" aria-modal="true" aria-label="Welcome to SB REHAB CENTRE">
      <div className="welcome-soft-shape welcome-soft-shape-one" aria-hidden="true" />
      <div className="welcome-soft-shape welcome-soft-shape-two" aria-hidden="true" />
      <p className="welcome-overline">A PLACE TO FIND SUPPORT</p>
      <div className="welcome-words" aria-hidden="true">
        {["Physiotherapy", "Occupational Therapy", "Speech Therapy", "Special Education", "Sensory Integration Therapy"].map((word, index) => <span key={word} className={`welcome-word welcome-word-${index + 1}`}>{word}</span>)}
      </div>
      <div className="welcome-brand">
        <span className="welcome-brand-symbol">SB</span>
        <span className="welcome-brand-name">SB REHAB CENTRE</span>
        <span className="welcome-brand-caption">CARE · CONNECTION · GROWTH</span>
      </div>
      <Button variant="outline" className="welcome-skip rounded-full" onClick={() => setVisible(false)}>Skip intro <ArrowRight size={14} /></Button>
      <span className="sr-only" aria-live="polite">Welcome to SB Rehab Centre.</span>
    </div>
  );
}
