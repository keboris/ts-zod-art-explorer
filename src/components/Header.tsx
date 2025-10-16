import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import React from "react";
import { ArtworkResponseSchema } from "../schemas/artworkResponseSchema";
import useFetch from "../hooks/useFetch";

type HeaderProps = {
  handleSearch: (query: string) => void;
  resetSearch: () => void;
};

const Header: React.FC<HeaderProps> = ({ handleSearch, resetSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [timedQuery, setTimedQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const onFocus = () => {
    if (query.trim()) {
      setShowSuggestions(true);
      if (query !== timedQuery) {
        const timer = setTimeout(() => {
          setTimedQuery(query);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  };

  const fields =
    "id,title,artist_title,image_id,date_display,medium_display,place_of_origin";
  const searchUrl = timedQuery.trim()
    ? `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
        timedQuery
      )}&fields=${fields}`
    : "";

  const { data, error, loading } = useFetch(searchUrl, ArtworkResponseSchema);

  useEffect(() => {
    if (data?.data) setSuggestions(data.data);
    else setSuggestions([]);
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setSuggestions([]);
        setTimedQuery("");
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate("/");
    handleSearch(query);
    setSuggestions([]);
    setShowSuggestions(false);
    setTimedQuery("");
  };

  return (
    <>
      <header className="sticky top-0 z-20 w-full bg-gradient-to-r from-[#6c27b3] via-[#8f4de0] to-[#ffb703] text-white shadow-lg backdrop-blur-lg bg-opacity-90">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <Link to="/" onClick={resetSearch}>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wide flex items-center gap-2">
              🎨{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ffff] to-[#ff0080]">
                Art Explorer
              </span>
            </h1>
          </Link>

          <div className="flex gap-4 items-center">
            <Link
              to="/"
              onClick={resetSearch}
              className="btn border-0 text-dark bg-gradient-to-r from-[#00FF00] to-[#ffb703] hover:opacity-90 transition-all duration-300 shadow-md"
            >
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 -0.24 12.281 12.281"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.913 8.481C6.113 7.336 1.578 7.353.496 7.375v3.943h3.492a8.84 8.84 0 0 1 3.925-2.837"
                  fill="#498a76"
                />
                <path
                  d="M6.14 1.559a.533.533 0 0 0 .533-.533.533.533 0 0 0-.533-.533.534.534 0 0 0-.533.533.534.534 0 0 0 .533.533"
                  fill="#7dc3aa"
                />
                <path
                  d="M9.324 6.746a.84.84 0 0 0 .841-.841.84.84 0 0 0-.841-.841.84.84 0 0 0-.84.841.84.84 0 0 0 .84.841"
                  fill="#a3dac1"
                />
                <path
                  d="M4.625 11.317h7.163V8.458a8.5 8.5 0 0 0-7.163 2.859"
                  fill="#498a76"
                />
                <path
                  d="M9.324 4.573a1.334 1.334 0 0 1 1.332 1.333 1.333 1.333 0 0 1-1.332 1.332 1.334 1.334 0 0 1-1.332-1.332 1.334 1.334 0 0 1 1.332-1.333M.492 6.883c1.209-.027 6.263-.045 7.992 1.414a9.2 9.2 0 0 1 3.3-.331V3.959H.484v2.924"
                  fill="#c3ead6"
                />
                <path
                  d="M11.788 7.965a9.2 9.2 0 0 0-3.3.331C6.759 6.837 1.705 6.855.496 6.882V3.958h11.3Zm0 3.353H4.625a8.5 8.5 0 0 1 7.163-2.859Zm-11.3 0V7.373c1.081-.021 5.621-.039 7.417 1.106a8.84 8.84 0 0 0-3.925 2.836Zm4.791-9.734a1.02 1.02 0 0 0 .857.467 1.03 1.03 0 0 0 .852-.455l2.3 1.87H2.972ZM6.136.493a.533.533 0 0 1 .533.533.533.533 0 0 1-.533.533.534.534 0 0 1-.533-.533.534.534 0 0 1 .537-.534Zm5.648 2.973h-1.717L7.158 1.097c0-.024.007-.047.007-.071A1.026 1.026 0 0 0 6.14 0a1.026 1.026 0 0 0-1.027 1.026q-.001.028.006.055L2.193 3.465h-1.7a.493.493 0 0 0-.492.492v7.36a.493.493 0 0 0 .492.492h11.3a.493.493 0 0 0 .492-.492v-7.36a.493.493 0 0 0-.492-.492"
                  fill="#171a1c"
                />
                <path
                  d="M9.324 5.064a.84.84 0 0 1 .841.841.84.84 0 0 1-.841.841.84.84 0 0 1-.84-.841.84.84 0 0 1 .84-.841m0 2.173a1.333 1.333 0 0 0 1.332-1.332 1.334 1.334 0 0 0-1.332-1.332 1.334 1.334 0 0 0-1.332 1.333 1.334 1.334 0 0 0 1.332 1.332"
                  fill="#171a1c"
                />
              </svg>
              <span className="hidden md:block">Artworks</span>
            </Link>
            <Link
              to="/my-gallery"
              className="btn border-0 text-white bg-gradient-to-r from-[#ff0080] to-[#000000] hover:opacity-90 transition-all duration-300 shadow-md"
            >
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
              >
                <path
                  fill="#FFD54F"
                  d="M41,42H13c-2.2,0-4-1.8-4-4V18c0-2.2,1.8-4,4-4h28c2.2,0,4,1.8,4,4v20C45,40.2,43.2,42,41,42z"
                />
                <circle fill="#FFF9C4" cx="30" cy="16" r="3" />
                <polygon fill="#8E24AA" points="17,17.9 8,31 26,31" />
                <polygon fill="#AB47BC" points="28,23.5 22,31 34,31" />
              </svg>
              <span className="hidden md:block">My Gallery</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className="w-full max-w-3xl mt-10 px-4 relative  z-[1000]">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="relative bg-white/10 backdrop-blur-xl p-3 rounded-2xl shadow-lg border border-white/20"
        >
          <div className="flex flex-row gap-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Artwork, artist..."
              className="input w-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#ffb703] rounded-xl"
              value={query}
              onFocus={onFocus}
              onChange={onChange}
            />
            <button
              className="btn border-0 bg-gradient-to-r from-[#ff0080] to-[#ffb703] text-white hover:scale-105 transition-transform"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Search"
              )}
            </button>

            <button
              disabled={!query.trim()}
              type="button"
              className="btn border border-white/50 bg-white/10 text-white hover:bg-white/20 hover:text-[#ffb703] transition-colors"
              onClick={() => {
                navigate("/");
                setQuery("");
                setTimedQuery("");
                setSuggestions([]);
                handleSearch("");
              }}
            >
              Clear
            </button>
          </div>

          {/* Search Results */}
          {showSuggestions && timedQuery && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-[100%] mt-2 h-64 bg-[#1e1e70]/95 backdrop-blur-md text-white shadow-2xl rounded-xl z-100 overflow-y-auto border border-[#ffffff33]">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-2 hover:bg-[#6c27b3]/60 cursor-pointer transition-all duration-150"
                  onClick={() => {
                    handleSearch(item.title);
                    setQuery("");
                    setSuggestions([]);
                    navigate(`/artwork/${item.id}`);
                  }}
                >
                  {item.image_id ? (
                    <img
                      src={`https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-white/20 flex items-center justify-center rounded-lg text-white/70">
                      🖼️
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">
                      {item.title}
                    </p>
                    {item.artist_title && (
                      <p className="text-xs opacity-70">{item.artist_title}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/*No results */}
          {timedQuery && !loading && !suggestions.length && !error && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-[#1e1e70]/95 text-white shadow-lg rounded-xl z-50 border border-[#ffffff33] p-3 text-sm text-center">
              No results found 🎭
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-[#ff4d4f] text-white shadow-lg rounded-xl z-50 p-3 text-sm text-center">
              {error}
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default Header;
