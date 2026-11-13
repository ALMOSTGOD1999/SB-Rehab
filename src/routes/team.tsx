import { createFileRoute } from "@tanstack/react-router";
import { TeamPage } from "@/components/site-shell";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [
    { title: "Our Approach | SB REHAB CENTRE" },
    { name: "description", content: "Learn about the listening-first approach to therapy and support at SB REHAB CENTRE." },
    { property: "og:title", content: "Our Approach | SB REHAB CENTRE" },
    { property: "og:description", content: "Learn about the listening-first approach to therapy and support at SB REHAB CENTRE." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: TeamPage,
});