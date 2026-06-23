'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ASSETS, SITE } from '@/lib/constants'

gsap.registerPlugin(useGSAP)

type Dot  = { size: number; top: string; right?: string; left?: string; color: string }
const DOTS: Dot[] = [
  { size: 7,  top: '18%', right: '8%',  color: 'rgba(28,28,28,0.55)' },
  { size: 5,  top: '52%', right: '4%',  color: '#f59e0b' },
  { size: 6,  top: '28%', left:  '5%',  color: 'rgba(28,28,28,0.35)' },
  { size: 4,  top: '67%', right: '22%', color: 'rgba(245,158,11,0.5)' },
  { size: 8,  top: '42%', right: '42%', color: 'rgba(28,28,28,0.18)' },
]

type Ring = { size: number; top: string; right: string; color: string }
const RINGS: Ring[] = [
  { size: 130, top: '8%',  right: '13%', color: 'rgba(28,28,28,0.12)' },
  { size: 55,  top: '62%', right: '7%',  color: 'rgba(245,158,11,0.22)' },
  { size: 200, top: '20%', right: '25%', color: 'rgba(28,28,28,0.05)' },
]

const WORDS = 'Harmonização facial com propósito'.split(' ')

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const frameRef    = useRef<HTMLDivElement>(null)
  const dotsRef     = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (pref) return

      const words = headlineRef.current?.querySelectorAll('[data-word]') ?? []
      const tl = gsap.timeline({ delay: 0.15 })

      // Cinematic word-by-word reveal
      tl.from(words, {
        y: '110%',
        opacity: 0,
        duration: 0.85,
        ease: 'expo.out',
        stagger: 0.065,
      })
        .from(subRef.current,  { y: 22, opacity: 0, duration: 0.9, ease: 'expo.out' }, '-=0.45')
        .from(ctaRef.current,  { y: 16, opacity: 0, duration: 0.8, ease: 'expo.out' }, '-=0.55')

      // Image + frame entrance (parallel with text)
      tl.from(imageRef.current,  { x: 60, opacity: 0, duration: 1.5, ease: 'expo.out' }, 0.2)
        .from(frameRef.current,  { scale: 0.78, opacity: 0, rotation: -12, duration: 1.8, ease: 'expo.out' }, 0.1)

      // Particles pop in
      const dots = dotsRef.current?.querySelectorAll('[data-dot]') ?? []
      gsap.from(dots, {
        scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)',
        stagger: 0.09, delay: 1.0,
      })

      // Ongoing float per dot
      dots.forEach((el, i) => {
        gsap.to(el, {
          y: -12 - i * 1.5,
          duration: 2.3 + i * 0.25,
          ease: 'sine.inOut',
          repeat: -1, yoyo: true,
          delay: i * 0.15,
        })
      })

      // Gold frame slow drift
      gsap.to(frameRef.current, {
        rotation: 4, duration: 10,
        ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2,
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-end pb-0 overflow-hidden"
    >
      {/* Video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={ASSETS.heroVideo}
        aria-hidden="true"
      />

      {/* Primary color tint overlay — replaces the dark charcoal */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(176,195,202,0.88)' }} />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(176,195,202,0.96) 0%, rgba(176,195,202,0.72) 55%, rgba(176,195,202,0.20) 100%)' }}
      />

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28">
        <div className="grid lg:grid-cols-2 gap-0 items-end">

          {/* Left — text */}
          <div className="pb-24 lg:pb-32 max-w-xl">
            <h1
              ref={headlineRef}
              className="font-serif text-hero text-charcoal leading-none mb-7"
              aria-label="Beleza que revela quem você sempre foi"
            >
              {WORDS.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden leading-none mr-[0.22em] last:mr-0">
                  <span data-word className="inline-block">{word}</span>
                </span>
              ))}
            </h1>
            <p ref={subRef} className="font-sans text-subheadline text-charcoal/65 font-light mb-6 leading-relaxed">
              Realçando sua beleza natural com ciência e planejamento.
            </p>
            <div ref={ctaRef} className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="font-sans text-xs text-charcoal/55 tracking-wide">
                  Avaliação exclusiva com DermaVision
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
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

          {/* Right — doctor photo + frame + dots */}
          <div ref={imageRef} className="relative self-end h-[520px] sm:h-[620px] lg:h-[760px]">

            {/* Shadow behind the doctor — layered radial gradients for natural depth */}
            <div
              className="absolute inset-0 z-[5] pointer-events-none"
              style={{
                background: [
                  'radial-gradient(ellipse 52% 32% at 50% 100%, rgba(28,28,28,0.52) 0%, rgba(28,28,28,0.18) 50%, transparent 70%)',
                  'radial-gradient(ellipse 32% 18% at 50% 100%, rgba(28,28,28,0.40) 0%, transparent 60%)',
                ].join(', '),
              }}
              aria-hidden="true"
            />

            {/* Gold decorative frame behind the doctor */}
            <div
              ref={frameRef}
              className="absolute inset-0 flex items-end justify-center pointer-events-none z-[3]"
              aria-hidden="true"
            >
              <div className="relative w-[90%] h-[85%]">
                <Image
                  src="/assets/gold-circle-frame.png"
                  alt=""
                  fill
                  className="object-contain opacity-35"
                />
              </div>
            </div>

            {/* Doctor transparent PNG */}
            <Image
              src={ASSETS.heroImage}
              alt={`${SITE.professional} — ${SITE.tagline}`}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 50vw"
              className="object-contain object-bottom z-[8] relative"
            />

            {/* Floating dots & rings */}
            <div ref={dotsRef} className="absolute inset-0 pointer-events-none z-[4]" aria-hidden="true">
              {DOTS.map((d, i) => (
                <span
                  key={i}
                  data-dot
                  className="absolute rounded-full"
                  style={{
                    width: d.size, height: d.size,
                    top: d.top, right: d.right, left: d.left,
                    backgroundColor: d.color,
                  }}
                />
              ))}
              {RINGS.map((r, i) => (
                <span
                  key={i}
                  data-dot
                  className="absolute rounded-full border"
                  style={{
                    width: r.size, height: r.size,
                    top: r.top, right: r.right,
                    borderColor: r.color,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
