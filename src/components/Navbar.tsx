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
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  useGSAP(
    () => {
      const pref = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (pref) return
      // clearProps removes GSAP's inline opacity/transform after animation so
      // they never conflict with CSS transition-[background-color,box-shadow]
      gsap.from(navRef.current, {
        y: -28, opacity: 0, duration: 1.1, ease: 'expo.out', delay: 0.5,
        clearProps: 'opacity,transform',
      })
    },
    { scope: navRef },
  )

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-[100] pt-safe transition-[background-color,box-shadow,padding-top] duration-500 ${
        menuOpen
          ? 'bg-charcoal shadow-xl'
          : scrolled
          ? 'bg-charcoal/95 [backdrop-filter:blur(12px)] [-webkit-backdrop-filter:blur(12px)] shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">

        {/* Logo */}
        <a href="#hero" className="flex-shrink-0" aria-label={SITE.name}>
          <Image
            src={ASSETS.logo}
            alt={SITE.name}
            width={160}
            height={64}
            className="h-14 w-auto object-contain"
            style={{
              filter: menuOpen || scrolled
                ? 'brightness(0) invert(1)'
                : 'drop-shadow(0 3px 14px rgba(0,0,0,0.55)) drop-shadow(0 1px 5px rgba(0,0,0,0.35))',
            }}
            priority
          />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-150 ${
                  scrolled ? 'text-white/75 hover:text-white' : 'text-charcoal/75 hover:text-charcoal'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop social icons — 21 px */}
        <div className="hidden md:flex items-center gap-1 mr-2">
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`p-2 transition-colors duration-150 ${scrolled ? 'text-white/60 hover:text-white' : 'text-charcoal/50 hover:text-charcoal'}`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4.5" />
              <path d="M17.5 6.5h.01" strokeWidth="2.5" />
            </svg>
          </a>
          <a
            href={SITE.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={`p-2 transition-colors duration-150 ${scrolled ? 'text-white/60 hover:text-white' : 'text-charcoal/50 hover:text-charcoal'}`}
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className={`hidden md:inline-flex items-center px-6 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide transition-colors duration-150 ${
            scrolled ? 'bg-primary text-charcoal hover:bg-primary/80' : 'bg-charcoal text-cream hover:bg-charcoal/80'
          }`}
        >
          Agendar
        </a>

        {/* Hamburger — charcoal on light backgrounds, white when menu open */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-[5px] p-2 min-h-[44px] min-w-[44px] justify-center"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${
                menuOpen || scrolled ? 'bg-white' : 'bg-charcoal'
              } ${
                i === 0 && menuOpen ? 'rotate-45 translate-y-[7px]' :
                i === 1 && menuOpen ? 'opacity-0 scale-x-0' :
                i === 2 && menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden bg-charcoal overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          menuOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pt-4 pb-10 flex flex-col gap-6">

          {/* Nav links */}
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-xs tracking-[0.2em] uppercase text-white hover:text-primary transition-colors duration-150"
            >
              {label}
            </a>
          ))}

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="self-start px-6 py-3 rounded-full bg-primary text-charcoal font-sans text-sm font-medium tracking-wide"
          >
            Agendar Horário
          </a>

          {/* Social media row — divider + 24 px icons */}
          <div className="flex items-center gap-5 pt-5 border-t border-white/15">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white/65 hover:text-white transition-colors duration-150"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <path d="M17.5 6.5h.01" strokeWidth="2.5" />
              </svg>
            </a>
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white/65 hover:text-white transition-colors duration-150"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </nav>
  )
}
