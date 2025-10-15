import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import React from "react";
import { ArtworkResponseSchema } from "../schemas/artworkResponseSchema";
import useFetch from "../hooks/useFetch";

type HeaderProps = {
  handleSearch: (query: string) => void;
};

const Header: React.FC<HeaderProps> = ({ handleSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [timedQuery, setTimedQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const searchUrl = timedQuery.trim()
    ? `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
        timedQuery
      )}`
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
    handleSearch(query);
    setSuggestions([]);
    setShowSuggestions(false);
    setTimedQuery("");
  };

  return (
    <>
      <header className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-10">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-primary">🎨 Art Explorer</h1>
        </div>
        <div className="flex-none hidden md:block">
          <Link to="/my-gallery" className="btn btn-primary btn-sm normal-case">
            My Gallery
          </Link>
        </div>
      </header>

      {/* Search Bar */}
      <section className="w-full max-w-3xl mt-10 px-4">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="form-control relative"
        >
          <div className="input-group flex flex-row gap-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Rechercher une œuvre..."
              className="input input-bordered w-full"
              value={query}
              onFocus={onFocus}
              onChange={onChange}
            />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Search"
              )}
            </button>
          </div>

          {showSuggestions && timedQuery && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-[100%] mt-2 h-64 bg-base-100 shadow-lg rounded-xl z-50 border border-base-300 overflow-y-auto">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-2 hover:bg-base-200 cursor-pointer transition-colors"
                  onClick={() => {
                    handleSearch(item.title);
                    setQuery(item.title);
                    setSuggestions([]);
                  }}
                >
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail.lqip}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded text-gray-500">
                      🖼️
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">
                      {item.title}
                    </p>
                    {item.artist_title && (
                      <p className="text-xs text-gray-500">
                        {item.artist_title}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Gestion des cas sans résultat ou erreur */}
          {timedQuery && !loading && !suggestions.length && !error && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-base-100 shadow-md rounded-lg z-50 border border-base-300 p-3 text-sm text-gray-500 text-center">
              Aucun résultat trouvé
            </div>
          )}

          {error && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-error text-error-content shadow-md rounded-lg z-50 border border-error p-3 text-sm text-center">
              {error}
            </div>
          )}
        </form>
      </section>
    </>
  );
};

export default Header;
