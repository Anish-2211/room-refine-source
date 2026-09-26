import heroImage from "@/assets/nitco-living-room.jpg";
import bathroomImage from "@/assets/nitco-bathroom.jpg";
import kitchenImage from "@/assets/nitco-kitchen.jpg";
import materialsImage from "@/assets/nitco-materials.jpg";

export type Product = {
  slug: string;
  name: string;
  category: "Tile" | "Marble" | "Mosaic";
  size: string;
  finish: string;
  price: number; // ₹ per sq ft
  image: string;
  rooms: string[];
  description: string;
  position?: string;
};

export const products: Product[] = [
  {
    slug: "terra-matte",
    name: "Terra Matte",
    category: "Tile",
    size: "60×60",
    finish: "Matte",
    price: 420,
    image: materialsImage,
    rooms: ["Living Room", "Hall & Passage"],
    description:
      "A warm, large-format terracotta tile with a soft matte surface. Hard-wearing and slip-resistant, it brings an earthy calm to living rooms and passages.",
  },
  {
    slug: "sage-vein",
    name: "Sage Vein",
    category: "Marble",
    size: "30×60",
    finish: "Honed",
    price: 680,
    image: bathroomImage,
    rooms: ["Bathroom"],
    description:
      "Cool sage-green marble with delicate veining, honed to a silk touch. Sealed for wet areas, it turns bathrooms into quiet, spa-like retreats.",
  },
  {
    slug: "clay-tessera",
    name: "Clay Tessera",
    category: "Mosaic",
    size: "2×2",
    finish: "Gloss",
    price: 310,
    image: kitchenImage,
    rooms: ["Kitchen"],
    description:
      "Hand-glazed clay mosaic chips with a gentle gloss. Perfect for kitchen backsplashes and accent walls where light should dance.",
  },
  {
    slug: "terracotta-hall",
    name: "Terracotta Hall",
    category: "Tile",
    size: "60×60",
    finish: "Matte",
    price: 460,
    image: heroImage,
    rooms: ["Living Room", "Hall & Passage"],
    description:
      "The signature floor of The Terracotta Hall spread — a sun-baked large-format tile that holds warm light through the day.",
  },
  {
    slug: "verde-alpi",
    name: "Verde Alpi",
    category: "Marble",
    size: "60×120",
    finish: "Polished",
    price: 890,
    image: bathroomImage,
    rooms: ["Bathroom", "Living Room"],
    description:
      "Deep green polished marble with dramatic white veining. A statement surface for feature walls, vanity tops and grand bathrooms.",
  },
  {
    slug: "ivory-court",
    name: "Ivory Court",
    category: "Tile",
    size: "80×80",
    finish: "Satin",
    price: 540,
    image: heroImage,
    rooms: ["Living Room", "Kitchen"],
    position: "object-bottom",
    description:
      "A generous ivory tile with a satin sheen that brightens open-plan spaces. Stain-guarded surface stands up to busy family kitchens.",
  },
  {
    slug: "mosaic-grove",
    name: "Mosaic Grove",
    category: "Mosaic",
    size: "5×5",
    finish: "Matte",
    price: 380,
    image: materialsImage,
    rooms: ["Bathroom", "Kitchen"],
    description:
      "Small-format stone mosaics in mixed sage and cream tones. Grippy underfoot — ideal for shower floors and kitchen accents.",
  },
  {
    slug: "carrara-mist",
    name: "Carrara Mist",
    category: "Marble",
    size: "60×60",
    finish: "Honed",
    price: 750,
    image: kitchenImage,
    rooms: ["Kitchen", "Hall & Passage"],
    description:
      "Soft grey-white marble with misty veining. A timeless choice for counters, thresholds and elegant hallways.",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
