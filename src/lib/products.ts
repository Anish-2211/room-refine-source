import terraMatte from "@/assets/product-terra-matte.jpg";
import terracottaHall from "@/assets/product-terracotta-hall.jpg";
import ivoryCourt from "@/assets/product-ivory-court.jpg";
import sageLoom from "@/assets/product-sage-loom.jpg";
import emberGrid from "@/assets/product-ember-grid.jpg";
import paperWhite from "@/assets/product-paper-white.jpg";
import sageVein from "@/assets/product-sage-vein.jpg";
import verdeAlpi from "@/assets/product-verde-alpi.jpg";
import carraraMist from "@/assets/product-carrara-mist.jpg";
import duneTravertine from "@/assets/product-dune-travertine.jpg";
import noirStreak from "@/assets/product-noir-streak.jpg";
import roseAlba from "@/assets/product-rose-alba.jpg";
import clayTessera from "@/assets/product-clay-tessera.jpg";
import mosaicGrove from "@/assets/product-mosaic-grove.jpg";
import terraChip from "@/assets/product-terra-chip.jpg";
import pearlHex from "@/assets/product-pearl-hex.jpg";
import inkLine from "@/assets/product-ink-line.jpg";
import meadowMix from "@/assets/product-meadow-mix.jpg";

export type Room = "Living Room" | "Bathroom" | "Kitchen" | "Hall & Passage";

export const rooms: { name: Room; slug: string; blurb: string }[] = [
  { name: "Living Room", slug: "living-room", blurb: "Warm, generous surfaces for the room that hosts everything." },
  { name: "Bathroom", slug: "bathroom", blurb: "Sealed stone and grippy mosaics for wet, calm spaces." },
  { name: "Kitchen", slug: "kitchen", blurb: "Stain-guarded tiles and counters that love a busy stove." },
  { name: "Hall & Passage", slug: "hall-passage", blurb: "Hard-wearing floors that carry the whole home's traffic." },
];

export type Product = {
  slug: string;
  name: string;
  category: "Tile" | "Marble" | "Mosaic";
  size: string;
  finish: string;
  price: number; // ₹ per sq ft
  image: string;
  rooms: Room[];
  description: string;
  position?: string;
};

export const products: Product[] = [
  // ---- Tiles ----
  {
    slug: "terra-matte",
    name: "Terra Matte",
    category: "Tile",
    size: "60×60",
    finish: "Matte",
    price: 420,
    image: terraMatte,
    rooms: ["Living Room", "Hall & Passage"],
    description:
      "A warm, large-format terracotta tile with a soft matte surface. Hard-wearing and slip-resistant, it brings an earthy calm to living rooms and passages.",
  },
  {
    slug: "terracotta-hall",
    name: "Terracotta Hall",
    category: "Tile",
    size: "60×60",
    finish: "Matte",
    price: 460,
    image: terracottaHall,
    rooms: ["Living Room", "Hall & Passage"],
    description:
      "The signature floor of The Terracotta Hall spread — a sun-baked large-format tile that holds warm light through the day.",
  },
  {
    slug: "ivory-court",
    name: "Ivory Court",
    category: "Tile",
    size: "80×80",
    finish: "Satin",
    price: 540,
    image: ivoryCourt,
    rooms: ["Living Room", "Kitchen"],
    description:
      "A generous ivory tile with a satin sheen that brightens open-plan spaces. Stain-guarded surface stands up to busy family kitchens.",
  },
  {
    slug: "sage-loom",
    name: "Sage Loom",
    category: "Tile",
    size: "30×60",
    finish: "Matte",
    price: 390,
    image: sageLoom,
    rooms: ["Bathroom", "Kitchen"],
    description:
      "A woven-texture sage tile that softens bathroom walls and kitchen splash zones. Water-safe, easy to wipe, quiet to look at.",
  },
  {
    slug: "ember-grid",
    name: "Ember Grid",
    category: "Tile",
    size: "45×45",
    finish: "Rustic",
    price: 350,
    image: emberGrid,
    rooms: ["Kitchen", "Hall & Passage"],
    description:
      "A rustic burnt-clay tile with a subtle grid relief. Hides everyday scuffs beautifully — made for kitchens and busy corridors.",
  },
  {
    slug: "paper-white",
    name: "Paper White",
    category: "Tile",
    size: "60×120",
    finish: "Gloss",
    price: 610,
    image: paperWhite,
    rooms: ["Living Room", "Bathroom"],
    description:
      "A large gloss tile in soft paper white. Bounces light deep into the room and makes compact spaces feel twice their size.",
  },
  // ---- Marble ----
  {
    slug: "sage-vein",
    name: "Sage Vein",
    category: "Marble",
    size: "30×60",
    finish: "Honed",
    price: 680,
    image: sageVein,
    rooms: ["Bathroom"],
    description:
      "Cool sage-green marble with delicate veining, honed to a silk touch. Sealed for wet areas, it turns bathrooms into quiet, spa-like retreats.",
  },
  {
    slug: "verde-alpi",
    name: "Verde Alpi",
    category: "Marble",
    size: "60×120",
    finish: "Polished",
    price: 890,
    image: verdeAlpi,
    rooms: ["Bathroom", "Living Room"],
    description:
      "Deep green polished marble with dramatic white veining. A statement surface for feature walls, vanity tops and grand bathrooms.",
  },
  {
    slug: "carrara-mist",
    name: "Carrara Mist",
    category: "Marble",
    size: "60×60",
    finish: "Honed",
    price: 750,
    image: carraraMist,
    rooms: ["Kitchen", "Hall & Passage"],
    description:
      "Soft grey-white marble with misty veining. A timeless choice for counters, thresholds and elegant hallways.",
  },
  {
    slug: "dune-travertine",
    name: "Dune Travertine",
    category: "Marble",
    size: "40×80",
    finish: "Brushed",
    price: 720,
    image: duneTravertine,
    rooms: ["Living Room", "Hall & Passage"],
    description:
      "Warm sand-toned travertine with a brushed, open texture. Brings a Mediterranean ease to living floors and entrance halls.",
  },
  {
    slug: "noir-streak",
    name: "Noir Streak",
    category: "Marble",
    size: "60×120",
    finish: "Polished",
    price: 980,
    image: noirStreak,
    rooms: ["Living Room"],
    description:
      "Inky black marble shot through with gold streaks. One wall of this and the room needs nothing else.",
  },
  {
    slug: "rose-alba",
    name: "Rose Alba",
    category: "Marble",
    size: "30×60",
    finish: "Honed",
    price: 640,
    image: roseAlba,
    rooms: ["Bathroom"],
    description:
      "A blush-pink marble with soft clouding. Gentle under morning light — made for serene bathrooms and powder rooms.",
  },
  // ---- Mosaics ----
  {
    slug: "clay-tessera",
    name: "Clay Tessera",
    category: "Mosaic",
    size: "2×2",
    finish: "Gloss",
    price: 310,
    image: clayTessera,
    rooms: ["Kitchen"],
    description:
      "Hand-glazed clay mosaic chips with a gentle gloss. Perfect for kitchen backsplashes and accent walls where light should dance.",
  },
  {
    slug: "mosaic-grove",
    name: "Mosaic Grove",
    category: "Mosaic",
    size: "5×5",
    finish: "Matte",
    price: 380,
    image: mosaicGrove,
    rooms: ["Bathroom", "Kitchen"],
    description:
      "Small-format stone mosaics in mixed sage and cream tones. Grippy underfoot — ideal for shower floors and kitchen accents.",
  },
  {
    slug: "terra-chip",
    name: "Terra Chip",
    category: "Mosaic",
    size: "3×3",
    finish: "Matte",
    price: 290,
    image: terraChip,
    rooms: ["Hall & Passage", "Kitchen"],
    description:
      "Terracotta mosaic chips in a warm speckled mix. A forgiving, characterful floor for passages, verandas and utility corners.",
  },
  {
    slug: "pearl-hex",
    name: "Pearl Hex",
    category: "Mosaic",
    size: "4×4 hex",
    finish: "Gloss",
    price: 450,
    image: pearlHex,
    rooms: ["Bathroom"],
    description:
      "Hexagonal mosaics with a pearl glaze that shifts from cream to green. A jewel-like finish for shower walls and niches.",
  },
  {
    slug: "ink-line",
    name: "Ink Line",
    category: "Mosaic",
    size: "2×10 strip",
    finish: "Satin",
    price: 520,
    image: inkLine,
    rooms: ["Kitchen", "Living Room"],
    description:
      "Long, narrow mosaic strips in deep ink tones. Lay them vertical or horizontal for a tailored, graphic backsplash or panel.",
  },
  {
    slug: "meadow-mix",
    name: "Meadow Mix",
    category: "Mosaic",
    size: "5×5",
    finish: "Matte",
    price: 340,
    image: meadowMix,
    rooms: ["Hall & Passage", "Bathroom"],
    description:
      "A meadow-toned mix of sage, cream and clay chips. Cheerful underfoot and tough enough for the busiest thresholds.",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsForRoom(room: Room) {
  return products.filter((p) => p.rooms.includes(room));
}

export function roomBySlug(slug: string) {
  return rooms.find((r) => r.slug === slug);
}

export function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
