import { Outlet } from "react-router";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";

import Footer from "../components/Footer";
import { ArtworkResponseSchema } from "../schemas/artworkResponseSchema";
import { useState } from "react";

const MainLayout = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(
    "https://api.artic.edu/api/v1/artworks?limit=20"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    if (query.trim().length > 0 && query.trim().length < 4) {
      alert("The search must contain at least 4 characters");
      return;
    }

    if (!query.trim()) {
      setIsSearch(false);
      setUrl("https://api.artic.edu/api/v1/artworks?limit=20");
      setSearchQuery("");
      return;
    }

    const fields =
      "id,title,artist_title,image_id,date_display,medium_display,place_of_origin";
    setUrl(
      `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
        query
      )}&fields=${fields}&limit=20`
    );
    setIsSearch(true);
    setSearchQuery(query);
  };

  const resetSearch = () => {
    setIsSearch(false);
    setSearchQuery("");
    setUrl("https://api.artic.edu/api/v1/artworks?limit=20");
  };

  const {
    data: artworksResults,
    error: artworksError,
    loading: artworksLoading,
  } = useFetch(url, ArtworkResponseSchema);

  const artworks = artworksResults?.data;

  return (
    <>
      <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-gradient-to-br from-[#1e1e70] via-[#6c27b3] to-[#ffb703] text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#00ffff33] blur-[150px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#ff008033] blur-[150px] rounded-full"></div>
        </div>

        <Header handleSearch={handleSearch} resetSearch={resetSearch} />

        {artworksError && (
          <div className="alert alert-error mt-6 max-w-md shadow-lg">
            <span>{artworksError}</span>
          </div>
        )}

        <Outlet
          context={{
            isSearch,
            artworks,
            artworksLoading,
            artworksError,
            searchQuery,
          }}
        />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
