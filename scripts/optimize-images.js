import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const inputDir = './uploads'
const outputDir = './public/uploads'

// 创建输出目录
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// 获取所有图片文件
const files = fs.readdirSync(inputDir).filter(file => 
  /\.(png|jpg|jpeg)$/i.test(file)
)

async function optimizeImages() {
  console.log(`开始优化 ${files.length} 张图片...`)
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file)
    const baseName = path.basename(file, path.extname(file))
    
    // 压缩原格式
    await sharp(inputPath)
      .resize({ width: 800 })
      .jpeg({ quality: 80, progressive: true })
      .toFile(path.join(outputDir, file))
    
    // 转换为 WebP
    await sharp(inputPath)
      .resize({ width: 800 })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, `${baseName}.webp`))
    
    console.log(`✓ ${file}`)
  }
  
  console.log('✅ 图片优化完成！')
}

optimizeImages().catch(err => {
  console.error('❌ 图片优化失败:', err)
  process.exit(1)
})