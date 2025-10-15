import type z from "zod";
import type { ArtworkSchema } from "../schemas/artworkSchema";

export type OutletContextType = {
  artworks: Artwork[] | undefined;
  loading: boolean;
  error: string | null;
};

export type Artwork = z.infer<typeof ArtworkSchema>;

export type GalleryState = {
  artworks: Artwork[];
};

export type GalleryContextType = {
  galleryState: GalleryState;
  addArtwork: (art: Artwork) => void;
  removeArtwork: (id: number) => void;
};

export type GalleryAction =
  | { type: "add_artwork"; payLoad: Artwork }
  | { type: "remove_artwork"; payLoad: number };
