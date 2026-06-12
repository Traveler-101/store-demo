import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { freshProducts, clothesProducts, kitchenProducts, homeProducts, freshGoods } from '../data/products'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [keyword, setKeyword] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity })
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedOrigins, setSelectedOrigins] = useState([])
  const [selectedSpecs, setSelectedSpecs] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('searchHistory')
    if (saved) {
      setSearchHistory(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  }, [searchHistory])

  const allProducts = useMemo(() => {
    return [
      ...freshProducts.map(p => ({ ...p, category: '生鲜' })),
      ...clothesProducts.map(p => ({ ...p, category: '服饰' })),
      ...kitchenProducts.map(p => ({ ...p, category: '餐厨' })),
      ...homeProducts.map(p => ({ ...p, category: '居家' })),
      ...freshGoods.map(p => ({ ...p, category: '好物', spec: p.spec || '', tag: p.tag || '' })),
    ]
  }, [])

  const brands = useMemo(() => {
    const brandSet = new Set()
    allProducts.forEach(p => {
      if (p.brand) brandSet.add(p.brand)
    })
    return ['全部', ...Array.from(brandSet)]
  }, [allProducts])

  const origins = useMemo(() => {
    const originSet = new Set()
    allProducts.forEach(p => {
      if (p.origin) originSet.add(p.origin)
    })
    return ['全部', ...Array.from(originSet)]
  }, [allProducts])

  const specs = useMemo(() => {
    const specSet = new Set()
    allProducts.forEach(p => {
      if (p.spec) specSet.add(p.spec)
    })
    return ['全部', ...Array.from(specSet)]
  }, [allProducts])

  const filteredProducts = useMemo(() => {
    let result = [...allProducts]

    if (keyword.trim()) {
      const lowerKeyword = keyword.toLowerCase().trim()
      result = result.filter(p =>
        p.name.toLowerCase().includes(lowerKeyword) ||
        (p.spec && p.spec.toLowerCase().includes(lowerKeyword)) ||
        (p.tag && p.tag.toLowerCase().includes(lowerKeyword))
      )
    }

    if (priceRange.min > 0 || priceRange.max < Infinity) {
      result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max)
    }

    if (selectedBrands.length > 0 && !selectedBrands.includes('全部')) {
      result = result.filter(p => p.brand && selectedBrands.includes(p.brand))
    }

    if (selectedOrigins.length > 0 && !selectedOrigins.includes('全部')) {
      result = result.filter(p => p.origin && selectedOrigins.includes(p.origin))
    }

    if (selectedSpecs.length > 0 && !selectedSpecs.includes('全部')) {
      result = result.filter(p => p.spec && selectedSpecs.includes(p.spec))
    }

    // 创建数组副本进行排序，避免修改原数组
    const sortedResult = [...result]
    switch (sortBy) {
      case 'price-asc':
        sortedResult.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sortedResult.sort((a, b) => b.price - a.price)
        break
      case 'sales':
        sortedResult.sort((a, b) => (b.sales || 0) - (a.sales || 0))
        break
      case 'rating':
        sortedResult.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        break
    }

    return sortedResult
  }, [keyword, priceRange, selectedBrands, selectedOrigins, selectedSpecs, sortBy, allProducts])

  const addToHistory = (word) => {
    if (!word.trim()) return
    setSearchHistory(prev => {
      const filtered = prev.filter(h => h !== word)
      return [word, ...filtered].slice(0, 10)
    })
  }

  const removeFromHistory = (word) => {
    setSearchHistory(prev => prev.filter(h => h !== word))
  }

  const clearHistory = () => {
    setSearchHistory([])
  }

  const search = (word) => {
    const trimmedWord = word.trim()
    if (trimmedWord) {
      setKeyword(trimmedWord)
      addToHistory(trimmedWord)
      setIsSearching(true)
    }
  }

  const resetFilters = () => {
    setSortBy('default')
    setPriceRange({ min: 0, max: Infinity })
    setSelectedBrands([])
    setSelectedOrigins([])
    setSelectedSpecs([])
  }

  const exitSearch = () => {
    setIsSearching(false)
    setKeyword('')
    resetFilters()
  }

  return (
    <SearchContext.Provider
      value={{
        keyword,
        setKeyword,
        search,
        searchHistory,
        removeFromHistory,
        clearHistory,
        filteredProducts,
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
        isSearching,
        exitSearch,
        resetFilters,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
