import React from "react";
import { useOutletContext } from "react-router";
import type { Artwork, OutletContextType } from "../types";
import ArtworkCard from "../components/ArtworkCard";

const Home: React.FC = () => {
  const { artworks, loading, error } = useOutletContext<OutletContextType>();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <>
      {artworks?.map((art: Artwork) => (
        <ArtworkCard key={art.id} artwork={art} />
      ))}
    </>
  );
};

export default Home;
