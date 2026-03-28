'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, PenLine } from 'lucide-react'
import SearchBar from './SearchBar'

export default function WikiHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <Image
                src="/logo.png"
                alt="Musulmans Français Logo"
                width={52}
                height={52}
                className="object-contain"
              />
              <div className="text-lg md:text-2xl font-bold font-serif text-primary group-hover:text-primary/80 transition-colors">Musulmans Français</div>
            </Link>

            <nav className="hidden md:flex items-center gap-4 text-sm" aria-label="Navigation principale">
              <Link href="/" className="text-gray-600 hover:text-primary transition-colors py-1">
                Page d'accueil
              </Link>
              <Link
                href="/wiki/create"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white rounded-lg hover:opacity-90 transition-all text-sm font-medium shadow-sm"
                title="Ajouter un article"
              >
                <PenLine size={14} />
                Créer un article
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:block">
              <SearchBar className="w-44 md:w-64" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-3 shadow-lg">
          <SearchBar className="w-full" />
          <nav className="flex flex-col gap-1 text-sm" aria-label="Navigation mobile">
            <Link
              href="/"
              className="text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors py-2 px-2 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Page d'accueil
            </Link>
            <Link
              href="/wiki/create"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium w-fit"
              title="Ajouter un article"
              onClick={() => setMobileMenuOpen(false)}
            >
              <PenLine size={14} />
              Créer un article
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
