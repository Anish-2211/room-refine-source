import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { NitcoButton } from "@/components/NitcoButton";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} — NITCO` },
      { name: "description", content: loaderData?.description ?? "NITCO surface detail." },
      { property: "og:title", content: `${loaderData?.name ?? "Product"} — NITCO` },
      { property: "og:description", content: loaderData?.description ?? "NITCO surface detail." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-paper px-5 text-center">
      <div>
        <h1 className="font-serif text-5xl">Piece not found</h1>
        <p className="mt-3 text-ink/60">This surface may have been retired from the folio.</p>
        <Link to="/" className="mt-6 inline-block text-terracotta underline underline-offset-4">Back to the folio</Link>
      </div>
    </div>
  ),
});

function ProductDetail() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  const area = qty * 10;
  const total = product.price * area;

  const handleAdd = () => {
    add(product.slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

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

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <figure>
                <div className="overflow-hidden rounded-lg">
                  <img src={product.image} width={1200} height={900} alt={`${product.name} ${product.category.toLowerCase()} installed in a finished room`} className={`aspect-[4/3] w-full object-cover ${product.position ?? "object-center"}`} />
                </div>
                <figcaption className="mt-2 flex items-center justify-between text-xs text-ink/55">
                  <span>In a space</span><span>Installed view</span>
                </figcaption>
              </figure>
              <figure>
                <div className="overflow-hidden rounded-lg">
                  <img src={product.textureImage} loading="lazy" width={512} height={512} alt={`Close-up of ${product.name} ${product.finish.toLowerCase()} texture`} className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <figcaption className="mt-2 flex items-center justify-between text-xs text-ink/55">
                  <span>Texture detail</span><span>{product.finish} finish</span>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="col-span-12 flex flex-col lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta">
              {product.category} · {product.size} · {product.finish}
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-tight lg:text-6xl">{product.name}</h1>
            <p className="mt-4 leading-relaxed text-ink/70">{product.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.rooms.map((room) => (
                <span key={room} className="rounded-full border border-ink/15 px-3 py-1 text-xs text-ink/60">{room}</span>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-ink/10 bg-cream p-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink/60">Price</span>
                <span className="font-serif text-3xl">{formatPrice(product.price)} <span className="text-base text-ink/50">/ sq ft</span></span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-ink/60">Quantity <span className="text-xs">(1 unit = 10 sq ft)</span></span>
                <div className="flex items-center gap-3 rounded-full border border-ink/15 bg-paper px-2 py-1">
                  <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="grid size-8 place-items-center rounded-full hover:bg-ink/5"><Minus size={14} /></button>
                  <span className="w-8 text-center text-sm font-medium">{qty}</span>
                  <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="grid size-8 place-items-center rounded-full hover:bg-ink/5"><Plus size={14} /></button>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between border-t border-ink/10 pt-4">
                <span className="text-sm text-ink/60">{area} sq ft total</span>
                <span className="font-serif text-2xl">{formatPrice(total)}</span>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <NitcoButton onClick={handleAdd} className="flex-1">
                  {added ? <><Check size={16} /> Added to bag</> : <><ShoppingBag size={16} /> Add to bag</>}
                </NitcoButton>
                <NitcoButton variant="ink" className="flex-1" onClick={() => { add(product.slug, qty); navigate({ to: "/checkout" }); }}>
                  Buy now <ArrowRight size={16} />
                </NitcoButton>
              </div>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-ink/60">
              <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-moss" /> Free sample swatch with every order</li>
              <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-moss" /> Delivery across India in 7–14 days</li>
              <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-moss" /> 10-year surface warranty</li>
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-4xl">More in {product.category.toLowerCase()}</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="group">
                  <div className="overflow-hidden rounded-lg">
                    <img src={p.image} alt={`${p.name} sample`} className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="font-serif text-2xl">{p.name}</span>
                    <span className="text-sm text-ink/60">{formatPrice(p.price)} / sq ft</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
