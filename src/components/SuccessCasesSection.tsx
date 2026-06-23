'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ASSETS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CASES = [
  {
    label: 'Harmonização Natural',
    result: 'Equilíbrio facial com naturalidade e elegância.',
    src: '/4.jpg',
    alt: 'Resultado de harmonização facial natural',
  },
  {
    label: 'Cuidado Completo',
    result: 'Protocolo integrado com ciência e planejamento personalizado.',
    src: ASSETS.benefitsPhoto,
    alt: 'Procedimento estético de cuidado facial completo',
  },
  {
    label: 'Contorno e Definição',
    result: 'Simetria e definição preservando a identidade da paciente.',
    src: ASSETS.beforeAfterFull,
    alt: 'Resultado de contorno e definição facial',
  },
]

export default function SuccessCasesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (pref) return

      gsap.from(titleRef.current, {
        y: 30, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom' },
      })
      gsap.from(gridRef.current?.querySelectorAll('[data-case]') ?? [], {
        y: 50, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.14,
        scrollTrigger: { trigger: gridRef.current, start: 'top bottom' },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="cases" ref={sectionRef} className="section-pad bg-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div ref={titleRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-primary font-medium">
              Casos de Sucesso
            </span>
            <h2 className="font-serif text-headline text-charcoal mt-4">
              Resultados que falam por si
            </h2>
          </div>
          <a
            href="#contact"
            className="self-start sm:self-end font-sans text-sm text-charcoal tracking-wide hover:text-primary transition-colors duration-150 inline-flex items-center gap-2 flex-shrink-0"
          >
            Ver meu resultado
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <article key={c.label} data-case className="group overflow-hidden bg-cream">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 border-b-2 border-transparent group-hover:border-primary transition-colors duration-300">
                <h3 className="font-serif text-lg text-charcoal mb-2">{c.label}</h3>
                <p className="font-sans text-sm text-secondary leading-relaxed">{c.result}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
