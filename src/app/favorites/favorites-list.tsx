"use client";

import { useEffect, useState } from "react";
import { ImageGrid } from "@/components/image-grid";
import { SearchResults } from "../gallery/page";
import CloudinaryImage from "@/components/cloudinary-image";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResults[];
}) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <ImageGrid
      images={resources}
      getImage={(imageData: SearchResults) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            data={imageData}
            width="400"
            height="300"
            alt="an image of something"
            onUnheart={(unheartedResource: SearchResults) => {
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) =>
                    resource.public_id !== unheartedResource.public_id
                )
              );
            }}
          />
        );
      }}
    />
  );
}
