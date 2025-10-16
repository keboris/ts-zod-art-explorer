import React from "react";
import { useGallery } from "../contexts/GalleryContext";
import ArtworkCard from "../components/ArtworkCard";
import type { GalleryContextType } from "../types";

const MyGallery: React.FC = () => {
  const { galleryState } = useGallery() as GalleryContextType;
  const gallery = true;

  return (
    <>
      <title>My Gallery | Art Explorer</title>
      <div className="min-h-screen  py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white-700 mb-8 text-center">
            My Gallery
          </h1>

          {galleryState.artworks.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              You haven’t added any artworks yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryState.artworks.map((artwork) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  gallery={gallery}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyGallery;
