import { ButtonProps } from './Button.props'
import cn from 'classnames'
import styles from './Button.module.css'
import ArrowIcon from './arrow.svg'
import { motion } from 'framer-motion'

export const Button = ({
  appearance,
  arrow = 'none',
  children,
  className,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <motion.button
      className={cn(styles.button, className, {
        [styles.primary]: appearance == 'primary',
        [styles.ghost]: appearance == 'ghost',
      })}
      {...props}
      whileHover={{ scale: 1.05 }}
    >
      {children}
      {arrow != 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow == 'down',
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  )
}
