'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import WikiHeader from '@/components/WikiHeader'
import WikiSidebar from '@/components/WikiSidebar'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { Loader2, Check, X } from 'lucide-react'

interface EditSuggestion {
  id: string
  article_slug: string
  article_title: string
  suggested_content: string
  reason?: string
  suggester_name?: string
  status: string
  submitted_at: string
}

export default function ReviewEditSuggestionPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [suggestion, setSuggestion] = useState<EditSuggestion | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSuggestion()
  }, [id])

  const fetchSuggestion = async () => {
    try {
      const response = await fetch(`/api/edit-suggestions/${id}`)
      const data = await response.json()
      if (response.ok) {
        setSuggestion(data)
      } else {
        setError(data.error || 'Impossible de charger la suggestion')
      }
    } catch {
      setError('Impossible de charger la suggestion')
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (status: 'approved' | 'rejected') => {
    const label = status === 'approved' ? 'approuver' : 'rejeter'
    if (!confirm(`Êtes-vous sûr de vouloir ${label} cette suggestion ?`)) return

    setProcessing(true)
    setError('')

    try {
      const response = await fetch(`/api/edit-suggestions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      const data = await response.json()
      if (response.ok) {
        alert(status === 'approved' ? 'Suggestion approuvée et appliquée !' : 'Suggestion rejetée')
        router.push('/admin')
      } else {
        setError(data.error || 'Erreur lors du traitement')
      }
    } catch {
      setError('Erreur lors du traitement')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <WikiHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </div>
    )
  }

  if (error || !suggestion) {
    return (
      <div className="min-h-screen bg-white">
        <WikiHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Suggestion introuvable'}</p>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
            >
              Retour à l'administration
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <WikiHeader />

      <div className="flex max-w-[1400px] mx-auto">
        <WikiSidebar />

        <main className="flex-1 px-6 py-4 max-w-[900px]">
          <h1 className="text-4xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">
            Suggestion de modification
          </h1>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Article :</strong>{' '}
                <Link href={`/wiki/${suggestion.article_slug}`} className="text-primary hover:underline">
                  {suggestion.article_title}
                </Link>
              </div>
              {suggestion.suggester_name && (
                <div>
                  <strong>Suggéré par :</strong> {suggestion.suggester_name}
                </div>
              )}
              {suggestion.reason && (
                <div className="col-span-2">
                  <strong>Raison :</strong> {suggestion.reason}
                </div>
              )}
              <div>
                <strong>Date :</strong> {new Date(suggestion.submitted_at).toLocaleDateString('fr-FR')}
              </div>
              <div>
                <strong>Statut :</strong>{' '}
                <span className={suggestion.status === 'pending' ? 'text-yellow-700' : suggestion.status === 'approved' ? 'text-green-700' : 'text-red-700'}>
                  {suggestion.status}
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {suggestion.status === 'pending' && (
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => handleAction('approved')}
                disabled={processing}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                <Check size={16} />
                {processing ? 'En cours...' : 'Approuver et appliquer'}
              </button>
              <button
                onClick={() => handleAction('rejected')}
                disabled={processing}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                <X size={16} />
                Rejeter
              </button>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold mb-3">Contenu suggéré</h2>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-300 text-sm font-medium text-gray-600">
                Prévisualisation
              </div>
              <div className="p-4">
                <MarkdownRenderer content={suggestion.suggested_content} />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Source Markdown</h3>
              <pre className="bg-gray-50 border border-gray-300 rounded p-4 text-sm font-mono overflow-auto max-h-64">
                {suggestion.suggested_content}
              </pre>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
