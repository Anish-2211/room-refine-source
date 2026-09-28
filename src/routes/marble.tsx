import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { CataloguePage } from "./tiles";

export const Route = createFileRoute("/marble")({
  head: () => ({
    meta: [
      { title: "Marble — NITCO Material Folio" },
      { name: "description", content: "Honed, polished and brushed NITCO marble for bathrooms, kitchens and grand living spaces." },
      { property: "og:title", content: "Marble — NITCO Material Folio" },
      { property: "og:description", content: "Honed, polished and brushed NITCO marble for bathrooms, kitchens and grand living spaces." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MarblePage,
});

function MarblePage() {
  const items = products.filter((p) => p.category === "Marble");
  return <CataloguePage title="Marble" blurb="Veined, honed and polished stone — quiet luxury for wet rooms and statement walls." items={items} />;
}
