import React from "react";
import { useTable } from "./useTable";

const Row = React.memo(({ item }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.age}</td>
    </tr>
  );
});

export default function DataTable({ data }) {
  const {
    paginatedData,
    sort,
    search,
    page,
    totalPages,
    setSearch,
    setPage,
    handleSort,
  } = useTable(data);

  return (
    <div>
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset page al buscar
        }}
      />

      {/* TABLE */}
      <table border="1">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID {sort.key === "id" ? (sort.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sort.key === "name" ? (sort.direction === "asc" ? "↑" : "↓") : ""}
            </th>
            <th onClick={() => handleSort("age")}>
              Age {sort.key === "age" ? (sort.direction === "asc" ? "↑" : "↓") : ""}
            </th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div style={{ marginTop: 10 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}