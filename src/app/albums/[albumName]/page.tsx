import React from "react";
import cloudinary from "cloudinary";
import AlbumGrid from "../album-grid";
import ForceRefresh from "@/components/force-refresh";
export type SearchResults = {
  public_id: string;
  tags: string[];
};

export default async function Gallary({params:{albumName}}) {
    const results = (await cloudinary.v2.search
        .expression(`resource_type:image AND folder=${albumName}`)
        .sort_by("created_at", "desc")
        .with_field("tags")
        .max_results(30)
        .execute()) as { resources: SearchResults[] };
        console.log(results);
        

  return (
    <section>
      <ForceRefresh/>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Album {albumName}</h1>
        </div>

        <AlbumGrid images={results?.resources} />
      </div>
    </section>
  );
}
