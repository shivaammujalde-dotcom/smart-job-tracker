export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
      
      {/* Title */}
      <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>

      {/* Line */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-3"></div>

      {/* Line */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  );
}