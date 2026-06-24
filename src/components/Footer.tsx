'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ASSETS, SITE, NAV_LINKS } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Footer() {
  const year    = new Date().getFullYear()
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (pref) return
      gsap.from(gridRef.current?.querySelectorAll('[data-col]') ?? [], {
        y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: 'top bottom' },
      })
    },
    { scope: gridRef },
  )

  return (
    <footer style={{ backgroundColor: '#b0c3ca' }} className="text-charcoal">
      {/* Map strip */}
      <div className="w-full h-64 grayscale opacity-60">
        <iframe
          src={SITE.mapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title="Localização Clínica AMO"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div data-col className="lg:col-span-2">
            <Image
              src={ASSETS.logo}
              alt={SITE.name}
              width={130}
              height={52}
              className="h-13 w-auto object-contain mb-5"
              style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.22))' }}
            />
            <p className="font-sans text-base leading-relaxed text-charcoal/60 max-w-xs mb-4">
              Harmonização facial com propósito — beleza com ciência e planejamento em Brasília, DF.
            </p>
            <p className="font-sans text-sm text-charcoal/45 mb-5">
              {SITE.professional} · Biomédica Esteta · {SITE.credential}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full border border-charcoal/20 text-charcoal/55 hover:text-charcoal hover:border-charcoal/40 transition-colors duration-150"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4.5"/>
                  <path d="M17.5 6.5h.01" strokeWidth="2.5"/>
                </svg>
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full border border-charcoal/20 text-charcoal/55 hover:text-charcoal hover:border-charcoal/40 transition-colors duration-150"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div data-col>
            <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-charcoal/40 mb-6">
              Navegação
            </h3>
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="font-sans text-base text-charcoal/65 hover:text-charcoal transition-colors duration-150">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="font-sans text-base text-charcoal font-medium hover:text-charcoal/70 transition-colors duration-150">
                  Agendar Horário
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div data-col>
            <h3 className="font-sans text-xs tracking-[0.25em] uppercase text-charcoal/40 mb-6">
              Localização
            </h3>
            <address className="not-italic font-sans text-base text-charcoal/65 leading-relaxed">
              <p>Av. Pau Brasil</p>
              <p>Lê Quartier</p>
              <p>Águas Claras</p>
              <p>Brasília — DF</p>
              <p>CEP 71926-000</p>
            </address>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-charcoal font-medium hover:text-charcoal/60 transition-colors duration-150 mt-4 inline-block tracking-wide"
            >
              Ver no mapa →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-charcoal/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-charcoal/35 tracking-wide">
            © {year} {SITE.name}. Todos os direitos reservados.
          </p>
          <a
            href={SITE.developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 opacity-45 hover:opacity-80 transition-opacity duration-150"
            aria-label="Desenvolvido por ATO."
          >
            <span className="font-sans text-xs text-charcoal/70 tracking-wide">Desenvolvido Por</span>
            <Image
              src={SITE.developer.logo}
              alt={SITE.developer.name}
              width={36}
              height={18}
              className="h-4 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
