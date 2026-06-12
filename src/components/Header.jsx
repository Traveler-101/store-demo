import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useSearch } from '../context/SearchContext'
import CartDrawer from './CartDrawer'
import SearchInput from './SearchInput'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { cartCount } = useCart()
  const { isSearching, exitSearch } = useSearch()
  const navItems = ['首页', '生鲜', '美食', '餐厨', '电器', '居家', '洗护', '孕婴', '服装']

  return (
    <>
      <header className="header w h-auto lg:h-[132px] flex justify-between items-center flex-wrap lg:flex-nowrap sticky top-0 z-50 bg-white px-2 lg:px-0">
        <div className="logo w-[140px] h-[60px] lg:w-[200px] lg:h-[88px] flex-shrink-0">
          <h1 className="w-full h-full">
            <a
              href="/"
              onClick={() => isSearching && exitSearch()}
              className="w-full h-full block bg-[url('../images/logo.png')] bg-no-repeat bg-center bg-contain text-indent-[-1000px] overflow-hidden"
              title="小兔仙儿"
            >
            </a>
          </h1>
        </div>

        <button
          className="lg:hidden text-2xl p-2 ml-auto mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="iconfont icon-menu"></i>
        </button>

        <div className={`nav-container w-full lg:w-auto ${mobileMenuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full lg:top-auto left-0 right-0 bg-white lg:bg-transparent shadow-lg lg:shadow-none z-50`}>
          <ul className="flex flex-col lg:flex-row gap-2 lg:gap-[48px] p-4 lg:p-0">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block py-2 lg:h-[40px] lg:leading-[40px] text-center hover:text-secondary border-b border-gray-100 lg:border-b-2 lg:border-transparent lg:hover:border-secondary transition-all text-base"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    if (isSearching) exitSearch()
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="search w-full lg:w-auto order-last lg:order-none hidden md:block px-2 lg:px-4 py-2 lg:py-0">
          <SearchInput />
        </div>
        
        <div className="car relative cursor-pointer flex-shrink-0 pr-2 lg:pr-0" onClick={() => setCartOpen(true)}>
          {cartCount > 0 && (
            <span className="absolute -top-1 left-[12px] lg:left-[20px] px-[5px] py-[2px] rounded-[8px] bg-[#e26237] text-white text-xs">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
          <i className="iconfont icon-cart-full text-[28px] lg:text-[40px] mr-[10px] lg:mr-[15px]"></i>
        </div>
      </header>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
