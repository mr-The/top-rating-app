import styles from './Menu.module.css'
import cn from 'classnames'
import { KeyboardEvent, useContext } from 'react'
import { AppContext } from '@/context/app.context'
import { FirstLevelMenuItem, PageItem } from '@/interfaces/menu.interface'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { firstLevelMenu } from '@/helpers/helpers'
import { motion } from 'framer-motion'

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  const router = useRouter()

  const variants = {
    visible: {
      marginBottom: 0,
      marginLeft: 10,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: {
      marginBottom: 0,
      marginLeft: 0,
    },
  }

  const variantsChildren = {
    visible: {
      opacity: 1,
      minHeight: '29px',
      height: 'auto',
    },
    hidden: {
      opacity: 0,
      minHeight: 0,
      height: 0,
    },
  }

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            m.isOpened = !m.isOpened
          }
          return m
        })
      )
  }

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault()
      openSecondLevel(secondCategory)
    }
  }

  const openThirdLevelKey = (
    key: KeyboardEvent | undefined,
    route: string,
    alias: string
  ) => {
    if (!key) {
      return
    }
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault()
      router.push(`/${route}/${alias}`)
    }
  }

  const buildFirstLevel = (): JSX.Element => {
    return (
      <>
        {firstLevelMenu.map((menu) => (
          <nav key={menu.route}>
            <div
              className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: menu.id == firstCategory,
              })}
            >
              {menu.icon}
              <span>{menu.name}</span>
            </div>
            {menu.id == firstCategory && buildSecondLevel(menu)}
          </nav>
        ))}
      </>
    )
  }

  const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])
          ) {
            m.isOpened = true
          }

          return (
            <div key={m._id.secondCategory}>
              <div
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) => {
                  openSecondLevelKey(key, m._id.secondCategory)
                }}
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
              >
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={cn(styles.secondLevelBlock)}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.div>
            </div>
          )
        })}
      </div>
    )
  }

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ): JSX.Element[] => {
    return pages.map((p) => (
      <motion.div key={p._id} variants={variantsChildren}>
        <Link
          href={`/${route}/${p.alias}`}
          tabIndex={isOpened ? 0 : -1}
          onKeyDown={(key) => openThirdLevelKey(key, route, p.alias)}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
          })}
        >
          {p.category}
        </Link>
      </motion.div>
    ))
  }

  return <div className={styles.menu}>{buildFirstLevel()}</div>
}
