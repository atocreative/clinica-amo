'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { FAQ_ITEMS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<number | null>(0)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return
      gsap.from(titleRef.current, {
        y: 55, opacity: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })
      gsap.from(listRef.current?.querySelectorAll('[data-item]') ?? [], {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.12,
        scrollTrigger: { trigger: listRef.current, start: 'top 88%' },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="faq" ref={sectionRef} className="section-pad bg-sand">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div ref={titleRef}>
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-accent font-medium">
            Dúvidas frequentes
          </span>
          <h2 className="font-serif text-headline text-charcoal mt-4 mb-14">
            Perguntas & Respostas
          </h2>
        </div>

        <div ref={listRef} className="divide-y divide-charcoal/10">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} data-item>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-serif text-xl text-charcoal group-hover:text-secondary transition-colors duration-150 leading-snug">
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 mt-1 text-accent transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-expo-out"
                  style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="font-sans text-base text-secondary leading-relaxed pb-6">
                    {item.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-14 pt-10 border-t border-charcoal/10 text-center">
          <p className="font-sans text-base text-secondary mb-6">
            Ficou com outra dúvida? A equipe está pronta para responder.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-full bg-charcoal text-cream font-sans text-sm font-medium tracking-wide hover:bg-charcoal/75 transition-colors duration-150"
          >
            Falar com a equipe
          </a>
        </div>
      </div>
    </section>
  )
}
