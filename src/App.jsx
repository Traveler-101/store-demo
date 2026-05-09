import { useSearch } from './context/SearchContext'
import Shortcut from './components/Shortcut'
import Header from './components/Header'
import Entry from './components/Entry'
import ProductSection from './components/ProductSection'
import Brand from './components/Brand'
import CategorySection from './components/CategorySection'
import NewsSection from './components/NewsSection'
import Footer from './components/Footer'
import ProductModal from './components/ProductModal'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import SearchResult from './components/SearchResult'
import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import { SearchProvider } from './context/SearchContext'
import { freshGoods, hotRecommend, freshProducts, clothesProducts, kitchenProducts, homeProducts } from './data/products'

function AppContent() {
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
      <Brand />
      <CategorySection
        title="生鲜"
        tabs={['热门', '蔬菜', '肉禽蛋', '水果', '海鲜', '零食', '饮料']}
        products={freshProducts}
        leftImage="./uploads/fresh_left.png"
      />
      <CategorySection
        title="服饰"
        tabs={['热门', '女装', '奢侈品', '裤装', '衬衫', 'T恤', '内衣']}
        products={clothesProducts}
        leftImage="./uploads/colthes_left.png"
      />
      <CategorySection
        title="餐厨"
        tabs={['热门', '厨具', '水具', '灯具', '五金', '家装材料', '居家好物']}
        products={kitchenProducts}
        leftImage="./uploads/kitchen_left.png"
      />
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

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <SearchProvider>
          <AppContent />
        </SearchProvider>
      </CartProvider>
    </UserProvider>
  )
}

export default App
