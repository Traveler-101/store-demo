import { useSearch } from '../context/SearchContext'
import { useCart } from '../context/CartContext'
import FilterPanel from './FilterPanel'
import LazyImage from './LazyImage'

export default function SearchResult() {
  const { filteredProducts, keyword, exitSearch } = useSearch()
  const { viewProduct, addToCart } = useCart()

  return (
    <div className="bg-gray-50 min-h-screen pb-8">
      {/* 搜索头部 */}
      <div className="bg-white border-b border-gray-200 sticky top-[90px] lg:top-[132px] z-40">
        <div className="w flex items-center justify-between py-4 px-4">
          <div className="flex items-center gap-3">
            <button
              onClick={exitSearch}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
              aria-label="返回"
            >
              <i className="iconfont icon-arrow-left"></i>
            </button>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-gray-500 text-sm">搜索:</span>
              <span className="text-primary font-medium">{keyword}</span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                共 {filteredProducts.length} 件商品
              </span>
            </div>
          </div>
        </div>
      </div>

      <FilterPanel />

      {/* 商品列表 */}
      <div className="w py-6 px-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => viewProduct(product)}
                >
                  <div className="relative overflow-hidden bg-gray-100 aspect-square">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.tag && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-primary/90 text-white text-xs rounded-md">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[40px]">
                      {product.name}
                    </h3>
                    {product.spec && (
                      <p className="text-xs text-gray-500 mb-2 truncate">{product.spec}</p>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm text-[#af2f22]">¥</span>
                        <span className="text-lg font-bold text-[#af2f22]">{product.price}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="px-3 py-1.5 bg-primary text-white text-xs rounded-lg hover:bg-opacity-90 active:scale-95 transition-all duration-200 whitespace-nowrap"
                      >
                        <i className="iconfont icon-cart-full mr-1"></i>
                        加入购物车
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <i className="iconfont icon-search text-4xl text-gray-300"></i>
            </div>
            <p className="text-gray-500 mb-6 text-lg">没有找到相关商品</p>
            <p className="text-gray-400 mb-8 text-sm">试试其他关键词或清除筛选条件</p>
            <button
              onClick={exitSearch}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              返回首页
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
