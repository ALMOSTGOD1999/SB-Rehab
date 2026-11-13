import { createFileRoute } from "@tanstack/react-router";
import { StoriesPage } from "@/components/site-shell";

export const Route = createFileRoute("/stories")({
  head: () => ({ meta: [
    { title: "For Families | SB REHAB CENTRE" },
    { name: "description", content: "A starting point for people and families exploring therapy and learning support in Berhampore." },
    { property: "og:title", content: "For Families | SB REHAB CENTRE" },
    { property: "og:description", content: "A starting point for people and families exploring therapy and learning support in Berhampore." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: StoriesPage,
});