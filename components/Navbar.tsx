"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 160], ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.72)"]);
  const borderColor = useTransform(scrollY, [0, 160], ["rgba(255,255,255,0.12)", "rgba(17,17,17,0.10)"]);

  return (
    <motion.header
      style={{ background, borderColor }}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-full border px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl md:px-6"
    >
      <nav className="flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-white shadow-glow">
            <BananaBoltIcon />
          </span>
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-xl font-black text-transparent">
            Nano Banana
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-bold text-black/65 md:flex">
          <a href="#details" className="transition hover:text-black">Craft</a>
          <a href="#freshness" className="transition hover:text-black">Freshness</a>
          <a href="#buy" className="transition hover:text-black">Shop</a>
        </div>

        <a
          href="#buy"
          className="rounded-full bg-black px-5 py-3 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-orange-500"
        >
          Order Now
        </a>
      </nav>
    </motion.header>
  );
}

function BananaBoltIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.8 2.6C10.7 5.2 7.9 9.3 7.3 14.2c-.3 2.2.7 4.4 2.6 5.7 1.8 1.2 4.3 1.3 6.3.2 2.5-1.4 4-4.2 4-7.7-2.7 2.3-5.9 2.8-9.6 1.6 3.2-1.8 4.9-5.6 4.2-11.4Z"
        fill="url(#bananaBolt)"
      />
      <path d="M11.9 8.2 7.5 14h4l-1.1 5.2 5.1-7.1h-4l.4-3.9Z" fill="#111" />
      <defs>
        <linearGradient id="bananaBolt" x1="5.5" y1="2.6" x2="20.5" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F97316" />
        </linearGradient>
      </defs>
    </svg>
  );
}
