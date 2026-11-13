import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage } from "@/components/site-shell";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [
    { title: "Gallery | SB REHAB CENTRE Berhampore" },
    { name: "description", content: "Take a look around the rooms and spaces of SB REHAB CENTRE in Berhampore, West Bengal." },
    { property: "og:title", content: "Gallery | SB REHAB CENTRE Berhampore" },
    { property: "og:description", content: "Take a look around the rooms and spaces of SB REHAB CENTRE in Berhampore, West Bengal." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: GalleryPage,
});
