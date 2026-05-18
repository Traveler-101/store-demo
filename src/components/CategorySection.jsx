import { memo } from 'react'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'

function CategorySection({ title, tabs, products, leftImage }) {
  const { viewProduct, addToCart } = useCart()

  return (
    <div className="w">
      <div className="head flex justify-between items-center h-[102px] pt-[20px] flex-wrap">
        <h2 className="text-[30px] lg:text-[30px] md:text-[24px] sm:text-[20px]">{title}</h2>
        <div className="head-right flex items-center flex-wrap">
          <ul className="flex gap-[10px] flex-wrap">
            {tabs.map((tab, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="px-2 py-[3px] hover:text-white hover:bg-primary hover:rounded-[3px] transition-all duration-200"
                >
                  {tab}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="more ml-[60px] lg:ml-[60px] md:ml-[20px] sm:ml-0 mt-2 md:mt-0 text-base text-[#a1a1a1] hover:text-secondary transition-colors"
          >
            查看全部 <i className="iconfont icon-arrow-right-bold"></i>
          </a>
        </div>
      </div>
      <div className="body flex justify-between flex-col lg:flex-row">
        <a href="#" className="body-l product-card w-[248px] lg:w-[248px] md:w-full sm:w-full h-[610px] lg:h-[610px] md:h-[300px] sm:h-[200px] mb-4 lg:mb-0">
          <LazyImage src={leftImage} alt="" className="w-full h-full object-cover rounded-lg" />
        </a>
        <ul className="body-r flex flex-wrap w-[968px] lg:w-[968px] md:w-full sm:w-full h-[610px] lg:h-[610px] md:h-auto sm:h-auto">
          {products.map((product, index) => (
            <li 
              key={product.id} 
              className="product-card product-card-hover w-[242px] lg:w-[242px] md:w-[calc(50%-8px)] sm:w-full h-[305px] lg:h-[305px] md:h-auto sm:h-auto p-[10px_21px_0] text-center relative bg-white rounded-lg overflow-hidden fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="block w-full h-full leading-[19px] cursor-pointer" onClick={() => viewProduct(product)}>
                <div className="overflow-hidden rounded-lg mb-4">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="product-image w-[200px] lg:w-[200px] md:w-full sm:w-full h-[180px] lg:h-[180px] md:h-[150px] sm:h-[120px] object-cover mx-auto"
                  />
                </div>
                <h3 className="title mt-[10px] text-base ellipsis transition-colors hover:text-primary">{product.name}</h3>
                <p className="text-sm text-[#a1a1a1]">{product.spec}</p>
                <p className="text-sm text-[#a1a1a1]">{product.tag}</p>
                <p className="price mt-[12px] text-[22px] text-[#af2f22]">
                  <small className="text-base">¥</small>
                  {product.price}
                </p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product)
                  }}
                  className="btn-primary bg-primary text-white px-3 py-1 rounded text-xs w-full transform transition-all duration-200 hover:shadow-lg"
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
