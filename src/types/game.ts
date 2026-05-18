export interface Choice {
  id: string
  text: string
  isCorrect: boolean
  nextSceneId?: string
  wrongResponses: [string, string] | null
}

export interface Scene {
  id: string
  chapter: string
  narrative: string[]
  image?: string
  choices: Choice[]
}

export interface ScenesData {
  initialSceneId: string
  scenes: Scene[]
}

export interface GameState {
  currentSceneId: string | null
  resumeSceneId: string | null
  wrongAttempts: number
  disabledChoiceIds: string[]
  shuffledChoiceIds: string[]
  clearedScenes: string[]
  feedback: string | null
}
