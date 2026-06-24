'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ASSETS, SITE } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function PersonalBrandSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const photoRef      = useRef<HTMLDivElement>(null)
  const textRef       = useRef<HTMLDivElement>(null)
  const leavesRef     = useRef<HTMLDivElement>(null)
  const accentLineRef = useRef<HTMLDivElement>(null)
  const boxRef        = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (pref) return

      const trigger = { trigger: sectionRef.current, start: 'top 85%' }

      // Photo: clip from left + slide
      gsap.from(photoRef.current, {
        clipPath: 'inset(0 100% 0 0)',
        x: -40, opacity: 0, duration: 1.6, ease: 'expo.out',
        scrollTrigger: trigger,
      })

      // Text: slides in from right with scale
      gsap.from(textRef.current, {
        x: 80, opacity: 0, scale: 0.97, duration: 1.5, ease: 'expo.out', delay: 0.12,
        scrollTrigger: trigger,
      })

      // Accent line draws left → right
      gsap.from(accentLineRef.current, {
        scaleX: 0, duration: 1.2, ease: 'expo.out',
        transformOrigin: 'left',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })

      // Corner box: scale + rotate
      gsap.from(boxRef.current, {
        scale: 0, opacity: 0, rotation: -45, duration: 1.1, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })

      // Pink leaves entrance + slow drift
      gsap.from(leavesRef.current, {
        scale: 0.7, opacity: 0, rotation: -25, duration: 2.2, ease: 'expo.out',
        scrollTrigger: trigger,
      })
      gsap.to(leavesRef.current, {
        rotation: 10, duration: 14, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

      // Photo parallax — stronger
      gsap.to(photoRef.current?.querySelector('[data-inner]') ?? null, {
        y: -55, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.8 },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="about" ref={sectionRef} className="section-pad bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-stretch">

          {/* Photo column */}
          <div ref={photoRef} className="relative flex flex-col">
            <div className="relative flex-1 min-h-[520px] lg:min-h-[680px] overflow-hidden rounded-2xl" data-inner>
              <Image
                src={ASSETS.personalPhoto}
                alt={SITE.professional}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>

            {/* Pink leaves frame */}
            <div
              ref={leavesRef}
              className="absolute -top-8 -left-10 w-52 pointer-events-none"
              aria-hidden="true"
            >
              <Image src="/assets/pink-leaves-frame.png" alt="" width={300} height={300} className="w-full h-auto opacity-55" />
            </div>

            {/* Corner accent box */}
            <div ref={boxRef} className="absolute -bottom-5 -right-5 w-36 h-36 border border-accent/25 pointer-events-none" />
          </div>

          {/* Text column */}
          <div ref={textRef} className="flex flex-col">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-accent font-medium mb-8">
              Clínica AMO · Brasília, DF
            </span>

            <h2 className="font-serif text-headline text-charcoal mb-2">
              {SITE.professional}
            </h2>
            <p className="font-sans text-secondary text-sm tracking-widest uppercase mb-8">
              Biomédica Esteta · {SITE.credential}
            </p>

            <div ref={accentLineRef} className="w-12 h-px bg-accent mb-8" />

            <p className="font-sans text-secondary leading-relaxed text-base mb-5">
              Cuidando de você com excelência — a Clínica AMO foi criada por {SITE.professional}
              para oferecer harmonização facial com o que há de mais moderno em estética avançada,
              unindo ciência, planejamento e sensibilidade artística.
            </p>
            <p className="font-sans text-secondary leading-relaxed text-base mb-12">
              Cada protocolo é desenhado do zero para o seu rosto: análise facial
              individualizada, naturalidade preservada e resultados que respeitam quem você é.
            </p>

            <a
              href="#contact"
              className="self-start px-8 py-4 rounded-full bg-charcoal text-cream font-sans text-sm font-medium tracking-wide hover:bg-charcoal/75 transition-colors duration-150"
            >
              Agendar Meu Horário
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
