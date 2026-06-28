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
  const {
    brandId, flavorId, puffsId, nicotineId,
    activeProductType,
    setFilters, clearFilters, removeFilter, setActiveProductType,
  } = useFilter();

  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  // Flavors filtered by selected puffsId (null = show full list)
  const [filteredFlavors, setFilteredFlavors] = useState<FilterOption[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  const filterRef = useRef<HTMLDivElement>(null);
  // Ref for the horizontal-scrollable pill — close dropdown on horizontal swipe
  const pillRef = useRef<HTMLDivElement>(null);
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

  // FIX: Reset filters when navigating to a different product type page.
  // Tracked via Zustand so it survives component remount on page navigation.
  useEffect(() => {
    if (productType && activeProductType !== productType) {
      clearFilters();
      setOpenDropdown(null);
      setActiveProductType(productType);
    } else if (productType && !activeProductType) {
      setActiveProductType(productType);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productType]);

  // Fetch all filter options (always full list — no active filter params)
  const fetchFilterOptions = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (productType) params.append("productType", productType);
      const res = await fetch(`/api/products/filter-options?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch filter options");
      const data = await res.json();
      setFilterOptions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  }, [productType]);

  useEffect(() => { fetchFilterOptions(); }, [fetchFilterOptions]);

  // When puffsId is selected, fetch only flavors that exist for that puff count.
  // When puffsId is cleared, reset to full flavor list.
  useEffect(() => {
    if (!puffsId) {
      setFilteredFlavors(null);
      return;
    }
    const params = new URLSearchParams();
    if (productType) params.append("productType", productType);
    params.append("puffsId", puffsId);
    fetch(`/api/products/filter-options?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => setFilteredFlavors(data.flavors ?? null))
      .catch(() => setFilteredFlavors(null));
  }, [puffsId, productType]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on vertical page scroll
  useEffect(() => {
    if (!openDropdown) return;
    const handleScroll = () => setOpenDropdown(null);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [openDropdown]);

  // Close dropdown on horizontal scroll inside the pill (mobile swipe right)
  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const handlePillScroll = () => setOpenDropdown(null);
    pill.addEventListener("scroll", handlePillScroll, { passive: true });
    return () => pill.removeEventListener("scroll", handlePillScroll);
  }, []);

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
    if (!filterOptions) return [];
    if (key === "flavor") return filteredFlavors ?? filterOptions.flavors;
    const map: Record<string, FilterOption[]> = {
      brand: filterOptions.brands,
      puffs: filterOptions.puffs,
      nicotine: filterOptions.nicotineLevels,
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

  if (error) return <div className="text-red-500 p-2 text-sm">Filter error: {error}</div>;

  return (
    <div className="relative w-11/12 mx-auto py-6 md:py-8 font-unbounded" ref={filterRef}>
      {/* Yellow pill — overflow-x scroll, no clipping of children */}
      <div
        ref={pillRef}
        className="flex items-center bg-[#ffc42e] rounded-full px-8 py-2.5 text-black text-sm font-bold overflow-x-auto"
        style={{ scrollbarWidth: "none", overflowY: "visible", paddingLeft: '32px', paddingRight: '32px' }}
      >
        <h2 className="font-black whitespace-nowrap shrink-0 mr-2">filter by</h2>
        <span className="text-black/30 mx-2 shrink-0">|</span>

        {loading ? (
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
