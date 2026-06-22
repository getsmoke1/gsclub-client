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
import AddToCartButton from "@/components/Cart/AddToCartButton";
import SubscriptionSelector from "@/components/ProductPage/SubscriptionSelector";
import { FrequencyValue } from "@/lib/nmi";
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
    const [subscriptionDiscountPct, setSubscriptionDiscountPct] = useState(0);
    const [subscriptionFrequency, setSubscriptionFrequency] = useState<FrequencyValue>("1_week");

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

                        {/* Stock Status Badge */}
                        {resolvedProduct.stockStatus === "OUTOFSTOCK" && (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fee2e2', color: '#dc2626', padding: '5px 14px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                            <span>●</span> Out of Stock
                          </div>
                        )}
                        {resolvedProduct.stockStatus === "PREORDER" && (
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ede9fe', color: '#7c3aed', padding: '5px 14px', borderRadius: '9999px', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                            <span>⏳</span> Pre-Order - Ships when available
                          </div>
                        )}

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

                        {/* Subscription selector */}
                        <SubscriptionSelector
                          basePrice={resolvedProduct.currentPrice}
                          onModeChange={(mode, freq, _price, discPct) => {
                            if (mode === "subscribe" && discPct) {
                              setSubscriptionDiscountPct(discPct);
                              if (freq) setSubscriptionFrequency(freq);
                            } else {
                              setSubscriptionDiscountPct(0);
                            }
                          }}
                        />

                        {/* Add to Cart */}
                        <div className="py-2 mt-3">
                            <AddToCartButton
                              product={resolvedProduct as never}
                              subscriptionDiscountPct={subscriptionDiscountPct}
                              subscriptionFrequency={subscriptionFrequency}
                            />
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
                                                {resolvedProduct.productPuffs.length > 1
                                                    ? `Up to ${Math.max(...resolvedProduct.productPuffs.map(pp => parseInt(pp.puffs.name) || 0)).toLocaleString()}`
                                                    : resolvedProduct.productPuffs[0].puffs.name
                                                }
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
                                onClick={() => {
                                    if (window.history.length > 1) {
                                        router.back();
                                    } else {
                                        router.push("/vapes");
                                    }
                                }}
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

            {/* Shipping banner */}
            <section
                className="w-full py-10 px-6"
                style={{ background: "linear-gradient(160deg, #2d1b6e 0%, #6b21a8 35%, #a855f7 60%, #ec4899 85%, #f43f5e 100%)" }}
            >
                <div className="max-w-sm mx-auto text-center">
                    <p className="text-white font-bold text-xl mb-5 leading-snug">
                        Free shipping for orders over $89
                    </p>
                    <div className="bg-white/20 rounded-2xl px-5 py-4 mb-5 text-white text-sm leading-relaxed">
                        At your choice of frequency you will receive a set of your favourite vapes home
                    </div>
                    <p className="text-white font-bold text-xl mb-5">
                        Instant shipping
                    </p>
                    <div className="bg-white/20 rounded-2xl px-5 py-4 text-white text-sm leading-relaxed">
                        Orders will arrive within 1-5 business days. Box ships within 24h.
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProductPage;