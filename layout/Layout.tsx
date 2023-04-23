import { LayoutProps } from './Layout.props'
import styles from './Layout.module.css'
import cn from 'classnames'
import { Header } from './Header/Header'
import { Sidebar } from './Sidebar/Sidebar'
import { Footer } from './Footer/Footer'
import { FunctionComponent, KeyboardEvent, useRef, useState } from 'react'
import { AppContextProvider, IAppContext } from '@/context/app.context'
import { Up } from '@/components'

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code == 'Space' || key.code == 'Enter') {
      key.preventDefault()
      bodyRef.current?.focus()
      setIsVisible(false)
    }
    setIsVisible(false)
  }

  return (
    <div className={styles.wrapper}>
      <a
        href="#"
        tabIndex={1}
        onFocus={() => {
          setIsVisible(true)
        }}
        className={cn(styles.skip, {
          [styles.visible]: isVisible,
        })}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body} tabIndex={0} ref={bodyRef}>
        {children}
      </div>
      <Footer className={styles.footer} />
      <Up />
    </div>
  )
}

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    )
  }
}
