import cn from 'classnames'
import { HeaderProps } from './Header.props'
import styles from './Header.module.css'
import Logo from '../logo.svg'
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon'
import { motion } from 'framer-motion'
import { Sidebar } from '../Sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpened) {
      setIsOpened(false)
    }
  }, [router])

  useEffect(() => {
    if (isOpened) {
      document.body.classList.add('overflow')
    } else {
      document.body.classList.remove('overflow')
    }
  }, [isOpened])

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: 0,
      x: '100%',
    },
  }

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Link href={'/'}>
        <Logo />
      </Link>
      {!isOpened ? (
        <ButtonIcon
          appearance="white"
          icon="menu"
          onClick={() => setIsOpened(true)}
        />
      ) : (
        <ButtonIcon
          className={styles.close}
          appearance="white"
          icon="close"
          onClick={() => setIsOpened(false)}
        />
      )}
      <motion.div
        className={styles.menu}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar className={styles.sidebar} />
      </motion.div>
    </header>
  )
}
