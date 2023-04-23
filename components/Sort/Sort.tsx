import cn from 'classnames'
import { SortEnum, SortProps } from './Sort.props'
import styles from './Sort.module.css'
import SortIcon from './sort.svg'
import { KeyboardEvent } from 'react'

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  const changeSort = (e: KeyboardEvent, sort: SortEnum) => {
    if (e.code == 'Space' || e.code == 'Enter') {
      e.preventDefault()
      setSort(sort)
    }
  }

  return (
    <div className={cn(styles.sort, className)} {...props}>
      <button
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort == SortEnum.Rating,
        })}
        onKeyDown={(e) => changeSort(e, SortEnum.Rating)}
      >
        <SortIcon className={styles.icon} />
        По рейтингу
      </button>
      <button
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort == SortEnum.Price,
        })}
        onKeyDown={(e) => changeSort(e, SortEnum.Price)}
      >
        <SortIcon className={styles.icon} />
        По цене
      </button>
    </div>
  )
}
