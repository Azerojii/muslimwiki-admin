'use client'

import { TocItem } from '@/lib/wiki'
import Link from 'next/link'

interface TableOfContentsProps {
  items: TocItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) return null

  return (
    <div className="bg-wiki-bg border border-gray-300 rounded p-4 mb-4 mt-4">
      <h2 className="text-lg font-bold mb-3 pb-2 border-b border-gray-300">Sommaire</h2>
      <nav>
        <ul className="space-y-1 text-sm">
          {items.map((item, index) => (
            <li key={index} className={item.level === 3 ? 'ml-4' : ''}>
              <a
                href={`#${item.slug}`}
                className="text-primary hover:underline block py-0.5"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
