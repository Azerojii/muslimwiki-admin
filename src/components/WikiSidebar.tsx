'use client'

import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function WikiSidebar() {
  return (
    <aside className="w-56 flex-shrink-0 bg-[#f8f9fa] border-r border-gray-200 px-5 py-6 hidden lg:block">
      <nav className="space-y-5 sticky top-20" aria-label="Barre latérale">
        <div>
          <h3 className="text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-2.5">Navigation</h3>
          <ul className="space-y-0.5 text-sm">
            <li>
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-primary hover:bg-white rounded-lg px-2.5 py-1.5 -mx-1 transition-all">
                <BookOpen size={15} className="text-gray-400" />
                Page d'accueil
              </Link>
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-[11px] font-bold uppercase text-gray-400 tracking-wider mb-2.5">Outils</h3>
          <ul className="space-y-0.5 text-sm">
            <li>
              <Link href="/admin" className="text-gray-700 hover:text-primary hover:bg-white rounded-lg px-2.5 py-1.5 -mx-1 block transition-all">
                Administration
              </Link>
            </li>
            <li>
              <Link href="/wiki/create" className="text-gray-700 hover:text-primary hover:bg-white rounded-lg px-2.5 py-1.5 -mx-1 block transition-all">
                Créer un article
              </Link>
            </li>
            <li>
              <Link href="/admin/submissions" className="text-gray-700 hover:text-primary hover:bg-white rounded-lg px-2.5 py-1.5 -mx-1 block transition-all">
                Soumissions
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}
