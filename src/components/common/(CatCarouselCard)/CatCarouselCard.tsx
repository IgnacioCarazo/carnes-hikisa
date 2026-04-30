"use client";
import React from "react";

import TiltedCard from "../(TiltedCard)/TiltedCard";

interface CatCarouselCardProps {
  title: string;
  image: string;
  isActive: boolean;
}

export default function CatCarouselCard({
  title,
  image,
  isActive,
}: CatCarouselCardProps) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <TiltedCard
        imageSrc={image} 
        altText={title}
        captionText={title}
        containerHeight="100%"
        containerWidth="100%"
        imageHeight="100%"
        imageWidth="100%"
        scaleOnHover={1.05}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent={isActive}
        overlayContent={
          isActive ? (
            <p className="absolute top-4 left-4 bg-black/60 text-white px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap backdrop-blur-sm select-none">
              {title}
            </p>
          ) : null
        }
      />
    </div>
  );
}
