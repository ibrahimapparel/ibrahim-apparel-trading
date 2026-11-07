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
  { id: "p1", name: "Midnight Puffer Jacket", price: 8999, oldPrice: 10999, category: "Jackets", collection: "winters", gender: "men", image: u("photo-1551028719-00167b16eac5"), colors: ["Navy", "Black"], sizes: ["S", "M", "L", "XL", "XXL"], description: "Warm quilted puffer jacket with a water-resistant shell, high collar and deep pockets. Our winter best-seller.", isNew: true, stock: 24 },
  { id: "p2", name: "Camel Wool Long Coat", price: 11999, category: "Jackets", collection: "winters", gender: "men", image: u("photo-1591047139829-d91aecb6caea"), colors: ["Camel", "Charcoal"], sizes: ["M", "L", "XL", "XXL"], description: "Classic wool-blend long coat, tailored fit, warm and elegant for winter evenings.", stock: 12 },
  { id: "p3", name: "Chunky Knit Sweater", price: 4499, category: "Round Neck Sweaters", collection: "winters", gender: "men", image: u("photo-1576871337622-98d48d1cf531"), colors: ["Cream", "Mocha"], sizes: ["S", "M", "L", "XL"], description: "Thick cable-knit round-neck sweater in soft acrylic wool. Comfortable and warm.", stock: 30 },
  { id: "p4", name: "Fleece Zip Hoodie", price: 3999, category: "Hoodies", collection: "winters", gender: "men", image: u("photo-1556821840-3a63f95609a7"), colors: ["Navy", "Grey", "Black"], sizes: ["S", "M", "L", "XL", "XXL"], description: "Brushed fleece zip-up hoodie with kangaroo pocket. Everyday winter essential.", isNew: true, stock: 40 },
  { id: "p5", name: "Mock Neck Sweatshirt", price: 3499, category: "Mock Neck Sweatshirts", collection: "winters", gender: "men", image: u("photo-1578681994506-b8f463449011"), colors: ["Beige", "Navy"], sizes: ["S", "M", "L", "XL"], description: "Soft mock-neck sweatshirt with ribbed cuffs — smart enough for the office, warm enough for winter.", stock: 28 },
  { id: "p6", name: "Classic Formal Shirt", price: 2999, category: "Formal", collection: "shirts", gender: "men", image: u("photo-1596755094514-f87e34085b2c"), colors: ["White", "Light Blue"], sizes: ["S", "M", "L", "XL", "XXL"], description: "Crisp cotton formal shirt with a clean collar and buttoned cuffs.", stock: 35 },
  { id: "p7", name: "Italian Collar Shirt", price: 3299, category: "Italian", collection: "shirts", gender: "men", image: u("photo-1611312449408-fcece27cdbb7"), colors: ["White", "Beige"], sizes: ["M", "L", "XL"], description: "Italian collar shirt in premium cotton — a sharp, modern look.", stock: 22 },
  { id: "p8", name: "Cuban Collar Shirt", price: 2799, category: "Cuban Collar", collection: "shirts", gender: "men", image: u("photo-1602810318383-e386cc2a3ccf"), colors: ["Olive", "Cream"], sizes: ["S", "M", "L", "XL"], description: "Relaxed Cuban collar shirt, breathable and easy to wear.", stock: 26 },
  { id: "p9", name: "Denim Shirt", price: 3199, category: "Denim", collection: "shirts", gender: "men", image: u("photo-1543076447-215ad9ba6923"), colors: ["Blue Denim", "Dark Denim"], sizes: ["M", "L", "XL", "XXL"], description: "Sturdy denim shirt with chest pockets — a timeless casual layer.", stock: 18 },
  { id: "p10", name: "Knitted Polo", price: 2899, category: "Knitted Polos", collection: "shirts", gender: "men", image: u("photo-1621072156002-e2fccdc0b176"), colors: ["Navy", "Cream"], sizes: ["S", "M", "L", "XL"], description: "Soft knitted polo with a refined collar — smart casual, done right.", stock: 20 },
  { id: "p11", name: "Essential White T-Shirt", price: 1499, category: "T-Shirts", collection: "shirts", gender: "men", image: u("photo-1521572163474-6864f9cf17ab"), colors: ["White", "Black"], sizes: ["S", "M", "L", "XL", "XXL"], description: "Premium cotton crew-neck tee. The one every wardrobe needs.", stock: 60 },
  { id: "p12", name: "Slim Stretch Jeans", price: 3999, category: "Jeans", collection: "pants", gender: "men", image: u("photo-1541099649105-f69ad21f3246"), colors: ["Dark Blue", "Black"], sizes: ["30", "32", "34", "36", "38"], description: "Slim-fit stretch jeans with a clean dark wash.", stock: 32 },
  { id: "p13", name: "Smart Fit Cotton Trousers", price: 3499, category: "Smart Fit Cotton", collection: "pants", gender: "men", image: u("photo-1594633312681-425c7b97ccd1"), colors: ["Beige", "Navy", "Grey"], sizes: ["30", "32", "34", "36", "38"], description: "Smart-fit cotton trousers, tapered leg, comfortable all day.", stock: 25 },
  { id: "p14", name: "Gurkha Trousers", price: 4299, category: "Gurkha", collection: "pants", gender: "men", image: u("photo-1542272604-787c3835535d"), colors: ["Khaki", "Olive"], sizes: ["30", "32", "34", "36"], description: "High-waisted Gurkha trousers with side adjusters — a classic, tailored cut.", stock: 15 },
  // Ladies — 11 products
  { id: "l1", name: "Ladies Quilted Puffer Jacket", price: 7999, oldPrice: 9499, category: "Jackets", collection: "ladies", gender: "ladies", image: u("photo-1544923246-77307dd654d3"), colors: ["Maroon", "Navy"], sizes: ["XS", "S", "M", "L", "XL"], description: "Quilted puffer jacket for ladies — warm, light and elegant.", isNew: true, stock: 20 },
  { id: "l2", name: "Ladies Wool Long Coat", price: 10999, category: "Jackets", collection: "ladies", gender: "ladies", image: u("photo-1539533018447-63fcce2678e3"), colors: ["Camel", "Grey"], sizes: ["S", "M", "L", "XL"], description: "Long wool coat with a belted waist — modest, warm and graceful.", stock: 10 },
  { id: "l3", name: "Ladies Chunky Knit Sweater", price: 3999, category: "Sweaters", collection: "ladies", gender: "ladies", image: u("photo-1618354691373-d851c5c3a990"), colors: ["Cream", "Pink"], sizes: ["XS", "S", "M", "L", "XL"], description: "Soft chunky knit sweater, cosy for cold winter days.", stock: 28 },
  { id: "l4", name: "Ladies Fleece Zip Hoodie", price: 3499, category: "Hoodies", collection: "ladies", gender: "ladies", image: u("photo-1509942774463-acf339cf87d5"), colors: ["Lavender", "Grey"], sizes: ["XS", "S", "M", "L"], description: "Brushed fleece hoodie with a full zip and warm hood.", stock: 30 },
  { id: "l5", name: "Ladies Crew Sweatshirt", price: 2999, category: "Sweatshirts", collection: "ladies", gender: "ladies", image: u("photo-1620799140408-edc6dcb6d633"), colors: ["Beige", "Mint"], sizes: ["XS", "S", "M", "L", "XL"], description: "Soft crew-neck sweatshirt, relaxed fit, everyday comfort.", stock: 26 },
  { id: "l6", name: "Ladies Embroidered Wool Shawl", price: 2999, category: "Shawls", collection: "ladies", gender: "ladies", image: u("photo-1601924994987-69e26d50dc26"), colors: ["Cream", "Emerald"], sizes: ["One Size"], description: "Warm embroidered wool shawl with a fine fringed edge.", isNew: true, stock: 18 },
  { id: "l7", name: "Emerald Embroidered Shawl", price: 2999, category: "Shawls", collection: "ladies", gender: "ladies", image: u("photo-1583743814966-8936f5b7be1a"), colors: ["Emerald", "Maroon"], sizes: ["One Size"], description: "Rich emerald wool shawl with delicate embroidery.", stock: 16 },
  { id: "l8", name: "Ladies Winter Co-ord Set", price: 5999, category: "Co-ord Sets", collection: "ladies", gender: "ladies", image: u("photo-1515886657613-9f3515b0c78f"), colors: ["Beige", "Navy"], sizes: ["XS", "S", "M", "L", "XL"], description: "Matching winter co-ord set — sweater and trousers in soft knit.", isNew: true, stock: 14 },
  { id: "l9", name: "Printed Khaddar Kurti", price: 3499, category: "Kurtis", collection: "ladies", gender: "ladies", image: u("photo-1595777457583-95e059d581b8"), colors: ["Teal", "Mustard"], sizes: ["XS", "S", "M", "L", "XL"], description: "Printed khaddar kurti, modest cut, warm winter fabric.", stock: 22 },
  { id: "l10", name: "Ladies Button Cardigan", price: 3799, category: "Sweaters", collection: "ladies", gender: "ladies", image: u("photo-1434389677669-e08b4cac3105"), colors: ["Cream", "Grey"], sizes: ["S", "M", "L", "XL"], description: "Soft button-front cardigan, easy to layer over kurtis and tops.", stock: 24 },
  { id: "l11", name: "Ladies Turtleneck Sweater Dress", price: 4999, category: "Sweaters", collection: "ladies", gender: "ladies", image: u("photo-1519235106638-30cc49b5dbc5"), colors: ["Black", "Wine"], sizes: ["XS", "S", "M", "L"], description: "Warm turtleneck sweater dress — modest, elegant winter dressing.", stock: 12 },
];

export const HERO_FLATLAY =
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80&auto=format&fit=crop";
export const HERO_MOBILE =
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=80&auto=format&fit=crop";

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
