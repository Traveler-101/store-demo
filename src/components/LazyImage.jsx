import { memo } from 'react'

function LazyImage({ src, alt, className = '', fallback = null }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

export default memo(LazyImage)
