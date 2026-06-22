"use client";
import React, { useState, useEffect, useCallback } from "react";

const ADMIN_SECRET = "getsmoke-admin-2024";

type StockStatus = "INSTOCK" | "OUTOFSTOCK" | "PREORDER";

interface Product {
  id: string;
  name: string;
  stockStatus: StockStatus;
  currentPrice: number;
  productType: string;
  brand: { name: string };
  images: { url: string }[];
}

const STATUS_LABELS: Record<StockStatus, { label: string; color: string; bg: string }> = {
  INSTOCK:    { label: "In Stock",   color: "#16a34a", bg: "#dcfce7" },
  OUTOFSTOCK: { label: "Out of Stock", color: "#dc2626", bg: "#fee2e2" },
  PREORDER:   { label: "Pre-Order",  color: "#7c3aed", bg: "#ede9fe" },
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), ...(search && { search }), ...(filterStatus && { status: filterStatus }) });
    const res = await fetch(`/api/admin/products?${params}`, { headers: { "x-admin-secret": ADMIN_SECRET } });
    const data = await res.json();
    setProducts(data.products || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, search, filterStatus]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  async function updateStatus(productId: string, status: StockStatus) {
    setUpdating(productId);
    await fetch(`/api/admin/products/${productId}/stock-status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-secret": ADMIN_SECRET },
      body: JSON.stringify({ stockStatus: status }),
    });
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stockStatus: status } : p));
    setUpdating(null);
    setToast(`Updated successfully`);
    setTimeout(() => setToast(null), 2000);
  }

  const totalPages = Math.ceil(total / 50);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>Product Stock Management</h1>
          <p style={{ color: "#666", fontSize: "14px", marginTop: "4px" }}>{total} products</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {(["", "OUTOFSTOCK", "PREORDER", "INSTOCK"] as const).map((s) => (
            <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
              style={{ padding: "8px 14px", borderRadius: "9999px", border: "1px solid #ddd", background: filterStatus === s ? "#000" : "#fff", color: filterStatus === s ? "#fff" : "#333", cursor: "pointer", fontSize: "13px", fontWeight: 500 }}>
              {s === "" ? "All" : STATUS_LABELS[s as StockStatus].label}
            </button>
          ))}
        </div>
      </div>

      <input type="text" placeholder="Search products..." value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        style={{ width: "100%", padding: "10px 16px", borderRadius: "9999px", border: "1px solid #ddd", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" }} />

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>Loading...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#f9f9f9" }}>
              <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#555" }}>Product</th>
              <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#555" }}>Brand</th>
              <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#555" }}>Type</th>
              <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#555" }}>Price</th>
              <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#555" }}>Status</th>
              <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#555" }}>Change</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => {
              const s = STATUS_LABELS[p.stockStatus] || STATUS_LABELS.INSTOCK;
              return (
                <tr key={p.id} style={{ borderBottom: "1px solid #eee", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      {p.images?.[0]?.url && <img src={p.images[0].url} alt="" style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "6px" }} />}
                      <span style={{ fontWeight: 500 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px", color: "#666" }}>{p.brand?.name}</td>
                  <td style={{ padding: "10px 12px", color: "#666", fontSize: "12px" }}>{p.productType}</td>
                  <td style={{ padding: "10px 12px" }}>${p.currentPrice.toFixed(2)}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "9999px", background: s.bg, color: s.color, fontWeight: 600, fontSize: "12px" }}>
                      {s.label}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <select value={p.stockStatus} disabled={updating === p.id}
                      onChange={e => updateStatus(p.id, e.target.value as StockStatus)}
                      style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "13px", cursor: "pointer", background: updating === p.id ? "#f0f0f0" : "#fff" }}>
                      <option value="INSTOCK">In Stock</option>
                      <option value="OUTOFSTOCK">Out of Stock</option>
                      <option value="PREORDER">Pre-Order</option>
                    </select>
                    {updating === p.id && <span style={{ marginLeft: "8px", fontSize: "12px", color: "#888" }}>Saving...</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
          <span style={{ padding: "8px 16px", color: "#666" }}>Page {page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #ddd", cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.4 : 1 }}>Next →</button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", background: "#16a34a", color: "#fff", padding: "12px 20px", borderRadius: "10px", fontWeight: 600, fontSize: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
