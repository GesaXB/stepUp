export interface Product {
  name: string;
  image: string;
  price: string;
  sku: string;
  status: string;
  type: string;
  description: string;
  isNewDrop?: boolean;
  isCollab?: boolean;
}

export const PRODUCTS: Product[] = [
  { name: "Air Max SU '26 Platinum", image: "/images/sneaker-yellow.png", price: "$240", sku: "SU-V1-AMX", status: "In Stock", type: "Core", description: "High-performance urban running sneaker with adaptive cushioning.", isNewDrop: true },
  { name: "Leather Heritage Classic", image: "/images/story-sneaker.png", price: "$190", sku: "SU-V1-LHC", status: "Limited", type: "Heritage", description: "Hand-finished premium leather sneakers for a timeless streetwear look.", isNewDrop: false },
  { name: "Tech Performance Onyx", image: "/images/sneaker-right.png", price: "$280", sku: "SU-V1-TPO", status: "Low Stock", type: "Performance", description: "Futuristic silhouette with high-tensile mesh for daily durability.", isNewDrop: true },
  { name: "Phantom Flow V2", image: "/images/hero-main.png", price: "$310", sku: "SU-V1-PF2", status: "In Stock", type: "Performance", description: "Advanced aerodynamics meets urban utility in this stealthy release.", isNewDrop: true },
  { name: "Urban Recon Protocol", image: "/images/story-model.png", price: "$420", sku: "SU-V1-URB", status: "Sold Out", type: "Limited", description: "Military-grade tactical movement boots for the harshest environments.", isNewDrop: false },
  { name: "Hypermesh 'Graphite'", image: "/images/sneaker-yellow.png", price: "$265", sku: "SU-V1-HCG", status: "Limited", type: "Core", description: "Breathable carbon-weave construction for lightweight agility.", isNewDrop: true },
  
  // New Added Products
  { name: "Velocity Zero-G", image: "/images/shoes-1.png", price: "$340", sku: "SU-V0-ZG", status: "In Stock", type: "Performance", description: "Zero-gravity foam technology for the most responsive stride ever engineered.", isNewDrop: true },
  { name: "Brutalist Concrete II", image: "/images/shoes-2.png", price: "$185", sku: "SU-BC-02", status: "In Stock", type: "Heritage", description: "Raw aesthetic meets comfort in this reinforced concrete-toned silhouette.", isNewDrop: true },
  { name: "Ghost Runner 'Refract'", image: "/images/shoes-3.png", price: "$295", sku: "SU-GR-RF", status: "Low Stock", type: "Performance", description: "Iridescent overlays that react to urban night lights. Pure visibility.", isNewDrop: true },
  { name: "Tactical Desert S-1", image: "/images/hero-main.png", price: "$380", sku: "SU-TD-S1", status: "In Stock", type: "Limited", description: "All-terrain modular footwear designed for cross-climate traversal.", isNewDrop: false },
  { name: "Synth-Wave '88", image: "/images/sneaker-yellow.png", price: "$160", sku: "SU-SW-88", status: "In Stock", type: "Core", description: "Vibrant retro-futurism reinterpreted with modern carbon materials.", isNewDrop: false },
  { name: "Obsidian Core Pulse", image: "/images/sneaker-right.png", price: "$410", sku: "SU-OC-P1", status: "Limited", type: "Performance", description: "Internal pulse-monitoring sensors integrated into high-tensile mesh.", isNewDrop: true },

  // Collaborative Products
  { name: "OFF-WHITE x StepUP 'ARCHIVE'", image: "/images/story-sneaker.png", price: "$850", sku: "SU-OW-ARC", status: "Limited", type: "Limited", description: "Deconstructed masterpiece featuring signature collaboration elements.", isCollab: true },
  { name: "Fear of God 'ESSENTIALS' V1", image: "/images/sneaker-right.png", price: "$520", sku: "SU-FOG-ES1", status: "In Stock", type: "Heritage", description: "Minimalist interpretation of urban movement in desert sand hues.", isCollab: true },
  { name: "Adidas x SU 'GAZELLE' MOD", image: "/images/sneaker-yellow.png", price: "$210", sku: "SU-AD-GZ", status: "In Stock", type: "Core", description: "Reimagined terrace classic with modern technical materials.", isCollab: true },
  { name: "Nike x StepUP 'ALPHA' Gen", image: "/images/shoes-1.png", price: "$490", sku: "SU-NK-ALP", status: "Sold Out", type: "Performance", description: "Hyper-responsive racing specialized for long-duration urban sprinting.", isCollab: true },
  { name: "Salehe x StepUP 'MUD'", image: "/images/shoes-2.png", price: "$230", sku: "SU-SB-MUD", status: "In Stock", type: "Core", description: "Organic fingerprint-inspired grip technology for unparalleled traction.", isCollab: true },
  { name: "Ambush x SU 'RECON'", image: "/images/shoes-3.png", price: "$440", sku: "SU-AM-RC", status: "Limited", type: "Limited", description: "Bold architectural silhouette with oversized technical components.", isCollab: true },
];

export const PRODUCT_FILTERS = ["All", "Core", "Performance", "Heritage", "Limited"];
