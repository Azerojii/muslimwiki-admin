'use client'

import { useState } from 'react'
import { Pencil, Loader2, X } from 'lucide-react'

interface SuggestEditButtonProps {
  slug: string
  articleTitle: string
  currentContent: string
}

export default function SuggestEditButton({ slug, articleTitle, currentContent }: SuggestEditButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [suggestedContent, setSuggestedContent] = useState(currentContent)
  const [reason, setReason] = useState('')
  const [suggesterName, setSuggesterName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleOpen = () => {
    setSuggestedContent(currentContent)
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/edit-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_slug: slug,
          article_title: articleTitle,
          suggested_content: suggestedContent,
          reason: reason || undefined,
          suggester_name: suggesterName || undefined,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Échec de la soumission')

      setSuccess(true)
      setTimeout(() => {
        setIsOpen(false)
        setSuccess(false)
        setReason('')
        setSuggesterName('')
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la soumission')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded transition-colors border border-gray-300"
        title="Suggérer une modification"
      >
        <Pencil size={14} />
        <span>Suggérer une modification</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-primary">
                Suggérer une modification : {articleTitle}
              </h2>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>

            {success ? (
              <div className="bg-green-50 border border-green-200 rounded p-4 text-center">
                <p className="text-green-800 font-bold">Suggestion envoyée avec succès !</p>
                <p className="text-green-700 text-sm">Elle sera examinée par un administrateur.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold mb-1">
                    Contenu suggéré <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={suggestedContent}
                    onChange={(e) => setSuggestedContent(e.target.value)}
                    required
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Raison de la modification</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Expliquez brièvement votre modification..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Votre nom (optionnel)</label>
                  <input
                    type="text"
                    value={suggesterName}
                    onChange={(e) => setSuggesterName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Votre nom"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting || !suggestedContent}
                    className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Envoi...
                      </>
                    ) : (
                      'Envoyer la suggestion'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium text-sm"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
