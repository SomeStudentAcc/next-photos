import React from "react";
import UploadButton from "./upload-button";
import cloudinary from "cloudinary";
import GalleryGrid from "./galleryDrid";
import SearchForm from "./search-form";
export type SearchResults = {
  public_id: string;
  tags: string[];
  filename?: string;
};

export default async function Gallary({
  searchParams: { search },
}: {
  searchParams: {
    search: string;
  };
}) {
  let results 
  try {
    results = (await cloudinary.v2.search
      .expression(`resource_type:image${search ? ` AND tags=${search}` : ""}`)
      .sort_by("public_id", "desc")
      .max_results(1000)
      .with_field("tags")
      .execute()) as { resources: SearchResults[] };
  } catch (error) {
    console.error("Error fetching Cloudinary data:", error);
  }

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Gallery</h1>
          <UploadButton />
        </div>
        <SearchForm initialSearch={search}/>
        <GalleryGrid images={results?.resources} />
      </div>
    </section>
  );
}
