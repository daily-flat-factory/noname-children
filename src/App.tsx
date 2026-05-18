import { AnimatePresence, motion } from 'framer-motion'
import { useScenes } from './hooks/useScenes'
import { useGameStore } from './store/gameStore'
import { StartScreen } from './components/StartScreen'
import { SceneView } from './components/SceneView'
import type { Choice } from './types/game'
import styles from './App.module.css'

export default function App() {
  const { loading, error, initialSceneId, findScene } = useScenes()

  const {
    currentSceneId,
    resumeSceneId,
    shuffledChoiceIds,
    disabledChoiceIds,
    feedback,
    startGame,
    enterScene,
    selectChoice,
    goToMain,
  } = useGameStore()

  if (loading) {
    return (
      <div className={styles.center}>
        <p className={styles.loadingText}>—</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.center}>
        <p className={styles.errorText}>{error}</p>
      </div>
    )
  }

  const hasSave = resumeSceneId !== null

  const handleStart = () => {
    const firstScene = findScene(initialSceneId)
    if (firstScene) startGame(initialSceneId, firstScene)
  }

  const handleResume = () => {
    const scene = resumeSceneId ? findScene(resumeSceneId) : undefined
    if (scene) {
      enterScene(scene)
    } else {
      handleStart()
    }
  }

  const handleSelect = (choice: Choice) => {
    selectChoice(choice, findScene)
  }

  // 시작 화면
  if (currentSceneId === null) {
    return (
      <AnimatePresence mode="wait">
        <StartScreen
          hasSave={hasSave}
          onStart={handleStart}
          onResume={handleResume}
        />
      </AnimatePresence>
    )
  }

  // 엔딩 화면
  if (currentSceneId === '__ending__') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.ending}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.endingInner}>
            <p className={styles.endingText}>—</p>
            <p className={styles.endingCaption}>이야기가 끝났다.</p>
            <button className={styles.endingBtn} onClick={goToMain}>
              처음으로 돌아가기
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  const currentScene = findScene(currentSceneId)

  if (!currentScene) {
    return (
      <div className={styles.center}>
        <p className={styles.errorText}>씬을 찾을 수 없습니다: {currentSceneId}</p>
        <button className={styles.endingBtn} onClick={goToMain}>
          처음으로
        </button>
      </div>
    )
  }

  return (
    <>
      <button className={styles.homeBtn} onClick={goToMain} aria-label="메인으로">
        ←
      </button>
      <AnimatePresence mode="wait">
        <SceneView
          key={currentSceneId}
          scene={currentScene}
          shuffledChoiceIds={shuffledChoiceIds}
          disabledChoiceIds={disabledChoiceIds}
          feedback={feedback}
          onSelect={handleSelect}
        />
      </AnimatePresence>
    </>
  )
}
