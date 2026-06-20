"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useCart from "@/hooks/useCart";
import { CartItem } from "@/types/cart";

// Safe localStorage wrapper - Safari Private Mode throws SecurityError
function safeGetStorage(key: string): string | null {
    try { return localStorage.getItem(key); } catch { return null; }
}
function safeRemoveStorage(key: string): void {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
}
function safeParse<T>(json: string | null): T | null {
    if (!json) return null;
    try { return JSON.parse(json) as T; } catch { return null; }
}

export default function InitializeCart() {
    const { data: session, status } = useSession();
    const initializeCart = useCart((state) => state.initializeCart);
    const syncCart = useCart((state) => state.syncCart);
    const setItems = useCart((state) => state.setItems);
    const [cartInitialized, setCartInitialized] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email) {
            initializeCart(session.user.email).then(() => {
                setCartInitialized(true);
            }).catch(() => { setCartInitialized(true); });
        }
    }, [status, session, initializeCart]);

    useEffect(() => {
        if (status === "unauthenticated") {
            const localItems = safeParse<CartItem[]>(safeGetStorage("cart"));
            if (localItems) setItems(localItems);
        }
    }, [status, setItems]);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.email && cartInitialized) {
            const localItems = safeParse<CartItem[]>(safeGetStorage("cart"));
            if (localItems) {
                syncCart(session.user.email, localItems).then((success) => {
                    if (success) safeRemoveStorage("cart");
                }).catch(() => { /* ignore sync errors */ });
            }
        }
    }, [status, session, syncCart, cartInitialized]);

    return null;
}
