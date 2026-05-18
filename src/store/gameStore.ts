import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Choice, Scene, GameState } from '../types/game'
import { shuffleChoices } from '../utils/shuffleChoices'
import { getWrongResponse } from '../utils/getWrongResponse'

interface GameStore extends GameState {
  startGame: (initialSceneId: string, scene: Scene) => void
  resetGame: (initialSceneId: string, scene: Scene) => void
  enterScene: (scene: Scene) => void
  selectChoice: (choice: Choice, findScene: (id: string) => Scene | undefined) => void
  setFeedback: (text: string | null) => void
  goToMain: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      currentSceneId: null,
      resumeSceneId: null,
      wrongAttempts: 0,
      disabledChoiceIds: [],
      shuffledChoiceIds: [],
      clearedScenes: [],
      feedback: null,

      startGame: (initialSceneId, scene) => {
        set({
          currentSceneId: initialSceneId,
          resumeSceneId: null,
          wrongAttempts: 0,
          disabledChoiceIds: [],
          shuffledChoiceIds: shuffleChoices(scene.choices.map((c) => c.id)),
          clearedScenes: [],
          feedback: null,
        })
      },

      resetGame: (initialSceneId, scene) => {
        set({
          currentSceneId: initialSceneId,
          resumeSceneId: null,
          wrongAttempts: 0,
          disabledChoiceIds: [],
          shuffledChoiceIds: shuffleChoices(scene.choices.map((c) => c.id)),
          clearedScenes: [],
          feedback: null,
        })
      },

      goToMain: () => {
        const { currentSceneId } = get()
        // 게임 진행 중인 씬만 저장 (엔딩/null 제외)
        const resume = currentSceneId && currentSceneId !== '__ending__' ? currentSceneId : null
        set({ currentSceneId: null, resumeSceneId: resume, feedback: null })
      },

      enterScene: (scene) => {
        set({
          currentSceneId: scene.id,
          wrongAttempts: 0,
          disabledChoiceIds: [],
          shuffledChoiceIds: shuffleChoices(scene.choices.map((c) => c.id)),
          feedback: null,
        })
      },

      selectChoice: (choice, findScene) => {
        const state = get()

        if (choice.isCorrect) {
          const newCleared = [...state.clearedScenes, state.currentSceneId!]
          if (choice.nextSceneId) {
            const nextScene = findScene(choice.nextSceneId)
            if (nextScene) {
              set({
                clearedScenes: newCleared,
                currentSceneId: nextScene.id,
                wrongAttempts: 0,
                disabledChoiceIds: [],
                shuffledChoiceIds: shuffleChoices(nextScene.choices.map((c) => c.id)),
                feedback: null,
              })
            }
          } else {
            // 마지막 씬 — 엔딩
            set({
              clearedScenes: newCleared,
              currentSceneId: '__ending__',
              feedback: null,
            })
          }
        } else {
          const newDisabled = [...state.disabledChoiceIds, choice.id]
          const newAttempts = state.wrongAttempts + 1
          const feedback = choice.wrongResponses
            ? getWrongResponse(choice.wrongResponses, newAttempts)
            : null
          set({
            disabledChoiceIds: newDisabled,
            wrongAttempts: newAttempts,
            feedback,
          })
        }
      },

      setFeedback: (text) => set({ feedback: text }),
    }),
    {
      name: 'noname-children-game',
    }
  )
)
