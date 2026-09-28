import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { CataloguePage } from "./tiles";

export const Route = createFileRoute("/mosaics")({
  head: () => ({
    meta: [
      { title: "Mosaics — NITCO Material Folio" },
      { name: "description", content: "Hand-glazed chips, hexagons and strips — NITCO mosaics for backsplashes, showers and accents." },
      { property: "og:title", content: "Mosaics — NITCO Material Folio" },
      { property: "og:description", content: "Hand-glazed chips, hexagons and strips — NITCO mosaics for backsplashes, showers and accents." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MosaicsPage,
});

function MosaicsPage() {
  const items = products.filter((p) => p.category === "Mosaic");
  return <CataloguePage title="Mosaics" blurb="Small-format chips, hexagons and strips that make light dance across a wall." items={items} />;
}
