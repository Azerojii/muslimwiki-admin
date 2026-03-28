'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FRENCH_REGIONS } from '@/lib/regions'
import type { WikiArticle } from '@/lib/wiki'

function isNewArticle(date: string): boolean {
  const articleDate = new Date(date)
  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
  return articleDate >= threeDaysAgo
}

function getArticleRegion(article: WikiArticle): string | undefined {
  if (article.article_type === 'mosque') return article.mosque_data?.region
  if (article.article_type === 'imam') return article.imam_data?.region
  return undefined
}

function TypeBadge({ type }: { type: string }) {
  if (type === 'mosque') {
    return (
      <span className="px-2 py-0.5 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full whitespace-nowrap">
        🕌 Mosquée
      </span>
    )
  }
  if (type === 'imam') {
    return (
      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full whitespace-nowrap">
        👤 Imam
      </span>
    )
  }
  return null
}

interface CategoryArticleListProps {
  articles: WikiArticle[]
}

export default function CategoryArticleList({ articles }: CategoryArticleListProps) {
  const [selectedRegion, setSelectedRegion] = useState('')

  const hasRegionFilter = articles.some(
    (a) => a.article_type === 'mosque' || a.article_type === 'imam'
  )

  const filtered = selectedRegion
    ? articles.filter((a) => getArticleRegion(a) === selectedRegion)
    : articles

  return (
    <div>
      {hasRegionFilter && (
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <label className="text-sm font-medium text-gray-600">Filtrer par région :</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            aria-label="Sélectionner une région"
          >
            <option value="">Toutes les régions</option>
            {FRENCH_REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {selectedRegion && (
            <button
              onClick={() => setSelectedRegion('')}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Réinitialiser
            </button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/wiki/${article.slug}/edit`}
              className="group block p-5 bg-white border border-gray-200 rounded-xl hover:border-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors">{article.title}</h3>
                    <TypeBadge type={article.article_type} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{article.excerpt}</p>
                  {getArticleRegion(article) && (
                    <p className="text-xs text-gray-400 mt-2">📍 {getArticleRegion(article)}</p>
                  )}
                </div>
                {isNewArticle(article.updated_at) && (
                  <span className="ml-4 px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full whitespace-nowrap">
                    Nouveau
                  </span>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Aucun article pour cette région.</p>
          </div>
        )}
      </div>
    </div>
  )
}
