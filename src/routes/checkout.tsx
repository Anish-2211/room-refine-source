import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { useState } from "react";
import { NitcoButton } from "@/components/NitcoButton";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — NITCO" },
      { name: "description", content: "Complete your NITCO surface order." },
      { property: "og:title", content: "Checkout — NITCO" },
      { property: "og:description", content: "Complete your NITCO surface order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

const inputClass = "mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-3 outline-none focus:border-terracotta";

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState<string | null>(null);
  const delivery = items.length === 0 ? 0 : subtotal >= 25000 ? 0 : 1500;
  const total = subtotal + delivery;

  const placeOrder = (event: React.FormEvent) => {
    event.preventDefault();
    const orderId = `NITCO-${Math.floor(100000 + Math.random() * 900000)}`;
    setPlaced(orderId);
    clear();
  };

  if (placed) {
    return (
      <main className="grid min-h-screen place-items-center bg-paper px-5 font-sans text-ink">
        <div className="w-full max-w-lg rounded-lg border border-ink/10 bg-cream p-10 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-moss text-cream"><Check size={28} /></div>
          <h1 className="mt-6 font-serif text-5xl">Order placed</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            Thank you — your order <span className="font-medium text-ink">{placed}</span> is confirmed.
            A NITCO specialist will call within 24 hours to schedule delivery and share your free swatches.
          </p>
          <NitcoButton className="mt-8" onClick={() => navigate({ to: "/" })}>Back to the folio</NitcoButton>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-paper font-sans text-ink">
      <div className="mx-auto max-w-[1200px] px-5 py-10 lg:px-10">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-terracotta">
          <ArrowLeft size={16} /> Back to bag
        </Link>
        <h1 className="mt-4 font-serif text-5xl lg:text-6xl">Checkout</h1>

        {items.length === 0 ? (
          <div className="mt-16 rounded-lg border border-ink/10 bg-cream py-20 text-center">
            <p className="font-serif text-3xl">Nothing to check out yet</p>
            <p className="mt-2 text-sm text-ink/60">Add a surface to your bag first.</p>
            <NitcoButton className="mt-6" onClick={() => navigate({ to: "/" })}>Explore surfaces</NitcoButton>
          </div>
        ) : (
          <form onSubmit={placeOrder} className="mt-10 grid grid-cols-12 gap-10">
            <div className="col-span-12 space-y-8 lg:col-span-7">
              <section className="rounded-lg border border-ink/10 bg-cream p-7">
                <h2 className="font-serif text-3xl">Contact details</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-medium">Full name<input required className={inputClass} placeholder="Asha Verma" /></label>
                  <label className="block text-xs font-medium">Phone<input required type="tel" className={inputClass} placeholder="+91 98200 00000" /></label>
                  <label className="block text-xs font-medium sm:col-span-2">Email<input required type="email" className={inputClass} placeholder="you@example.com" /></label>
                </div>
              </section>

              <section className="rounded-lg border border-ink/10 bg-cream p-7">
                <h2 className="font-serif text-3xl">Delivery address</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-medium sm:col-span-2">Address<input required className={inputClass} placeholder="Flat, street, landmark" /></label>
                  <label className="block text-xs font-medium">City<input required className={inputClass} placeholder="Mumbai" /></label>
                  <label className="block text-xs font-medium">PIN code<input required pattern="[0-9]{6}" className={inputClass} placeholder="400001" /></label>
                </div>
              </section>

              <section className="rounded-lg border border-ink/10 bg-cream p-7">
                <h2 className="font-serif text-3xl">Payment</h2>
                <div className="mt-5 space-y-3">
                  {["UPI", "Card", "Cash on delivery"].map((method, i) => (
                    <label key={method} className="flex cursor-pointer items-center gap-3 rounded-md border border-ink/15 bg-paper px-4 py-3 text-sm has-checked:border-terracotta">
                      <input type="radio" name="payment" defaultChecked={i === 0} className="accent-terracotta" />
                      {method}
                    </label>
                  ))}
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-ink/50"><Lock size={12} /> This is a demo checkout — no payment is processed.</p>
              </section>
            </div>

            <aside className="col-span-12 lg:col-span-5">
              <div className="sticky top-8 rounded-lg border border-ink/10 bg-cream p-7">
                <h2 className="font-serif text-3xl">Your order</h2>
                <ul className="mt-5 space-y-4">
                  {items.map(({ product, qty }) => (
                    <li key={product.slug} className="flex items-center gap-3">
                      <img src={product.image} alt="" className="size-14 rounded-md object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-serif text-lg">{product.name}</p>
                        <p className="text-xs text-ink/55">{qty * 10} sq ft</p>
                      </div>
                      <span className="text-sm font-medium">{formatPrice(product.price * qty * 10)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 space-y-3 border-t border-ink/10 pt-5 text-sm">
                  <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd className="font-medium">{formatPrice(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt className="text-ink/60">Delivery</dt><dd className="font-medium">{delivery === 0 ? "Free" : formatPrice(delivery)}</dd></div>
                  <div className="flex justify-between border-t border-ink/10 pt-4 text-base"><dt className="font-medium">Total</dt><dd className="font-serif text-2xl">{formatPrice(total)}</dd></div>
                </dl>
                <NitcoButton type="submit" className="mt-6 w-full">Place order · {formatPrice(total)}</NitcoButton>
              </div>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
}
