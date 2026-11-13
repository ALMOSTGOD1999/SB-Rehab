# SB REHAB CENTRE website

## Plan
- Build six connected pages: Home, About, Services, Team, Patient Stories, and Contact.
- Use the supplied Facebook page and independently corroborating public listings for centre details; leave unverified details out rather than inventing them.
- Create an animated welcome that brings the five specified therapy names together as “SB REHAB CENTRE,” with a skip/reduced-motion path.
- Establish a warm, accessible, mobile-first visual system and shared navigation/footer, with useful phone, WhatsApp, and map links where details are verified.
- Give each page its own title and social description; verify navigation, animation, mobile layout, and preview diagnostics.

## Technical details
- Implement as TanStack Start route files with shared site UI, semantic design tokens in `src/styles.css`, and no backend-dependent features.
- Keep the animation in CSS/React and honor `prefers-reduced-motion`; use public information only and mark unavailable details as unlisted.
