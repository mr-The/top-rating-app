import { Card, Htag } from '@/components'
import { API } from '@/helpers/api'
import { firstLevelMenu } from '@/helpers/helpers'
import { MenuItem } from '@/interfaces/menu.interface'
import { withLayout } from '@/layout/Layout'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import styles from '../styles/pages/index.module.css'

const imgFileNames: IImgFileNames = {
  Аналитика: 'analytics',
  Бизнес: 'business',
  Дизайн: 'design',
  Игры: 'games',
  'Красота и здоровье': 'beauty',
  Маркетинг: 'marketing',
  Программирование: 'programming',
  Прочее: 'other',
  'Создание контента': 'content-creation',
  Управление: 'management',
  Языки: 'languages',
}

const backgroundName = (name: string): string | undefined => {
  if (!name) {
    return
  }
  if (imgFileNames[name]) {
    return imgFileNames[name]
  }
}

function Home({ menu }: HomeProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      {menu.map((m) => {
        const imageName = backgroundName(m._id.secondCategory)
          ? `/images/${backgroundName(m._id.secondCategory)}.svg`
          : null

        return (
          <Card
            key={m._id.secondCategory}
            style={{ backgroundImage: `url(${imageName})` }}
            className={styles.block}
          >
            <Htag tag="h3" className={styles.title}>
              {m._id.secondCategory}
            </Htag>
            <div />
            {m.pages.map((p) => (
              <>
                <Link
                  key={p._id}
                  className={styles.link}
                  href={firstLevelMenu[0].route + '/' + p.alias}
                >
                  {p.category}
                </Link>
                <div />
              </>
            ))}
          </Card>
        )
      })}
    </div>
  )
}

export default withLayout(Home)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  })
  return {
    props: {
      menu,
      firstCategory,
    },
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}

interface IImgFileNames {
  [str: string]: string
}
