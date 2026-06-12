import { memo } from 'react'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'

function ProductSection({ title, subtitle, products, showPrice = true, className = '' }) {
  const { viewProduct, addToCart } = useCart()

  return (
    <div className={`product-section w px-2 lg:px-0 ${className}`}>
      <div className="box-hd flex flex-col sm:flex-row justify-between items-center sm:items-start h-auto sm:h-[102px] pt-4 sm:pt-[20px] gap-2">
        <h2 className="text-xl sm:text-[24px] lg:text-[30px] text-center sm:text-left">
          {title}
          <span className="text-[#a1a1a1] ml-1 sm:ml-2 text-xs sm:text-base">{subtitle}</span>
        </h2>
        <a href="#" className="more text-xs sm:text-base text-[#a1a1a1] hover:text-secondary transition-colors">
          查看全部 <i className="iconfont icon-arrow-right-bold"></i>
        </a>
      </div>
      <div className="box-bd">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:flex justify-between items-start gap-2 sm:gap-4">
          {products.map((product, index) => (
            <li
              key={product.id}
              className={`product-card product-card-hover w-full h-auto sm:h-[380px] lg:h-[404px] text-center relative ${showPrice ? 'bg-[#EEF9F4]' : 'bg-white'} rounded-lg overflow-hidden fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="block w-full h-full leading-[19px] cursor-pointer p-2 sm:p-4"
                onClick={() => viewProduct(product)}
              >
                <div className="overflow-hidden rounded-lg mb-2 sm:mb-4">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="product-image w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px] object-cover mx-auto"
                  />
                </div>
                <h3 className="title text-xs sm:text-sm lg:text-base mb-1 sm:mb-2 transition-colors hover:text-primary line-clamp-2">{product.name}</h3>
                <p className="text-xs text-[#a1a1a1] mb-1 sm:mb-2 hidden sm:block">{product.spec}</p>
                {showPrice && (
                  <p className="price text-sm sm:text-lg lg:text-[22px] text-[#af2f22] mb-1 sm:mb-2">
                    <small className="text-xs sm:text-base">¥</small>
                    {product.price}
                  </p>
                )}
              </div>
              {showPrice && (
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                    className="btn-primary bg-primary text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm w-full transform transition-all duration-200 hover:shadow-lg"
                  >
                    加入购物车
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(ProductSection)
