import { AnimatePresence, motion } from 'framer-motion'
import styles from './FeedbackText.module.css'

interface FeedbackTextProps {
  text: string | null
}

export function FeedbackText({ text }: FeedbackTextProps) {
  return (
    <AnimatePresence mode="wait">
      {text && (
        <motion.p
          key={text}
          className={styles.feedback}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {text}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
