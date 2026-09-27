import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, productsForRoom, roomBySlug } from "@/lib/products";

export const Route = createFileRoute("/rooms/$slug")({
  loader: ({ params }) => {
    const room = roomBySlug(params.slug);
    if (!room) throw notFound();
    return { room, items: productsForRoom(room.name) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.room.name ?? "Room"} Surfaces — NITCO` },
      { name: "description", content: loaderData?.room.blurb ?? "NITCO surfaces by room." },
      { property: "og:title", content: `${loaderData?.room.name ?? "Room"} Surfaces — NITCO` },
      { property: "og:description", content: loaderData?.room.blurb ?? "NITCO surfaces by room." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoomPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-paper px-5 text-center font-sans text-ink">
      <div>
        <h1 className="font-serif text-5xl">Room not found</h1>
        <p className="mt-3 text-ink/60">That room isn't in the folio yet.</p>
        <Link to="/" className="mt-6 inline-block text-terracotta underline underline-offset-4">Back to the folio</Link>
      </div>
    </div>
  ),
});

function RoomPage() {
  const { room, items } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();

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

        <p className="text-[11px] uppercase tracking-[0.3em] text-terracotta">Rooms</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-6xl leading-none lg:text-7xl">{room.name}</h1>
          <p className="max-w-[38ch] text-sm leading-relaxed text-ink/60">{room.blurb}</p>
        </div>
        <p className="mt-4 text-sm text-ink/50">{items.length} surfaces curated for this room</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <article key={product.slug} className="group">
              <Link to="/products/$slug" params={{ slug: product.slug }}>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={`${product.name} ${product.category.toLowerCase()} in a ${room.name.toLowerCase()}`}
                    className={`aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105 ${product.position ?? "object-center"}`}
                  />
                </div>
              </Link>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <Link to="/products/$slug" params={{ slug: product.slug }} className="font-serif text-2xl hover:text-terracotta">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-xs text-ink/55">{product.category} · {product.size} · {product.finish}</p>
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

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-moss p-8 text-cream">
          <div>
            <h2 className="font-serif text-3xl">Not sure which surface fits?</h2>
            <p className="mt-1 text-sm text-cream/70">Book a free consultation and we'll pair materials to your room dimensions.</p>
          </div>
          <button
            onClick={() => navigate({ to: "/" })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cream px-5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Explore all rooms
          </button>
        </div>
      </div>
    </main>
  );
}
