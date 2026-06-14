"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, X } from "lucide-react";
import { useFilter } from "@/hooks/useFilter";

interface FilterOption {
  id: string;
  name: string;
}

interface FilterOptions {
  brands: FilterOption[];
  flavors: FilterOption[];
  puffs: FilterOption[];
  nicotineLevels: FilterOption[];
}

type FilterKey = "brandId" | "flavorId" | "puffsId" | "nicotineId";

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  options: FilterOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

const FilterButton = ({ label, isActive, isOpen, onToggle, options, selectedId, onSelect }: FilterButtonProps) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (isOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 6,
        left: rect.left,
        zIndex: 9999,
      });
    }
  }, [isOpen]);

  return (
    <div className="relative shrink-0" ref={btnRef}>
      <button
        onClick={onToggle}
        className={`flex items-center cursor-pointer gap-1 px-3 py-1 hover:bg-[#f0b800] rounded-full transition-colors whitespace-nowrap ${
          isActive ? "bg-[#f0b800]" : ""
        }`}
      >
        <span>{isActive ? (options.find(o => o.id === selectedId)?.name || label) : label}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          style={dropdownStyle}
          className="w-48 bg-white border border-gray-200 text-black rounded-xl shadow-xl py-1 max-h-[50vh] overflow-y-auto"
        >
          {options.map((opt) => (
            <div
              key={opt.id}
              className={`px-4 py-2 hover:bg-amber-50 cursor-pointer transition-colors text-sm ${
                selectedId === opt.id ? "bg-[#ffc42e] font-bold" : ""
              }`}
              onClick={() => onSelect(opt.id)}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Filter = () => {
  const {
    brandId,
    flavorId,
    puffsId,
    nicotineId,
    setFilters,
    clearFilters,
    removeFilter,
  } = useFilter();

  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const fetchFilterOptions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (brandId) params.append("brandId", brandId);
      if (flavorId) params.append("flavorId", flavorId);
      if (puffsId) params.append("puffsId", puffsId);
      if (nicotineId) params.append("nicotineId", nicotineId);

      const res = await fetch(`/api/products/filter-options?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch filter options");
      setFilterOptions(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, [brandId, flavorId, puffsId, nicotineId]);

  useEffect(() => { fetchFilterOptions(); }, [fetchFilterOptions]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (name: string) => setOpenDropdown(prev => prev === name ? null : name);

  const handleSelect = (type: FilterKey, id: string) => {
    const current = { brandId, flavorId, puffsId, nicotineId }[type];
    if (current === id) {
      removeFilter(type);
    } else {
      setFilters({ [type]: id });
    }
    setOpenDropdown(null);
  };

  const hasActive = !!(brandId || flavorId || puffsId || nicotineId);

  if (error) return <div className="text-red-500 p-2 text-sm">Filter error: {error}</div>;

  return (
    <div
      className="w-11/12 mx-auto py-6 md:py-8 font-unbounded"
      ref={filterRef}
    >
      {/* Yellow pill — overflow-x scroll for mobile, dropdowns escape via fixed positioning */}
      <div className="flex items-center bg-[#ffc42e] rounded-full px-5 py-2.5 text-black text-sm font-bold overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <h2 className="font-black whitespace-nowrap shrink-0 mr-2">filter by</h2>
        <span className="text-black/30 mx-2 shrink-0">|</span>

        {loading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="h-7 w-20 bg-[#f0b800] rounded-full animate-pulse mx-2 shrink-0" />
          ))
        ) : (
          <>
            <FilterButton
              label="Brand"
              isActive={!!brandId}
              isOpen={openDropdown === "brand"}
              onToggle={() => toggle("brand")}
              options={filterOptions?.brands || []}
              selectedId={brandId}
              onSelect={(id) => handleSelect("brandId", id)}
            />
            <span className="text-black/30 mx-2 shrink-0">∨</span>
            <FilterButton
              label="Puffs"
              isActive={!!puffsId}
              isOpen={openDropdown === "puffs"}
              onToggle={() => toggle("puffs")}
              options={filterOptions?.puffs || []}
              selectedId={puffsId}
              onSelect={(id) => handleSelect("puffsId", id)}
            />
            <span className="text-black/30 mx-2 shrink-0">∨</span>
            <FilterButton
              label="Flavor"
              isActive={!!flavorId}
              isOpen={openDropdown === "flavor"}
              onToggle={() => toggle("flavor")}
              options={filterOptions?.flavors || []}
              selectedId={flavorId}
              onSelect={(id) => handleSelect("flavorId", id)}
            />
            <span className="text-black/30 mx-2 shrink-0">∨</span>
            <FilterButton
              label="Nicotine"
              isActive={!!nicotineId}
              isOpen={openDropdown === "nicotine"}
              onToggle={() => toggle("nicotine")}
              options={filterOptions?.nicotineLevels || []}
              selectedId={nicotineId}
              onSelect={(id) => handleSelect("nicotineId", id)}
            />

            {hasActive && (
              <button
                onClick={() => { clearFilters(); setOpenDropdown(null); }}
                className="flex items-center gap-1 ml-4 px-3 py-1 text-sm text-black/60 hover:text-black transition-colors shrink-0 whitespace-nowrap"
              >
                <X size={14} />
                Clear all
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;
