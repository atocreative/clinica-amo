'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ASSETS, SITE } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// SVG viewport center — all layers pivot here
const CX = 300
const CY = 295

const WORDS = 'Harmonização facial com propósito'.split(' ')

/** 6-petal mandala: circles placed at 60° intervals around the center */
function MandalaPetals({
  r = 90,
  offset = 90,
  stroke = 'rgba(28,28,28,0.05)',
  sw = 0.7,
}: {
  r?: number
  offset?: number
  stroke?: string
  sw?: number
}) {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * 60 * Math.PI) / 180
        return (
          <circle
            key={i}
            cx={CX + Math.cos(a) * offset}
            cy={CY + Math.sin(a) * offset}
            r={r}
            stroke={stroke}
            strokeWidth={sw}
            fill="none"
          />
        )
      })}
    </>
  )
}

/** Evenly distributed dots on a circle of given radius */
function DotsOnRing({
  n,
  radius,
  rDot = 2,
  fillAccent = 'rgba(245,158,11,0.55)',
  fillBase = 'rgba(28,28,28,0.28)',
}: {
  n: number
  radius: number
  rDot?: number
  fillAccent?: string
  fillBase?: string
}) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const a = (i * (360 / n) * Math.PI) / 180
        return (
          <circle
            key={i}
            cx={CX + Math.cos(a) * radius}
            cy={CY + Math.sin(a) * radius}
            r={i % 3 === 0 ? rDot + 1 : rDot}
            fill={i % 3 === 0 ? fillAccent : fillBase}
          />
        )
      })}
    </>
  )
}

export default function HeroSection() {
  // Layout refs
  const sectionRef   = useRef<HTMLElement>(null)
  const textColRef   = useRef<HTMLDivElement>(null)
  const headlineRef  = useRef<HTMLHeadingElement>(null)
  const subRef       = useRef<HTMLParagraphElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const imageColRef  = useRef<HTMLDivElement>(null)
  const svgWrapRef   = useRef<HTMLDivElement>(null)
  const frameRef     = useRef<HTMLDivElement>(null)

  // SVG layer refs — each animated independently by GSAP
  const orbPulseRef    = useRef<SVGCircleElement>(null) // L0: radiate pulse
  const outerRingRef   = useRef<SVGCircleElement>(null) // L1: slow CW rotation
  const dashedRing1Ref = useRef<SVGGElement>(null)      // L2a: dashed CCW
  const dashedRing2Ref = useRef<SVGGElement>(null)      // L2b: dashed CW gold
  const mandalaCoreRef = useRef<SVGGElement>(null)      // L3: 6-petal mandala
  const innerCircleRef = useRef<SVGCircleElement>(null) // L4: inner gold breathe
  const accentDotsRef  = useRef<SVGGElement>(null)      // L5: outer dot ring
  const innerDotsRef   = useRef<SVGGElement>(null)      // L6: inner dot ring

  useGSAP(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pref) return

    // ── Entrance timeline ────────────────────────────────────────────
    const words = headlineRef.current?.querySelectorAll('[data-word]') ?? []
    const tl = gsap.timeline({ delay: 0.05 })

    tl.from(svgWrapRef.current,  { scale: 0.52, opacity: 0, duration: 3.2, ease: 'expo.out' }, 0)
    tl.from(imageColRef.current, { x: 75, opacity: 0, scale: 0.93, duration: 1.9, ease: 'expo.out' }, 0.12)
    tl.from(frameRef.current,    { scale: 0.58, opacity: 0, rotation: -28, duration: 2.8, ease: 'expo.out' }, 0.04)
    tl.from(words, {
      y: '130%', opacity: 0, rotationX: -48,
      duration: 1.05, ease: 'expo.out', stagger: 0.075,
    }, 0.18)
    tl.from(subRef.current, { y: 36, opacity: 0, duration: 1.0, ease: 'expo.out' }, '-=0.46')
    tl.from(ctaRef.current, { y: 26, opacity: 0, duration: 0.9, ease: 'expo.out' }, '-=0.54')

    // ── SVG layer rotations ───────────────────────────────────────────

    // L0 — gold orb: radiate outward and fade on loop
    gsap.fromTo(
      orbPulseRef.current,
      { scale: 0.82, opacity: 0.20, transformOrigin: `${CX}px ${CY}px` },
      { scale: 1.38, opacity: 0, duration: 5.5, repeat: -1, ease: 'expo.out' },
    )

    // L1 — outer ring: ultra-slow CW (60 s / revolution — matches spec)
    gsap.to(outerRingRef.current, {
      rotation: 360,
      svgOrigin: `${CX} ${CY}`,
      duration: 60,
      repeat: -1,
      ease: 'none',
    })

    // L2a — dashed ring: counter-clockwise
    gsap.to(dashedRing1Ref.current, {
      rotation: -360,
      svgOrigin: `${CX} ${CY}`,
      duration: 38,
      repeat: -1,
      ease: 'none',
    })

    // L2b — gold dashed ring: clockwise, slightly faster
    gsap.to(dashedRing2Ref.current, {
      rotation: 360,
      svgOrigin: `${CX} ${CY}`,
      duration: 24,
      repeat: -1,
      ease: 'none',
    })

    // L3 — mandala core: very slow CW + gentle scale breathing
    gsap.to(mandalaCoreRef.current, {
      rotation: 360,
      svgOrigin: `${CX} ${CY}`,
      duration: 100,
      repeat: -1,
      ease: 'none',
    })
    gsap.to(mandalaCoreRef.current, {
      scale: 1.055,
      svgOrigin: `${CX} ${CY}`,
      duration: 9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // L4 — inner gold ring: breathing opacity + scale
    gsap.to(innerCircleRef.current, {
      scale: 1.09,
      opacity: 0.52,
      svgOrigin: `${CX} ${CY}`,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // L5 — outer accent dots: slow CCW + opacity pulse
    gsap.to(accentDotsRef.current, {
      rotation: -180,
      svgOrigin: `${CX} ${CY}`,
      duration: 50,
      repeat: -1,
      ease: 'none',
    })
    gsap.to(accentDotsRef.current, {
      opacity: 0.42,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    // L6 — inner dots: CW (opposite direction) + scale pulse
    gsap.to(innerDotsRef.current, {
      rotation: 180,
      svgOrigin: `${CX} ${CY}`,
      duration: 32,
      repeat: -1,
      ease: 'none',
    })
    gsap.to(innerDotsRef.current, {
      scale: 1.06,
      svgOrigin: `${CX} ${CY}`,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.2,
    })

    // Gold frame slow drift
    gsap.to(frameRef.current, {
      rotation: 5,
      duration: 14,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2,
    })

    // ── Mouse parallax — soft camera depth effect ─────────────────────
    // Each layer gets a different depth multiplier (larger = "closer" = more movement)
    const mouseCfg = { duration: 1.4, ease: 'power2.out', overwrite: 'auto' as const }

    const onMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current!.getBoundingClientRect()
      const x = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2 // −1 → +1
      const y = ((e.clientY - rect.top)   / rect.height - 0.5) * 2

      // Background layers move least (furthest away)
      gsap.to(outerRingRef.current,   { x: x * 2,  y: y * 2,  ...mouseCfg })
      gsap.to(dashedRing1Ref.current, { x: x * 4,  y: y * 4,  ...mouseCfg })
      gsap.to(mandalaCoreRef.current, { x: x * 5,  y: y * 5,  ...mouseCfg })
      gsap.to(innerCircleRef.current, { x: x * 7,  y: y * 7,  ...mouseCfg })
      gsap.to(dashedRing2Ref.current, { x: x * 8,  y: y * 8,  ...mouseCfg })
      // Dot layers move most (closest to viewer)
      gsap.to(innerDotsRef.current,   { x: x * 10, y: y * 10, ...mouseCfg })
      gsap.to(accentDotsRef.current,  { x: x * 13, y: y * 13, ...mouseCfg })
    }

    const el = sectionRef.current!
    el.addEventListener('mousemove', onMouseMove)

    // ── Scroll parallax — layered depth on scroll ─────────────────────
    const base = { trigger: sectionRef.current, start: 'top top', end: 'bottom top' }

    gsap.to(svgWrapRef.current,  { y: -55,  ease: 'none', scrollTrigger: { ...base, scrub: 3.0 } })
    gsap.to(frameRef.current,    { y: -82,  ease: 'none', scrollTrigger: { ...base, scrub: 1.9 } })
    gsap.to(imageColRef.current, { y: -100, ease: 'none', scrollTrigger: { ...base, scrub: 1.2 } })
    gsap.to(textColRef.current, {
      y: -62,
      opacity: 0.08,
      ease: 'none',
      scrollTrigger: { ...base, scrub: 0.9 },
    })
    gsap.to(overlayRef.current, {
      backgroundColor: 'rgba(28,28,28,0.48)',
      ease: 'none',
      scrollTrigger: { ...base, scrub: 1.6 },
    })

    return () => el.removeEventListener('mousemove', onMouseMove)
  }, { scope: sectionRef })

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-dvh flex items-end pb-0 overflow-hidden"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={ASSETS.heroVideo}
        aria-hidden="true"
      />

      {/* Color tint */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(176,195,202,0.88)' }} />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(176,195,202,0.96) 0%, rgba(176,195,202,0.72) 55%, rgba(176,195,202,0.20) 100%)',
        }}
      />

      {/* Scroll-progressive darkening */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'rgba(28,28,28,0)' }}
      />

      {/* ── Content grid ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10" style={{ paddingTop: 'max(10rem, calc(env(safe-area-inset-top) + 8rem))' }}>
        <div className="grid lg:grid-cols-2 gap-0 items-end">

          {/* Left — text */}
          <div ref={textColRef} className="pb-24 lg:pb-32 max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <h1
              ref={headlineRef}
              className="font-serif text-hero text-charcoal leading-none mb-7"
              aria-label="Harmonização facial com propósito"
            >
              {WORDS.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden leading-none mr-[0.22em] last:mr-0"
                  style={{ perspective: '600px' }}
                >
                  <span data-word className="inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              ref={subRef}
              className="font-sans text-subheadline text-charcoal/65 font-light mb-6 leading-relaxed"
            >
              Realçando sua beleza natural com ciência e planejamento.
            </p>

            <div ref={ctaRef} className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5 justify-center lg:justify-start">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="font-sans text-xs text-charcoal/55 tracking-wide">
                  Avaliação exclusiva com DermaVision
                </span>
              </div>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-full bg-charcoal text-cream font-sans text-sm font-medium tracking-wide hover:bg-charcoal/80 transition-colors duration-150"
                >
                  Agendar Horário
                </a>
                <a
                  href="#benefits"
                  className="px-8 py-4 rounded-full border border-charcoal/25 text-charcoal font-sans text-sm font-medium tracking-wide hover:border-charcoal/55 transition-colors duration-200"
                >
                  Conhecer tratamentos
                </a>
              </div>
            </div>
          </div>

          {/* Right — doctor column */}
          <div
            ref={imageColRef}
            className="relative self-end h-[520px] sm:h-[620px] lg:h-[760px]"
          >
            {/* ── SVG mandala system — behind doctor (z-[2]) ────────── */}
            <div
              ref={svgWrapRef}
              className="absolute inset-0 pointer-events-none z-[2] scale-110 opacity-80"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 600 590"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                overflow="visible"
              >
                {/* L0 — Gold orb radiate pulse */}
                <circle
                  ref={orbPulseRef}
                  cx={CX}
                  cy={CY}
                  r="185"
                  fill="rgba(245,158,11,0.065)"
                />

                {/* L1 — Outer atmospheric ring (slow CW) */}
                <circle
                  ref={outerRingRef}
                  cx={CX}
                  cy={CY}
                  r="268"
                  stroke="rgba(28,28,28,0.07)"
                  strokeWidth="0.8"
                />

                {/* L2a — Dashed ring (CCW) */}
                <g ref={dashedRing1Ref}>
                  <circle
                    cx={CX}
                    cy={CY}
                    r="232"
                    stroke="rgba(28,28,28,0.10)"
                    strokeWidth="0.9"
                    strokeDasharray="5 13"
                  />
                </g>

                {/* L2b — Gold dashed ring (CW, faster) */}
                <g ref={dashedRing2Ref}>
                  <circle
                    cx={CX}
                    cy={CY}
                    r="188"
                    stroke="rgba(245,158,11,0.22)"
                    strokeWidth="1"
                    strokeDasharray="3 17"
                  />
                  <circle
                    cx={CX}
                    cy={CY}
                    r="195"
                    stroke="rgba(245,158,11,0.08)"
                    strokeWidth="0.5"
                    strokeDasharray="1 22"
                  />
                </g>

                {/* L3 — Mandala core: 6 petals + concentric rings */}
                <g ref={mandalaCoreRef}>
                  <MandalaPetals r={92} offset={92} stroke="rgba(28,28,28,0.052)" sw={0.65} />
                  {/* Mandala outer boundary */}
                  <circle cx={CX} cy={CY} r={92}  stroke="rgba(28,28,28,0.07)"   strokeWidth="0.7" />
                  {/* Gold accent ring */}
                  <circle cx={CX} cy={CY} r={58}  stroke="rgba(245,158,11,0.16)" strokeWidth="0.8" />
                  {/* Inner core */}
                  <circle cx={CX} cy={CY} r={28}  stroke="rgba(28,28,28,0.12)"   strokeWidth="0.7" />
                  {/* Center dot */}
                  <circle cx={CX} cy={CY} r={4}   fill="rgba(245,158,11,0.35)" />
                </g>

                {/* L4 — Inner gold breathing ring */}
                <circle
                  ref={innerCircleRef}
                  cx={CX}
                  cy={CY}
                  r="138"
                  stroke="rgba(245,158,11,0.13)"
                  strokeWidth="1.1"
                />

                {/* L5 — Outer accent dots (CCW + pulse) */}
                <g ref={accentDotsRef}>
                  <DotsOnRing n={16} radius={248} rDot={2.2} />
                  <circle
                    cx={CX}
                    cy={CY}
                    r={248}
                    stroke="rgba(28,28,28,0.045)"
                    strokeWidth="0.4"
                  />
                </g>

                {/* L6 — Inner dots (CW — opposite direction) */}
                <g ref={innerDotsRef}>
                  <DotsOnRing
                    n={10}
                    radius={158}
                    rDot={1.8}
                    fillAccent="rgba(245,158,11,0.45)"
                    fillBase="rgba(28,28,28,0.22)"
                  />
                </g>
              </svg>
            </div>

            {/* Gold circle frame PNG — mid layer (z-[5]) */}
            <div
              ref={frameRef}
              className="absolute inset-0 flex items-end justify-center pointer-events-none z-[5]"
              aria-hidden="true"
            >
              <div className="relative w-[90%] h-[85%]">
                <Image
                  src="/assets/gold-circle-frame.png"
                  alt=""
                  fill
                  className="object-contain opacity-40"
                />
              </div>
            </div>

            {/* Ground shadow — separates doctor from backdrop (z-[7]) */}
            <div
              className="absolute inset-0 z-[7] pointer-events-none"
              style={{
                background: [
                  'radial-gradient(ellipse 52% 30% at 50% 100%, rgba(28,28,28,0.50) 0%, rgba(28,28,28,0.16) 52%, transparent 70%)',
                  'radial-gradient(ellipse 30% 16% at 50% 100%, rgba(28,28,28,0.36) 0%, transparent 62%)',
                ].join(', '),
              }}
              aria-hidden="true"
            />

            {/* Doctor portrait — front of column (z-[10]) */}
            <Image
              src={ASSETS.heroImage}
              alt={`${SITE.professional} — ${SITE.tagline}`}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 50vw"
              className="object-contain object-bottom z-[10] relative"
              style={{
                filter:
                  'contrast(1.05) brightness(1.02) drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.15))',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
