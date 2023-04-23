import { Advantages, HhData, Htag, P, Product, Sort, Tag } from '@/components'
import { TopPageComponentProps } from './TopPageComponent.props'
import styles from './TopPageComponent.module.css'
import { SortEnum } from '@/components/Sort/Sort.props'
import { useEffect, useReducer } from 'react'
import { sortReducer } from './sort.reducer'
import { useScrollY } from '@/hooks/useScrollY'

export const TopPageComponent = ({
  page,
  products,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  )

  const y = useScrollY()

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products })
  }, [products])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="gray" size="m">
            {products.length}
          </Tag>
        )}
        <Sort
          sort={sort}
          setSort={(sort: SortEnum) => {
            dispatchSort({ type: sort })
          }}
        />
      </div>
      <div>
        {sortedProducts &&
          sortedProducts.map((p) => <Product layout key={p._id} product={p} />)}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2" tabIndex={-1}>
          Вакансии - {page.category}{' '}
        </Htag>
        <Tag color="red" size="m" tabIndex={-1}>
          hh.ru
        </Tag>
      </div>
      {page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2" tabIndex={-1}>
            Преимущества
          </Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2" tabIndex={-1}>
        Получаемые навыки
      </Htag>
      <div className={styles.tags}>
        {page.tags.map((t) => (
          <Tag key={t} color="primary" tabIndex={-1}>
            {t}
          </Tag>
        ))}
      </div>
    </div>
  )
}
