export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  collection: string;
  gender: "men" | "ladies" | "unisex";
  image: string;
  colors: string[];
  sizes: string[];
  description: string;
  isNew?: boolean;
  onSale?: boolean;
  stock: number;
};

const u = (id: string) => `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Midnight Puffer Jacket", price: 8999, oldPrice: 10999, category: "Jackets", collection: "winters", gender: "men", image: "/images/alpine-puffer-jacket.webp", colors: ["Navy", "Black"], sizes: ["S", "M", "L", "XL", "XXL"], description: "Warm quilted puffer jacket with a water-resistant shell, high collar and deep pockets. Our winter best-seller.", isNew: true, stock: 24 },
  { id: "p2", name: "Camel Wool Long Coat", price: 11999, category: "Jackets", collection: "winters", gender: "men", image: u("photo-1591047139829-d91aecb6caea"), colors: ["Camel", "Charcoal"], sizes: ["M", "L", "XL", "XXL"], description: "Classic wool-blend long coat, tailored fit, warm and elegant for winter evenings.", stock: 12 },
  { id: "p3", name: "Chunky Knit Sweater", price: 4499, category: "Round Neck Sweaters", collection: "winters", gender: "men", image: "/images/round-neck-knitted-sweater.webp", colors: ["Cream", "Mocha"], sizes: ["S", "M", "L", "XL"], description: "Thick cable-knit round-neck sweater in soft acrylic wool. Comfortable and warm.", stock: 30 },
  { id: "p4", name: "Fleece Zip Hoodie", price: 3999, category: "Hoodies", collection: "winters", gender: "men", image: "/images/essential-fleece-hoodie.webp", colors: ["Navy", "Grey", "Black"], sizes: ["S", "M", "L", "XL", "XXL"], description: "Brushed fleece zip-up hoodie with kangaroo pocket. Everyday winter essential.", isNew: true, stock: 40 },
  { id: "p5", name: "Mock Neck Sweatshirt", price: 3499, category: "Mock Neck Sweatshirts", collection: "winters", gender: "men", image: "/images/mock-neck-sweatshirt-navy.webp", colors: ["Beige", "Navy"], sizes: ["S", "M", "L", "XL"], description: "Soft mock-neck sweatshirt with ribbed cuffs — smart enough for the office, warm enough for winter.", stock: 28 },
  { id: "p6", name: "Classic Formal Shirt", price: 2999, category: "Formal", collection: "shirts", gender: "men", image: "/images/oxford-formal-shirt.webp", colors: ["White", "Light Blue"], sizes: ["S", "M", "L", "XL", "XXL"], description: "Crisp cotton formal shirt with a clean collar and buttoned cuffs.", stock: 35 },
  { id: "p7", name: "Italian Collar Shirt", price: 3299, category: "Italian", collection: "shirts", gender: "men", image: "/images/italian-linen-shirt.webp", colors: ["White", "Beige"], sizes: ["M", "L", "XL"], description: "Italian collar shirt in premium cotton — a sharp, modern look.", stock: 22 },
  { id: "p8", name: "Cuban Collar Shirt", price: 2799, category: "Cuban Collar", collection: "shirts", gender: "men", image: "/images/cuban-collar-resort-shirt.webp", colors: ["Olive", "Cream"], sizes: ["S", "M", "L", "XL"], description: "Relaxed Cuban collar shirt, breathable and easy to wear.", stock: 26 },
  { id: "p9", name: "Denim Shirt", price: 3199, category: "Denim", collection: "shirts", gender: "men", image: "/images/classic-denim-shirt.webp", colors: ["Blue Denim", "Dark Denim"], sizes: ["M", "L", "XL", "XXL"], description: "Sturdy denim shirt with chest pockets — a timeless casual layer.", stock: 18 },
  { id: "p10", name: "Knitted Polo", price: 2899, category: "Knitted Polos", collection: "shirts", gender: "men", image: "/images/piqu-polo-shirt.webp", colors: ["Navy", "Cream"], sizes: ["S", "M", "L", "XL"], description: "Soft knitted polo with a refined collar — smart casual, done right.", stock: 20 },
  { id: "p11", name: "Essential White T-Shirt", price: 1499, category: "T-Shirts", collection: "shirts", gender: "men", image: "/images/oversized-essential-tee.webp", colors: ["White", "Black"], sizes: ["S", "M", "L", "XL", "XXL"], description: "Premium cotton crew-neck tee. The one every wardrobe needs.", stock: 60 },
  { id: "p12", name: "Slim Stretch Jeans", price: 3999, category: "Jeans", collection: "pants", gender: "men", image: "/images/slim-stretch-jeans.webp", colors: ["Dark Blue", "Black"], sizes: ["30", "32", "34", "36", "38"], description: "Slim-fit stretch jeans with a clean dark wash.", stock: 32 },
  { id: "p13", name: "Smart Fit Cotton Trousers", price: 3499, category: "Smart Fit Cotton", collection: "pants", gender: "men", image: "/images/smart-fit-cotton-pants.webp", colors: ["Beige", "Navy", "Grey"], sizes: ["30", "32", "34", "36", "38"], description: "Smart-fit cotton trousers, tapered leg, comfortable all day.", stock: 25 },
  { id: "p14", name: "Gurkha Trousers", price: 4299, category: "Gurkha", collection: "pants", gender: "men", image: "/images/gurkha-pleated-pants.webp", colors: ["Khaki", "Olive"], sizes: ["30", "32", "34", "36"], description: "High-waisted Gurkha trousers with side adjusters — a classic, tailored cut.", stock: 15 },
  // Ladies — 11 products
  { id: "l1", name: "Ladies Quilted Puffer Jacket", price: 7999, oldPrice: 9499, category: "Jackets", collection: "ladies", gender: "ladies", image: "/images/ladies-quilted-puffer-jacket.webp", colors: ["Maroon", "Navy"], sizes: ["XS", "S", "M", "L", "XL"], description: "Quilted puffer jacket for ladies — warm, light and elegant.", isNew: true, stock: 20 },
  { id: "l2", name: "Ladies Wool Long Coat", price: 10999, category: "Jackets", collection: "ladies", gender: "ladies", image: "/images/ladies-wool-blend-long-coat.webp", colors: ["Camel", "Grey"], sizes: ["S", "M", "L", "XL"], description: "Long wool coat with a belted waist — modest, warm and graceful.", stock: 10 },
  { id: "l3", name: "Ladies Chunky Knit Sweater", price: 3999, category: "Sweaters", collection: "ladies", gender: "ladies", image: "/images/ladies-chunky-knit-sweater.webp", colors: ["Cream", "Pink"], sizes: ["XS", "S", "M", "L", "XL"], description: "Soft chunky knit sweater, cosy for cold winter days.", stock: 28 },
  { id: "l4", name: "Ladies Fleece Zip Hoodie", price: 3499, category: "Hoodies", collection: "ladies", gender: "ladies", image: "/images/ladies-fleece-zip-hoodie.webp", colors: ["Lavender", "Grey"], sizes: ["XS", "S", "M", "L"], description: "Brushed fleece hoodie with a full zip and warm hood.", stock: 30 },
  { id: "l5", name: "Ladies Crew Sweatshirt", price: 2999, category: "Sweatshirts", collection: "ladies", gender: "ladies", image: "/images/ladies-classic-crew-sweatshirt.webp", colors: ["Beige", "Mint"], sizes: ["XS", "S", "M", "L", "XL"], description: "Soft crew-neck sweatshirt, relaxed fit, everyday comfort.", stock: 26 },
  { id: "l6", name: "Ladies Embroidered Wool Shawl", price: 2999, category: "Shawls", collection: "ladies", gender: "ladies", image: "/images/ladies-embroidered-wool-shawl.webp", colors: ["Cream", "Emerald"], sizes: ["One Size"], description: "Warm embroidered wool shawl with a fine fringed edge.", isNew: true, stock: 18 },
  { id: "l7", name: "Emerald Embroidered Shawl", price: 2999, category: "Shawls", collection: "ladies", gender: "ladies", image: "/images/emerald-embroidered-shawl.jpg", colors: ["Emerald", "Maroon"], sizes: ["One Size"], description: "Rich emerald wool shawl with delicate embroidery.", stock: 16 },
  { id: "l8", name: "Ladies Winter Co-ord Set", price: 5999, category: "Co-ord Sets", collection: "ladies", gender: "ladies", image: "/images/ladies-winter-co-ord-set.webp", colors: ["Beige", "Navy"], sizes: ["XS", "S", "M", "L", "XL"], description: "Matching winter co-ord set — sweater and trousers in soft knit.", isNew: true, stock: 14 },
  { id: "l9", name: "Printed Khaddar Kurti", price: 3499, category: "Kurtis", collection: "ladies", gender: "ladies", image: "/images/ladies-printed-khaddar-kurti.webp", colors: ["Teal", "Mustard"], sizes: ["XS", "S", "M", "L", "XL"], description: "Printed khaddar kurti, modest cut, warm winter fabric.", stock: 22 },
  { id: "l10", name: "Ladies Button Cardigan", price: 3799, category: "Sweaters", collection: "ladies", gender: "ladies", image: "/images/ladies-button-front-cardigan.webp", colors: ["Cream", "Grey"], sizes: ["S", "M", "L", "XL"], description: "Soft button-front cardigan, easy to layer over kurtis and tops.", stock: 24 },
  { id: "l11", name: "Ladies Turtleneck Sweater Dress", price: 4999, category: "Sweaters", collection: "ladies", gender: "ladies", image: "/images/ladies-turtleneck-sweater-dress.webp", colors: ["Black", "Wine"], sizes: ["XS", "S", "M", "L"], description: "Warm turtleneck sweater dress — modest, elegant winter dressing.", stock: 12 },
];

export const HERO_FLATLAY = "/images/hero-flatlay.webp";
export const HERO_MOBILE = "/images/alpine-puffer-jacket.webp";

export const NAV = [
  { label: "Winters", slug: "winters", children: ["Jackets", "Mock Neck Sweatshirts", "Round Neck Sweaters", "Hoodies"] },
  { label: "Shirts", slug: "shirts", children: ["Formal", "Lining", "Italian", "Cuban Collar", "Denim", "Casual", "Polo", "Knitted Polos", "T-Shirts"] },
  { label: "Pants", slug: "pants", children: ["Cotton", "Formal", "Gurkha", "Pleated", "Smart Fit Cotton", "Straight Fit Cotton", "Jeans"] },
  { label: "Korean Trousers", slug: "korean-trousers", children: ["Korean Fit", "Relaxed Fit", "Straight Fit"] },
  { label: "Casual Wear", slug: "casual-wear", children: ["Sweatshirts", "Oversized T-Shirts", "Co-ord Sets"] },
  { label: "Ladies", slug: "ladies", children: ["Jackets", "Sweaters", "Hoodies", "Sweatshirts", "Shawls", "Co-ord Sets", "Kurtis"] },
  { label: "New Arrivals", slug: "new-arrivals", children: [] },
  { label: "Sale", slug: "sale", children: [] },
];

export const PAKISTAN_PROVINCES: Record<string, string[]> = {
  Punjab: ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Bahawalpur", "Sargodha"],
  Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
  "Khyber Pakhtunkhwa": ["Peshawar", "Abbottabad", "Mardan", "Swat"],
  Balochistan: ["Quetta", "Gwadar", "Turbat"],
  "Gilgit-Baltistan": ["Gilgit", "Skardu"],
  "Azad Jammu & Kashmir": ["Muzaffarabad", "Mirpur"],
  Islamabad: ["Islamabad"],
};

export const FREE_SHIPPING_THRESHOLD = 5000;
export const SHIPPING_FEE = 300;
export const WHATSAPP_NUMBER = "+923275084710";
export const WHATSAPP_DISPLAY = "+92 327 5084710";

export const fmt = (n: number) => "Rs " + n.toLocaleString("en-PK");
export const orderNumber = () => {
  const y = new Date().getFullYear();
  return `IF-${y}-${String(Math.floor(1000 + Math.random() * 9000))}`;
};
export const isValidPkMobile = (s: string) => /^(\+92|0)3\d{2}-?\d{7}$/.test(s.replace(/\s/g, ""));
