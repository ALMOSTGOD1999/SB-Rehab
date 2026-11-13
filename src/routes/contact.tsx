import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact & Location | SB REHAB CENTRE" },
    { name: "description", content: "Find SB REHAB CENTRE in Berhampore, West Bengal, and view publicly listed contact details." },
    { property: "og:title", content: "Contact & Location | SB REHAB CENTRE" },
    { property: "og:description", content: "Find SB REHAB CENTRE in Berhampore, West Bengal, and view publicly listed contact details." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContactPage,
});