import React from "react";
import cloudinary from "cloudinary";
import { SearchResults } from "../gallery/page";
import ForceRefresh from "@/components/force-refresh";
import FavoritesList from "./favorites-list";

export default async function Favorites() {
  let results;
  try {
    results = (await cloudinary.v2.search
      .expression("resource_type:image AND tags=favorite")
      .sort_by("created_at", "desc")
      .with_field("tags")
      .max_results(30)
      .execute()) as { resources: SearchResults[] };
    console.log(results);
  } catch (error) {
    console.log(error);
  }

  return (
    <section>
      <ForceRefresh />
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Favorite</h1>
        </div>
      </div>

      <FavoritesList initialResources={results?.resources} />
    </section>
  );
}
