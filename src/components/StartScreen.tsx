import { motion } from 'framer-motion'
import styles from './StartScreen.module.css'

interface StartScreenProps {
  hasSave: boolean
  onStart: () => void
  onResume: () => void
}

export function StartScreen({ hasSave, onStart, onResume }: StartScreenProps) {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <img src="/images/main-bg.jpg" alt="" className={styles.bg} />
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          무존재 아이들
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          No-Name Children
        </motion.p>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          {hasSave && (
            <button className={styles.btnPrimary} onClick={onResume}>
              이어하기
            </button>
          )}
          <button
            className={hasSave ? styles.btnSecondary : styles.btnPrimary}
            onClick={onStart}
          >
            처음부터
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
