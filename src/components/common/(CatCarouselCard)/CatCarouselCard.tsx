"use client";
import React from "react";

import TiltedCard from "../(TiltedCard)/TiltedCard";

type CategoryId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface CatCarouselCardProps {
  number: number;
  isActive: boolean;
}

const categoriesData: Record<CategoryId, { title: string; img: string }> = {
  1: {
    title: "Carnes de Res",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
  },
  2: {
    title: "Carnes de Cerdo",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
  },
  3: {
    title: "Pollo",
    img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=600&auto=format&fit=crop",
  },
  4: {
    title: "Frutos del Mar",
    img: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=600&auto=format&fit=crop",
  },
  5: {
    title: "Embutidos",
    img: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=600&auto=format&fit=crop",
  },
  6: {
    title: "Paquetería",
    img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=600&auto=format&fit=crop",
  },
  7: {
    title: "Lacteos",
    img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=600&auto=format&fit=crop",
  },
  8: {
    title: "Carnitas Adobadas",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
  },
};

export default function CatCarouselCard({
  number,
  isActive,
}: CatCarouselCardProps) {
  const data = categoriesData[number as CategoryId] || categoriesData[1];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <TiltedCard
        imageSrc={data.img}
        altText={data.title}
        captionText={data.title}
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
              {data.title}
            </p>
          ) : null
        }
      />
    </div>
  );
}
