import cn from 'classnames'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { P } from '../P/P'
import { Rating } from '../Rating/Rating'
import { Textarea } from '../Textarea/Textarea'
import styles from './ReviewForm.module.css'
import CloseIcon from './close.svg'
import { ReviewFormProps } from './ReviewForm.props'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface'
import axios from 'axios'
import { API } from '@/helpers/api'
import { useState } from 'react'

export const ReviewForm = ({
  productId,
  className,
  isOpened,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>()

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isError, setIsError] = useState<string>()

  const onSubmit: SubmitHandler<IReviewForm> = async (formData) => {
    try {
      const { data } = await axios.post<IReviewSendResponse>(
        API.review.createDemo,
        { ...formData, productId }
      )
      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setIsError('Что-то пошло не так...')
      }
    } catch (e) {
      setIsError('Error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.form, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните поле имя' },
          })}
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните поле заголовок' },
          })}
          placeholder="Заголовок отзыва"
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: 'Поставьте оценку' } }}
            render={({ field }) => (
              <Rating
                isEditable
                ref={field.ref}
                rating={field.value}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните поле отзыва' },
          })}
          className={styles.description}
          placeholder="Текст отзыва"
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
        />
        <div className={styles.submit}>
          <Button
            type="submit"
            appearance="primary"
            tabIndex={isOpened ? 0 : -1}
          >
            Отправить
          </Button>
          <span>
            * Перед публикацией отзыв пройдет предварительную модерацию
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={styles.success}>
          <P>Ваш отзыв отправлен</P>
          <button className={styles.close} onClick={() => setIsSuccess(false)}>
            <CloseIcon />
          </button>
        </div>
      )}
      {isError && (
        <div className={styles.error}>
          <P>Что-то пошло не так, попробуйте обновить страницу</P>
          <button
            className={styles.close}
            onClick={() => setIsError(undefined)}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  )
}
