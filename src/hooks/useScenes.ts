import { useState, useEffect } from 'react'
import type { Scene, ScenesData } from '../types/game'

interface UseScenesResult {
  loading: boolean
  error: string | null
  scenes: Scene[]
  initialSceneId: string
  findScene: (id: string) => Scene | undefined
}

export function useScenes(): UseScenesResult {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<ScenesData | null>(null)

  useEffect(() => {
    fetch('/content/demo/scenes.json')
      .then((res) => {
        if (!res.ok) throw new Error(`scenes.json 로딩 실패: ${res.status}`)
        return res.json() as Promise<ScenesData>
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : '알 수 없는 오류')
        setLoading(false)
      })
  }, [])

  const findScene = (id: string): Scene | undefined =>
    data?.scenes.find((s) => s.id === id)

  return {
    loading,
    error,
    scenes: data?.scenes ?? [],
    initialSceneId: data?.initialSceneId ?? '',
    findScene,
  }
}
