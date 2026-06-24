'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ASSETS, SITE, NAV_LINKS } from '@/lib/constants'

gsap.registerPlugin(useGSAP)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll() // set correct state on mount (handles page load with existing scroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useGSAP(
    () => {
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (pref) return
      gsap.from(navRef.current, { y: -28, opacity: 0, duration: 1.1, ease: 'expo.out', delay: 0.5 })
    },
    { scope: navRef },
  )

  const isDark = scrolled || menuOpen

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        menuOpen
          ? 'bg-charcoal'
          : scrolled
          ? 'bg-charcoal/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <a href="#hero" className="flex-shrink-0" aria-label={SITE.name}>
          <Image
            src={ASSETS.logo}
            alt={SITE.name}
            width={160}
            height={64}
            className="h-14 w-auto object-contain transition-all duration-300"
            style={{ filter: isDark ? 'brightness(0) invert(1)' : 'drop-shadow(0 4px 22px rgba(0,0,0,0.60)) drop-shadow(0 2px 8px rgba(0,0,0,0.35))' }}
            priority
          />
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-150 ${
                  scrolled
                    ? 'text-white/70 hover:text-white'
                    : 'text-charcoal/70 hover:text-charcoal'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Social icons */}
        <div className="hidden md:flex items-center gap-2 mr-2">
          <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className={`p-1.5 transition-colors duration-150 ${scrolled ? 'text-white/55 hover:text-white' : 'text-charcoal/45 hover:text-charcoal'}`}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4.5"/>
              <path d="M17.5 6.5h.01" strokeWidth="2.5"/>
            </svg>
          </a>
          <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
            className={`p-1.5 transition-colors duration-150 ${scrolled ? 'text-white/55 hover:text-white' : 'text-charcoal/45 hover:text-charcoal'}`}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>
        </div>

        <a
          href="#contact"
          className={`hidden md:inline-flex items-center px-6 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide transition-colors duration-150 ${
            scrolled
              ? 'bg-primary text-charcoal hover:bg-primary/80'
              : 'bg-charcoal text-cream hover:bg-charcoal/80'
          }`}
        >
          Agendar
        </a>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-[5px] p-2 min-h-[44px] min-w-[44px] justify-center"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-6 h-px transition-all duration-300 origin-center ${
                isDark ? 'bg-white' : 'bg-charcoal'
              } ${
                i === 0 && menuOpen ? 'rotate-45 translate-y-[7px]' :
                i === 1 && menuOpen ? 'opacity-0 scale-x-0' :
                i === 2 && menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          ))}
        </button>
      </div>

      <div
        className={`md:hidden bg-charcoal overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? 'max-h-[85svh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pt-2 pb-10 flex flex-col gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-xs tracking-[0.2em] uppercase text-white/60 hover:text-primary transition-colors duration-150"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="self-start px-6 py-3 rounded-full bg-primary text-charcoal font-sans text-sm font-medium tracking-wide"
          >
            Agendar Horário
          </a>
        </div>
      </div>
    </nav>
  )
}
