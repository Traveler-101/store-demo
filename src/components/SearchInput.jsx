import { useState, useRef } from 'react'
import { useSearch } from '../context/SearchContext'

export default function SearchInput() {
  const { search, searchHistory, removeFromHistory, clearHistory } = useSearch()
  const [showHistory, setShowHistory] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const debounceRef = useRef(null)

  const handleSearch = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
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
  }

  const handleHistoryClick = (word) => {
    setInputValue(word)
    search(word)
    setShowHistory(false)
  }

  const handleFocus = () => {
    setShowHistory(true)
  }

  const handleBlur = () => {
    setTimeout(() => setShowHistory(false), 200)
  }

  return (
    <div className="relative flex-1 max-w-[500px]">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="搜一搜"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-left 
          "
        />
        <button
          onClick={handleSearch}
          className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
        >
          <i className="iconfont icon-search"></i>
        </button>
      </div>

      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">搜索历史</span>
            <button
              onClick={clearHistory}
              className="text-xs text-gray-400 hover:text-secondary transition-colors"
            >
              清空历史
            </button>
          </div>
          <ul className="py-2">
            {searchHistory.map((word, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
                <span
                  onClick={() => handleHistoryClick(word)}
                  className="text-sm text-gray-700 hover:text-secondary transition-colors"
                >
                  <i className="iconfont icon-search mr-2 text-gray-400"></i>
                  {word}
                </span>
                <button
                  onClick={() => removeFromHistory(word)}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
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