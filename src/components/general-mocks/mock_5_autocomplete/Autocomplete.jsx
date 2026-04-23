import React, { useState, useEffect, useRef, useCallback } from 'react'
import {useAutocomplete} from './useAutocomplete'
import DropdownList from './DropdownList';

const mockFetch = async (query, signal) => {
  const data = ["apple", "banana", "grape", "orange", "pineapple"];

  await new Promise((res) => setTimeout(res, 500));

  if (signal.aborted) return [];

  return data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5);
};

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const wrapperRef = useRef(null);

  const { results, loading } = useAutocomplete(inputValue, mockFetch);

  // open on input change
  useEffect(() => {
    if (inputValue) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [inputValue]);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = useCallback((item) => {
    setSelectedValue(item);
    setInputValue(item);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen || !results?.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            (prev + 1) % results?.length // Math.min(prev + 1, results.length -1)
          );
          break;

        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            (prev - 1 + results.length) % results?.length // Math.max(prev - 1, 0)
          );
          break;

        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0) {
            handleSelect(results[highlightedIndex]);
          }
          break;

        case "Escape":
          setIsOpen(false);
          break;
      }
    },
    [isOpen, results, highlightedIndex, handleSelect]
  );

  return (
    <div ref={wrapperRef} style={{ width: 300 }}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        style={{ width: "100%", padding: "8px" }}
      />

      {isOpen && (
        <DropdownList
          items={results}
          loading={loading}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}

export default Autocomplete