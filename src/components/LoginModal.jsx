import { useState } from 'react'
import { useUser } from '../context/UserContext'

export default function LoginModal() {
  const { user, login, isLoginModalOpen, setIsLoginModalOpen, setIsRegisterModalOpen } = useUser()
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  })

  if (!isLoginModalOpen || user) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
      id: Date.now(),
      phone: formData.phone,
      nickname: '用户' + Math.floor(Math.random() * 1000),
      avatar: 'https://via.placeholder.com/100',
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setIsLoginModalOpen(false)}>
      <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">登录</h2>
          <button onClick={() => setIsLoginModalOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="请输入手机号"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="请输入密码"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              登录
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            还没有账号？
            <button
              onClick={() => {
                setIsLoginModalOpen(false)
                setIsRegisterModalOpen(true)
              }}
              className="text-primary hover:text-secondary ml-1"
            >
              立即注册
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
