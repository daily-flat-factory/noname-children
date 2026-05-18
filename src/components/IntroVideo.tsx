import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './IntroVideo.module.css'

interface IntroVideoProps {
  onFinished: () => void
  playbackRate?: number
}

type Phase = 'fadein' | 'playing' | 'fadeout'

export function IntroVideo({ onFinished, playbackRate = 0.75 }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const phaseRef = useRef<Phase>('fadein')
  const [phase, _setPhase] = useState<Phase>('fadein')

  const setPhase = (p: Phase) => {
    phaseRef.current = p
    _setPhase(p)
  }

  const finish = () => {
    if (phaseRef.current === 'fadeout') return
    setPhase('fadeout')
  }

  const handleAnimationComplete = () => {
    if (phaseRef.current === 'fadein') setPhase('playing')
    if (phaseRef.current === 'fadeout') onFinished()
  }

  const applyPlaybackRate = () => {
    if (videoRef.current) videoRef.current.playbackRate = playbackRate
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'fadeout' ? 0 : 1 }}
      transition={{ duration: phase === 'fadein' ? 4.5 : 1, ease: 'easeInOut' }}
      onAnimationComplete={handleAnimationComplete}
    >
      <video
        ref={videoRef}
        className={styles.video}
        src="/videos/intro.mp4"
        autoPlay
        playsInline
        muted
        onLoadedMetadata={applyPlaybackRate}
        onCanPlay={applyPlaybackRate}
        onEnded={finish}
      />

      <div className={styles.darkOverlay} />

      <svg width="0" height="0" className={styles.svgHidden}>
        <defs>
          <filter id="intro-film-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            >
              <animate
                attributeName="seed"
                from="0"
                to="100"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div className={styles.noiseOverlay} />

      <button className={styles.skip} onClick={finish}>
        건너뛰기
      </button>
    </motion.div>
  )
}
