import { motion } from 'framer-motion'
import type { Scene, Choice } from '../types/game'
import { ChoiceList } from './ChoiceList'
import styles from './SceneView.module.css'

interface SceneViewProps {
  scene: Scene
  shuffledChoiceIds: string[]
  disabledChoiceIds: string[]
  feedback: string | null
  onSelect: (choice: Choice) => void
}

export function SceneView({
  scene,
  shuffledChoiceIds,
  disabledChoiceIds,
  feedback,
  onSelect,
}: SceneViewProps) {
  return (
    <motion.div
      key={scene.id}
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55 }}
    >
      <div className={styles.inner}>
        <p className={styles.chapter}>{scene.chapter}</p>

        {scene.image && (
          <div className={styles.imageWrapper}>
            <img src={scene.image} alt="" className={styles.image} />
          </div>
        )}

        <div className={styles.narrative}>
          {scene.narrative.map((paragraph, idx) => (
            <motion.p
              key={idx}
              className={styles.paragraph}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <ChoiceList
          scene={scene}
          shuffledChoiceIds={shuffledChoiceIds}
          disabledChoiceIds={disabledChoiceIds}
          feedback={feedback}
          onSelect={onSelect}
        />
      </div>
    </motion.div>
  )
}
