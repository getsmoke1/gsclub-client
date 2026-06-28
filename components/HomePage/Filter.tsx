"use client";
import React, { useState, useEffect, useRef } from "react";
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
  selectedName?: string;
  btnRef: React.RefObject<HTMLButtonElement | null>;
}

// Trigger button only — dropdown is rendered outside the overflow container
const FilterTrigger = ({ label, isActive, isOpen, onToggle, selectedName, btnRef }: FilterButtonProps) => (
  <button
    ref={btnRef}
    onClick={onToggle}
    className={`flex items-center cursor-pointer gap-1 px-4 py-1 hover:bg-[#f0b800] rounded-full transition-colors whitespace-nowrap ${
      isActive ? "bg-[#f0b800]" : ""
    }`}
  >
    <span>{isActive && selectedName ? selectedName : label}</span>
    <ChevronDown
      size={16}
      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
    />
  </button>
);

const Filter = ({ productType }: { productType?: string }) => {
  const { brandId, flavorId, puffsId, nicotineId, setFilters, clearFilters, removeFilter } = useFilter();

  // Store options in a REF — immune to re-renders, concurrent mode, Zustand updates.
  // Once loaded, they NEVER change (until productType changes and we reset).
  const filterOptionsRef = useRef<FilterOptions | null>(null);
  const loadedForType = useRef<string | undefined>(undefined);
  const [optionsReady, setOptionsReady] = useState(false);
  const [filterError, setFilterError] = useState<string | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const filterRef = useRef<HTMLDivElement>(null);
  const brandBtnRef = useRef<HTMLButtonElement>(null);
  const puffsBtnRef = useRef<HTMLButtonElement>(null);
  const flavorBtnRef = useRef<HTMLButtonElement>(null);
  const nicotineBtnRef = useRef<HTMLButtonElement>(null);

  const btnRefs: Record<string, React.RefObject<HTMLButtonElement | null>> = {
    brand: brandBtnRef,
    puffs: puffsBtnRef,
    flavor: flavorBtnRef,
    nicotine: nicotineBtnRef,
  };

  // Load options ONCE per productType — stored in ref, never overwritten by re-renders
  useEffect(() => {
    if (loadedForType.current === productType) return; // Already loaded for this type
    loadedForType.current = productType;
    filterOptionsRef.current = null;
    setOptionsReady(false);

    const params = new URLSearchParams();
    if (productType) params.append("productType", productType);
    fetch(`/api/products/filter-options?${params.toString()}`)
      .then(r => { if (!r.ok) throw new Error("Failed to fetch"); return r.json(); })
      .then((data: FilterOptions) => {
        filterOptionsRef.current = data;
        setOptionsReady(true);
      })
      .catch(err => setFilterError(err.message));
  }, [productType]); // strictly only productType

  // Reset selected filters when navigating to a different product category page.
  const prevProductType = useRef(productType);
  useEffect(() => {
    if (prevProductType.current !== productType) {
      clearFilters();
      setOpenDropdown(null);
      prevProductType.current = productType;
    }
  }, [productType, clearFilters]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on scroll
  useEffect(() => {
    if (!openDropdown) return;
    const handleScroll = () => setOpenDropdown(null);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openDropdown]);

  const toggle = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
      return;
    }
    const btn = btnRefs[name]?.current;
    const container = filterRef.current;
    if (btn && container) {
      const btnRect = btn.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setDropdownPos({
        top: btnRect.bottom - containerRect.top + 6,
        left: Math.max(0, btnRect.left - containerRect.left),
        width: Math.max(btnRect.width, 180),
      });
    }
    setOpenDropdown(name);
  };

  const handleSelect = (type: FilterKey, id: string) => {
    const current = { brandId, flavorId, puffsId, nicotineId }[type];
    if (current === id) removeFilter(type);
    else setFilters({ [type]: id });
    setOpenDropdown(null);
  };

  const getOptions = (key: string): FilterOption[] => {
    const opts = filterOptionsRef.current;
    if (!opts) return [];
    const map: Record<string, FilterOption[]> = {
      brand: opts.brands,
      puffs: opts.puffs,
      flavor: opts.flavors,
      nicotine: opts.nicotineLevels,
    };
    return map[key] || [];
  };

  const getSelectedId = (key: string) =>
    ({ brand: brandId, puffs: puffsId, flavor: flavorId, nicotine: nicotineId })[key];

  const hasActive = !!(brandId || flavorId || puffsId || nicotineId);

  const FILTERS = [
    { key: "brand", label: "Brand", filterKey: "brandId" as FilterKey },
    { key: "puffs", label: "Puffs", filterKey: "puffsId" as FilterKey },
    { key: "flavor", label: "Flavor", filterKey: "flavorId" as FilterKey },
    { key: "nicotine", label: "Nicotine", filterKey: "nicotineId" as FilterKey },
  ];

  if (filterError) return <div className="text-red-500 p-2 text-sm">Filter error: {filterError}</div>;

  return (
    <div className="relative w-11/12 mx-auto py-6 md:py-8 font-unbounded" ref={filterRef}>
      {/* Yellow pill — overflow-x scroll, no clipping of children */}
      <div
        className="flex items-center bg-[#ffc42e] rounded-full px-8 py-2.5 text-black text-sm font-bold overflow-x-auto"
        style={{ scrollbarWidth: "none", overflowY: "visible", paddingLeft: '32px', paddingRight: '32px' }}
      >
        <h2 className="font-black whitespace-nowrap shrink-0 mr-2">filter by</h2>
        <span className="text-black/30 mx-2 shrink-0">|</span>

        {!optionsReady ? (
          <div className="flex flex-1 justify-around">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-7 w-20 bg-[#f0b800] rounded-full animate-pulse mx-2 shrink-0" />
            ))}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-around">
            {FILTERS.map((f, i) => (
              <React.Fragment key={f.key}>
                {i > 0 && <span className="text-black/30 mx-1 shrink-0 select-none" style={{ pointerEvents: 'none' }}>|</span>}
                <FilterTrigger
                  label={f.label}
                  isActive={!!getSelectedId(f.key)}
                  isOpen={openDropdown === f.key}
                  onToggle={() => toggle(f.key)}
                  selectedName={getOptions(f.key).find(o => o.id === getSelectedId(f.key))?.name}
                  btnRef={btnRefs[f.key]}
                />
              </React.Fragment>
            ))}

            {hasActive && (
              <button
                onClick={() => { clearFilters(); setOpenDropdown(null); }}
                className="flex items-center gap-1 ml-4 px-3 py-1 text-sm text-black/60 hover:text-black transition-colors shrink-0 whitespace-nowrap"
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <X size={14} />
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Dropdown rendered OUTSIDE the overflow container, positioned absolutely relative to filterRef */}
      {openDropdown && (
        <div
          className="absolute bg-white border border-gray-200 text-black rounded-xl shadow-xl py-1 max-h-[50vh] overflow-y-auto"
          style={{
            top: dropdownPos.top,
            left: dropdownPos.left,
            minWidth: 180,
            zIndex: 9999,
          }}
        >
          {getOptions(openDropdown).map((opt) => (
            <div
              key={opt.id}
              className={`px-4 py-2.5 hover:bg-amber-50 cursor-pointer transition-colors text-sm ${
                getSelectedId(openDropdown) === opt.id ? "bg-[#ffc42e] font-bold" : ""
              }`}
              onClick={() => handleSelect(
                FILTERS.find(f => f.key === openDropdown)!.filterKey,
                opt.id
              )}
            >
              {opt.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
