import { useSearch } from '../context/SearchContext'
import { useCart } from '../context/CartContext'
import FilterPanel from './FilterPanel'

export default function SearchResult() {
  const { filteredProducts, keyword, exitSearch } = useSearch()
  const { viewProduct, addToCart } = useCart()

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200 sticky top-[90px] z-40">
        <div className="w flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={exitSearch}
              className="text-gray-600 hover:text-secondary transition-colors"
            >
              <i className="iconfont icon-arrow-left"></i>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">搜索:</span>
              <span className="text-primary font-medium">{keyword}</span>
              <span className="text-gray-400">共 {filteredProducts.length} 件商品</span>
            </div>
          </div>
        </div>
      </div>

      <FilterPanel />

      <div className="w py-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => viewProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                      {product.name}
                    </h3>
                    {product.spec && (
                      <p className="text-xs text-gray-500 mb-1">{product.spec}</p>
                    )}
                    {product.tag && (
                      <p className="text-xs text-gray-400 mb-2">{product.tag}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#af2f22]">
                        ¥{product.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="px-3 py-1 bg-primary text-white text-xs rounded hover:bg-opacity-90 transition-colors"
                      >
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
            <div className="text-6xl mb-4">
              <i className="iconfont icon-search text-gray-300"></i>
            </div>
            <p className="text-gray-500 mb-4">没有找到相关商品</p>
            <button
              onClick={exitSearch}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              返回首页
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
