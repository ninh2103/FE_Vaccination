import { cn } from '@/core/lib/utils'

interface ImageProps {
  src: string
  image_alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

const ImageCustom = ({ src, image_alt, className, loading }: ImageProps) => {
  let imageAlt
  if (src && (!image_alt || image_alt === '')) {
    const lastSlashIndex = src.lastIndexOf('/')
    const imagePath = src.substring(lastSlashIndex + 1)
    const lastDotIndex = imagePath.lastIndexOf('.')
    if (lastDotIndex !== -1) {
      imageAlt = imagePath.substring(0, lastDotIndex)
    } else {
      imageAlt = imagePath
    }
    const regex = /-\d+x\d+$/
    imageAlt = imageAlt.replace(regex, '')
  }
  return (
    <img
      src={src}
      alt={image_alt || imageAlt || ''}
      className={cn('w-full h-auto object-cover', className)}
      loading={loading}
      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    />
  )
}

export default ImageCustom
