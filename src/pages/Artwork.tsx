import React, { useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { useGallery } from "../contexts/GalleryContext";
import type { GalleryContextType, OutletContextType } from "../types";

const Artwork: React.FC = () => {
  const { artworks } = useOutletContext<OutletContextType>();
  const { id } = useParams<{ id: string }>();
  const artwork = artworks?.find((a) => a.id.toString() === id);

  const { galleryState, addArtwork, removeArtwork } =
    useGallery() as GalleryContextType;

  const isGallery = artwork
    ? galleryState.artworks.some((a) => a.id === artwork.id)
    : false;

  const [alert, setAlert] = useState<string>("");

  if (!artwork) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center text-xl text-gray-600">Artwork not found.</p>
      </div>
    );
  }

  const handleClick = () => {
    if (!artwork) return;

    if (isGallery) {
      removeArtwork(artwork.id);
      setAlert("Removed from Gallery 💔");
    } else {
      addArtwork(artwork);
      setAlert("Added to Gallery ❤️");
    }

    setTimeout(() => setAlert(""), 2000);
  };

  return (
    <>
      <title>{artwork.title} | Art Explorer</title>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col items-center justify-start py-10 px-4 mt-6">
        {/* Container central */}
        <div className="max-w-5xl w-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center bg-gray-100">
            {artwork.image_id ? (
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                className="w-full h-full object-cover max-h-[600px] rounded-2xl"
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-200">
                <span className="text-gray-500 italic">
                  Image not available
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-700 mb-2">
                {artwork.title}
              </h1>
              <p className="text-lg text-gray-600 italic mb-6">
                {artwork.artist_title || "Unknown Artist"}
              </p>

              <div className="flex flex-wrap gap-6 text-gray-500 mb-6">
                {artwork.date_display && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 48 48"
                      version="1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#CFD8DC"
                        d="M5 38V14h38v24c0 2.2-1.8 4-4 4H9c-2.2 0-4-1.8-4-4"
                      />
                      <path
                        fill="#F44336"
                        d="M43 10v6H5v-6c0-2.2 1.8-4 4-4h30c2.2 0 4 1.8 4 4"
                      />
                      <g fill="#B71C1C">
                        <circle cx="33" cy="10" r="3" />
                        <circle cx="15" cy="10" r="3" />
                      </g>
                      <path
                        d="M33 3c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2M15 3c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2"
                        fill="#B0BEC5"
                      />
                      <path
                        d="M13 20h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm-18 6h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm-18 6h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4zm6 0h4v4h-4z"
                        fill="#90A4AE"
                      />
                    </svg>
                    <span>{artwork.date_display}</span>
                  </div>
                )}
                {artwork.place_of_origin && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 mr-2"
                      viewBox="-5.07 0 43.012 43.012"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="location"
                        d="M406.185,260.012c-18.028-13.493-16.233-28.572-16.233-28.572h11.184a4.7,4.7,0,0,0-.142,1.1,5.378,5.378,0,0,0,.466,2.1,7.353,7.353,0,0,0,2.622,2.615,5,5,0,0,0,4.218,0,7.316,7.316,0,0,0,2.619-2.615,5.4,5.4,0,0,0,.465-2.105,4.728,4.728,0,0,0-.141-1.1h11.5S424.217,246.277,406.185,260.012Zm4.731-29.576a7.353,7.353,0,0,0-2.619-2.618,4.977,4.977,0,0,0-4.211,0,7.389,7.389,0,0,0-2.622,2.618,6.468,6.468,0,0,0-.326,1H389.966c0-7.972,7.335-14.435,16.383-14.435s16.383,6.463,16.383,14.435H411.242A6.523,6.523,0,0,0,410.915,230.436Z"
                        transform="translate(-389.902 -217)"
                        fill="#2d5be2"
                      />
                    </svg>
                    <span>{artwork.place_of_origin}</span>
                  </div>
                )}
              </div>

              {artwork.medium_display && (
                <p className="mb-4 text-gray-600">
                  <strong>Medium:</strong> {artwork.medium_display}
                </p>
              )}
              {artwork.description && (
                <p className="mb-6 text-gray-600">
                  <strong>Description:</strong> {artwork.description}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleClick}
                className={`btn w-full max-w-sm flex items-center justify-center gap-2 text-white border-none rounded-full shadow-md transition-colors duration-300 ${
                  !isGallery
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                    : "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
                }`}
              >
                {!isGallery ? "Add to Gallery" : "Remove from Gallery"}
              </button>
            </div>

            {alert && (
              <div className="text-center mt-4 text-green-600 animate-fade">
                {alert}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Artwork;
