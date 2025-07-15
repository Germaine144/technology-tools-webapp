// components/ProductFilters.tsx
import React from 'react';
import { getFilterOptions, getFilterLabels } from '../../utils/filterOptions';
import { FilterState } from '../../types/product';

interface ProductFiltersProps {
  category: string;
  filters: FilterState;
  onFilterChange: (filterType: keyof FilterState, value: string[] | number[]) => void;
  onCheckboxChange: (filterType: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  category,
  filters,
  onFilterChange,
  onCheckboxChange,
  onClearFilters
}) => {
  const filterOptions = getFilterOptions(category);
  const filterLabels = getFilterLabels(category);

  const renderCheckboxFilter = (filterKey: keyof FilterState, options: string[]) => {
    const filterValues = filters[filterKey] as string[] || [];

    return (
      <div className="mb-6">
        <h3 className="font-medium mb-3 flex items-center justify-between">
          {/* TypeScript fix here with assertion */}
          {(filterLabels as Record<string, string>)[filterKey] || filterKey}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {options.map(option => (
            <label key={option} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filterValues.includes(option)}
                onChange={() => onCheckboxChange(filterKey, option)}
                className="rounded"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-medium mb-3 flex items-center justify-between">
            Price
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => onFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                className="w-20 px-2 py-1 border rounded text-sm"
                min={0}
              />
              <span>-</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => onFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                className="w-20 px-2 py-1 border rounded text-sm"
                min={0}
              />
            </div>
            <input
              type="range"
              min={0}
              max={2000}
              step={50}
              value={filters.priceRange[1]}
              onChange={(e) => onFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>

        {/* Dynamic Filters */}
        {Object.entries(filterOptions).map(([key, options]) => {
          if (key === 'brands' || key === 'colors') {
            return renderCheckboxFilter(key as keyof FilterState, options);
          }

          // Category-specific filters
          if (filters.hasOwnProperty(key)) {
            return renderCheckboxFilter(key as keyof FilterState, options);
          }

          return null;
        })}
      </div>
    </div>
  );
};