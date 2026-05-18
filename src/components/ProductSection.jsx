import { memo } from 'react'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'

function ProductSection({ title, subtitle, products, showPrice = true, className = '' }) {
  const { viewProduct, addToCart } = useCart()

  return (
    <div className={`product-section w ${className}`}>
      <div className="box-hd flex justify-between items-center h-[102px] pt-[20px]">
        <h2 className="text-[30px]">
          {title}
          <span className="text-[#a1a1a1] ml-2 text-base">{subtitle}</span>
        </h2>
        <a href="#" className="more text-base text-[#a1a1a1] hover:text-secondary transition-colors">
          查看全部 <i className="iconfont icon-arrow-right-bold"></i>
        </a>
      </div>
      <div className="box-bd">
        <ul className="flex justify-between items-center flex-wrap gap-4 lg:flex-nowrap">
          {products.map((product, index) => (
            <li
              key={product.id}
              className={`product-card product-card-hover w-[304px] lg:w-[304px] md:w-[calc(50%-8px)] sm:w-full h-[404px] lg:h-[404px] md:h-[350px] sm:h-auto text-center relative ${showPrice ? 'bg-[#EEF9F4]' : 'bg-white'} rounded-lg overflow-hidden fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="block w-full h-full leading-[19px] cursor-pointer p-4"
                onClick={() => viewProduct(product)}
              >
                <div className="overflow-hidden rounded-lg mb-4">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="product-image w-[200px] h-[200px] object-cover mx-auto"
                  />
                </div>
                <h3 className="title text-base mb-2 transition-colors hover:text-primary">{product.name}</h3>
                <p className="text-sm text-[#a1a1a1] mb-2">{product.spec}</p>
                {showPrice && (
                  <p className="price text-[22px] text-[#af2f22] mb-2">
                    <small className="text-base">¥</small>
                    {product.price}
                  </p>
                )}
              </div>
              {showPrice && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      addToCart(product)
                    }}
                    className="btn-primary bg-primary text-white px-4 py-2 rounded-lg text-sm w-full transform transition-all duration-200 hover:shadow-lg"
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
