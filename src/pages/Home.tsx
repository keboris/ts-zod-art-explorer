import React from "react";
import { useOutletContext } from "react-router";
import type { Artwork, OutletContextType } from "../types";
import ArtworkCard from "../components/ArtworkCard";

const Home: React.FC = () => {
  const { isSearch, artworks, loading, error, searchQuery } =
    useOutletContext<OutletContextType>();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <>
      <title>
        {isSearch ? `Search - ${searchQuery} | Art Explorer` : "Art Explorer"}
      </title>

      <div className="min-h-screen  py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white-700 mb-8 text-center">
            {searchQuery ? (
              <>
                Results for:{" "}
                <span className="text-pink-500">{searchQuery}</span>{" "}
              </>
            ) : (
              "Artworks"
            )}
          </h1>

          <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks?.map((art: Artwork) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
