import type { BookFilter } from "../library";
import "./bookFilters.scss";

interface BookFiltersProps {
  activeFilter: BookFilter;
  onFilterChange: (filter: BookFilter) => void;
}

const filters: { label: string; value: BookFilter }[] = [
  { label: "All books", value: "all" },
  { label: "Want to read", value: "want-to-read" },
  { label: "Currently reading", value: "currently-reading" },
  { label: "Read", value: "read" },
];

function BookFilters({ activeFilter, onFilterChange }: BookFiltersProps) {
  return (
    <nav
      className="library__filters"
      aria-label="Filter books by reading status"
    >
      {filters.map((filter) => {
        const isCurrentFilterActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            className={`library__filter ${
              isCurrentFilterActive ? "library__filter--active" : ""
            }`}
            aria-pressed={isCurrentFilterActive}
            onClick={() => onFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        );
      })}
    </nav>
  );
}

export default BookFilters;
