"use client";

import Image from "next/image";
import { useMemo } from "react";

type Props = {
  src: string;
  alt?: string;
  priority?: boolean;
  quality?: number;
  objectPosition?: string;
  placeholderColor?: string;
  className?: string;
  onLoad?: () => void;
};

const blurCache = new Map<string, string>();

function toBlurDataURL(color = "#000"): string {
  if (blurCache.has(color)) return blurCache.get(color)!;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='10' height='7'><rect width='100%' height='100%' fill='${color}'/></svg>`;
  const base64 =
    typeof window === "undefined"
      ? Buffer.from(svg).toString("base64")
      : window.btoa(unescape(encodeURIComponent(svg)));
  const url = `data:image/svg+xml;base64,${base64}`;
  blurCache.set(color, url);
  return url;
}

export function BackgroundImage({
  src, alt = "", priority = false, quality = 75,
  objectPosition = "center", placeholderColor = "#0b0b0b",
  className, onLoad,
}: Props) {
  const blurDataURL = useMemo(() => toBlurDataURL(placeholderColor), [placeholderColor]);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
      quality={quality}
      style={{ objectFit: "cover", objectPosition }}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={className}
      onLoad={onLoad}
    />
  );
}

export default BackgroundImage;
