'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Plus, User, ChevronDown } from 'lucide-react'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
      >
        <User size={18} />
        <span className="hidden md:inline font-medium">Menu</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          <div className="py-2">
            {/* Submit Section */}
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Contribuer
              </p>
            </div>
            <Link
              href="https://wikimuslim.vercel.app/submit"
              className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/10 transition-colors group"
              onClick={() => setIsOpen(false)}
            >
              <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                <Plus size={18} className="text-secondary" />
              </div>
              <div>
                <div className="font-medium text-gray-800">Soumettre un article</div>
                <div className="text-xs text-gray-500">Proposer un nouvel article</div>
              </div>
            </Link>

          </div>
        </div>
      )}
    </div>
  )
}
