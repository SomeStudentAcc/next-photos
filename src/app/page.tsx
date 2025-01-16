"use client";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";

export type uploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function Home() {
  const [imageId, setImageId] = useState("bitbpmrwvox9eznm4cfd");
  return (
    <main className="flex min-h-screen flex-col items-center">
      <CldUploadButton
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess={(result: uploadResult) => {
          setImageId(result.info.public_id);
          console.log(result.info.public_id);
        }}
        uploadPreset="Qwerty"
      />

      {imageId && (
        <CldImage
          width="400"
          height="400"
          tint="70:blue:purple"
          src={imageId}
          sizes="100vw"
          alt="Description of my image"
        />
      )}
    </main>
  );
}
