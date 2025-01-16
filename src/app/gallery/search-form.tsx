"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForm({ initialSearch }: { initialSearch: string | undefined }) {
  // Provide an empty string as a fallback if initialSearch is undefined
  const [tagName, setTagName] = useState(initialSearch ?? "");

  const router = useRouter();

  useEffect(() => {
    // Update tagName when initialSearch changes
    setTagName(initialSearch ?? "");
  }, [initialSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.replace(`/gallery?search=${encodeURIComponent(tagName)}`);
        router.refresh();
      }}
    >
      <Label htmlFor="tag-name" className="text-right">
        Search By Tag
      </Label>
      <div className="flex gap-2">
        <Input
          onChange={(e) => setTagName(e.target.value)}
          id="tag-name"
          value={tagName} // Ensure value is always a string
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}
