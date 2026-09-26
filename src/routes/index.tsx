import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { NitcoButton } from "@/components/NitcoButton";
import { useCart } from "@/lib/cart";
import { formatPrice, products } from "@/lib/products";
import heroImage from "@/assets/nitco-living-room.jpg";
import bathroomImage from "@/assets/nitco-bathroom.jpg";
import kitchenImage from "@/assets/nitco-kitchen.jpg";
import materialsImage from "@/assets/nitco-materials.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NITCO Material Folio — Tiles, Marble & Mosaics" },
      { name: "description", content: "Explore NITCO tiles, marble and mosaics by room, material and finish." },
      { property: "og:title", content: "NITCO Material Folio" },
      { property: "og:description", content: "Surfaces designed for living rooms, bathrooms, kitchens and beyond." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const materials = [
  { name: "Tiles", count: "128 collections", image: materialsImage, position: "object-left" },
  { name: "Marble", count: "64 collections", image: bathroomImage, position: "object-center" },
  { name: "Mosaics", count: "92 collections", image: kitchenImage, position: "object-center" },
];

const featured = products.slice(0, 3);

function Index() {
  const { count } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visualizerMaterial, setVisualizerMaterial] = useState<"Terra" | "Sage" | "Ivory">("Terra");
  const [consultOpen, setConsultOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const visualizerTone = {
    Terra: "bg-terracotta/35",
    Sage: "bg-sage/35",
    Ivory: "bg-cream/45",
  }[visualizerMaterial];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-paper font-sans text-ink selection:bg-terracotta selection:text-cream">
      <header className="relative z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 lg:px-10">
          <button aria-label="Go to top" onClick={() => scrollTo("top")} className="flex items-baseline gap-3 text-left">
            <span className="font-serif text-3xl leading-none">NITCO</span>
            <span className="hidden text-[11px] uppercase tracking-[0.25em] text-ink/50 sm:inline">Material Folio</span>
          </button>
          <nav className="hidden items-center gap-7 text-[13px] font-medium md:flex" aria-label="Main navigation">
            {["Rooms", "Tiles", "Marble", "Mosaics", "Showrooms"].map((item) => (
              <button key={item} onClick={() => scrollTo(item === "Showrooms" ? "visit" : item === "Rooms" ? "rooms" : "materials")} className="text-ink/70 transition-colors hover:text-terracotta">{item}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button aria-label="Search products" className="grid size-10 place-items-center rounded-full transition-colors hover:bg-ink/5"><Search size={18} /></button>
            <Link to="/cart" aria-label={`Shopping bag, ${count} item${count === 1 ? "" : "s"}`} className="relative hidden size-10 place-items-center rounded-full transition-colors hover:bg-ink/5 sm:grid">
              <ShoppingBag size={18} />
              {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-terracotta text-[10px] font-semibold text-cream">{count}</span>}
            </Link>
            <NitcoButton onClick={() => setConsultOpen(true)} variant="ink" className="hidden sm:inline-flex">Book a consult</NitcoButton>
            <button aria-label={mobileOpen ? "Close menu" : "Open menu"} onClick={() => setMobileOpen(!mobileOpen)} className="grid size-10 place-items-center rounded-full md:hidden">{mobileOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {mobileOpen && (
          <nav className="absolute inset-x-0 top-full border-y border-ink/10 bg-paper p-5 shadow-lg md:hidden">
            {["Rooms", "Materials", "Visualizer", "Showrooms"].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase() === "showrooms" ? "visit" : item.toLowerCase())} className="block w-full border-b border-ink/10 py-4 text-left font-serif text-2xl">{item}</button>
            ))}
          </nav>
        )}
      </header>

      <section id="top" className="mx-auto max-w-[1440px] px-5 pb-16 pt-10 lg:px-10">
        <div className="grid grid-cols-12 gap-8 lg:gap-10">
          <div className="col-span-12 flex flex-col justify-between lg:col-span-5">
            <div className="rise rise-one">
              <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-terracotta">The Material Folio — Vol. 04</p>
              <h1 className="font-serif text-6xl leading-[0.92] sm:text-7xl lg:text-[6.25rem]">Surfaces that<br /><em className="text-terracotta">hold the light.</em></h1>
              <p className="mt-8 max-w-[42ch] text-base leading-relaxed text-ink/70 lg:text-lg">A tactile library of tiles, marble and mosaics — composed room by room, for people who live in the details.</p>
            </div>
            <div className="rise rise-three mt-10 flex flex-wrap gap-3">
              <NitcoButton onClick={() => scrollTo("rooms")}>Browse by room <ArrowRight size={16} /></NitcoButton>
              <NitcoButton onClick={() => scrollTo("visualizer")} variant="ghost"><Sparkles size={16} /> Try the visualizer</NitcoButton>
            </div>
          </div>
          <div className="rise rise-two col-span-12 lg:col-span-7">
            <div className="relative">
              <img src={heroImage} width={1408} height={1008} alt="Sunlit living room finished with warm terracotta NITCO floor tiles" className="aspect-[4/3] w-full rounded-lg object-cover" />
              <div className="absolute -bottom-6 left-3 max-w-[240px] rounded-lg bg-cream px-5 py-4 shadow-lg lg:-left-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">Featured spread</p>
                <p className="mt-1 font-serif text-xl">The Terracotta Hall</p>
                <p className="mt-1 text-xs text-ink/60">Large-format · 60×60 · matte</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="materials" className="border-y border-ink/10 bg-cream py-10">
        <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="mb-7 flex items-end justify-between">
            <div><p className="text-[11px] uppercase tracking-[0.3em] text-ink/50">01 — Materials</p><h2 className="mt-2 font-serif text-4xl">Shop by material</h2></div>
            <button className="hidden text-[13px] font-medium text-ink/70 hover:text-terracotta sm:block">View all materials →</button>
          </div>
          <div className="group overflow-hidden">
            <div className="material-rail flex w-max gap-5 group-hover:[animation-play-state:paused]">
              {[...materials, ...materials].map((material, index) => (
                <button key={`${material.name}-${index}`} className="w-64 shrink-0 text-left" onClick={() => scrollTo("spread")}>
                  <div className="overflow-hidden rounded-lg"><img src={material.image} loading="lazy" width={600} height={720} alt={`${material.name} collection`} className={`aspect-[5/6] w-full object-cover transition-transform duration-700 hover:scale-105 ${material.position}`} /></div>
                  <div className="mt-3 flex items-baseline justify-between"><span className="font-serif text-2xl">{material.name}</span><span className="text-xs text-ink/50">{material.count}</span></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="rooms" className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between"><div><p className="text-[11px] uppercase tracking-[0.3em] text-ink/50">02 — Rooms</p><h2 className="mt-2 font-serif text-5xl">Browse by room</h2></div><p className="hidden max-w-[30ch] text-sm text-ink/60 lg:block">Each room is a curated spread of surfaces, finishes and pairings.</p></div>
        <div className="grid grid-cols-12 gap-5">
          <RoomCard title="Living Room" count="24 surfaces" image={heroImage} className="col-span-12 md:col-span-7" ratio="aspect-[16/10]" />
          <RoomCard title="Bathroom" count="18 surfaces" image={bathroomImage} className="col-span-12 md:col-span-5" ratio="aspect-[4/5]" />
          <RoomCard title="Kitchen" count="16 surfaces" image={kitchenImage} className="col-span-12 md:col-span-6" ratio="aspect-[10/7]" />
          <RoomCard title="Hall & Passage" count="12 surfaces" image={heroImage} className="col-span-12 md:col-span-6" ratio="aspect-[10/7]" position="object-bottom" />
        </div>
      </section>

      <section id="spread" className="border-y border-ink/10 bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 px-5 py-20 lg:px-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-ink/50">03 — The spread</p>
            <img src={materialsImage} loading="lazy" width={1200} height={912} alt="Terracotta tile, sage marble and cream mosaic material pairing" className="aspect-[4/3] w-full rounded-lg object-cover" />
            <h2 className="mt-7 font-serif text-4xl">Where marble meets clay</h2>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-ink/70">Cool, veined stone set against warm terracotta. A balanced palette that gives busy rooms a quiet, lasting confidence.</p>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-ink/50">Selected pieces</p>
            <div className="space-y-4">{featured.map((product) => <ProductCard key={product.slug} product={product} saved={saved} onSave={() => setSaved(!saved)} />)}</div>
          </div>
        </div>
      </section>

      <section id="visualizer" className="mx-auto grid max-w-[1440px] grid-cols-12 gap-10 px-5 py-20 lg:px-10">
        <div className="col-span-12 lg:col-span-7">
          <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-ink/50">04 — Try it on</p>
          <div className="relative overflow-hidden rounded-lg">
            <img src={heroImage} loading="lazy" width={1408} height={1008} alt="Living room tile visualizer preview" className="aspect-[16/10] w-full object-cover" />
            <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-[46%] mix-blend-color transition-colors duration-500 ${visualizerTone}`} />
            <div className="absolute bottom-4 left-4 flex gap-2 rounded-full bg-cream/90 p-1.5 backdrop-blur">
              {(["Terra", "Sage", "Ivory"] as const).map((tone) => <button key={tone} onClick={() => setVisualizerMaterial(tone)} className={`rounded-full px-3 py-2 text-xs font-medium transition-colors ${visualizerMaterial === tone ? "bg-ink text-cream" : "text-ink hover:bg-ink/5"}`}>{tone}</button>)}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><div><h2 className="font-serif text-3xl">The Tile Visualizer</h2><p className="mt-1 text-sm text-ink/60">Switch materials above to see the atmosphere change.</p></div><NitcoButton variant="ink">Open full visualizer <ArrowRight size={16} /></NitcoButton></div>
        </div>
        <div id="visit" className="col-span-12 flex flex-col gap-5 lg:col-span-5">
          <div className="flex-1 rounded-lg bg-moss p-8 text-cream"><p className="text-[11px] uppercase tracking-[0.3em] text-cream/60">05 — Showrooms</p><h2 className="mt-3 font-serif text-4xl">See every surface in person</h2><p className="mt-3 max-w-md text-sm leading-relaxed text-cream/70">Touch the stone, compare finishes and take home samples from your nearest NITCO studio.</p><NitcoButton variant="cream" className="mt-6">Locate a showroom <ArrowRight size={16} /></NitcoButton></div>
          <div className="flex-1 rounded-lg bg-terracotta p-8 text-cream"><p className="text-[11px] uppercase tracking-[0.3em] text-cream/70">06 — Consultation</p><h2 className="mt-3 font-serif text-4xl">Talk to a design expert</h2><p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80">Bring your room dimensions and inspiration. We’ll help find a practical surface pairing.</p><NitcoButton onClick={() => setConsultOpen(true)} variant="cream" className="mt-6">Book a consultation</NitcoButton></div>
        </div>
      </section>

      <footer className="border-t border-ink/10 px-5 py-10 lg:px-10"><div className="mx-auto flex max-w-[1360px] flex-col justify-between gap-6 md:flex-row md:items-center"><div><p className="font-serif text-3xl">NITCO</p><p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-ink/50">Tiles · Marble · Mosaics</p></div><p className="text-xs text-ink/50">Surfaces for every room, made to live beautifully.</p></div></footer>

      {consultOpen && <ConsultDialog onClose={() => setConsultOpen(false)} />}
    </main>
  );
}

function RoomCard({ title, count, image, className, ratio, position = "object-center" }: { title: string; count: string; image: string; className: string; ratio: string; position?: string }) {
  return <button className={`group text-left ${className}`}><div className="overflow-hidden rounded-lg"><img src={image} loading="lazy" width={1200} height={900} alt={`${title} with NITCO surfaces`} className={`${ratio} ${position} w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]`} /></div><div className="mt-4 flex items-baseline justify-between"><span className="font-serif text-3xl">{title}</span><span className="text-[13px] text-ink/50 transition-colors group-hover:text-terracotta">{count} →</span></div></button>;
}

function ProductCard({ product, saved, onSave }: { product: (typeof products)[number]; saved: boolean; onSave: () => void }) {
  return <article className="flex gap-4 rounded-lg border border-ink/10 bg-paper p-3"><Link to="/products/$slug" params={{ slug: product.slug }} className="shrink-0"><img src={product.image} loading="lazy" width={120} height={120} alt={`${product.name} sample`} className="size-24 rounded-md object-cover" /></Link><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><Link to="/products/$slug" params={{ slug: product.slug }}><h3 className="font-serif text-xl hover:text-terracotta">{product.name}</h3></Link><p className="mt-1 text-xs text-ink/55">{product.category} · {product.size} · {product.finish}</p></div><button aria-label={`Save ${product.name}`} onClick={onSave} className={`grid size-8 shrink-0 place-items-center rounded-full border ${saved ? "border-moss bg-moss text-cream" : "border-ink/15"}`}><Check size={14} /></button></div><div className="mt-4 flex items-center justify-between"><span className="text-sm font-medium">{formatPrice(product.price)} / sq ft</span><Link to="/products/$slug" params={{ slug: product.slug }} className="text-xs font-medium text-terracotta hover:text-ink">View piece →</Link></div></div></article>;
}

function ConsultDialog({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Book a consultation"><div className="w-full max-w-lg rounded-lg bg-cream p-7 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-[11px] uppercase tracking-[0.3em] text-terracotta">Design consultation</p><h2 className="mt-2 font-serif text-4xl">Let’s shape your room.</h2></div><button aria-label="Close consultation form" onClick={onClose} className="grid size-10 place-items-center rounded-full hover:bg-ink/5"><X /></button></div><p className="mt-3 text-sm leading-relaxed text-ink/65">Share a few details and a NITCO specialist will contact you to arrange a convenient time.</p><form className="mt-6 space-y-4" onSubmit={(event) => { event.preventDefault(); onClose(); }}><label className="block text-xs font-medium">Name<input required className="mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-3 outline-none focus:border-terracotta" /></label><label className="block text-xs font-medium">Phone or email<input required className="mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-3 outline-none focus:border-terracotta" /></label><label className="block text-xs font-medium">Which space are you working on?<select className="mt-2 w-full rounded-md border border-ink/15 bg-paper px-4 py-3 outline-none focus:border-terracotta"><option>Living room</option><option>Bathroom</option><option>Kitchen</option><option>Whole home</option><option>Commercial project</option></select></label><NitcoButton type="submit" className="mt-2 w-full">Request a consultation <ArrowRight size={16} /></NitcoButton></form></div></div>;
}
