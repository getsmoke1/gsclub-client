"use client";
import Image from "next/image";
import { Product } from "@/types/product";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { format } from "date-fns";
// import { FaChevronDown } from 'react-icons/fa';
// import { useSession } from 'next-auth/react';
// import useCart from '@/hooks/useCart';
import { useRouter } from "next/navigation";
// import Link from "next/link";
import RelatedPRoduct from "./RelatedPRoduct";
import { useProduct } from "./useProduct";
import Loading from "./loading";
import Faq from "./Faq";
import { useDeleteReview } from "./useReview";
import { Edit, X } from "lucide-react";
import StarRating from "../ui/StarRating";
import ReviewForm from "./ReviewForm";
import { useSession } from "next-auth/react";
import Modal from "../ui/modal";

// import { toast } from 'react-hot-toast';

interface SingleProductProps {
    productSlug: string;
    initialProduct?: Product;
}

const ProductPage = ({ productSlug, initialProduct }: SingleProductProps) => {
    // If server prefetched product — use it directly, skip loading skeleton
    const { data: product, isLoading, error } = useProduct(productSlug, initialProduct);
    const resolvedProduct = product ?? initialProduct;

    // Smart default states based on content availability
    const hasDescription = resolvedProduct?.detailDescription;
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(true); // Description should always be open by default when it exists
    const [isDetailsOpen, setIsDetailsOpen] = useState(!hasDescription); // Device details open only when description doesn't exist

    const { data: session } = useSession();
    const [showAllReviews, setShowAllReviews] = useState(false);
    const { mutate: deleteReview } = useDeleteReview();
    const [isOpen, setIsOpen] = useState(false);

    // State for ProductContentSection
    const [isContentSectionExpanded, setIsContentSectionExpanded] = useState(false);

    // const { data: session } = useSession();
    // const email = session?.user.email || "";
    // const cart = useCart();
    // const [quantity, setQuantity] = useState(1);
    // const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    // const [selectedFlavors, setSelectedFlavors] = useState<{ [key: number]: string }>({});
    // const [availableFlavors, setAvailableFlavors] = useState<{ id: string, name: string }[]>([]);

    // Loading state — skip if we already have server-prefetched data
    if (isLoading && !resolvedProduct) {
        return <Loading />;
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 bg-red-100 p-4 rounded-md">
                    <p className="font-semibold">Error loading product</p>
                    <p className="text-sm mt-1">{error.message}</p>
                </div>
            </div>
        );
    }

    const hasMultipleFlavors =
        resolvedProduct?.productFlavors && resolvedProduct.productFlavors.length > 0;
    const hasSingleFlavor = resolvedProduct?.flavorId && !hasMultipleFlavors;

    if (!resolvedProduct) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 bg-red-100 p-4 rounded-md">
                    <p className="font-semibold">Product not found</p>
                </div>
            </div>
        );
    }

    const renderField = (label: string, value: string | null | undefined) => {
        if (!value) return null;
        return (
            <div className="flex">
                <p className="font-medium">{label}: </p>
                <p className="ml-2">{value}</p>
            </div>
        );
    };

    return (
        <main className="bg-white min-h-screen">
            <section className="w-11/12 mx-auto py-7 flex flex-col lg:flex-row gap-3 md:gap-10 xl:gap-20 font-unbounded text-black">
                {/* Product Images */}
                <div className="w-full lg:w-[35%] ">
                    {resolvedProduct.images && resolvedProduct.images.length > 0 ? (
                        <Image
                            src={resolvedProduct.images[0].url}
                            width={1000}
                            height={1000}
                            alt="product image"
                            className="w-full h-auto object-cover lg:mt-2 border-2 shadow-md border-gray-100 rounded-3xl"
                        />
                    ) : (
                        <div className="bg-gray-200 w-full h-80 flex items-center justify-center">
                            <p>No image available</p>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="w-full lg:w-[65%] py-3">
                    <div className="space-y-5">
                        {/* Product Name */}
                        <h1 className="text-3xl font-semibold text-[#0C0B0B] leading-10">
                            {resolvedProduct.brand.name} <br />
                            {resolvedProduct.name} <br />
                            {hasSingleFlavor && resolvedProduct.flavor?.name}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-medium">
                                ${resolvedProduct.currentPrice.toFixed(2)}
                            </span>
                            {resolvedProduct.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">
                                    ${resolvedProduct.originalPrice.toFixed(2)}
                                </span>
                            )}
                            {resolvedProduct.packCount > 1 && (
                                <span>
                                    (each pack $
                                    {(resolvedProduct.currentPrice / resolvedProduct.packCount).toFixed(2)})
                                </span>
                            )}
                        </div>

                        {/* Product Description */}
                        {resolvedProduct.detailDescription && (
                            <div className="space-y-3">
                                <button
                                    className="flex items-center gap-2 font-bold text-xl text-[#0C0B0B]"
                                    onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                                >
                                    Description
                                    <svg
                                        className={`w-5 h-5 transition-transform ${isDescriptionOpen ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {isDescriptionOpen && (
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html: resolvedProduct.detailDescription,
                                        }}
                                    />
                                )}
                            </div>
                        )}

                        {/* Product Specifications */}
                        <div className="space-y-3">
                            <button
                                className="flex items-center gap-2 font-bold text-xl text-[#0C0B0B]"
                                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                            >
                                Device Details
                                <svg
                                    className={`w-5 h-5 transition-transform ${isDetailsOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>
                            {isDetailsOpen && (
                                <div className="space-y-1.5">
                                    {resolvedProduct.Nicotine &&
                                        renderField("Nicotine Strength", resolvedProduct.Nicotine.name)}
                                    {resolvedProduct.productPuffs && resolvedProduct.productPuffs.length > 0 && (
                                        <div className="flex">
                                            <p className="font-medium">Puffs:</p>
                                            <p className="ml-2">
                                                {resolvedProduct.productPuffs.map((pp, index) => (
                                                    <span key={index}>
                                                        {index > 0 && " / "}
                                                        {pp.puffs.name}{pp.puffDesc && pp.puffDesc !== pp.puffs.name ? ` ${pp.puffDesc}` : ''}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>
                                    )}
                                    {renderField("E-liquid Content", resolvedProduct.eLiquidContent)}
                                    {renderField("Battery Capacity", resolvedProduct.batteryCapacity)}
                                    {renderField("Coil", resolvedProduct.coil)}
                                    {renderField("Firing Mechanism", resolvedProduct.firingMechanism)}
                                    {renderField("Type", resolvedProduct.type)}
                                    {renderField("Resistance", resolvedProduct.resistance)}
                                    {renderField("Power Range", resolvedProduct.powerRange)}
                                    {renderField("Charging", resolvedProduct.charging)}
                                    {resolvedProduct.extra && (
                                        <div className="flex">
                                            <p className="font-medium">Extra Features:</p>
                                            <div
                                                className="prose max-w-none ml-2"
                                                dangerouslySetInnerHTML={{ __html: resolvedProduct.extra }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Stock Action Section */}
                        <div className="mt-8 flex flex-col lg:flex-row w-full items-center gap-4">
                            {/* {resolvedProduct.isArchived ? (
                                <div className="w-full text-center bg-gray-100 border border-gray-300 text-gray-600 py-3 rounded-full font-medium">
                                    Not in Stock
                                </div>
                            ) : (
                                <>
                                    {resolvedProduct?.redirectLink && (
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            className="px-8 w-full leading-4 whitespace-nowrap"
                                        >
                                            <Link href={resolvedProduct?.redirectLink || ""}>Shop Now</Link>
                                        </Button>
                                    )}
                                </>
                            )} */}

                            {/* Return to Shop Button */}
                            <Button
                                variant="secondary"
                                onClick={() => router.push("/")}
                                className="flex items-center gap-2 w-full"
                            >
                                Return to shop
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/*------------------- Review section --------------------- */}

            <section className="w-11/12 mx-auto mt-10 font-unbounded">
                <div className="bg-black h-[2.5px] mb-7 md:mb-10 rounded-full"></div>
                <h2 className="text-center text-xl md:text-2xl font-semibold mb-7 md:mb-10">
                    Product Reviews
                </h2>

                <div className="mb-6 flex w-full justify-center items-center">
                    <Button onClick={() => setIsOpen(true)} variant="secondary">
                        <Edit className="mr-2" size={16} />
                        Write a Review
                    </Button>
                </div>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
                    <div className="p-4">
                        <ReviewForm
                            productId={resolvedProduct.id}
                            productSlug={resolvedProduct.slug}
                            onSuccess={() => setIsOpen(false)}
                        />
                    </div>
                </Modal>

                <div className="space-y-6">
                    {resolvedProduct?.Review.length > 0 ? (
                        <>
                            {(showAllReviews
                                ? resolvedProduct.Review
                                : resolvedProduct.Review.slice(0, 3)
                            ).map((review) => (
                                <div key={review.id} className="border-b pb-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{review.userName}</h3>
                                            <div className="flex items-center gap-2 my-1">
                                                <StarRating
                                                    rating={review.rating}
                                                    setRating={() => { }}
                                                    readOnly
                                                />
                                                <span className="text-sm text-gray-500">
                                                    {format(new Date(review.createdAt), "MMMM d, yyyy")}
                                                </span>
                                            </div>
                                            <h4 className="font-medium mt-1">{review.title}</h4>
                                            <p className="text-gray-700 mt-1">{review.comment}</p>
                                        </div>

                                        {session?.user?.email === review.userEmail && (
                                            <button
                                                onClick={() =>
                                                    deleteReview({
                                                        reviewId: review.id,
                                                        userEmail: review.userEmail,
                                                        productId: resolvedProduct.id,
                                                        productSlug: resolvedProduct.slug,
                                                    })
                                                }
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {resolvedProduct.Review.length > 3 && !showAllReviews && (
                                <div className="text-center mt-4">
                                    <Button
                                        variant="secondary"
                                        onClick={() => setShowAllReviews(true)}
                                    >
                                        See All Reviews ({resolvedProduct.Review.length})
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                No reviews yet. Be the first to review!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/*------------------- Product Content Section --------------------- */}
            {resolvedProduct.ProductContentSection && (
                <section className="w-11/12 mx-auto mt-10 font-unbounded text-center">
                    <div className="bg-black h-[2.5px] mb-7 md:mb-10 rounded-full"></div>

                    <div className="space-y-4">
                        <h2 className="text-xl md:text-2xl font-semibold text-[#0C0B0B]">
                            {resolvedProduct.ProductContentSection.title}
                        </h2>

                        <p className="text-gray-700 leading-relaxed">
                            {resolvedProduct.ProductContentSection.description}
                        </p>

                        {resolvedProduct.ProductContentSection.detailDescription && (
                            <div className="bg-gray-100 rounded-lg p-4 space-y-4">
                                {isContentSectionExpanded && (
                                    <div
                                        className="prose max-w-none text-gray-700 text-center"
                                        dangerouslySetInnerHTML={{
                                            __html: resolvedProduct.ProductContentSection.detailDescription,
                                        }}
                                    />
                                )}

                                <div className="flex justify-center">
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            setIsContentSectionExpanded(!isContentSectionExpanded)
                                        }
                                        className="flex items-center gap-2"
                                    >
                                        {isContentSectionExpanded ? "Read Less" : "Read More"}
                                        <svg
                                            className={`w-4 h-4 transition-transform ${isContentSectionExpanded ? "rotate-180" : ""
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            <section className="">
                <RelatedPRoduct
                    brandId={resolvedProduct.brandId}
                    flavorId={resolvedProduct.flavorId ?? undefined}
                    productId={resolvedProduct.id}
                    productName={resolvedProduct.name}
                />
            </section>

            <section className="-mt-4 mb-28">
                <Faq slug={resolvedProduct.slug} />
            </section>

            {/* Shipping banner — original smoke image, price text overlaid in code */}
            <section className="w-full relative">
                {/* Desktop */}
                <div className="relative md:block hidden">
                    <Image src="/images/rp_banner.png" width={1000} height={1000} alt="Free shipping banner" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">
                        <p className="font-bold text-2xl lg:text-3xl mb-4 drop-shadow-lg">Free shipping for orders over $89</p>
                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-3 mb-5 text-sm max-w-md">
                            At your choice of frequency you will receive a set of your favourite vapes home
                        </div>
                        <p className="font-bold text-2xl lg:text-3xl mb-4 drop-shadow-lg">Instant shipping</p>
                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-3 text-sm max-w-md">
                            Orders will arrive within 1-5 business days. Box ships within 24h.
                        </div>
                    </div>
                </div>
                {/* Mobile */}
                <div className="relative md:hidden block">
                    <Image src="/images/rp_banner2.png" width={860} height={664} alt="Free shipping banner" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                        <p className="font-bold text-lg mb-3 drop-shadow-lg">Free shipping for orders over $89</p>
                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 mb-4 text-xs leading-relaxed max-w-xs">
                            At your choice of frequency you will receive a set of your favourite vapes home
                        </div>
                        <p className="font-bold text-lg mb-3 drop-shadow-lg">Instant shipping</p>
                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 text-xs leading-relaxed max-w-xs">
                            Orders will arrive within 1-5 business days. Box ships within 24h.
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductPage;