"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Product } from "@/data/products";
import { ProductTextOverlays } from "./ProductTextOverlays";

const FRAME_COUNT = 120;

function frameSources(folderPath: string, frame: number) {
  const padded = String(frame).padStart(3, "0");
  return [
    `${folderPath}/${frame}.webp`,
    `${folderPath}/${padded}.webp`,
    `${folderPath}/ezgif-frame-${padded}.jpg`
  ];
}

export function ProductBottleScroll({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const currentFrameRef = useRef(0);
  const progressRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const loadedRef = useRef(false);

  const animationProgress = useMotionValue(0);
  const smoothProgress = useSpring(animationProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.25
  });
  const haloScale = useTransform(smoothProgress, [0, 1], [0.88, 1.12]);

  const frames = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, index) => index + 1),
    [product.folderPath]
  );

  useEffect(() => {
    let cancelled = false;
    loadedRef.current = false;
    imagesRef.current = [];

    const loadFrame = async (frame: number) => {
      const candidates = frameSources(product.folderPath, frame);

      for (const src of candidates) {
        const image = new Image();
        image.decoding = "async";
        image.src = src;

        try {
          await image.decode();
          return image;
        } catch {
          continue;
        }
      }

      return null;
    };

    Promise.all(frames.map(loadFrame)).then((loadedImages) => {
      if (cancelled) return;
      imagesRef.current = loadedImages.filter(Boolean) as HTMLImageElement[];
      loadedRef.current = imagesRef.current.length > 0;
      currentFrameRef.current = Math.floor(progressRef.current * (FRAME_COUNT - 1));
      drawFrame(currentFrameRef.current);
    });

    return () => {
      cancelled = true;
    };
  }, [frames, product.folderPath]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext("2d");
      context?.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const frame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latest * (FRAME_COUNT - 1))));
      if (frame === currentFrameRef.current) return;

      currentFrameRef.current = frame;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(frame));
    });
  }, [smoothProgress]);

  useEffect(() => {
    progressRef.current = 0;
    animationProgress.set(0);
    currentFrameRef.current = 0;
    drawFrame(0);
  }, [animationProgress, product.id]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateProgress = (delta: number) => {
      const next = Math.min(1, Math.max(0, progressRef.current + delta));
      progressRef.current = next;
      animationProgress.set(next);
    };

    const shouldControlAnimation = (deltaY: number) => {
      const rect = section.getBoundingClientRect();
      const heroIsActive = rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
      if (!heroIsActive) return false;

      const movingForwardBeforeEnd = deltaY > 0 && progressRef.current < 0.995;
      const movingBackwardAfterStart = deltaY < 0 && progressRef.current > 0.005 && window.scrollY <= 4;
      return movingForwardBeforeEnd || movingBackwardAfterStart;
    };

    const onWheel = (event: WheelEvent) => {
      if (!shouldControlAnimation(event.deltaY)) return;
      event.preventDefault();
      updateProgress(event.deltaY / 1600);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      if (currentY == null || touchYRef.current == null) return;

      const deltaY = touchYRef.current - currentY;
      touchYRef.current = currentY;

      if (!shouldControlAnimation(deltaY)) return;
      event.preventDefault();
      updateProgress(deltaY / 900);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [animationProgress]);

  const drawFrame = (frame: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);

    const image = imagesRef.current[frame] ?? imagesRef.current[0];
    if (!image || !loadedRef.current) {
      drawFallbackBottle(context, width, height, product);
      return;
    }

    const ratio = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * ratio;
    const drawHeight = image.naturalHeight * ratio;
    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2;
    context.drawImage(image, x, y, drawWidth, drawHeight);
  };

  return (
    <section ref={sectionRef} className="relative h-screen">
      <motion.div
        className="relative flex h-screen items-center justify-center overflow-hidden"
        style={{ background: product.gradient }}
      >
        <motion.div
          style={{ scale: haloScale, background: product.gradient }}
          className="absolute h-[min(62vw,620px)] w-[min(62vw,620px)] rounded-full opacity-45 blur-3xl"
        />
        <div className="absolute inset-x-8 top-28 z-10 hidden justify-between text-sm font-semibold uppercase tracking-[0.28em] text-black/50 md:flex">
          <span>{product.description}</span>
          <span>{product.price}</span>
        </div>
        <div className="relative z-20 h-[78vh] w-full max-w-[980px]">
          <canvas ref={canvasRef} className="h-full w-full" aria-label={`${product.name} animated bottle`} />
        </div>
        <ProductTextOverlays product={product} progress={smoothProgress} />
      </motion.div>
    </section>
  );
}

function drawFallbackBottle(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  product: Product
) {
  const bottleWidth = Math.min(width * 0.22, 190);
  const bottleHeight = Math.min(height * 0.66, 560);
  const x = width / 2 - bottleWidth / 2;
  const y = height / 2 - bottleHeight / 2;

  context.save();
  context.shadowColor = "rgba(0,0,0,0.28)";
  context.shadowBlur = 45;
  context.shadowOffsetY = 28;
  context.fillStyle = "rgba(255,255,255,0.82)";
  roundRect(context, x, y + bottleHeight * 0.16, bottleWidth, bottleHeight * 0.84, bottleWidth * 0.22);
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = product.themeColor;
  roundRect(context, x + bottleWidth * 0.13, y + bottleHeight * 0.43, bottleWidth * 0.74, bottleHeight * 0.32, 20);
  context.fill();

  context.fillStyle = "#ffffff";
  context.font = "700 24px Outfit, sans-serif";
  context.textAlign = "center";
  context.fillText("Nano", width / 2, y + bottleHeight * 0.56);
  context.fillText("Banana", width / 2, y + bottleHeight * 0.64);

  context.fillStyle = "rgba(255,255,255,0.9)";
  roundRect(context, x + bottleWidth * 0.34, y, bottleWidth * 0.32, bottleHeight * 0.2, 12);
  context.fill();
  context.restore();
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}
