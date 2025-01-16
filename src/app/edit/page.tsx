'use client'; // Ensure this is a client-side component

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CldImage } from "next-cloudinary";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Import the hook for query params

export default function Edit() {
  const searchParams = useSearchParams(); // Use useSearchParams hook
  const publicId = searchParams.get("publicId"); // Get the publicId from the query parameters

  const [transformation, setTransformation] = useState<
    | undefined
    | "generative-fill"
    | "blur"
    | "grayscale"
    | "pixelate"
    | "bg-remove"
  >();

  const [pendingPrompt, setPendingPrompt] = useState("");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    // You can set a default or handle missing publicId here
    if (!publicId) {
      console.error("Public ID is missing!");
    }
  }, [publicId]);

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit {publicId}</h1>
        </div>

        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => setTransformation(undefined)}>
            Clear All
          </Button>

          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                setTransformation("generative-fill");
                setPrompt(pendingPrompt);
              }}
            >
              Apply Generative Fill
            </Button>
            <Label>Prompt</Label>
            <Input
              value={pendingPrompt}
              onChange={(e) => setPendingPrompt(e.currentTarget.value)}
            />
          </div>

          <Button onClick={() => setTransformation("blur")}>Apply Blur</Button>
          <Button onClick={() => setTransformation("grayscale")}>
            Convert to Gray
          </Button>
          <Button onClick={() => setTransformation("pixelate")}>
            Pixelate
          </Button>

          <Button onClick={() => setTransformation("bg-remove")}>
            Remove Background
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {publicId && (
            <>
              <CldImage src={publicId} width="400" height="300" alt="some image" />

              {transformation === "generative-fill" && (
                <CldImage
                  src={publicId}
                  width="1400"
                  height="900"
                  alt="some image"
                  crop="pad"
                  fillBackground={{
                    prompt,
                  }}
                />
              )}

              {transformation === "blur" && (
                <CldImage
                  src={publicId}
                  width="1200"
                  height="1400"
                  blur="800"
                  alt="some image"
                />
              )}

              {transformation === "grayscale" && (
                <CldImage
                  src={publicId}
                  width="1200"
                  height="1400"
                  grayscale
                  alt="some image"
                />
              )}

              {transformation === "pixelate" && (
                <CldImage
                  src={publicId}
                  width="1200"
                  height="1400"
                  pixelate
                  alt="some image"
                />
              )}

              {transformation === "bg-remove" && (
                <CldImage
                  src={publicId}
                  width="1200"
                  height="700"
                  removeBackground
                  alt="some image"
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
