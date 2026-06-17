"use client";
import React, { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import useCart from "@/hooks/useCart";
import { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  compact?: boolean; // compact=true → button only, no qty selector
}

const AddToCartButton = ({ product, className = "", compact = false }: AddToCartButtonProps) => {
  const [qty, setQty] = useState(1);
  const { data: session } = useSession();
  const { addItem, loading } = useCart();

  const email = (session?.user?.email) ?? null;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addItem(email, {
      id: product.id,
      quantity: qty,
      attributeId: undefined,
    });
    setQty(1);
  };

  const dec = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQty((q) => Math.max(1, q - 1));
  };

  const inc = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQty((q) => Math.min(99, q + 1));
  };

  if (compact) {
    return (
      <button
        onClick={handleAdd}
        disabled={loading}
        className={`w-full py-2.5 rounded-full text-white text-sm font-bold flex items-center justify-center gap-1.5 disabled:opacity-60 transition-opacity ${className}`}
        style={{ background: "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)" }}
      >
        <ShoppingCart size={14} />
        add to cart
      </button>
    );
  }

  return (
    <div className={`flex items-center gap-2 w-full ${className}`} onClick={(e) => e.preventDefault()}>
      {/* Quantity selector */}
      <div className="flex items-center border-2 border-black rounded-full overflow-hidden shrink-0">
        <button
          onClick={dec}
          className="w-8 h-9 flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus size={13} />
        </button>
        <span className="w-7 text-center text-sm font-bold select-none">
          {qty}
        </span>
        <button
          onClick={inc}
          className="w-8 h-9 flex items-center justify-center text-black hover:bg-gray-100 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus size={13} />
        </button>
      </div>

      {/* Add to cart button */}
      <button
        onClick={handleAdd}
        disabled={loading}
        className="flex-1 h-9 rounded-full text-white text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-60 transition-opacity"
        style={{ background: "linear-gradient(90deg, #7c3aed 0%, #fe3500 100%)" }}
      >
        <ShoppingCart size={13} />
        add to cart
      </button>
    </div>
  );
};

export default AddToCartButton;
