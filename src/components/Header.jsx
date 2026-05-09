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
      <header className="header w h-[132px] flex justify-between items-center flex-wrap lg:flex-nowrap sticky top-0 z-50 bg-white">
        <div className="logo w-[200px] h-[88px] lg:w-[200px]">
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
          className="lg:hidden text-2xl p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className="iconfont icon-menu"></i>
        </button>

        <ul className={`nav flex gap-[48px] lg:flex hidden ${mobileMenuOpen ? 'flex flex-col absolute top-[132px] left-0 right-0 bg-white shadow-lg z-50 p-4' : ''}`}>
          {navItems.map((item, index) => (
            <li key={index} className={mobileMenuOpen ? 'py-2' : ''}>
              <a
                href="#"
                className={`block h-[40px] leading-[40px] text-center hover:text-secondary border-b-2 border-transparent hover:border-secondary transition-all ${mobileMenuOpen ? 'text-lg' : ''}`}
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

        <div className="search relative hidden md:block">
          <SearchInput />
        </div>
        <div className="car relative cursor-pointer" onClick={() => setCartOpen(true)}>
          {cartCount > 0 && (
            <span className="absolute top-0 left-[20px] px-[5px] py-[2px] rounded-[8px] bg-[#e26237] text-white text-xs">
              {cartCount}
            </span>
          )}
          <i className="iconfont icon-cart-full text-[40px] mr-[15px]"></i>
        </div>
      </header>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}