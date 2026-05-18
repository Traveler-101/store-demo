// 骨架屏加载组件
export function ProductCardSkeleton() {
  return (
    <div className="w-[304px] lg:w-[304px] md:w-[calc(50%-8px)] sm:w-full h-[404px] lg:h-[404px] md:h-[350px] sm:h-auto bg-[#EEF9F4] rounded-lg overflow-hidden animate-pulse">
      <div className="p-4">
        {/* 图片占位 */}
        <div className="w-[200px] h-[200px] bg-gray-200 rounded-lg mx-auto mb-4"></div>
        {/* 标题占位 */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
        {/* 描述占位 */}
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
        {/* 价格占位 */}
        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
      </div>
    </div>
  )
}

export function CategoryCardSkeleton() {
  return (
    <div className="w-[242px] lg:w-[242px] md:w-[calc(50%-8px)] sm:w-full h-[305px] lg:h-[305px] md:h-auto p-[10px_21px_0] bg-white rounded-lg overflow-hidden animate-pulse">
      {/* 图片占位 */}
      <div className="w-[200px] lg:w-[200px] md:w-full sm:w-full h-[180px] lg:h-[180px] md:h-[150px] sm:h-[120px] bg-gray-200 rounded-lg mx-auto mb-4"></div>
      {/* 标题占位 */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
      {/* 描述占位 */}
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
      {/* 价格占位 */}
      <div className="h-5 bg-gray-200 rounded w-1/3 mx-auto mt-3"></div>
    </div>
  )
}

export function BannerSkeleton() {
  return (
    <div className="w-full h-[500px] lg:h-[500px] md:h-[400px] sm:h-[250px] bg-gray-200 rounded-lg animate-pulse"></div>
  )
}

// 页面整体加载骨架屏
export default function PageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Header 占位 */}
      <div className="h-[132px] bg-white animate-pulse"></div>
      
      {/* Banner 占位 */}
      <div className="w px-4">
        <BannerSkeleton />
      </div>
      
      {/* 商品区域占位 */}
      <div className="w px-4 py-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
        <div className="flex justify-between flex-wrap gap-4">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
