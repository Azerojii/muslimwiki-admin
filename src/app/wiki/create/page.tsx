'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import WikiHeader from '@/components/WikiHeader'
import WikiSidebar from '@/components/WikiSidebar'
import ImageUploader from '@/components/ImageUploader'
import CountryEmojiPicker from '@/components/CountryEmojiPicker'
import QuillEditor from '@/components/QuillEditor'
import { Loader2, Plus } from 'lucide-react'
import MosqueForm from '@/components/MosqueForm'
import ImamForm from '@/components/ImamForm'
import BurialForm from '@/components/BurialForm'
import type { MosqueData, ImamData, BurialData } from '@/types/mosque'

function CreateArticleForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const suggestedTitle = searchParams.get('title') || ''

  const [title, setTitle] = useState(suggestedTitle)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [content, setContent] = useState('')
  const [infoboxTitle, setInfoboxTitle] = useState('')
  const [infoboxColor, setInfoboxColor] = useState('#067782')
  const [infoboxImage, setInfoboxImage] = useState('')
  const [infoboxImageCaption, setInfoboxImageCaption] = useState('')
  const [infoboxSections, setInfoboxSections] = useState<Array<{
    title: string
    items: Array<{ label: string; value: string; type: 'text' | 'date' | 'link' }>
  }>>([{ title: '', items: [{ label: '', value: '', type: 'text' }] }])
  const [youtubeVideos, setYoutubeVideos] = useState<string[]>([])
  const [articleType, setArticleType] = useState<'article' | 'mosque' | 'imam' | 'burial'>('article')
  const [mosqueData, setMosqueData] = useState<MosqueData>({})
  const [imamData, setImamData] = useState<ImamData>({})
  const [burialData, setBurialData] = useState<BurialData>({})
  const [authorName, setAuthorName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const DEFAULT_DOUAA = 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الأَبْيَضَ مِنَ الدَّنَسِ، وَأَبْدِلْهُ دَاراً خَيْراً مِنْ دَارِهِ، وَأَهْلاً خَيْراً مِنْ أَهْلِهِ، وَزَوْجاً خَيْراً مِنْ زَوْجِهِ، وَأَدْخِلْهُ الْجَنَّةَ، وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ وَمِنْ عَذَابِ النَّارِ'

  const isQuillEmpty = (html: string) => !html || html.replace(/<(.|\n)*?>/g, '').trim() === '' || html === '<p><br></p>'
  const getCharCount = (html: string) => {
    return html.replace(/<(.|\n)*?>/g, '').trim().length
  }
  const charCount = getCharCount(content)
  const BURIAL_CHAR_LIMIT = 250
  const isBurialOverLimit = articleType === 'burial' && charCount > BURIAL_CHAR_LIMIT

  useEffect(() => {
    if (articleType === 'burial' && isQuillEmpty(content)) {
      setContent(`<p>${DEFAULT_DOUAA}</p>`)
    }
  }, [articleType])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories)
          setCategory(data.categories[0])
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const addInfoboxSection = () => {
    setInfoboxSections([...infoboxSections, { title: '', items: [{ label: '', value: '', type: 'text' }] }])
  }

  const removeInfoboxSection = (index: number) => {
    setInfoboxSections(infoboxSections.filter((_, i) => i !== index))
  }

  const updateInfoboxSectionTitle = (index: number, title: string) => {
    const updated = [...infoboxSections]
    updated[index].title = title
    setInfoboxSections(updated)
  }

  const addInfoboxItem = (sectionIndex: number) => {
    const updated = [...infoboxSections]
    updated[sectionIndex].items.push({ label: '', value: '', type: 'text' })
    setInfoboxSections(updated)
  }

  const removeInfoboxItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...infoboxSections]
    updated[sectionIndex].items = updated[sectionIndex].items.filter((_, i) => i !== itemIndex)
    setInfoboxSections(updated)
  }

  const updateInfoboxItem = (
    sectionIndex: number,
    itemIndex: number,
    field: 'label' | 'value' | 'type',
    value: string
  ) => {
    const updated = [...infoboxSections]
    if (field === 'type') {
      updated[sectionIndex].items[itemIndex][field] = value as 'text' | 'date' | 'link'
    } else {
      updated[sectionIndex].items[itemIndex][field] = value
    }
    setInfoboxSections(updated)
  }

  const addYoutubeVideo = () => {
    setYoutubeVideos([...youtubeVideos, ''])
  }

  const removeYoutubeVideo = (index: number) => {
    setYoutubeVideos(youtubeVideos.filter((_, i) => i !== index))
  }

  const updateYoutubeVideo = (index: number, value: string) => {
    const updated = [...youtubeVideos]
    updated[index] = value
    setYoutubeVideos(updated)
  }

  const handleInfoboxImageAutoFill = ({ src, caption }: { src: string; caption?: string }) => {
    setInfoboxImage(src)
    setInfoboxImageCaption(caption || '')
    setInfoboxTitle((current) => current || title || '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Build structured infobox data
      const infoboxData = {
        title: infoboxTitle || title,
        headerColor: infoboxColor,
        image: infoboxImage ? {
          src: infoboxImage,
          caption: infoboxImageCaption
        } : undefined,
        sections: infoboxSections
          .map(section => ({
            title: section.title || undefined,
            items: section.items
              .filter(item => item.label && item.value)
              .map(item => ({
                label: item.label,
                value: item.value,
                isDate: item.type === 'date',
                isLink: item.type === 'link'
              }))
          }))
          .filter(section => section.items.length > 0)
      }

      // Filter out empty YouTube links
      const validYoutubeVideos = youtubeVideos.filter(video => video.trim() !== '')

      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          excerpt: description,
          categories: [category],
          content,
          article_type: articleType,
          infobox: articleType === 'article' ? infoboxData : undefined,
          mosque_data: articleType === 'mosque' ? mosqueData : undefined,
          imam_data: articleType === 'imam' ? imamData : undefined,
          burial_data: articleType === 'burial' ? burialData : undefined,
          author_name: authorName || undefined,
          youtubeVideos: validYoutubeVideos.length > 0 ? validYoutubeVideos : undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create article')
      }

      // Redirect to the new article
      router.push(`/wiki/${data.slug}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <WikiHeader />

      <div className="flex max-w-[1400px] mx-auto">
        <WikiSidebar />

        <main className="flex-1 px-6 py-4 max-w-4xl">
          <h1 className="text-4xl font-serif font-bold border-b border-gray-300 pb-2 mb-6">
            Créer un nouvel article
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Titre de l'article <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Grande Mosquée de Paris"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Description courte
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Une brève description en une ligne"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Article Type */}
            <div>
              <label className="block text-sm font-bold mb-2">Type d'article</label>
              <select
                value={articleType}
                onChange={(e) => setArticleType(e.target.value as 'article' | 'mosque' | 'imam' | 'burial')}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="article">Article général</option>
                <option value="mosque">Mosquée</option>
                <option value="imam">Imam</option>
                <option value="burial">Mort Musulman</option>
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-bold mb-2">Auteur</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nom de l'auteur (optionnel)"
              />
            </div>

            {/* Mosque Form */}
            {articleType === 'mosque' && (
              <MosqueForm mosqueData={mosqueData} onChange={setMosqueData} />
            )}

            {/* Imam Form */}
            {articleType === 'imam' && (
              <ImamForm imamData={imamData} onChange={setImamData} />
            )}

            {/* Burial Form */}
            {articleType === 'burial' && (
              <BurialForm burialData={burialData} onChange={setBurialData} />
            )}

            {/* Infobox */}
            {articleType === 'article' && (
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  Infobox
                </label>
                <p className="text-xs text-gray-600 mb-4">
                  L'infobox s'affiche sur le côté droit de l'article avec les informations clés.
                </p>
              </div>

              <div className="space-y-4">
                {/* Infobox Title and Color */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1">Titre de l'infobox</label>
                    <input
                      type="text"
                      value={infoboxTitle}
                      onChange={(e) => setInfoboxTitle(e.target.value)}
                      placeholder="Laissez vide pour utiliser le titre de l'article"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Couleur de l'en-tête</label>
                    <input
                      type="color"
                      value={infoboxColor}
                      onChange={(e) => setInfoboxColor(e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded"
                    />
                  </div>
                </div>

                {/* Infobox Image Uploader */}
                <div>
                  <label className="block text-xs font-medium mb-2">Image de l'infobox</label>
                  <ImageUploader
                    onImageInsert={() => {}}
                    onImageSelected={handleInfoboxImageAutoFill}
                  />
                  {infoboxImage && (
                    <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
                      <p className="text-xs text-gray-600 mb-1">Image sélectionnée:</p>
                      <img src={infoboxImage} alt="Preview" className="w-32 h-32 object-cover rounded" />
                      <p className="text-xs text-gray-600 mt-1">{infoboxImageCaption}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setInfoboxImage('')
                          setInfoboxImageCaption('')
                        }}
                        className="mt-2 text-xs text-red-600 hover:underline"
                      >
                        Supprimer l'image
                      </button>
                    </div>
                  )}
                </div>

                {/* Infobox Sections */}
                <div className="space-y-4">
                    <label className="block text-xs font-medium">Sections</label>
                    {infoboxSections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="border border-gray-300 rounded p-3 bg-white">
                        <div className="flex items-center gap-2 mb-3">
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateInfoboxSectionTitle(sectionIndex, e.target.value)}
                            placeholder="Titre de la section (ex: Fonctions, Biographie)"
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => removeInfoboxSection(sectionIndex)}
                            className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                          >
                            Supprimer section
                          </button>
                        </div>

                        <div className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex flex-col sm:flex-row gap-2">
                              <input
                                type="text"
                                value={item.label}
                                onChange={(e) => updateInfoboxItem(sectionIndex, itemIndex, 'label', e.target.value)}
                                placeholder="Label (ex: Naissance)"
                                className="w-full sm:w-1/3 px-2 py-1.5 border border-gray-300 rounded text-xs"
                              />
                              <div className="flex gap-1 flex-1">
                                <input
                                  type="text"
                                  value={item.value}
                                  onChange={(e) => updateInfoboxItem(sectionIndex, itemIndex, 'value', e.target.value)}
                                  placeholder="Valeur (ex: 1868, Mali ml)"
                                  className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-xs"
                                />
                                <div className="scale-75 origin-left">
                                  <CountryEmojiPicker
                                    onSelect={(emoji) => {
                                      const currentValue = item.value
                                      const newValue = currentValue ? `${currentValue} ${emoji}` : emoji
                                      updateInfoboxItem(sectionIndex, itemIndex, 'value', newValue)
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <select
                                  value={item.type}
                                  onChange={(e) => updateInfoboxItem(sectionIndex, itemIndex, 'type', e.target.value)}
                                  className="flex-1 sm:w-24 px-2 py-1.5 border border-gray-300 rounded text-xs"
                                >
                                  <option value="text">Texte</option>
                                  <option value="date">Date</option>
                                  <option value="link">Lien</option>
                                </select>
                                <button
                                  type="button"
                                  onClick={() => removeInfoboxItem(sectionIndex, itemIndex)}
                                  className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addInfoboxItem(sectionIndex)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
                          >
                            <Plus size={12} />
                            Ajouter un champ
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addInfoboxSection}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    >
                      <Plus size={16} />
                      Ajouter une section
                    </button>
                  </div>
              </div>
            </div>
            )}

            {/* YouTube Videos */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Vidéos YouTube (Optionnel)
              </label>
              <div className="text-xs text-gray-600 mb-2">
                Ajoutez des liens YouTube à intégrer dans l'article (ex: https://www.youtube.com/watch?v=VIDEO_ID)
              </div>
              <div className="space-y-2">
                {youtubeVideos.map((video, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={video}
                      onChange={(e) => updateYoutubeVideo(index, e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeYoutubeVideo(index)}
                      className="px-3 py-2 bg-destructive text-white rounded hover:opacity-90 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addYoutubeVideo}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                >
                  <Plus size={16} />
                  Ajouter une vidéo YouTube
                </button>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-bold mb-2">
                {articleType === 'burial' ? 'Douaâ' : "Contenu de l'article"} <span className="text-red-500">*</span>
                {articleType === 'burial' && (
                  <span className={`ml-2 text-xs font-normal ${isBurialOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
                    ({charCount}/{BURIAL_CHAR_LIMIT} caractères)
                  </span>
                )}
              </label>
              <QuillEditor
                value={content}
                onChange={setContent}
                placeholder={articleType === 'burial' ? 'Douaâ pour le défunt...' : 'Commencez à écrire votre article ici...'}
              />
              {isBurialOverLimit && (
                <p className="text-red-500 text-xs mt-1">La Douaâ ne doit pas dépasser {BURIAL_CHAR_LIMIT} caractères.</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting || !title || isQuillEmpty(content) || isBurialOverLimit}
                className="px-6 py-3 bg-primary text-white rounded hover:opacity-90 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Création...
                  </>
                ) : (
                  'Créer l\'article'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded font-medium"
              >
                Annuler
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default function CreateArticlePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <WikiHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </div>
    }>
      <CreateArticleForm />
    </Suspense>
  )
}
