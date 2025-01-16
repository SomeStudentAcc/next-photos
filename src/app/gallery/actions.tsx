"use server";
import cloudinary from "cloudinary";

export async function setAsFav(publicId: string, isFav: boolean) {
  if (isFav) {
    await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
    
  } else {
    await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
}

}
