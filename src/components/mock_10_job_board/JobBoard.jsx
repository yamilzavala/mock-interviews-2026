import { useEffect, useRef, useState, useCallback } from "react";

const API_BASE = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const API_BASE_DETAILS = "https://hacker-news.firebaseio.com/v0/item/";

const PAGE_SIZE = 6;

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const jobIdsRef = useRef(null);
  const abortRef = useRef(null);
  const loadingRef = useRef(false); // 🔥 mutex real

  /**
   * 🔥 Fetch IDs (solo una vez)
   */
  const fetchJobIds = useCallback(async () => {
    if (jobIdsRef.current) return jobIdsRef.current;

    const res = await fetch(`${API_BASE}`);
    const data = await res.json();

    jobIdsRef.current = data;
    return data;
  }, []);

  /**
   * 🔥 Fetch jobs por página
   */
  const fetchJobs = useCallback(async (currentPage) => {
    // 🔒 evita múltiples requests simultáneos
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    // cancelar request anterior
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const ids = await fetchJobIds();

      const start = (currentPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const pageIds = ids.slice(start, end);

      if (pageIds.length === 0) {
        setHasMore(false);
        return;
      }

      const requests = pageIds.map((id) =>
        fetch(`${API_BASE_DETAILS}${id}.json`, {
          signal: controller.signal,
        }).then((res) => res.json())
      );

      // 🔥 tolerante a errores
      const results = await Promise.allSettled(requests);

      const validJobs = results
        .filter((r) => r.status === "fulfilled" && r.value)
        .map((r) => r.value);

      setJobs((prev) => [...prev, ...validJobs]);

      if (end >= ids.length) {
        setHasMore(false);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching jobs:", err);
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [fetchJobIds]);

  /**
   * 🔥 initial load
   */
  useEffect(() => {
    fetchJobs(1);
  }, [fetchJobs]);

  /**
   * 🔥 load more (fix correcto)
   */
  const handleLoadMore = () => {
    setPage((prev) => {
      const next = prev + 1;
      fetchJobs(next);
      return next;
    });
  };

  /**
   * 🔥 helper fecha
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h1>Hacker News Jobs</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <h3 style={{ margin: 0 }}>
              {job.url ? (
                <a href={job.url} target="_blank" rel="noreferrer">
                  {job.title}
                </a>
              ) : (
                job.title
              )}
            </h3>

            <p style={{ margin: "4px 0", fontSize: 14 }}>
              By {job.by} • {formatDate(job.time)}
            </p>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          style={{
            marginTop: 16,
            padding: "10px 16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}