import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScenes } from './hooks/useScenes'
import { useGameStore } from './store/gameStore'
import { StartScreen } from './components/StartScreen'
import { SceneView } from './components/SceneView'
import { IntroVideo } from './components/IntroVideo'
import type { Choice } from './types/game'
import styles from './App.module.css'

export default function App() {
  const { loading, error, initialSceneId, findScene } = useScenes()
  const [showIntro, setShowIntro] = useState(false)

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
    setShowIntro(true)
  }

  const handleIntroFinished = () => {
    setShowIntro(false)
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

  return (
    <>
      {showIntro && <IntroVideo onFinished={handleIntroFinished} />}

      {!showIntro && (
        <>
          {/* 시작 화면 */}
          {currentSceneId === null && (
            <AnimatePresence mode="wait">
              <StartScreen
                hasSave={hasSave}
                onStart={handleStart}
                onResume={handleResume}
              />
            </AnimatePresence>
          )}

          {/* 엔딩 화면 */}
          {currentSceneId === '__ending__' && (
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
          )}

          {/* 씬 미발견 */}
          {currentSceneId !== null &&
            currentSceneId !== '__ending__' &&
            !findScene(currentSceneId) && (
              <div className={styles.center}>
                <p className={styles.errorText}>
                  씬을 찾을 수 없습니다: {currentSceneId}
                </p>
                <button className={styles.endingBtn} onClick={goToMain}>
                  처음으로
                </button>
              </div>
            )}

          {/* 게임 화면 */}
          {currentSceneId !== null &&
            currentSceneId !== '__ending__' &&
            findScene(currentSceneId) && (
              <>
                <button
                  className={styles.homeBtn}
                  onClick={goToMain}
                  aria-label="메인으로"
                >
                  ←
                </button>
                <AnimatePresence mode="wait">
                  <SceneView
                    key={currentSceneId}
                    scene={findScene(currentSceneId)!}
                    shuffledChoiceIds={shuffledChoiceIds}
                    disabledChoiceIds={disabledChoiceIds}
                    feedback={feedback}
                    onSelect={handleSelect}
                  />
                </AnimatePresence>
              </>
            )}
        </>
      )}
    </>
  )
}
