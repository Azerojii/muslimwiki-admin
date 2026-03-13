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

export default function SearchBar() {
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
    <div ref={searchRef} className="relative w-64">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Rechercher dans MuslimWiki..."
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
      </div>

      {isOpen && query.trim() !== '' && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            results.map((article) => (
              <button
                key={article.slug}
                onClick={() => handleSelect(article.slug)}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b border-gray-200 last:border-0"
              >
                <div className="font-semibold text-primary">{article.title}</div>
                <div className="text-sm text-gray-600 line-clamp-1">{article.description}</div>
                <div className="text-xs text-gray-500 mt-1">{article.category}</div>
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
