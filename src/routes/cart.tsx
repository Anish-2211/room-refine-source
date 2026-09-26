import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { NitcoButton } from "@/components/NitcoButton";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — NITCO" },
      { name: "description", content: "Review the NITCO surfaces in your bag before checkout." },
      { property: "og:title", content: "Your Bag — NITCO" },
      { property: "og:description", content: "Review the NITCO surfaces in your bag before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();
  const navigate = useNavigate();
  const delivery = items.length === 0 ? 0 : subtotal >= 25000 ? 0 : 1500;
  const total = subtotal + delivery;

  return (
    <main className="min-h-screen bg-paper font-sans text-ink">
      <div className="mx-auto max-w-[1200px] px-5 py-10 lg:px-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-terracotta">
          <ArrowLeft size={16} /> Continue browsing
        </Link>
        <h1 className="mt-4 font-serif text-5xl lg:text-6xl">Your bag</h1>

        {items.length === 0 ? (
          <div className="mt-16 grid place-items-center rounded-lg border border-ink/10 bg-cream py-20 text-center">
            <div>
              <ShoppingBag size={40} className="mx-auto text-ink/30" />
              <p className="mt-4 font-serif text-3xl">Your bag is empty</p>
              <p className="mt-2 text-sm text-ink/60">Browse the folio and add surfaces you love.</p>
              <NitcoButton className="mt-6" onClick={() => navigate({ to: "/" })}>Explore surfaces <ArrowRight size={16} /></NitcoButton>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-12 gap-10">
            <div className="col-span-12 space-y-4 lg:col-span-7">
              {items.map(({ product, qty }) => (
                <article key={product.slug} className="flex gap-4 rounded-lg border border-ink/10 bg-cream p-4">
                  <Link to="/products/$slug" params={{ slug: product.slug }} className="shrink-0">
                    <img src={product.image} alt={`${product.name} sample`} className="size-24 rounded-md object-cover sm:size-28" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to="/products/$slug" params={{ slug: product.slug }} className="font-serif text-2xl hover:text-terracotta">{product.name}</Link>
                        <p className="mt-1 text-xs text-ink/55">{product.category} · {product.size} · {product.finish}</p>
                      </div>
                      <button aria-label={`Remove ${product.name}`} onClick={() => remove(product.slug)} className="grid size-9 shrink-0 place-items-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-terracotta">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 rounded-full border border-ink/15 bg-paper px-2 py-1">
                        <button aria-label="Decrease quantity" onClick={() => setQty(product.slug, qty - 1)} className="grid size-8 place-items-center rounded-full hover:bg-ink/5"><Minus size={14} /></button>
                        <span className="w-8 text-center text-sm font-medium">{qty}</span>
                        <button aria-label="Increase quantity" onClick={() => setQty(product.slug, qty + 1)} className="grid size-8 place-items-center rounded-full hover:bg-ink/5"><Plus size={14} /></button>
                      </div>
                      <span className="font-serif text-xl">{formatPrice(product.price * qty * 10)}</span>
                    </div>
                    <p className="mt-2 text-xs text-ink/50">{qty * 10} sq ft · {formatPrice(product.price)} / sq ft</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="col-span-12 lg:col-span-5">
              <div className="sticky top-8 rounded-lg border border-ink/10 bg-cream p-7">
                <h2 className="font-serif text-3xl">Order summary</h2>
                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd className="font-medium">{formatPrice(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink/60">Delivery</dt><dd className="font-medium">{delivery === 0 ? "Free" : formatPrice(delivery)}</dd></div>
                  {delivery > 0 && <p className="text-xs text-ink/50">Free delivery on orders above {formatPrice(25000)}</p>}
                  <div className="flex justify-between border-t border-ink/10 pt-4 text-base"><dt className="font-medium">Total</dt><dd className="font-serif text-2xl">{formatPrice(total)}</dd></div>
                </dl>
                <NitcoButton className="mt-6 w-full" onClick={() => navigate({ to: "/checkout" })}>
                  Proceed to checkout <ArrowRight size={16} />
                </NitcoButton>
                <p className="mt-4 text-center text-xs text-ink/50">Sample swatches ship free with every order.</p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
