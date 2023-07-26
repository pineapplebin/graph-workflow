import { FC, useMemo } from 'react'
import { Container } from '@/desktop-ui'

import styles from './ImageInside.module.css'

interface ImageInsideProps {
  image?: string | Blob | null
}

const ImageInside: FC<ImageInsideProps> = ({ image }) => {
  const imageContent = useMemo<string | null>(() => {
    if (typeof image === 'string') {
      return image
    } else if (image !== null && image !== undefined) {
      return URL.createObjectURL(image)
    }
    return null
  }, [image])

  const content = useMemo(() => {
    if (!imageContent) {
      return (
        <Container className={styles.EmptyBlock}>
          <span>empty</span>
        </Container>
      )
    }

    return <img className={styles.Image} src={imageContent} />
  }, [imageContent])

  return <Container className={styles.ImageInside}>{content}</Container>
}

export default ImageInside
