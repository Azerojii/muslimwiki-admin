'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import WikiHeader from '@/components/WikiHeader'
import WikiSidebar from '@/components/WikiSidebar'
import { Edit, Trash2, Plus, FolderPlus, Settings, X } from 'lucide-react'

interface Article {
  slug: string
  title: string
  excerpt?: string
  description?: string
  categories?: string[]
  category?: string
  updated_at?: string
  lastUpdated?: string
  article_type?: string
}

export default function AdminPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'articles' | 'categories' | 'edit-suggestions' | 'footer'>('articles')
  const [editSuggestions, setEditSuggestions] = useState<Array<{
    id: string
    article_slug: string
    article_title: string
    reason: string
    suggester_name: string
    status: string
    submitted_at: string
  }>>([])
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  // Footer settings state
  const [footerSocialLinks, setFooterSocialLinks] = useState<Array<{ label: string; url: string; type: string }>>([])
  const [footerFriendlySites, setFooterFriendlySites] = useState<Array<{ label: string; url: string }>>([])
  const [footerLoading, setFooterLoading] = useState(false)
  const [footerSaving, setFooterSaving] = useState(false)
  const [footerSaved, setFooterSaved] = useState(false)

  useEffect(() => {
    fetchArticles()
    fetchCategories()
    fetchEditSuggestions()
    fetchFooter()
  }, [])

  const fetchFooter = async () => {
    setFooterLoading(true)
    try {
      const response = await fetch('/api/settings?key=footer')
      const data = await response.json()
      const value = data.value || {}
      setFooterSocialLinks(value.socialLinks || [])
      setFooterFriendlySites(value.friendlySites || [])
    } catch (error) {
      console.error('Error fetching footer settings:', error)
    } finally {
      setFooterLoading(false)
    }
  }

  const saveFooter = async () => {
    setFooterSaving(true)
    setFooterSaved(false)
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'footer', value: { socialLinks: footerSocialLinks, friendlySites: footerFriendlySites } }),
      })
      if (!response.ok) throw new Error('Failed to save')
      setFooterSaved(true)
      setTimeout(() => setFooterSaved(false), 3000)
    } catch (error) {
      console.error('Error saving footer:', error)
      alert('Erreur lors de la sauvegarde du footer')
    } finally {
      setFooterSaving(false)
    }
  }

  const fetchEditSuggestions = async () => {
    setSuggestionsLoading(true)
    try {
      const response = await fetch('/api/edit-suggestions?status=pending')
      const data = await response.json()
      setEditSuggestions(data.suggestions || [])
    } catch (error) {
      console.error('Error fetching edit suggestions:', error)
    } finally {
      setSuggestionsLoading(false)
    }
  }

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      const data = await response.json()
      setArticles(data.articles || data.results || data)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', category: newCategory.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setCategories(data.categories)
        setNewCategory('')
        setIsAddingCategory(false)
      } else {
        alert(data.error || 'Erreur lors de l\'ajout de la catégorie')
      }
    } catch (error) {
      console.error('Error adding category:', error)
      alert('Erreur lors de l\'ajout de la catégorie')
    }
  }

  const handleDeleteCategory = async (category: string) => {
    const articlesInCategory = articles.filter((a) =>
      (a.categories && a.categories.includes(category)) || a.category === category
    )

    if (articlesInCategory.length > 0) {
      alert(`Impossible de supprimer cette catégorie car ${articlesInCategory.length} article(s) l'utilise(nt).`)
      return
    }

    if (!confirm(`Êtes-vous sûr de vouloir supprimer la catégorie "${category}" ?`)) {
      return
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove', category }),
      })

      const data = await response.json()

      if (response.ok) {
        setCategories(data.categories)
      } else {
        alert(data.error || 'Erreur lors de la suppression de la catégorie')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Erreur lors de la suppression de la catégorie')
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      return
    }

    try {
      const response = await fetch(`/api/articles/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setArticles(articles.filter((a) => a.slug !== slug))
      } else {
        alert('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting article:', error)
      alert('Erreur lors de la suppression')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <WikiHeader />

      <div className="flex max-w-[1400px] mx-auto">
        <WikiSidebar />

        <main className="flex-1 px-4 sm:px-6 py-4 max-w-4xl min-w-0">
          <div className="mb-6">
            <h1 className="text-4xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">
              Administration
            </h1>
            <p className="text-gray-600">Gérez les articles et catégories de MuslimWiki</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Link
              href="/admin/submissions"
              className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg hover:bg-yellow-100 transition"
            >
              <h3 className="text-lg font-bold text-yellow-800 mb-2">Soumissions en attente</h3>
              <p className="text-sm text-yellow-700">Examinez les articles soumis par les visiteurs</p>
            </Link>
            <Link
              href="/wiki/create"
              className="p-4 bg-green-50 border-2 border-green-300 rounded-lg hover:bg-green-100 transition"
            >
              <h3 className="text-lg font-bold text-green-800 mb-2">Créer un article</h3>
              <p className="text-sm text-green-700">Publiez directement un nouvel article</p>
            </Link>
            <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Articles publiés</h3>
              <p className="text-sm text-blue-700">{articles.length} article(s) en ligne</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 border-b border-gray-300 overflow-x-auto">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'articles'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'categories'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Catégories
            </button>
            <button
              onClick={() => setActiveTab('edit-suggestions')}
              className={`px-3 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'edit-suggestions'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Suggestions
              {editSuggestions.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-yellow-400 text-yellow-900 text-xs rounded-full">
                  {editSuggestions.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('footer')}
              className={`px-3 py-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'footer'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Footer
            </button>
          </div>

          {/* Articles Tab */}
          {activeTab === 'articles' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Tous les articles</h2>
                <Link
                  href="/wiki/create"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:opacity-90"
                >
                  <Plus size={16} />
                  Nouvel article
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-8">Chargement...</div>
              ) : articles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucun article trouvé
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div
                      key={article.slug}
                      className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Link
                            href={`/wiki/${article.slug}/edit`}
                            className="text-xl font-bold text-primary hover:underline"
                          >
                            {article.title}
                          </Link>
                          <p className="text-gray-600 mt-1">{article.excerpt || article.description || ''}</p>
                          <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                            <span>Cat: {(article.categories && article.categories[0]) || article.category || ''}</span>
                            <span className="hidden sm:inline">Mise à jour: {article.updated_at ? new Date(article.updated_at).toLocaleDateString('fr-FR') : (article.lastUpdated || '')}</span>
                            {article.article_type && article.article_type !== 'article' && (
                              <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{article.article_type}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Link
                            href={`/wiki/${article.slug}/edit`}
                            className="p-2 text-primary hover:bg-primary/10 rounded"
                            title="Modifier"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(article.slug)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded"
                            title="Supprimer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gérer les catégories</h2>
                <button
                  onClick={() => setIsAddingCategory(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:opacity-90"
                >
                  <Plus size={16} />
                  Nouvelle catégorie
                </button>
              </div>

              {isAddingCategory && (
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
                  <h3 className="font-bold mb-3">Ajouter une nouvelle catégorie</h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Nom de la catégorie"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddCategory}
                        className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Ajouter
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingCategory(false)
                          setNewCategory('')
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const articleCount = articles.filter((a) =>
                    (a.categories && a.categories.includes(category)) || a.category === category
                  ).length
                  return (
                    <div
                      key={category}
                      className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 relative group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <FolderPlus size={20} className="text-primary flex-shrink-0" />
                          <div>
                            <span className="font-medium block">{category}</span>
                            <p className="text-sm text-gray-500 mt-1">
                              {articleCount} article(s)
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteCategory(category)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Supprimer"
                          disabled={articleCount > 0}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      {articleCount > 0 && (
                        <p className="text-xs text-gray-400 mt-2">
                          Supprimez d'abord les articles de cette catégorie
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>

              {categories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Aucune catégorie trouvée. Ajoutez-en une !
                </div>
              )}
            </div>
          )}

          {/* Edit Suggestions Tab */}
          {activeTab === 'edit-suggestions' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Suggestions de modification en attente</h2>
              {suggestionsLoading ? (
                <div className="text-center py-8">Chargement...</div>
              ) : editSuggestions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Aucune suggestion en attente
                </div>
              ) : (
                <div className="space-y-4">
                  {editSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <Link
                            href={`/admin/edit-suggestions/${suggestion.id}`}
                            className="text-lg font-bold text-primary hover:underline"
                          >
                            {suggestion.article_title}
                          </Link>
                          {suggestion.reason && (
                            <p className="text-gray-600 mt-1 text-sm">{suggestion.reason}</p>
                          )}
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            {suggestion.suggester_name && (
                              <span>Par: {suggestion.suggester_name}</span>
                            )}
                            <span>{new Date(suggestion.submitted_at).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        <Link
                          href={`/admin/edit-suggestions/${suggestion.id}`}
                          className="px-3 py-1.5 bg-primary text-white rounded hover:opacity-90 text-sm"
                        >
                          Examiner
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* Footer Tab */}
          {activeTab === 'footer' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gérer le footer</h2>
                <button
                  onClick={saveFooter}
                  disabled={footerSaving}
                  className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                >
                  {footerSaving ? 'Enregistrement...' : footerSaved ? 'Enregistré !' : 'Enregistrer'}
                </button>
              </div>

              {footerLoading ? (
                <div className="text-center py-8">Chargement...</div>
              ) : (
                <div className="space-y-8">
                  {/* Social Links */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold">Réseaux sociaux</h3>
                      <button
                        type="button"
                        onClick={() => setFooterSocialLinks([...footerSocialLinks, { label: '', url: '', type: 'other' }])}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                      >
                        + Ajouter
                      </button>
                    </div>
                    <div className="space-y-3">
                      {footerSocialLinks.map((link, i) => (
                        <div key={i} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border border-gray-200 rounded p-3 bg-gray-50">
                          <select
                            value={link.type}
                            onChange={(e) => {
                              const updated = [...footerSocialLinks]
                              updated[i] = { ...updated[i], type: e.target.value }
                              setFooterSocialLinks(updated)
                            }}
                            className="px-2 py-1.5 border border-gray-300 rounded text-sm w-full sm:w-32"
                          >
                            <option value="facebook">Facebook</option>
                            <option value="instagram">Instagram</option>
                            <option value="youtube">YouTube</option>
                            <option value="twitter">Twitter/X</option>
                            <option value="other">Autre</option>
                          </select>
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const updated = [...footerSocialLinks]
                              updated[i] = { ...updated[i], label: e.target.value }
                              setFooterSocialLinks(updated)
                            }}
                            placeholder="Libellé (ex: Facebook)"
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm w-full"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => {
                              const updated = [...footerSocialLinks]
                              updated[i] = { ...updated[i], url: e.target.value }
                              setFooterSocialLinks(updated)
                            }}
                            placeholder="URL"
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm w-full"
                          />
                          <button
                            type="button"
                            onClick={() => setFooterSocialLinks(footerSocialLinks.filter((_, idx) => idx !== i))}
                            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm whitespace-nowrap"
                          >
                            Supprimer
                          </button>
                        </div>
                      ))}
                      {footerSocialLinks.length === 0 && (
                        <p className="text-sm text-gray-500">Aucun réseau social. Ajoutez-en un.</p>
                      )}
                    </div>
                  </div>

                  {/* Friendly Sites */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold">Sites amis</h3>
                      <button
                        type="button"
                        onClick={() => setFooterFriendlySites([...footerFriendlySites, { label: '', url: '' }])}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                      >
                        + Ajouter
                      </button>
                    </div>
                    <div className="space-y-3">
                      {footerFriendlySites.map((site, i) => (
                        <div key={i} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center border border-gray-200 rounded p-3 bg-gray-50">
                          <input
                            type="text"
                            value={site.label}
                            onChange={(e) => {
                              const updated = [...footerFriendlySites]
                              updated[i] = { ...updated[i], label: e.target.value }
                              setFooterFriendlySites(updated)
                            }}
                            placeholder="Libellé (ex: Site officiel — Grande Mosquée de Paris)"
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm w-full"
                          />
                          <input
                            type="url"
                            value={site.url}
                            onChange={(e) => {
                              const updated = [...footerFriendlySites]
                              updated[i] = { ...updated[i], url: e.target.value }
                              setFooterFriendlySites(updated)
                            }}
                            placeholder="URL"
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm w-full"
                          />
                          <button
                            type="button"
                            onClick={() => setFooterFriendlySites(footerFriendlySites.filter((_, idx) => idx !== i))}
                            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm whitespace-nowrap"
                          >
                            Supprimer
                          </button>
                        </div>
                      ))}
                      {footerFriendlySites.length === 0 && (
                        <p className="text-sm text-gray-500">Aucun site ami. Ajoutez-en un.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
