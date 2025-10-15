import { Outlet } from "react-router";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";

import Footer from "../components/Footer";
import { ArtworkResponseSchema } from "../schemas/artworkResponseSchema";

const MainLayout = () => {
  const handleSearch = (query: string) => {
    if (!query.trim()) return;
  };

  const {
    data: artworksResults,
    error: artworksError,
    loading: artworksLoading,
  } = useFetch("https://api.artic.edu/api/v1/artworks", ArtworkResponseSchema);

  const artworks = artworksResults?.data;

  return (
    <>
      <div className="min-h-screen bg-base-200 text-base-content flex flex-col items-center">
        {/* Header */}
        <Header handleSearch={handleSearch} />

        {/* Error message */}
        {artworksError && (
          <div className="alert alert-error mt-6 max-w-md shadow-lg">
            <span>{artworksError}</span>
          </div>
        )}

        {/* Gallery */}
        <main className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
          <Outlet context={{ artworks, artworksLoading, artworksError }} />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
