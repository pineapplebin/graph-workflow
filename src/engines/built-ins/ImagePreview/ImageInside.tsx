import { type FC, useMemo } from 'react'
import { Container } from '@/desktop-ui'
import type { LimitedNodeProps } from '../../types'

import styles from './ImageInside.module.css'

interface ImageInsideProps
  extends LimitedNodeProps<any, string | Blob | null> {}

const ImageInside: FC<ImageInsideProps> = ({ data: { output } }) => {
  const imageContent = useMemo<string | null>(() => {
    if (typeof output === 'string') {
      return output
    } else if (output !== null && output !== undefined) {
      return URL.createObjectURL(output)
    }
    return null
  }, [output])

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
