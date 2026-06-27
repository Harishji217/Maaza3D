export interface Product {
  id: string;
  name: string;
  subName: string;
  price: string;
  description: string;
  folderPath: string;
  themeColor: string;
  gradient: string;
  features: string[];
  stats: { label: string; val: string }[];
  section1: { title: string; subtitle: string };
  section2: { title: string; subtitle: string };
  section3: { title: string; subtitle: string };
  section4: { title: string; subtitle: string };
  detailsSection: { title: string; description: string; imageAlt: string };
  freshnessSection: { title: string; description: string };
  buyNowSection: {
    price: string;
    unit: string;
    processingParams: string[];
    deliveryPromise: string;
    returnPolicy: string;
  };
}

export const products: Product[] = [
  {
    id: "mango",
    name: "Cream Mango",
    subName: "Pure sunshine.",
    price: "₹120",
    description: "Rich in Vitamin C - No preservatives - 100% fruit",
    folderPath: "/images/mango",
    themeColor: "#FFB74D",
    gradient: "linear-gradient(135deg, #FFB74D 0%, #FFA726 100%)",
    features: ["Rich in Vitamin C", "No preservatives", "100% fruit"],
    stats: [{ label: "Sugar", val: "0g" }, { label: "Water", val: "0%" }, { label: "Pulp", val: "100%" }],
    section1: { title: "Cream Mango.", subtitle: "Pure sunshine." },
    section2: { title: "Bursting with fresh mango.", subtitle: "Hand-picked Alphonso mangoes, perfectly ripened under the summer sun." },
    section3: { title: "Vitamin-packed refreshment.", subtitle: "A natural energy boost that revitalizes your body and mind instantly." },
    section4: { title: "Made from fruit, not concentrate.", subtitle: "" },
    detailsSection: {
      title: "The King of Fruits",
      description: "Our Cream Mango juice uses only the finest Ratnagiri Alphonso mangoes. Known for their rich sweetness and vibrant color, these mangoes are cold-pressed within hours of harvest to preserve every drop of nutrient-rich goodness. It's not just juice; it's a liquid gold experience.",
      imageAlt: "Mango Details"
    },
    freshnessSection: {
      title: "Farm to Bottle",
      description: "We believe in absolute transparency. From the orchard to the bottle, our process is designed to minimize oxidation and maximize flavor. HPP (High Pressure Processing) ensures that our juice stays safe and fresh without any heat treatment, keeping the vital enzymes and vitamins intact."
    },
    buyNowSection: {
      price: "₹120",
      unit: "per 300ml bottle",
      processingParams: ["Cold Pressed", "Never Heated", "HPP Treated"],
      deliveryPromise: "Next-day delivery available in metro cities. Chilled packaging ensures peak freshness.",
      returnPolicy: "100% Satisfaction Guarantee. Not happy? We'll replace it, no questions asked."
    }
  }
];
