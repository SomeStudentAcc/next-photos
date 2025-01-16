"use client";

import { ImageGrid } from "@/components/image-grid";
import { SearchResults } from "../gallery/page";
import CloudinaryImage from "@/components/cloudinary-image";
;

export default function AlbumGrid({ images }: { images: SearchResults[] }) {
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