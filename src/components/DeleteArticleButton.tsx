'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'

export default function DeleteArticleButton({ slug }: { slug: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr ? Cette action est irréversible.')) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/articles/${slug}`, { method: 'DELETE' })
      if (response.ok) {
        router.push('/')
      } else {
        const data = await response.json()
        alert(data.error || 'Erreur lors de la suppression')
      }
    } catch {
      alert('Erreur lors de la suppression')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors border border-red-300 disabled:opacity-50"
      title="Supprimer l'article"
    >
      {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
      <span>Supprimer</span>
    </button>
  )
}
