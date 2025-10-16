import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type {
  Artwork,
  GalleryAction,
  GalleryContextType,
  GalleryState,
} from "../types";
import { NoteSchema } from "../schemas/noteSchema";

const initialState: GalleryState = {
  artworks: [],
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

function reducer(state: GalleryState, action: GalleryAction) {
  switch (action.type) {
    case "add_artwork": {
      return { ...state, artworks: [action.payLoad, ...state.artworks] };
    }

    case "remove_artwork": {
      return {
        ...state,
        artworks: state.artworks.filter((art) => art.id !== action.payLoad),
      };
    }

    case "add_update_note": {
      return {
        ...state,
        artworks: state.artworks.map((a) =>
          a.id === action.payLoad.artworkId
            ? { ...a, note: action.payLoad.note }
            : a
        ),
      };
    }

    default:
      throw new Error(`Unknown action type: ${(action as any).type}`);
  }
}

export default function GalleryContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [galleryState, dispatch] = useReducer(reducer, initialState, () => {
    const saved = localStorage.getItem("gallery");
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(galleryState));
  }, [galleryState]);

  function addArtwork(art: Artwork) {
    dispatch({ type: "add_artwork", payLoad: art });
  }

  function removeArtwork(id: number) {
    dispatch({ type: "remove_artwork", payLoad: id });
  }

  function addOrUpdateNote(artworkId: number, note: string) {
    const parsed = NoteSchema.safeParse({ text: note });
    if (!parsed.success) {
      alert(parsed.error.message);
      return;
    }
    dispatch({
      type: "add_update_note",
      payLoad: { artworkId, note: parsed.data.text },
    });
  }

  return (
    <GalleryContext.Provider
      value={{ galleryState, addArtwork, removeArtwork, addOrUpdateNote }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  return useContext(GalleryContext);
}
