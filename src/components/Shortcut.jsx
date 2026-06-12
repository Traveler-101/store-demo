import UserMenu from './UserMenu'

export default function Shortcut() {
  return (
    <div className="shortcut w h-[30px] bg-[#f1f1f1] text-[#444444]">
      <div className="w flex justify-between items-center h-full">
        <div className="shortcut-left flex items-center gap-2 sm:gap-4">
          <a href="#" className="text-xs sm:text-sm hover:text-secondary transition-colors">
            首页
          </a>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <a href="#" className="text-xs sm:text-sm hover:text-secondary transition-colors hidden sm:inline">
            手机
          </a>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <a href="#" className="text-xs sm:text-sm hover:text-secondary transition-colors hidden sm:inline">
            下载APP
          </a>
        </div>
        <div className="shortcut-right flex items-center gap-2 sm:gap-4">
          <UserMenu />
          <span className="text-gray-300 hidden sm:inline">|</span>
          <a href="#" className="text-xs sm:text-sm hover:text-secondary transition-colors hidden md:inline">
            我的订单
          </a>
          <span className="text-gray-300 hidden md:inline">|</span>
          <a href="#" className="text-xs sm:text-sm hover:text-secondary transition-colors hidden md:inline">
            会员中心
          </a>
          <span className="text-gray-300 hidden md:inline">|</span>
          <a href="#" className="text-xs sm:text-sm hover:text-secondary transition-colors hidden md:inline">
            帮助中心
          </a>
          <span className="text-gray-300 hidden md:inline">|</span>
          <a href="#" className="text-xs sm:text-sm hover:text-secondary transition-colors hidden lg:inline">
            在线客服
          </a>
          <span className="text-gray-300 hidden lg:inline">|</span>
          <a href="#" className="text-xs sm:text-sm hover:text-secondary transition-colors">
            <i className="iconfont icon-mobile-phone mr-1"></i>
            <span className="hidden sm:inline">手机版</span>
          </a>
        </div>
      </div>
    </div>
  )
}
