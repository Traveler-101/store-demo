import { useCart } from '../context/CartContext'

export default function ProductModal() {
  const { selectedProduct, showModal, closeModal, addToCart } = useCart()

  if (!showModal || !selectedProduct) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full md:w-1/2 h-64 md:h-80 object-cover rounded-lg"
          />
          <div className="flex-1">
            {selectedProduct.desc && (
              <p className="text-gray-600 mb-4">{selectedProduct.desc}</p>
            )}
            {selectedProduct.spec && (
              <p className="text-gray-500 mb-2">规格：{selectedProduct.spec}</p>
            )}
            {selectedProduct.tag && (
              <p className="text-gray-500 mb-4">标签：{selectedProduct.tag}</p>
            )}
            {selectedProduct.price && (
              <p className="text-3xl text-[#aa2113] font-bold mb-6">
                ¥{selectedProduct.price}
              </p>
            )}
            <button
              onClick={() => {
                addToCart(selectedProduct)
                closeModal()
              }}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              加入购物车
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
