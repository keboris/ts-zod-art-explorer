import React, { useEffect, useState } from "react";
import type { ArtworkWithNote, GalleryContextType } from "../types";
import { useGallery } from "../contexts/GalleryContext";
import { Link } from "react-router";

type ArtworkProps = {
  artwork: ArtworkWithNote;
  gallery?: boolean;
};

const ArtworkCard: React.FC<ArtworkProps> = ({ artwork, gallery }) => {
  const { galleryState, addArtwork, removeArtwork, addOrUpdateNote } =
    useGallery() as GalleryContextType;

  const isGallery = galleryState.artworks.some((a) => a.id === artwork.id);

  const [alert, setAlert] = useState<string>("");

  function handleClick() {
    if (isGallery) {
      removeArtwork(artwork.id);
      setAlert("Removed from Gallery 💔");
    } else {
      addArtwork(artwork);
      setAlert("Added to Gallery ❤️");
    }
  }

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(""), 2000);
    return () => clearTimeout(timer);
  }, [alert]);

  return (
    <>
      <div className="card bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-xl border border-purple-200 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 rounded-2xl overflow-hidden">
        <figure>
          <Link to={`/artwork/${artwork.id}`}>
            {artwork.image_id ? (
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                className="h-60 w-full object-cover cursor-pointer"
              />
            ) : (
              <div className="flex items-center justify-center h-60 bg-base-300">
                <span className="text-gray-500 italic">
                  Image not available
                </span>
              </div>
            )}
          </Link>
        </figure>
        <div className="card-body px-5 py-4">
          <h2
            className="card-title text-sm font-semibold text-purple-700 tooltip tooltip-top"
            data-tip={artwork.title}
          >
            {artwork.title.length > 25
              ? artwork.title.slice(0, 25) + "..."
              : artwork.title}
          </h2>
          <p className="text-sm text-gray-600 mb-2 italic">
            {artwork.artist_title || "Unknow Artist"}
          </p>

          <div className="flex flex-col gap-1 text-sm text-gray-500">
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

          {gallery && (
            <div className="mt-6">
              <label className="block text-black mb-1 font-semibold">
                Your Note
              </label>
              <textarea
                className="w-full p-2 rounded-lg bg-white/10 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Write a short note about this artwork..."
                value={artwork.note || ""}
                onChange={(e) => addOrUpdateNote(artwork.id, e.target.value)}
                rows={3}
              />
            </div>
          )}

          <div className="card-actions justify-center mt-2">
            <button
              onClick={handleClick}
              className={`btn  w-full flex items-center justify-center gap-2 text-white border-none rounded-full shadow-md transition-colors duration-300 ${
                !isGallery
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  : "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700"
              } btn-sm`}
            >
              {!isGallery ? "Add to Gallery" : "Remove from Gallery"}
            </button>
          </div>

          {alert && (
            <div className="text-xs font-bold text-center mt-3 text-green-600 animate-fade">
              {alert}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ArtworkCard;
