"use client";
import { useState } from "react";
import ShippingAddressForm from "./ShippingAddressForm";
import { PiPencilSimpleLine } from "react-icons/pi";

interface Card {
    id: string;
    name: string;
    streetAddress: string;
    state: string;
    city: string;
    zipCode: string;
}

interface ShippingAddressModalProps {
    selectedCard: Card | null;
    onAddressSubmit: (address: Card) => void;
}

const ShippingAddressModal = ({ selectedCard, onAddressSubmit }: ShippingAddressModalProps) => {
    const [editing, setEditing] = useState(false);

    const handleFormSubmit = (data: Card) => {
        onAddressSubmit(data);
        setEditing(false);
    };

    // No address yet - show form inline
    if (!selectedCard) {
        return (
            <ShippingAddressForm
                onSubmit={handleFormSubmit}
                setShowModal={() => {}}
            />
        );
    }

    // Address entered - show summary with edit button
    if (editing) {
        return (
            <ShippingAddressForm
                onSubmit={handleFormSubmit}
                defaultValues={selectedCard}
                setShowModal={() => setEditing(false)}
            />
        );
    }

    return (
        <div className="p-4 rounded-lg relative border-[1.5px] border-[#8C14AC]">
            <button
                onClick={() => setEditing(true)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
            >
                <PiPencilSimpleLine className="text-[1.3rem]" />
            </button>
            <h3 className="font-semibold">{selectedCard.name}</h3>
            <p className="text-gray-500">
                {selectedCard.streetAddress}, {selectedCard.city}, {selectedCard.state}, {selectedCard.zipCode}
            </p>
        </div>
    );
};

export default ShippingAddressModal;
