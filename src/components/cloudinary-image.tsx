/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Heart, HeartIcon } from "lucide-react";
import { CldImage } from "next-cloudinary";
import React, { useState, useTransition } from "react";
import { setAsFav } from "../app/gallery/actions";
import { SearchResults } from "../app/gallery/page";
import { ImageMenu } from "./image-menu";

export default function CloudinaryImage(props:any & {
  data: SearchResults;
  onUnHeart?: (unHeartedResource: SearchResults) => void;
}) {
  const { data, onUnHeart } = props; // Destructure the props
  const [isFavorited, setFavorited] = useState(
    data?.tags?.includes("favorite")
  );
  const [transition, startTransition] = useTransition();

  const handleUnHeart = () => {
    // Trigger the un-heart action passed via props
    if (onUnHeart) {
      onUnHeart(data); // Call onUnHeart if it's provided
    }
    setFavorited(false); // Update local state
    startTransition(() => {
      setAsFav(data.public_id, false); // Update favorite state in your DB or API
    });
  };

  const handleHeart = () => {
    setFavorited(true); // Update local state
    startTransition(() => {
      setAsFav(data.public_id, true); // Update favorite state in your DB or API
    });
  };

  return (
    <div className="relative">
      <CldImage
        src={data?.public_id}
        alt="Cloudinary Image"
        width={400}
        height={300}
      />
      {isFavorited ? (
        <HeartIcon
          onClick={handleUnHeart} // Only attach the click handler to the HeartIcon component
          className="absolute top-2 left-2 cursor-pointer text-red-400"
        />
      ) : (
        <Heart
          onClick={handleHeart} // Only attach the click handler to the Heart component
          className="absolute top-2 left-2 cursor-pointer hover:text-red-400"
        />
      )}
      <ImageMenu image={data}/>
    </div>
  );
}
