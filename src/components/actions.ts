"use server";

import { SearchResults } from "@/app/gallery/page";
import cloudinary from "cloudinary";

export async function addImageToAlbum(image: SearchResults, album: string) {
  console.log(image, album);

  const res1 = await cloudinary.v2.api.create_folder(album);

  console.log(res1);


  

   await cloudinary.v2.uploader.rename(
    `${image.public_id}`,
    `${album}/${image.filename}`
  ); 
  cloudinary.v2.uploader.explicit(image.public_id, {
    type: 'upload',
    asset_folder: album,
  })
  const res = await cloudinary.v2.api.resource(`${album}/${image.filename}`);
  console.log(res);
  
}
