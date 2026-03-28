'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import WikiHeader from '@/components/WikiHeader'
import WikiSidebar from '@/components/WikiSidebar'
import { Eye, Check, X, Clock } from 'lucide-react'

interface Submission {
  id: string
  title: string
  description: string
  category: string
  submittedAt: string
  submitterName: string
  submitterEmail: string
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions')
      const data = await response.json()
      setSubmissions(data.submissions || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <WikiHeader />
      
      <div className="flex max-w-[1400px] mx-auto">
        <WikiSidebar />
        
        <main className="flex-1 px-4 sm:px-6 py-4 max-w-[1100px] min-w-0">
          <div className="mb-6">
            <h1 className="text-4xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">
              Soumissions en attente
            </h1>
            <div className="flex gap-4">
              <Link
                href="/admin"
                className="text-primary hover:underline"
              >
                ← Retour à l'administration
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">Chargement...</div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <Clock size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-semibold mb-2">Aucune soumission en attente</p>
              <p className="text-sm">Les nouveaux articles soumis apparaîtront ici</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="border border-gray-300 rounded-lg p-5 hover:bg-gray-50"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {submission.title}
                      </h2>
                      <p className="text-gray-600 mb-3">{submission.description}</p>

                      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <strong>Catégorie:</strong> {submission.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <strong>Par:</strong> {submission.submitterName || 'Anonyme'}
                        </span>
                        <span className="flex items-center gap-1">
                          <strong>Date:</strong> {formatDate(submission.submittedAt)}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/admin/submissions/${submission.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded border border-primary text-sm font-medium"
                    >
                      <Eye size={16} />
                      Examiner
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

