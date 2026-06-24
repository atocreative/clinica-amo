'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ASSETS, BENEFITS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function BenefitsSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const titleRef    = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)
  const wrapperRef  = useRef<HTMLDivElement>(null)
  const imageRef    = useRef<HTMLDivElement>(null)
  const serumRef    = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (pref) return

      // Image column — aggressive clip-path wipe from bottom
      gsap.from(wrapperRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 1.6, ease: 'expo.out',
        scrollTrigger: { trigger: wrapperRef.current, start: 'top 85%' },
      })

      // Title — word by word from below
      const words = titleRef.current?.querySelectorAll('[data-word]') ?? []
      if (words.length) {
        gsap.from(words, {
          y: '110%', opacity: 0, duration: 1.0, ease: 'expo.out', stagger: 0.08,
          scrollTrigger: { trigger: titleRef.current, start: 'top 90%' },
        })
      } else {
        gsap.from(titleRef.current, {
          y: 60, opacity: 0, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        })
      }

      // Image column strong parallax
      gsap.to(imageRef.current, {
        y: -70,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })

      // Cards — scale + translate stagger
      gsap.from(cardsRef.current?.querySelectorAll('[data-card]') ?? [], {
        y: 70, opacity: 0, scale: 0.94, duration: 1.0, ease: 'expo.out', stagger: 0.14,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 88%' },
      })

      // Serum entrance + float
      gsap.from(serumRef.current, {
        y: 60, opacity: 0, rotation: -15, duration: 1.6, ease: 'expo.out',
        scrollTrigger: { trigger: imageRef.current, start: 'top 85%' },
      })
      gsap.to(serumRef.current, {
        y: -22, duration: 3.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.2,
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="benefits" ref={sectionRef} className="section-pad bg-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Image + floating serum */}
          <div ref={wrapperRef} className="relative order-2 lg:order-1">
            <div ref={imageRef} className="relative h-[460px] lg:h-[600px] overflow-hidden rounded-2xl">
              <Image
                src={ASSETS.benefitsPhoto}
                alt="Procedimento estético"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>

            {/* Serum dropper — Vecteezy PNG, floats at bottom-right corner */}
            <div
              ref={serumRef}
              className="absolute -bottom-10 -right-6 lg:-right-12 w-44 lg:w-56 pointer-events-none"
              aria-hidden="true"
            >
              <Image
                src="/assets/serum-dropper.png"
                alt=""
                width={160}
                height={320}
                className="w-full h-auto drop-shadow-2xl opacity-60"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="order-1 lg:order-2">
            <div ref={titleRef}>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-accent font-medium">
              Por que escolher
            </span>
            <h2 className="font-serif text-headline text-charcoal mt-4 mb-12">
              Uma abordagem que vai além do procedimento
            </h2>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {BENEFITS.map((benefit) => (
                <div key={benefit.title} data-card className="group bg-cream/55 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-secondary transition-colors duration-150">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-base text-secondary leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-sand">
              <a
                href="#contact"
                className="font-sans text-base text-charcoal tracking-wide hover:text-accent transition-colors duration-150 inline-flex items-center gap-3"
              >
                Quero conhecer meu plano
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
