"use client";
import { ImageGrid } from "@/components/image-grid";
import React from "react";
import { SearchResults } from "./page";
import CloudinaryImage from "../../components/cloudinary-image";

export default function GalleryGrid({ images }: { images: SearchResults[]}) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResults) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            data={imageData}
            width="400"
            height="300"
            alt="an image of something"
          />
        );
      }}
    />
  );
}
