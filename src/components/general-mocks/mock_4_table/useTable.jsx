import { useState, useMemo, useCallback, useEffect } from "react";

const ITEMS_PER_PAGE = 5;

export function useTable(data) {
  const [sort, setSort] = useState({ key: null, direction: "asc" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // 🔹 handler de sort
  const handleSort = useCallback((key) => {
    setSort((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  }, []);

  // 🔹 helper genérico de comparación
  const compare = useCallback((aVal, bVal, direction) => {
    // null / undefined safety
    if (aVal == null) return 1;
    if (bVal == null) return -1;

    // strings
    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    // dates
    if (aVal instanceof Date && bVal instanceof Date) {
      return direction === "asc"
        ? aVal - bVal
        : bVal - aVal;
    }

    // numbers / fallback
    return direction === "asc"
      ? aVal - bVal
      : bVal - aVal;
  }, []);

  // 🔹 FILTER + SORT
  const processedData = useMemo(() => {
    let result = [...data]; // no mutar props

    // 1. FILTER (search por name)
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchLower)
      );
    }

    // 2. SORT (genérico)
    if (sort.key) {
      result.sort((a, b) =>
        compare(a[sort.key], b[sort.key], sort.direction)
      );
    }

    return result;
  }, [data, search, sort, compare]);

  // 🔹 PAGINATION
  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return processedData.slice(start, start + ITEMS_PER_PAGE);
  }, [processedData, page]);

  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(processedData.length / ITEMS_PER_PAGE), 1);
  }, [processedData.length]);

  useEffect(() => {
    setPage((current) => (current > totalPages ? totalPages : current));
  }, [totalPages]);

  return {
    paginatedData,
    sort,
    search,
    page,
    totalPages,
    setSearch,
    setPage,
    handleSort,
  };
}