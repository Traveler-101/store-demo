import UserMenu from './UserMenu'

export default function Shortcut() {
  return (
    <div className="shortcut w h-[30px] bg-[#f1f1f1] text-[#444444]">
      <div className="w flex justify-between items-center h-full">
        <div className="shortcut-left flex items-center gap-4">
          <a href="#" className="text-sm hover:text-secondary transition-colors">
            首页
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-sm hover:text-secondary transition-colors">
            手机
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-sm hover:text-secondary transition-colors">
            下载APP
          </a>
        </div>
        <div className="shortcut-right flex items-center gap-4">
          <UserMenu />
          <span className="text-gray-300">|</span>
          <a href="#" className="text-sm hover:text-secondary transition-colors">
            我的订单
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-sm hover:text-secondary transition-colors">
            会员中心
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-sm hover:text-secondary transition-colors">
            帮助中心
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-sm hover:text-secondary transition-colors">
            在线客服
          </a>
          <span className="text-gray-300">|</span>
          <a href="#" className="text-sm hover:text-secondary transition-colors">
            <i className="iconfont icon-mobile-phone mr-1"></i>
            手机版
          </a>
        </div>
      </div>
    </div>
  )
}