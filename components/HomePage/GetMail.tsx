"use client";
import React, { useState } from "react";

const GetMail = () => {
    const [userEmail, setUserEmail] = useState<string>("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userEmail) return;
        setSubmitted(true);
        console.log("Subscribed:", userEmail);
    };

    return (
        <div className="font-unbounded bg-[#090808] text-white px-6 py-10 flex flex-col items-center text-center gap-4">
            <h2 className="font-bold text-lg md:text-xl uppercase">
                Stay updated on new arrivals
            </h2>
            <p className="text-sm text-gray-400 max-w-md">
                Subscribe to our newsletter and be the first to know about new products and deals.
            </p>
            {submitted ? (
                <p className="text-[#fe3500] font-bold">Thanks! You are subscribed.</p>
            ) : (
                <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={userEmail}
                        onChange={e => setUserEmail(e.target.value)}
                        className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#fe3500]"
                        required
                    />
                    <button
                        type="submit"
                        className="font-bold px-5 py-2 rounded text-sm uppercase cursor-pointer"
                        style={{ backgroundColor: "#fe3500", color: "white" }}
                    >
                        Subscribe
                    </button>
                </form>
            )}
        </div>
    );
};

export default GetMail;
