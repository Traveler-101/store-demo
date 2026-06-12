import { lazy, Suspense } from 'react'
import { SearchProvider } from './context/SearchContext'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { useSearch } from './context/SearchContext'
import { freshGoods, hotRecommend, freshProducts, clothesProducts, kitchenProducts, homeProducts } from './data/products'

// 懒加载组件
const Shortcut = lazy(() => import('./components/Shortcut'))
const Header = lazy(() => import('./components/Header'))
const Entry = lazy(() => import('./components/Entry'))
const ProductSection = lazy(() => import('./components/ProductSection'))
const Brand = lazy(() => import('./components/Brand'))
const CategorySection = lazy(() => import('./components/CategorySection'))
const NewsSection = lazy(() => import('./components/NewsSection'))
const Footer = lazy(() => import('./components/Footer'))
const ProductModal = lazy(() => import('./components/ProductModal'))
const LoginModal = lazy(() => import('./components/LoginModal'))
const RegisterModal = lazy(() => import('./components/RegisterModal'))
const SearchResult = lazy(() => import('./components/SearchResult'))
const PageSkeleton = lazy(() => import('./components/Skeleton'))

function AppContent() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 animate-pulse">
      <div className="h-[132px] bg-white w-full"></div>
      <div className="w px-4 py-8">
        <div className="w-full h-[500px] bg-gray-200 rounded-lg mb-8"></div>
        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="flex justify-between flex-wrap gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-[304px] h-[404px] bg-[#EEF9F4] rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>}>
      <AppContentInner />
    </Suspense>
  )
}

function AppContentInner() {
  const { isSearching } = useSearch()

  if (isSearching) {
    return (
      <>
        <Shortcut />
        <Header />
        <SearchResult />
        <ProductModal />
        <LoginModal />
        <RegisterModal />
      </>
    )
  }

  return (
    <div className="min-h-screen">
      <Shortcut />
      <Header />
      <Entry />
      <ProductSection
        title="新鲜好物"
        subtitle="新鲜出炉 品质靠谱"
        products={freshGoods}
      />
      <ProductSection
        title="人气推荐"
        subtitle="人气爆款 不容错过"
        products={hotRecommend}
        showPrice={false}
        className="hot mb-[60px]"
      />
      {/* <Brand /> */}
      <CategorySection
        title="生鲜"
        tabs={['热门', '蔬菜', '肉禽蛋', '水果', '海鲜', '零食', '饮料']}
        products={freshProducts}
        leftImage="./uploads/fresh_left.png"
      />
      {/* <CategorySection
        title="服饰"
        tabs={['热门', '女装', '奢侈品', '裤装', '衬衫', 'T恤', '内衣']}
        products={clothesProducts}
        leftImage="./uploads/colthes_left.png"
      /> */}
      {/* <CategorySection
        title="餐厨"
        tabs={['热门', '厨具', '水具', '灯具', '五金', '家装材料', '居家好物']}
        products={kitchenProducts}
        leftImage="./uploads/kitchen_left.png"
      /> */}
      <CategorySection
        title="居家"
        tabs={['热门', '鲜花生活', '家纺', '创意礼品', '个性佩饰', '生活日用']}
        products={homeProducts}
        leftImage="./uploads/home_left.png"
      />
      <NewsSection />
      <Footer />
      <ProductModal />
      <LoginModal />
      <RegisterModal />
    </div>
  )
}

export default function App() {
  return (
    <SearchProvider>
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>
    </SearchProvider>
  )
}
