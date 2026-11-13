import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/site-shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About SB REHAB CENTRE | Berhampore" },
    { name: "description", content: "Learn about SB REHAB CENTRE and therapy support for people and families in Berhampore." },
    { property: "og:title", content: "About SB REHAB CENTRE | Berhampore" },
    { property: "og:description", content: "Learn about SB REHAB CENTRE and therapy support for people and families in Berhampore." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AboutPage,
});