import { useScrollY } from '@/hooks/useScrollY'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { ButtonIcon } from '../ButtonIcon/ButtonIcon'
import styles from './Up.module.css'

export const Up = (): JSX.Element => {
  const y = useScrollY()

  const controls = useAnimation()

  useEffect(() => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight
    if (y > 100) {
      controls.start({
        opacity: y / scrollHeight,
        display: 'block',
      })
    } else {
      controls.start({
        opacity: 0,
        display: 'none',
      })
    }
  }, [y, controls])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <motion.div
      className={styles.up}
      animate={controls}
      initial={{ opacity: 0, display: 'none' }}
    >
      <ButtonIcon appearance="primary" icon="up" onClick={scrollToTop} />
    </motion.div>
  )
}
