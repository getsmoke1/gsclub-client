"use client";
import React, { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import useCart from "@/hooks/useCart";
import { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className = "" }: AddToCartButtonProps) => {
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

  return (
    <div className={`flex items-center gap-2 w-full ${className}`} onClick={(e) => e.preventDefault()}>
      {/* Quantity selector */}
      <div className="flex items-center border-2 border-black rounded-full overflow-hidden shrink-0">
        <button
          onClick={dec}
          className="w-8 h-9 flex items-center justify-center text-black hover:bg-gray-100 transition-colors text-lg font-bold"
          aria-label="Decrease quantity"
        >
          <Minus size={14} />
        </button>
        <span className="w-8 text-center text-sm font-bold select-none">
          {qty}
        </span>
        <button
          onClick={inc}
          className="w-8 h-9 flex items-center justify-center text-black hover:bg-gray-100 transition-colors text-lg font-bold"
          aria-label="Increase quantity"
        >
          <Plus size={14} />
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
