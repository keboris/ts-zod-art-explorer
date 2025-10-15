import React from "react";
import type { Artwork, GalleryContextType } from "../types";
import { useGallery } from "../contexts/GalleryContext";

type ArtworkProps = {
  artwork: Artwork;
};

const ArtworkCard: React.FC<ArtworkProps> = ({ artwork }) => {
  const { galleryState, addArtwork, removeArtwork } =
    useGallery() as GalleryContextType;

  const isGallery = galleryState.artworks.some((a) => a.id === artwork.id);

  function handleClick() {
    if (isGallery) {
      removeArtwork(artwork.id);
    } else {
      addArtwork(artwork);
    }
  }
  return (
    <>
      <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform duration-300">
        <figure>
          {artwork.image_id ? (
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
              className="h-60 w-full object-cover cursor-pointer"
            />
          ) : (
            <div className="flex items-center justify-center h-60 bg-base-300">
              <span className="text-gray-500 italic">Image not available</span>
            </div>
          )}
        </figure>
        <div className="card-body">
          <h2
            className="card-title text-primary tooltip tooltip-top"
            data-tip={artwork.title}
          >
            {artwork.title.length > 30
              ? artwork.title.slice(0, 30) + "..."
              : artwork.title}
          </h2>
          <p className="text-sm text-gray-600">{artwork.artist_title}</p>
          <div className="card-actions justify-end mt-2">
            <button
              onClick={handleClick}
              className={`btn ${
                !isGallery ? "btn-primary" : "btn-error"
              } btn-sm`}
            >
              {!isGallery ? "Add to Gallery" : "Remove from Gallery"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkCard;
