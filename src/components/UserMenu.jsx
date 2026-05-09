import { useUser } from '../context/UserContext'

export default function UserMenu() {
  const { user, logout, setIsLoginModalOpen } = useUser()

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="text-base text-[#a1a1a1] hover:text-secondary transition-colors"
        >
          登录
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="text-base text-[#a1a1a1] hover:text-secondary transition-colors"
        >
          注册
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <img
          src={user.avatar}
          alt={user.nickname}
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="text-base text-[#a1a1a1]">{user.nickname}</span>
      </div>
      <span className="text-gray-300">|</span>
      <button
        onClick={logout}
        className="text-base text-[#a1a1a1] hover:text-secondary transition-colors"
      >
        退出
      </button>
    </div>
  )
}
