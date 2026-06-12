import { useState, useRef, useEffect } from 'react'
import { useSearch } from '../context/SearchContext'

export default function SearchInput() {
  const { search, searchHistory, removeFromHistory, clearHistory } = useSearch()
  const [showHistory, setShowHistory] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const containerRef = useRef(null)

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowHistory(false)
      }
    }

    if (showHistory) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showHistory])

  const handleSearch = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue) {
      search(trimmedValue)
    }
    setShowHistory(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    // 输入时显示历史记录
    setShowHistory(true)
  }

  const handleHistoryClick = (word) => {
    setInputValue(word)
    search(word)
    setShowHistory(false)
  }

  const handleFocus = () => {
    setShowHistory(true)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative group">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="搜一搜"
          className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-100 rounded-full transition-colors"
          aria-label="搜索"
        >
          <i className="iconfont icon-search"></i>
        </button>
      </div>

      {/* 搜索历史下拉框 */}
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-fadeIn">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
            <span className="text-sm text-gray-600 font-medium">
              <i className="iconfont icon-history mr-2"></i>
              搜索历史
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                clearHistory()
                setShowHistory(false)
              }}
              className="text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              清空
            </button>
          </div>
          <ul className="max-h-[300px] overflow-y-auto">
            {searchHistory.map((word, index) => (
              <li
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between group transition-colors"
                onClick={() => handleHistoryClick(word)}
              >
                <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">
                  <i className="iconfont icon-search mr-3 text-gray-400"></i>
                  {word}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFromHistory(word)
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <i className="iconfont icon-close"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
