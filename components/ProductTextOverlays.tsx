"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import type { Product } from "@/data/products";

type OverlayProps = {
  product: Product;
  progress: MotionValue<number>;
};

export function ProductTextOverlays({ product, progress }: OverlayProps) {
  const sections = [product.section1, product.section2, product.section3, product.section4];

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {sections.map((section, index) => (
        <OverlayText
          key={`${product.id}-${section.title}`}
          index={index}
          progress={progress}
          title={section.title}
          subtitle={section.subtitle}
        />
      ))}
    </div>
  );
}

function OverlayText({
  index,
  progress,
  title,
  subtitle
}: {
  index: number;
  progress: MotionValue<number>;
  title: string;
  subtitle: string;
}) {
  const ranges = [
    [0.02, 0.12, 0.23, 0.31],
    [0.27, 0.36, 0.47, 0.55],
    [0.51, 0.6, 0.71, 0.79],
    [0.75, 0.84, 0.94, 0.99]
  ];
  const [start, show, hide, end] = ranges[index];
  const opacity = useTransform(progress, [start, show, hide, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, show, hide, end], [50, 0, 0, -50]);
  const scale = useTransform(progress, [start, show, hide, end], [0.96, 1, 1, 0.98]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`absolute flex max-w-[760px] flex-col px-6 ${
        index % 2 === 0
          ? "left-0 top-[16vh] items-start text-left md:left-[7vw]"
          : "bottom-[16vh] right-0 items-end text-right md:right-[7vw]"
      }`}
    >
      <h2 className="text-balance text-[clamp(3.4rem,9vw,9.5rem)] font-black leading-[0.88] text-white drop-shadow-[0_18px_45px_rgba(0,0,0,0.24)]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-5 max-w-xl text-balance text-lg font-semibold leading-7 text-white/86 md:text-2xl md:leading-9">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
}
