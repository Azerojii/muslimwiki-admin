'use client'

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'

interface Article {
  slug: string
  title: string
  description: string
  category: string
}

export default function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [fuse, setFuse] = useState<Fuse<Article> | null>(null)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  // Load articles on mount
  useEffect(() => {
    fetch('/api/search')
      .then((res) => res.json())
      .then((data) => {
        const articleData: Article[] = data.results || data
        setArticles(articleData)

        // Initialize Fuse.js
        const fuseInstance = new Fuse<Article>(articleData, {
          keys: ['title', 'description', 'category'],
          threshold: 0.3,
          includeScore: true,
        })
        setFuse(fuseInstance)
      })
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Search when query changes
  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      setIsOpen(false)
      return
    }

    if (fuse) {
      const searchResults = fuse.search(query).slice(0, 5)
      setResults(searchResults.map((result) => result.item))
      setIsOpen(true)
    }
  }, [query, fuse])

  const handleSelect = (slug: string) => {
    router.push(`/wiki/${slug}`)
    setQuery('')
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      handleSelect(results[0].slug)
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className ?? 'w-64'}`}>
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher..."
          aria-label="Rechercher un article"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          className="w-full px-3 py-1.5 pr-9 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all"
        />
        <Search className="absolute right-2.5 top-2 text-gray-400" size={16} />
      </div>

      {isOpen && query.trim() !== '' && (
        <div className="absolute top-full mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto" role="listbox">
          {results.length > 0 ? (
            results.map((article) => (
              <button
                key={article.slug}
                onClick={() => handleSelect(article.slug)}
                role="option"
                className="w-full text-left px-4 py-2.5 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
              >
                <div className="font-medium text-sm text-primary">{article.title}</div>
                <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{article.description}</div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              <div>Aucun article trouvé pour "{query}"</div>
              <button
                onClick={() => {
                  router.push(`/wiki/create?title=${encodeURIComponent(query)}`)
                  setQuery('')
                  setIsOpen(false)
                }}
                className="mt-2 text-primary hover:underline font-medium"
              >
                Créer cet article
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
