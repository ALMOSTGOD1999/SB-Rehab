import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/site-shell";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Therapies | SB REHAB CENTRE, Berhampore" },
    { name: "description", content: "Explore physiotherapy, occupational therapy, speech therapy, special education, sensory integration therapy and behavioural therapy." },
    { property: "og:title", content: "Therapies | SB REHAB CENTRE, Berhampore" },
    { property: "og:description", content: "Explore physiotherapy, occupational therapy, speech therapy, special education, sensory integration therapy and behavioural therapy." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ServicesPage,
});