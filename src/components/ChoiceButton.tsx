import { motion } from 'framer-motion'
import type { Choice } from '../types/game'
import styles from './ChoiceButton.module.css'

interface ChoiceButtonProps {
  choice: Choice
  disabled: boolean
  onClick: (choice: Choice) => void
}

export function ChoiceButton({ choice, disabled, onClick }: ChoiceButtonProps) {
  return (
    <motion.button
      className={styles.button}
      data-disabled={disabled}
      disabled={disabled}
      onClick={() => onClick(choice)}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: disabled ? 0.28 : 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={disabled ? {} : { scale: 1.01 }}
    >
      {choice.text}
    </motion.button>
  )
}
