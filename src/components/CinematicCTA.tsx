'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ASSETS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function CinematicCTA() {
  const sectionRef  = useRef<HTMLElement>(null)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!prefersReduced && videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          { scale: 1 },
          {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          },
        )
      }

      const revealTrigger = { trigger: sectionRef.current, start: 'top 75%' }

      gsap.from(headlineRef.current, {
        y: prefersReduced ? 0 : 80,
        opacity: 0,
        scale: prefersReduced ? 1 : 0.95,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: revealTrigger,
      })
      gsap.from(subRef.current, {
        y: prefersReduced ? 0 : 45,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        delay: 0.18,
        scrollTrigger: revealTrigger,
      })
      gsap.from(ctaRef.current, {
        y: prefersReduced ? 0 : 30,
        opacity: 0,
        scale: prefersReduced ? 1 : 0.92,
        duration: 1.0,
        ease: 'expo.out',
        delay: 0.35,
        scrollTrigger: revealTrigger,
      })

    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        src={ASSETS.cinematicVideo}
        aria-hidden="true"
      />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(176, 195, 202, 0.50)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/35 via-transparent to-charcoal/55" />

      {/* Thin gold horizontal rule — decorative */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-px bg-accent/60" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 lg:px-10 py-24">
        <h2
          ref={headlineRef}
          className="font-serif text-display text-white leading-none mb-8"
          style={{ textShadow: '0 2px 24px rgba(0,0,0,0.65), 0 1px 6px rgba(0,0,0,0.45)' }}
        >
          Sua versão mais natural de você
        </h2>
        <p
          ref={subRef}
          className="font-sans text-subheadline text-white font-light mb-12 max-w-xl mx-auto"
          style={{ textShadow: '0 1px 14px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)' }}
        >
          Agende seu horário e descubra o protocolo ideal para o seu rosto — sem compromisso.
        </p>
        <a
          ref={ctaRef}
          href="#contact"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-accent text-charcoal font-sans text-sm font-medium tracking-wide hover:bg-amber-400 transition-colors duration-150"
        >
          Agendar Meu Horário
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-px bg-accent/60" />
    </section>
  )
}
