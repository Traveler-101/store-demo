import { useState, useEffect, useRef, useCallback } from 'react'
import { categories } from '../data/products'

// 将 banners 数组移到组件外部作为常量
const BANNERS = [
  { id: 1, image: './uploads/banner1.png' },
  { id: 2, image: './uploads/topic2.png' },
  { id: 3, image: './uploads/topic1.png' },
]

export default function Entry() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length)
    }, 3000)
  }, []) // 移除 banners.length 依赖，因为 banners 是常量

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [startTimer])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    startTimer()
  }

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + BANNERS.length) % BANNERS.length)
    startTimer()
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length)
    startTimer()
  }

  return (
    <div className="entry w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-[#f5f5f5]">
      <div className="w relative h-full">
        <div className="category absolute top-0 left-0 z-50 w-[200px] lg:w-[250px] md:w-[180px] h-full bg-[rgba(0,0,0,0.42)] hidden md:block">
          <ul>
            {categories.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center h-[50px] px-[20px] lg:px-[29px] pr-[12px] text-white hover:bg-primary transition-colors cursor-pointer"
              >
                <p className="flex flex-wrap items-center text-sm lg:text-base">
                  <a href="#" className="text-white mr-[8px]">{item.name}</a>
                  {item.sub.map((sub, subIndex) => (
                    <span key={subIndex}>
                      {subIndex > 0 && <span className="text-white mr-1">|</span>}
                      <a href="#" className="text-white/80 text-xs">{sub}</a>
                    </span>
                  ))}
                </p>
                <i className="iconfont icon-arrow-right-bold text-sm"></i>
              </li>
            ))}
          </ul>
        </div>
        <div className="banner relative h-full overflow-hidden">
          <ul
            className="h-full flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNERS.map((banner) => (
              <li key={banner.id} className="h-full flex-shrink-0 w-full">
                <a href="#" className="block h-full">
                  <img
                    src={banner.image}
                    alt={`Banner ${banner.id}`}
                    className="w-full h-full object-cover"
                  />
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={goToPrev}
            className="prev absolute left-2 sm:left-4 md:left-[200px] lg:left-[250px] top-1/2 -translate-y-1/2 w-[24px] h-[48px] sm:w-[30px] sm:h-[60px] bg-black/30 hover:bg-black/50 flex items-center justify-center text-white cursor-pointer transition-all hover:scale-110 z-10"
            aria-label="上一张"
          >
            <i className="iconfont icon-arrow-left-bold text-lg sm:text-xl"></i>
          </button>
          <button
            onClick={goToNext}
            className="next absolute right-0 top-1/2 -translate-y-1/2 w-[24px] h-[48px] sm:w-[30px] sm:h-[60px] bg-black/30 hover:bg-black/50 flex items-center justify-center text-white cursor-pointer transition-all hover:scale-110 z-10"
            aria-label="下一张"
          >
            <i className="iconfont icon-arrow-right-bold text-lg sm:text-xl"></i>
          </button>
          <ul className="circle flex absolute right-[10px] sm:right-[20px] bottom-[10px] sm:bottom-[20px]">
            {BANNERS.map((_, index) => (
              <li
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] rounded-full mx-[4px] sm:mx-[8px] transition-all cursor-pointer ${
                  index === currentIndex
                    ? 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.5)] scale-125'
                    : 'bg-white/50 hover:bg-white'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`跳转到第 ${index + 1} 张`}
                onKeyDown={(e) => e.key === 'Enter' && goToSlide(index)}
              ></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
