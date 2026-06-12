import { useState } from 'react'
import { useSearch } from '../context/SearchContext'

export default function FilterPanel() {
  const {
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    selectedBrands,
    setSelectedBrands,
    selectedOrigins,
    setSelectedOrigins,
    selectedSpecs,
    setSelectedSpecs,
    brands,
    origins,
    specs,
    resetFilters,
  } = useSearch()

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [activeTab, setActiveTab] = useState('sort')

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((b) => b !== brand)
      }
      return [...prev, brand]
    })
  }

  const toggleOrigin = (origin) => {
    setSelectedOrigins((prev) => {
      if (prev.includes(origin)) {
        return prev.filter((o) => o !== origin)
      }
      return [...prev, origin]
    })
  }

  const toggleSpec = (spec) => {
    setSelectedSpecs((prev) => {
      if (prev.includes(spec)) {
        return prev.filter((s) => s !== spec)
      }
      return [...prev, spec]
    })
  }

  const applyPriceRange = () => {
    setPriceRange({
      min: minPrice ? parseFloat(minPrice) : 0,
      max: maxPrice ? parseFloat(maxPrice) : Infinity,
    })
  }

  const tabs = [
    { id: 'sort', label: '排序' },
    { id: 'price', label: '价格区间' },
    { id: 'brand', label: '品牌' },
    { id: 'origin', label: '产地' },
    { id: 'spec', label: '规格' },
  ]

  const sortOptions = [
    { value: 'default', label: '默认排序' },
    { value: 'sales', label: '销量优先' },
    { value: 'rating', label: '好评优先' },
    { value: 'price-asc', label: '价格从低到高' },
    { value: 'price-desc', label: '价格从高到低' },
  ]

  return (
    <div className="bg-white border-b border-gray-200 sticky top-[132px] z-40 shadow-sm">
      <div className="w">
        {/* 标签栏 */}
        <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab.id ? 'text-primary' : 'text-gray-600 hover:text-secondary'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
          <button
            onClick={resetFilters}
            className="ml-auto px-4 py-4 text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap"
          >
            <i className="iconfont icon-refresh mr-1"></i>
            重置筛选
          </button>
        </div>

        {/* 筛选内容区域 */}
        <div className="p-4 bg-gray-50/50">
          {activeTab === 'sort' && (
            <div className="flex flex-wrap gap-3">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-5 py-2.5 rounded-full text-sm transition-all duration-200 ${
                    sortBy === option.value
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'price' && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">¥</span>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="最低价"
                  className="w-28 pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <span className="text-gray-400 font-light">—</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">¥</span>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="最高价"
                  className="w-28 pl-7 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <button
                onClick={applyPriceRange}
                className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm hover:bg-opacity-90 active:scale-95 transition-all duration-200"
              >
                确定
              </button>
              {(priceRange.min > 0 || priceRange.max < Infinity) && (
                <span className="text-xs text-gray-500">
                  当前: ¥{priceRange.min} - ¥{priceRange.max === Infinity ? '不限' : priceRange.max}
                </span>
              )}
            </div>
          )}

          {activeTab === 'brand' && (
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => toggleBrand(brand)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    selectedBrands.includes(brand)
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'origin' && (
            <div className="flex flex-wrap gap-2">
              {origins.map((origin) => (
                <button
                  key={origin}
                  onClick={() => toggleOrigin(origin)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    selectedOrigins.includes(origin)
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {origin}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'spec' && (
            <div className="flex flex-wrap gap-2">
              {specs.map((spec) => (
                <button
                  key={spec}
                  onClick={() => toggleSpec(spec)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    selectedSpecs.includes(spec)
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
