'use client'

import { useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ASSETS, SITE } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function buildWhatsAppUrl(name: string, phone: string, msg: string) {
  const text = `Olá! Me chamo ${name.trim()} (${phone.trim()}). ${msg.trim() || SITE.whatsappMessage}`
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
}

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      const trigger = { trigger: sectionRef.current, start: 'top 85%' }

      gsap.from(leftRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        y: 40, opacity: 0, duration: 1.6, ease: 'expo.out',
        scrollTrigger: trigger,
      })
      gsap.from(rightRef.current, {
        x: 70, opacity: 0, scale: 0.96, duration: 1.5, ease: 'expo.out', delay: 0.15,
        scrollTrigger: trigger,
      })
    },
    { scope: sectionRef },
  )

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    window.open(buildWhatsAppUrl(name, phone, message), '_blank', 'noopener,noreferrer')
    setSent(true)
    setName('')
    setPhone('')
    setMessage('')
    setTimeout(() => setSent(false), 5000)
  }

  const inputClass =
    'w-full bg-transparent border-b border-sand focus:border-charcoal outline-none font-sans text-base text-charcoal placeholder-secondary/50 py-3 transition-colors duration-150'

  return (
    <section id="contact" ref={sectionRef} className="section-pad bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Left — context */}
          <div ref={leftRef} className="relative">
            <div className="relative h-[420px] lg:h-[560px] overflow-hidden rounded-2xl mb-10 lg:mb-0">
              <Image
                src={ASSETS.cinematicPhoto}
                alt="Clínica AMO — ambiente"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-serif text-white text-2xl leading-snug">
                  "Sua avaliação é o primeiro passo para uma beleza que é só sua."
                </p>
                <p className="font-sans text-white/60 text-sm mt-3 tracking-widest uppercase">
                  {SITE.professional} · {SITE.title}
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div ref={rightRef}>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-accent font-medium">
              Clínica AMO · Brasília
            </span>
            <h2 className="font-serif text-headline text-charcoal mt-4 mb-3">
              Agende seu horário
            </h2>
            <p className="font-sans text-base text-secondary leading-relaxed mb-10">
              Preencha e continuaremos pelo WhatsApp para encontrar o melhor horário para você.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
              <div>
                <label htmlFor="cta-name" className="font-sans text-xs tracking-widest uppercase text-secondary block mb-1">
                  Nome
                </label>
                <input
                  id="cta-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="cta-phone" className="font-sans text-xs tracking-widest uppercase text-secondary block mb-1">
                  WhatsApp
                </label>
                <input
                  id="cta-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="(61) 9 0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="cta-msg" className="font-sans text-xs tracking-widest uppercase text-secondary block mb-1">
                  Mensagem <span className="normal-case tracking-normal">(opcional)</span>
                </label>
                <textarea
                  id="cta-msg"
                  rows={3}
                  placeholder="Conte um pouco sobre o que você busca..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  disabled={!name.trim() || !phone.trim()}
                  className="flex-1 px-8 py-4 rounded-full bg-charcoal text-cream font-sans text-sm font-medium tracking-wide hover:bg-charcoal/80 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  {sent ? 'Redirecionando...' : 'Agendar pelo WhatsApp'}
                </button>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(SITE.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-8 py-4 rounded-full border border-charcoal/20 text-charcoal font-sans text-sm font-medium tracking-wide hover:border-charcoal/50 transition-colors duration-150"
                >
                  Falar diretamente
                </a>
              </div>
            </form>

            <div className="mt-10 pt-8 border-t border-sand">
              <p className="font-sans text-sm text-secondary tracking-wide">
                {SITE.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
