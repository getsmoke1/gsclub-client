export default function ProductLoading() {
  return (
    <div className="w-11/12 mx-auto pt-6 pb-16 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image skeleton */}
        <div className="w-full md:w-1/2 aspect-square bg-gray-200 rounded-3xl" />
        {/* Info skeleton */}
        <div className="w-full md:w-1/2 space-y-4 pt-2">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-100 rounded w-full mt-4" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-12 bg-gray-200 rounded-full w-full mt-6" />
          <div className="h-12 bg-gray-100 rounded-full w-full" />
        </div>
      </div>
    </div>
  );
}
