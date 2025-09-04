import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmptySearch from "../../components/EmptySearch/EmptySearch";
import Gallery from "../Gallery/Gallery"; // reusamos galería
import { type Image } from "../../types/Image";

interface SearchResultsPageProps {
  searchImage: (query: string) => Promise<Image[]>;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  searchImage,
}) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [results, setResults] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    setLoading(true);
    searchImage(query)
      .then(setResults)
      .catch((err) => console.error("Error en búsqueda", err))
      .finally(() => setLoading(false));
  }, [query, searchImage]);

  if (!query.trim()) {
    return <EmptySearch query="(vacío)" />;
  }

  if (!loading && results.length === 0) {
    return <EmptySearch query={query} />;
  }

  return <Gallery images={results} loading={loading} />;
};

export default SearchResultsPage;
