import type { Scene, Choice } from '../types/game'
import { ChoiceButton } from './ChoiceButton'
import { FeedbackText } from './FeedbackText'
import styles from './ChoiceList.module.css'

interface ChoiceListProps {
  scene: Scene
  shuffledChoiceIds: string[]
  disabledChoiceIds: string[]
  feedback: string | null
  onSelect: (choice: Choice) => void
}

export function ChoiceList({
  scene,
  shuffledChoiceIds,
  disabledChoiceIds,
  feedback,
  onSelect,
}: ChoiceListProps) {
  const choiceMap = new Map(scene.choices.map((c) => [c.id, c]))

  const orderedChoices = shuffledChoiceIds
    .map((id) => choiceMap.get(id))
    .filter((c): c is Choice => c !== undefined)

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {orderedChoices.map((choice) => (
          <ChoiceButton
            key={choice.id}
            choice={choice}
            disabled={disabledChoiceIds.includes(choice.id)}
            onClick={onSelect}
          />
        ))}
      </div>
      <FeedbackText text={feedback} />
    </div>
  )
}
