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

const initialState: GalleryState = {
  artworks: [],
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

function reducer(state: GalleryState, action: GalleryAction) {
  switch (action.type) {
    case "add_artwork": {
      return { ...state, artworks: [...state.artworks, action.payLoad] };
    }

    case "remove_artwork": {
      return {
        ...state,
        artworks: state.artworks.filter((art) => art.id !== action.payLoad),
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

  return (
    <GalleryContext.Provider
      value={{ galleryState, addArtwork, removeArtwork }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  return useContext(GalleryContext);
}
