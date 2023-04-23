import { ProductProps } from './Product.props'
import styles from './Product.module.css'
import cn from 'classnames'
import { Card } from '../Card/Card'
import { Rating } from '../Rating/Rating'
import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'
import { declOfNum, priceRu } from '@/helpers/helpers'
import { Divider } from '../Divider/Divider'
import Image from 'next/image'
import {
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useRef,
  useState,
} from 'react'
import { Review } from '../Review/Review'
import { ReviewForm } from '../ReviewForm/ReviewForm'
import { motion } from 'framer-motion'

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
      const reviewRef = useRef<HTMLDivElement>(null)

      const variants = {
        visible: { opacity: 1, height: 'auto' },
        hidden: { opacity: 0, height: 0 },
      }

      const scrollToReview = () => {
        setIsReviewOpened(true)
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
        reviewRef.current?.focus()
      }

      const ClickScrollToReview = (e: KeyboardEvent | undefined) => {
        if (!e) {
          return
        }
        if (e.code == 'Space' || e.code == 'Enter') {
          e.preventDefault()
          scrollToReview()
        }
      }

      const imageURL = product.image.includes('http')
        ? product.image
        : process.env.NEXT_PUBLIC_DOMAIN + product.image

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={imageURL}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              {priceRu(product.price)}
              {product.oldPrice && (
                <Tag className={styles.old_price} color="green">
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              {priceRu(product.credit)}
              <span className={styles.month}>/мес</span>
            </div>
            <div className={styles.rating}>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag className={styles.category} key={c} color="ghost">
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.price_title}>цена</div>
            <div className={styles.credit_title}>в кредит</div>
            <div className={styles.rate_title}>
              <a
                href="#review"
                onClick={scrollToReview}
                onKeyDown={ClickScrollToReview}
              >
                {product.reviewCount}{' '}
                {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
              </a>
            </div>
            <Divider className={styles.hr} />
            <div className={styles.description}>{product.description}</div>
            <div className={styles.features}>
              {product.characteristics.map((c) => (
                <div key={c.name} className={styles.characteristics}>
                  <span className={styles.characteristic}>{c.name}</span>
                  <span className={styles.dots}></span>
                  <span className={styles.value}>{c.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.adv_block}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.adv_title}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}
              {product.disAdvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.adv_title}>Недостатки</div>
                  <div>{product.disAdvantages}</div>
                </div>
              )}
            </div>
            <Divider className={cn(styles.hr, styles.hr2)} />
            <div className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                appearance="ghost"
                arrow={isReviewOpened ? 'down' : 'right'}
                onClick={() => setIsReviewOpened(!isReviewOpened)}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div
            animate={isReviewOpened ? 'visible' : 'hidden'}
            variants={variants}
            initial="hidden"
          >
            <Card
              color="blue"
              className={styles.reviews}
              ref={reviewRef}
              tabIndex={isReviewOpened ? 0 : -1}
            >
              {product.reviews.map((review) => (
                <Review key={review._id} review={review} />
              ))}
              <ReviewForm productId={product._id} isOpened={isReviewOpened} />
            </Card>
          </motion.div>
        </div>
      )
    }
  )
)
