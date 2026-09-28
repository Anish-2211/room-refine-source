import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, products } from "@/lib/products";

export const Route = createFileRoute("/tiles")({
  head: () => ({
    meta: [
      { title: "Tiles — NITCO Material Folio" },
      { name: "description", content: "Large-format, matte, satin and gloss NITCO tiles for every room." },
      { property: "og:title", content: "Tiles — NITCO Material Folio" },
      { property: "og:description", content: "Large-format, matte, satin and gloss NITCO tiles for every room." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TilesPage,
});

function TilesPage() {
  const items = products.filter((p) => p.category === "Tile");
  return <CataloguePage title="Tiles" blurb="Hard-wearing, light-holding tiles — from warm terracotta to bright paper white." items={items} />;
}

export function CataloguePage({ title, blurb, items }: { title: string; blurb: string; items: typeof products }) {
  const { add } = useCart();
  return (
    <main className="min-h-screen bg-paper font-sans text-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-terracotta">
            <ArrowLeft size={16} /> Back to the folio
          </Link>
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-terracotta">
            <ShoppingBag size={16} /> View bag
          </Link>
        </div>

        <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta">Materials</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-6xl leading-none lg:text-7xl">{title}</h1>
          <p className="max-w-[38ch] text-sm leading-relaxed text-ink/60">{blurb}</p>
        </div>
        <p className="mt-4 text-sm text-ink/50">{items.length} surfaces in this collection</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <article key={product.slug} className="group">
              <Link to="/products/$slug" params={{ slug: product.slug }}>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={`${product.name} ${product.category.toLowerCase()}`}
                    className={`aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105 ${product.position ?? "object-center"}`}
                  />
                </div>
              </Link>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <Link to="/products/$slug" params={{ slug: product.slug }} className="font-serif text-2xl hover:text-terracotta">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs text-ink/55">{product.size} · {product.finish}</p>
                  <p className="mt-2 text-sm font-medium">{formatPrice(product.price)} / sq ft</p>
                </div>
                <button
                  aria-label={`Add ${product.name} to bag`}
                  onClick={() => add(product.slug, 1)}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors hover:border-terracotta hover:bg-terracotta hover:text-cream"
                >
                  <ShoppingBag size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
