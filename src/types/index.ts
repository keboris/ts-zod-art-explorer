import type z from "zod";
import type { ArtworkSchema } from "../schemas/artworkSchema";

export type OutletContextType = {
  isSearch: boolean;
  artworks: Artwork[] | undefined;
  loading: boolean;
  error: string | null;
  searchQuery: string | null;
};

export type Artwork = z.infer<typeof ArtworkSchema>;

export type GalleryContextType = {
  galleryState: GalleryState;
  addArtwork: (art: Artwork) => void;
  removeArtwork: (id: number) => void;
  addOrUpdateNote: (artworkId: number, note: string) => void;
};

export type GalleryAction =
  | { type: "add_artwork"; payLoad: Artwork }
  | { type: "remove_artwork"; payLoad: number }
  | {
      type: "add_update_note";
      payLoad: { artworkId: number; note: string };
    };

export type ArtworkWithNote = Artwork & {
  note?: string;
};

export type GalleryState = {
  artworks: ArtworkWithNote[];
};
