import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SB REHAB CENTRE | Therapy in Berhampore" },
      { name: "description", content: "Explore therapy and learning support at SB REHAB CENTRE in Berhampore, West Bengal, and share a visitor rating or review." },
      { property: "og:title", content: "SB REHAB CENTRE | Therapy in Berhampore" },
      { property: "og:description", content: "Explore therapy and learning support at SB REHAB CENTRE in Berhampore, West Bengal, and share a visitor rating or review." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});