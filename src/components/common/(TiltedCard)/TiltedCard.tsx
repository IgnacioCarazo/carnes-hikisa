"use client";
import type { SpringOptions } from "motion/react";
import { motion, useSpring } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.05,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const scale = useSpring(1, springValues);

  return (
    <figure
      ref={ref}
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseEnter={() => scale.set(scaleOnHover)}
      onMouseLeave={() => scale.set(1)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ width: imageWidth, height: imageHeight, scale }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover rounded-[4px] will-change-transform"
          sizes="(max-width: 768px) 100vw, 300px"
        />

        {displayOverlayContent && overlayContent && (
          <div className="absolute top-0 left-0 z-[2] w-full h-full pointer-events-none">
            {overlayContent}
          </div>
        )}
      </motion.div>
    </figure>
  );
}
