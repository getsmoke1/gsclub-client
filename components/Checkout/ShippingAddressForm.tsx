import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

interface ShippingAddressFormData {
    id: string;
    name: string;
    streetAddress: string;
    state: string;
    city: string;
    zipCode: string;
}

interface ShippingAddressFormProps {
    onSubmit: (data: ShippingAddressFormData) => void;
    defaultValues?: ShippingAddressFormData;
    setShowModal: (show: boolean) => void;
    isEditing?: boolean;
}

const ShippingAddressForm = ({ onSubmit, defaultValues, setShowModal, isEditing }: ShippingAddressFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ShippingAddressFormData>({
        defaultValues,
        mode: "onChange",
    });

    const watched = useWatch({ control });

    // Auto-save when all required fields are filled
    useEffect(() => {
        const { name, streetAddress, state, city, zipCode } = watched;
        if (name && streetAddress && state && city && zipCode) {
            handleSubmit(onSubmit)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watched.name, watched.streetAddress, watched.state, watched.city, watched.zipCode]);

    return (
        <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
                {/* Name Field */}
                <label className="font-bold text-[#8E8E93] text-[0.8rem]">
                    Name
                    <input
                        {...register("name", { required: "Name is required" })}
                        placeholder="Full name"
                        className="p-2 mt-1 font-normal text-sm bg-transparent outline-none border rounded-lg w-full"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                </label>

                {/* Street Address Field */}
                <label className="font-bold text-[#8E8E93] text-[0.8rem]">
                    Address
                    <textarea
                        {...register("streetAddress", { required: "Address is required" })}
                        placeholder="Street address"
                        className="p-2 mt-1 font-normal text-sm bg-transparent outline-none border rounded-lg w-full"
                    />
                    {errors.streetAddress && (
                        <p className="text-red-500 text-sm">{errors.streetAddress.message}</p>
                    )}
                </label>

                {/* State and City Fields */}
                <div className="flex gap-4">
                    <label className="font-bold text-[#8E8E93] text-[0.8rem] w-full">
                        State
                        <input
                            {...register("state", { required: "State is required" })}
                            placeholder="State"
                            className="p-2 mt-1 font-normal text-sm bg-transparent outline-none border rounded-lg w-full"
                        />
                        {errors.state && (
                            <p className="text-red-500 text-sm">{errors.state.message}</p>
                        )}
                    </label>

                    <label className="font-bold text-[#8E8E93] text-[0.8rem] w-full">
                        City
                        <input
                            {...register("city", { required: "City is required" })}
                            placeholder="City"
                            className="p-2 mt-1 font-normal text-sm bg-transparent outline-none border rounded-lg w-full"
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city.message}</p>
                        )}
                    </label>
                </div>

                {/* Zip Code Field */}
                <label className="font-bold text-[#8E8E93] text-[0.8rem]">
                    Zip Code
                    <input
                        type="number"
                        {...register("zipCode", { required: "Zip Code is required" })}
                        placeholder="Zip Code"
                        className="p-2 mt-1 font-normal text-sm bg-transparent outline-none border rounded-lg w-full"
                    />
                    {errors.zipCode && (
                        <p className="text-red-500 text-sm">{errors.zipCode.message}</p>
                    )}
                </label>
            </div>

            {/* Cancel button only shown when editing existing address */}
            {isEditing && (
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="text-sm text-gray-500 hover:text-gray-800 underline"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </form>
    );
};

export default ShippingAddressForm;
