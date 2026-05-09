import { useState, useEffect, useRef, useCallback } from 'react'
import { categories } from '../data/products'

export default function Entry() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timerRef = useRef(null)
  const banners = [
    { id: 1, image: './uploads/banner1.png' },
    { id: 2, image: './uploads/topic2.png' },
    { id: 3, image: './uploads/topic1.png' },
  ]

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    }, 3000)
  }, [banners.length])

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
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length)
    startTimer()
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)
    startTimer()
  }

  return (
    <div className="entry h-[500px] lg:h-[500px] md:h-[400px] sm:h-[300px] bg-[#f5f5f5]">
      <div className="w relative h-full">
        <div className="category absolute top-0 left-0 z-50 w-[250px] lg:w-[250px] md:w-[200px] sm:w-[150px] h-full bg-[rgba(0,0,0,0.42)] hidden lg:block">
          <ul>
            {categories.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center h-[50px] px-[29px] pr-[12px] text-white hover:bg-primary transition-colors cursor-pointer"
              >
                <p className="flex flex-wrap items-center">
                  <a href="#" className="text-base text-white mr-[10px]">{item.name}</a>
                  {item.sub.map((sub, subIndex) => (
                    <span key={subIndex}>
                      {subIndex > 0 && <span className="text-white mr-1">|</span>}
                      <a href="#" className="text-sm text-white mr-1">{sub}</a>
                    </span>
                  ))}
                </p>
                <i className="iconfont icon-arrow-right-bold"></i>
              </li>
            ))}
          </ul>
        </div>
        <div className="banner relative h-full overflow-hidden">
          <ul className="h-full flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {banners.map((banner) => (
              <li key={banner.id} className="h-full flex-shrink-0 w-full">
                <a href="#" className="block h-full">
                  <img src={banner.image} alt="" className="w-full h-full object-cover" />
                </a>
              </li>
            ))}
          </ul>
          <button 
            onClick={goToPrev}
            className="prev absolute left-[250px] top-1/2 -translate-y-1/2 w-[30px] h-[60px] bg-black/30 hover:bg-black/50 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <i className="iconfont icon-arrow-left-bold text-xl"></i>
          </button>
          <button 
            onClick={goToNext}
            className="next absolute right-0 top-1/2 -translate-y-1/2 w-[30px] h-[60px] bg-black/30 hover:bg-black/50 flex items-center justify-center text-white cursor-pointer transition-colors z-60"
          >
            <i className="iconfont icon-arrow-right-bold text-xl"></i>
          </button>
          <ul className="circle flex absolute right-[20px] bottom-[20px]">
            {banners.map((_, index) => (
              <li
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-[14px] h-[14px] rounded-full mx-[8px] transition-all cursor-pointer ${
                  index === currentIndex 
                    ? 'bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.5)]' 
                    : 'bg-white/50 hover:bg-white'
                }`}
              ></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
