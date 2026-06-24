'use client'

import { useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ASSETS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const afterClipRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  useGSAP(
    () => {
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (pref) return
      gsap.from(titleRef.current, {
        y: 60, opacity: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })
      gsap.from(sliderRef.current, {
        opacity: 0, y: 50, duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })
    },
    { scope: sectionRef },
  )

  // Direct DOM update — no React state, no re-render, zero lag
  const updatePos = useCallback((clientX: number) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const pct = Math.max(4, Math.min(96, ((clientX - rect.left) / rect.width) * 100))
    if (afterClipRef.current) afterClipRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
    if (dividerRef.current) dividerRef.current.style.left = `${pct}%`
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => { isDragging.current = true; updatePos(e.clientX) }, [updatePos])
  const onMouseMove = useCallback((e: React.MouseEvent) => { if (isDragging.current) updatePos(e.clientX) }, [updatePos])
  const onTouchStart = useCallback((e: React.TouchEvent) => { isDragging.current = true; updatePos(e.touches[0].clientX) }, [updatePos])
  const onTouchMove = useCallback((e: React.TouchEvent) => { if (isDragging.current) updatePos(e.touches[0].clientX) }, [updatePos])
  const stopDrag = useCallback(() => { isDragging.current = false }, [])

  useEffect(() => {
    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchend', stopDrag)
    return () => {
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchend', stopDrag)
    }
  }, [stopDrag])

  return (
    <section id="results" ref={sectionRef} className="section-pad bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={titleRef} className="mb-12 text-center">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-primary font-medium">
            Resultado real
          </span>
          <h2 className="font-serif text-headline text-charcoal mt-4">
            Antes e Depois
          </h2>
        </div>
        <div className="flex justify-center w-full">
          <div
            ref={sliderRef}
            role="img"
            aria-label="Comparação antes e depois do procedimento"
            className="relative w-full overflow-hidden cursor-col-resize select-none rounded-2xl shadow-lg"
            style={{ aspectRatio: '1 / 1', maxWidth: '600px' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={stopDrag}
          >
            {/* Before — full bleed, no letterboxing */}
            <div className="absolute inset-0">
              <Image
                src={ASSETS.before}
                alt="Antes do procedimento"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
                className="object-contain"
                draggable={false}
              />
            </div>

            {/* After — clip driven directly via ref, initial 50% */}
            <div
              ref={afterClipRef}
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: 'inset(0 50% 0 0)' }}
            >
              <Image
                src={ASSETS.after}
                alt="Depois do procedimento"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
                className="object-contain"
                draggable={false}
              />
            </div>

            {/* Divider — positioned via ref, initial 50% */}
            <div
              ref={dividerRef}
              className="absolute inset-y-0 w-px bg-white/70 pointer-events-none"
              style={{ left: '50%' }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center pointer-events-auto cursor-col-resize z-20">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7 4L3 10l4 6M13 4l4 6-4 6" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <p className="font-sans text-xs text-secondary mt-5 text-center tracking-wide">
          Arraste para comparar · resultados individuais podem variar
        </p>
      </div>
    </section>
  )
}
