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
  
  // Collaborative Products
  { name: "OFF-WHITE x StepUP 'ARCHIVE'", image: "/images/story-sneaker.png", price: "$850", sku: "SU-OW-ARC", status: "Limited", type: "Limited", description: "Deconstructed masterpiece featuring signature collaboration elements.", isCollab: true },
  { name: "Fear of God 'ESSENTIALS' V1", image: "/images/sneaker-right.png", price: "$520", sku: "SU-FOG-ES1", status: "In Stock", type: "Heritage", description: "Minimalist interpretation of urban movement in desert sand hues.", isCollab: true },
  { name: "Adidas x SU 'GAZELLE' MOD", image: "/images/sneaker-yellow.png", price: "$210", sku: "SU-AD-GZ", status: "In Stock", type: "Core", description: "Reimagined terrace classic with modern technical materials.", isCollab: true },
];

export const PRODUCT_FILTERS = ["All", "Core", "Performance", "Heritage", "Limited"];
