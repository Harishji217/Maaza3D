"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductBottleScroll } from "@/components/ProductBottleScroll";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

export default function Home() {
  const product = products[0];

  useEffect(() => {
    document.documentElement.style.setProperty("--product-gradient", product.gradient);
    window.scrollTo(0, 0);
  }, [product.gradient]);

  return (
    <main id="top" className="min-h-screen overflow-hidden">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white"
      >
        <ProductBottleScroll product={product} />
        <ProductDetails product={product} />
        <Freshness product={product} />
        <BuyNow product={product} />
        <FinalCTA product={product} />
      </motion.div>

      <Footer />
    </main>
  );
}

function ProductDetails({ product }: { product: Product }) {
  return (
    <section id="details" className="relative bg-white px-6 py-28 text-black md:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <p className="text-sm font-black uppercase tracking-[0.28em]" style={{ color: product.themeColor }}>
            {product.subName}
          </p>
          <h2 className="mt-4 max-w-3xl text-balance text-[clamp(3rem,7vw,6.8rem)] font-black leading-[0.9]">
            {product.detailsSection.title}
          </h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-black/62">
            {product.detailsSection.description}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="grid gap-4">
            {product.stats.map((stat) => (
              <div key={stat.label} className="flex items-end justify-between border-b border-black/10 pb-5">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-black/45">{stat.label}</span>
                <span className="text-5xl font-black">{stat.val}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Freshness({ product }: { product: Product }) {
  return (
    <section id="freshness" className="bg-neutral-100 px-6 py-28 text-black md:py-36">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div
            className="grid aspect-square place-items-center rounded-[8px] p-8 text-center text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)]"
            style={{ background: product.gradient }}
            aria-label={product.detailsSection.imageAlt}
          >
            <div>
              <p className="text-8xl font-black leading-none">0%</p>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.26em]">Heat Damage</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-black/45">Freshness System</p>
          <h2 className="mt-4 text-balance text-[clamp(2.8rem,6vw,6rem)] font-black leading-[0.92]">
            {product.freshnessSection.title}
          </h2>
          <p className="mt-7 text-lg leading-8 text-black/62">
            {product.freshnessSection.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {product.features.map((feature) => (
              <span key={feature} className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-black">
                {feature}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BuyNow({ product }: { product: Product }) {
  return (
    <section id="buy" className="bg-white px-6 py-28 text-black md:py-36">
      <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-[1fr_0.9fr]">
        <Reveal>
          <p className="text-sm font-black uppercase tracking-[0.28em]" style={{ color: product.themeColor }}>
            Ready to chill
          </p>
          <h2 className="mt-4 text-balance text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.9]">
            {product.name}
          </h2>
          <p className="mt-5 text-xl font-bold text-black/56">{product.description}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[8px] border border-black/10 bg-neutral-50 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.08)]">
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="text-6xl font-black">{product.buyNowSection.price}</p>
                <p className="mt-2 text-sm font-bold text-black/48">{product.buyNowSection.unit}</p>
              </div>
              <button className="grid h-14 w-14 place-items-center rounded-full bg-black text-white transition hover:scale-105" aria-label="Add to cart">
                <ShoppingBag size={22} />
              </button>
            </div>

            <div className="mt-8 grid gap-3">
              {product.buyNowSection.processingParams.map((param) => (
                <div key={param} className="flex items-center justify-between rounded-[8px] bg-white px-4 py-4 text-sm font-black">
                  <span>{param}</span>
                  <span style={{ color: product.themeColor }}>Verified</span>
                </div>
              ))}
            </div>

            <p className="mt-7 text-sm leading-6 text-black/58">{product.buyNowSection.deliveryPromise}</p>
            <p className="mt-3 text-sm font-bold leading-6 text-black/70">{product.buyNowSection.returnPolicy}</p>

            <button
              className="mt-8 w-full rounded-full px-6 py-5 text-base font-black text-white shadow-glow transition hover:-translate-y-0.5"
              style={{ background: product.gradient }}
            >
              Add {product.name} to Cart
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FinalCTA({ product }: { product: Product }) {
  return (
    <section className="bg-white px-6 pb-28">
      <Reveal>
        <a
          href="#buy"
          className="clip-slant mx-auto flex min-h-36 w-full max-w-6xl items-center justify-center px-8 py-10 text-center text-white transition hover:scale-[1.01]"
          style={{ background: product.gradient }}
        >
          <span className="text-balance text-[clamp(2rem,5vw,5rem)] font-black leading-none">
            Bring home Cream Mango
          </span>
        </a>
      </Reveal>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
