export default function Loading() {
  return (
    <div className="w-11/12 mx-auto pt-4 pb-16 animate-pulse">
      {/* Filter bar skeleton */}
      <div className="flex gap-2 mb-6 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-9 w-24 bg-gray-200 rounded-full flex-shrink-0" />
        ))}
      </div>
      {/* Product grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-2 border-gray-100 rounded-3xl overflow-hidden">
            <div className="bg-gray-200 aspect-square w-full" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
              <div className="h-3 bg-gray-100 rounded w-4/5 mx-auto" />
              <div className="h-9 bg-gray-200 rounded-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
