import { memo } from 'react'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'

function CategorySection({ title, tabs, products, leftImage }) {
  const { viewProduct, addToCart } = useCart()

  return (
    <div className="w px-2 lg:px-0">
      <div className="head flex flex-col sm:flex-row justify-between items-center sm:items-start h-auto sm:h-[102px] pt-4 sm:pt-[20px] gap-2">
        <h2 className="text-xl sm:text-2xl lg:text-[30px]">{title}</h2>
        <div className="head-right flex flex-col sm:flex-row items-center sm:items-center gap-2 w-full sm:w-auto">
          <ul className="flex gap-[8px] flex-wrap justify-center">
            {tabs.map((tab, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="px-2 py-1 text-xs sm:text-sm hover:text-white hover:bg-primary hover:rounded-[3px] transition-all duration-200"
                >
                  {tab}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="more text-xs sm:text-base text-[#a1a1a1] hover:text-secondary transition-colors"
          >
            查看全部 <i className="iconfont icon-arrow-right-bold"></i>
          </a>
        </div>
      </div>
      <div className="body flex flex-col lg:flex-row gap-4 lg:gap-0">
        <a href="#" className="body-l product-card w-full lg:w-[248px] h-[200px] sm:h-[300px] lg:h-[610px] flex-shrink-0">
          <LazyImage src={leftImage} alt="" className="w-full h-full object-cover rounded-lg" />
        </a>
        <ul className="body-r grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 w-full lg:w-[968px]">
          {products.map((product, index) => (
            <li 
              key={product.id} 
              className="product-card product-card-hover w-full h-auto sm:h-[300px] lg:h-[305px] p-2 sm:p-[10px_21px_0] text-center relative bg-white rounded-lg overflow-hidden fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="block w-full h-full leading-[19px] cursor-pointer" onClick={() => viewProduct(product)}>
                <div className="overflow-hidden rounded-lg mb-2 sm:mb-4">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="product-image w-full h-[100px] sm:h-[140px] lg:h-[180px] object-cover mx-auto"
                  />
                </div>
                <h3 className="title mt-[5px] sm:mt-[10px] text-xs sm:text-sm lg:text-base ellipsis transition-colors hover:text-primary line-clamp-2">{product.name}</h3>
                <p className="text-xs text-[#a1a1a1] hidden sm:block">{product.spec}</p>
                <p className="text-xs text-[#a1a1a1] hidden sm:block">{product.tag}</p>
                <p className="price mt-[5px] sm:mt-[12px] text-sm sm:text-lg lg:text-[22px] text-[#af2f22]">
                  <small className="text-xs sm:text-base">¥</small>
                  {product.price}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product)
                  }}
                  className="btn-primary bg-primary text-white px-2 sm:px-3 py-1 rounded text-xs w-full transform transition-all duration-200 hover:shadow-lg"
                >
                  加入购物车
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default memo(CategorySection)
