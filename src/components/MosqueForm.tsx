'use client'

import { Plus, X } from 'lucide-react'
import type { MosqueData, MosqueFounder, CommitteeMember, MosqueImam, MosqueWorker, AssociationMember } from '@/types/mosque'
import { FRENCH_REGIONS } from '@/lib/regions'

interface MosqueFormProps {
  mosqueData: MosqueData
  onChange: (data: MosqueData) => void
}

export default function MosqueForm({ mosqueData, onChange }: MosqueFormProps) {
  const update = (field: keyof MosqueData, value: unknown) => {
    onChange({ ...mosqueData, [field]: value })
  }

  // Founders
  const addFounder = () => {
    onChange({ ...mosqueData, founders: [...(mosqueData.founders || []), { name: '' }] })
  }
  const updateFounder = (idx: number, key: keyof MosqueFounder, val: string) => {
    const updated = [...(mosqueData.founders || [])]
    updated[idx] = { ...updated[idx], [key]: val }
    onChange({ ...mosqueData, founders: updated })
  }
  const removeFounder = (idx: number) => {
    onChange({ ...mosqueData, founders: (mosqueData.founders || []).filter((_, i) => i !== idx) })
  }

  // Previous Committee
  const addPreviousMember = () => {
    onChange({ ...mosqueData, previousCommittee: [...(mosqueData.previousCommittee || []), { name: '' }] })
  }
  const updatePreviousMember = (idx: number, key: keyof CommitteeMember, val: string) => {
    const updated = [...(mosqueData.previousCommittee || [])]
    updated[idx] = { ...updated[idx], [key]: val }
    onChange({ ...mosqueData, previousCommittee: updated })
  }
  const removePreviousMember = (idx: number) => {
    onChange({ ...mosqueData, previousCommittee: (mosqueData.previousCommittee || []).filter((_, i) => i !== idx) })
  }

  // Current Committee
  const addCurrentMember = () => {
    onChange({ ...mosqueData, currentCommittee: [...(mosqueData.currentCommittee || []), { name: '' }] })
  }
  const updateCurrentMember = (idx: number, key: keyof CommitteeMember, val: string) => {
    const updated = [...(mosqueData.currentCommittee || [])]
    updated[idx] = { ...updated[idx], [key]: val }
    onChange({ ...mosqueData, currentCommittee: updated })
  }
  const removeCurrentMember = (idx: number) => {
    onChange({ ...mosqueData, currentCommittee: (mosqueData.currentCommittee || []).filter((_, i) => i !== idx) })
  }

  // Association Members
  const addAssociationMember = () => {
    onChange({ ...mosqueData, associationMembers: [...(mosqueData.associationMembers || []), { firstName: '', lastName: '' }] })
  }
  const updateAssociationMember = (idx: number, key: keyof AssociationMember, val: string) => {
    const updated = [...(mosqueData.associationMembers || [])]
    updated[idx] = { ...updated[idx], [key]: val }
    onChange({ ...mosqueData, associationMembers: updated })
  }
  const removeAssociationMember = (idx: number) => {
    onChange({ ...mosqueData, associationMembers: (mosqueData.associationMembers || []).filter((_, i) => i !== idx) })
  }

  // Previous Imams
  const addPreviousImam = () => {
    onChange({ ...mosqueData, previousImams: [...(mosqueData.previousImams || []), { name: '' }] })
  }
  const updatePreviousImam = (idx: number, key: keyof MosqueImam, val: string) => {
    const updated = [...(mosqueData.previousImams || [])]
    updated[idx] = { ...updated[idx], [key]: val }
    onChange({ ...mosqueData, previousImams: updated })
  }
  const removePreviousImam = (idx: number) => {
    onChange({ ...mosqueData, previousImams: (mosqueData.previousImams || []).filter((_, i) => i !== idx) })
  }

  // Workers
  const addWorker = () => {
    onChange({ ...mosqueData, workers: [...(mosqueData.workers || []), { name: '' }] })
  }
  const updateWorker = (idx: number, key: keyof MosqueWorker, val: string) => {
    const updated = [...(mosqueData.workers || [])]
    updated[idx] = { ...updated[idx], [key]: val }
    onChange({ ...mosqueData, workers: updated })
  }
  const removeWorker = (idx: number) => {
    onChange({ ...mosqueData, workers: (mosqueData.workers || []).filter((_, i) => i !== idx) })
  }

  // Facilities
  const addFacility = () => {
    onChange({ ...mosqueData, facilities: [...(mosqueData.facilities || []), ''] })
  }
  const updateFacility = (idx: number, value: string) => {
    const updated = [...(mosqueData.facilities || [])]
    updated[idx] = value
    onChange({ ...mosqueData, facilities: updated })
  }
  const removeFacility = (idx: number) => {
    onChange({ ...mosqueData, facilities: (mosqueData.facilities || []).filter((_, i) => i !== idx) })
  }

  // Gallery
  const addGalleryImage = () => {
    onChange({ ...mosqueData, gallery: [...(mosqueData.gallery || []), { src: '', caption: '' }] })
  }
  const updateGalleryImage = (idx: number, field: 'src' | 'caption', value: string) => {
    const updated = [...(mosqueData.gallery || [])]
    updated[idx] = { ...updated[idx], [field]: value }
    onChange({ ...mosqueData, gallery: updated })
  }
  const removeGalleryImage = (idx: number) => {
    onChange({ ...mosqueData, gallery: (mosqueData.gallery || []).filter((_, i) => i !== idx) })
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-4">
      <div>
        <label className="block text-sm font-bold mb-2">Données Mosquée</label>
        <p className="text-xs text-gray-600 mb-4">
          Ces champs s'affichent dans l'infobox spécifique aux mosquées.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Nom affiché dans l'infobox</label>
          <input
            type="text"
            value={mosqueData.name || ''}
            onChange={(e) => update('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Nom de la mosquée"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Couleur de l'en-tête</label>
          <input
            type="color"
            value={mosqueData.headerColor || '#067782'}
            onChange={(e) => update('headerColor', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Image principale (URL)</label>
          <input
            type="text"
            value={mosqueData.image?.src || ''}
            onChange={(e) => update('image', { src: e.target.value, caption: mosqueData.image?.caption || '' })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Légende de l'image</label>
          <input
            type="text"
            value={mosqueData.image?.caption || ''}
            onChange={(e) => update('image', { src: mosqueData.image?.src || '', caption: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Légende..."
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Localisation</label>
        <input
          type="text"
          value={mosqueData.localisation || ''}
          onChange={(e) => update('localisation', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          placeholder="Paris, France"
        />
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Région (France)</label>
        <select
          value={mosqueData.region || ''}
          onChange={(e) => update('region', e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="">— Sélectionner une région —</option>
          {FRENCH_REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Date de construction</label>
          <input
            type="text"
            value={mosqueData.constructionDate || ''}
            onChange={(e) => update('constructionDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="1922"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Date d'inauguration</label>
          <input
            type="text"
            value={mosqueData.inaugurationDate || ''}
            onChange={(e) => update('inaugurationDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="1926"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Capacité (fidèles)</label>
          <input
            type="number"
            value={mosqueData.capacity || ''}
            onChange={(e) => update('capacity', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="1000"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Surface salle de prière (m²)</label>
          <input
            type="number"
            value={mosqueData.prayerHallArea || ''}
            onChange={(e) => update('prayerHallArea', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Surface totale (m²)</label>
          <input
            type="number"
            value={mosqueData.totalArea || ''}
            onChange={(e) => update('totalArea', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="1000"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Hauteur minaret (m)</label>
          <input
            type="number"
            value={mosqueData.minaretHeight || ''}
            onChange={(e) => update('minaretHeight', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="26"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Architecte</label>
          <input
            type="text"
            value={mosqueData.architect || ''}
            onChange={(e) => update('architect', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Nom de l'architecte"
          />
        </div>
      </div>

      {/* Founders */}
      <div>
        <label className="block text-xs font-medium mb-2">Fondateurs</label>
        <div className="space-y-2">
          {(mosqueData.founders || []).map((founder, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={founder.name}
                onChange={(e) => updateFounder(idx, 'name', e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Nom du fondateur"
              />
              <input
                type="text"
                value={founder.nationality || ''}
                onChange={(e) => updateFounder(idx, 'nationality', e.target.value)}
                className="w-36 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Nationalité"
              />
              <button
                type="button"
                onClick={() => removeFounder(idx)}
                className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFounder}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
          >
            <Plus size={12} />
            Ajouter un fondateur
          </button>
        </div>
      </div>

      {/* Previous Committee */}
      <div>
        <label className="block text-xs font-medium mb-2">Anciens membres du comité</label>
        <div className="space-y-2">
          {(mosqueData.previousCommittee || []).map((member, idx) => (
            <div key={idx} className="flex gap-2 flex-wrap">
              <input
                type="text"
                value={member.name}
                onChange={(e) => updatePreviousMember(idx, 'name', e.target.value)}
                className="flex-1 min-w-[140px] px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Nom"
              />
              <input
                type="text"
                value={member.nationality || ''}
                onChange={(e) => updatePreviousMember(idx, 'nationality', e.target.value)}
                className="w-32 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Nationalité"
              />
              <input
                type="text"
                value={member.from || ''}
                onChange={(e) => updatePreviousMember(idx, 'from', e.target.value)}
                className="w-24 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="De (année)"
              />
              <input
                type="text"
                value={member.to || ''}
                onChange={(e) => updatePreviousMember(idx, 'to', e.target.value)}
                className="w-24 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="À (année)"
              />
              <button
                type="button"
                onClick={() => removePreviousMember(idx)}
                className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPreviousMember}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
          >
            <Plus size={12} />
            Ajouter un ancien membre
          </button>
        </div>
      </div>

      {/* Current Association */}
      <div>
        <label className="block text-xs font-medium mb-2">Membres de l'association actuelle</label>
        <div className="space-y-2">
          {(mosqueData.currentCommittee || []).map((member, idx) => (
            <div key={idx} className="flex gap-2 flex-wrap">
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateCurrentMember(idx, 'name', e.target.value)}
                className="flex-1 min-w-[140px] px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Nom"
              />
              <input
                type="text"
                value={member.nationality || ''}
                onChange={(e) => updateCurrentMember(idx, 'nationality', e.target.value)}
                className="w-32 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Nationalité"
              />
              <input
                type="text"
                value={member.from || ''}
                onChange={(e) => updateCurrentMember(idx, 'from', e.target.value)}
                className="w-32 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Depuis (année)"
              />
              <button
                type="button"
                onClick={() => removeCurrentMember(idx)}
                className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCurrentMember}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
          >
            <Plus size={12} />
            Ajouter un membre actuel
          </button>
        </div>
      </div>

      {/* Association */}
      <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-3">
        <label className="block text-sm font-bold mb-1">Association actuelle</label>
        <div>
          <label className="block text-xs font-medium mb-1">Nom de l'association</label>
          <input
            type="text"
            value={mosqueData.associationName || ''}
            onChange={(e) => update('associationName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Nom de l'association actuelle"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-2">Membres de l'association</label>
          <div className="space-y-2">
            {(mosqueData.associationMembers || []).map((member, idx) => (
              <div key={idx} className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  value={member.lastName}
                  onChange={(e) => updateAssociationMember(idx, 'lastName', e.target.value)}
                  className="flex-1 min-w-[120px] px-3 py-1.5 border border-gray-300 rounded text-sm"
                  placeholder="Nom de famille"
                />
                <input
                  type="text"
                  value={member.firstName}
                  onChange={(e) => updateAssociationMember(idx, 'firstName', e.target.value)}
                  className="flex-1 min-w-[120px] px-3 py-1.5 border border-gray-300 rounded text-sm"
                  placeholder="Prénom"
                />
                <input
                  type="text"
                  value={member.role || ''}
                  onChange={(e) => updateAssociationMember(idx, 'role', e.target.value)}
                  className="w-36 px-3 py-1.5 border border-gray-300 rounded text-sm"
                  placeholder="Rôle (optionnel)"
                />
                <button
                  type="button"
                  onClick={() => removeAssociationMember(idx)}
                  className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAssociationMember}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
            >
              <Plus size={12} />
              Ajouter un membre
            </button>
          </div>
        </div>
      </div>

      {/* Current Imam */}
      <div>
        <label className="block text-xs font-medium mb-1">Imam actuel</label>
        <input
          type="text"
          value={mosqueData.currentImam || ''}
          onChange={(e) => update('currentImam', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          placeholder="Nom de l'imam actuel"
        />
      </div>

      {/* Previous Imams */}
      <div>
        <label className="block text-xs font-medium mb-2">Imams précédents</label>
        <div className="space-y-2">
          {(mosqueData.previousImams || []).map((imam, idx) => (
            <div key={idx} className="flex gap-2 flex-wrap">
              <input
                type="text"
                value={imam.name}
                onChange={(e) => updatePreviousImam(idx, 'name', e.target.value)}
                className="flex-1 min-w-[140px] px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Nom"
              />
              <input
                type="text"
                value={imam.from || ''}
                onChange={(e) => updatePreviousImam(idx, 'from', e.target.value)}
                className="w-24 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="De (année)"
              />
              <input
                type="text"
                value={imam.to || ''}
                onChange={(e) => updatePreviousImam(idx, 'to', e.target.value)}
                className="w-24 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="À (année)"
              />
              <button
                type="button"
                onClick={() => removePreviousImam(idx)}
                className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPreviousImam}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
          >
            <Plus size={12} />
            Ajouter un imam précédent
          </button>
        </div>
      </div>

      {/* Workers */}
      <div>
        <label className="block text-xs font-medium mb-2">Travailleurs de la mosquée</label>
        <div className="space-y-2">
          {(mosqueData.workers || []).map((worker, idx) => (
            <div key={idx} className="flex gap-2 flex-wrap">
              <input
                type="text"
                value={worker.name}
                onChange={(e) => updateWorker(idx, 'name', e.target.value)}
                className="flex-1 min-w-[140px] px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Nom"
              />
              <input
                type="text"
                value={worker.rank || ''}
                onChange={(e) => updateWorker(idx, 'rank', e.target.value)}
                className="w-32 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Poste / Rang"
              />
              <input
                type="text"
                value={worker.from || ''}
                onChange={(e) => updateWorker(idx, 'from', e.target.value)}
                className="w-24 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="De (année)"
              />
              <input
                type="text"
                value={worker.to || ''}
                onChange={(e) => updateWorker(idx, 'to', e.target.value)}
                className="w-24 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="À (année)"
              />
              <button
                type="button"
                onClick={() => removeWorker(idx)}
                className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addWorker}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
          >
            <Plus size={12} />
            Ajouter un travailleur
          </button>
        </div>
      </div>

      {/* Facilities */}
      <div>
        <label className="block text-xs font-medium mb-2">Équipements</label>
        <div className="space-y-2">
          {(mosqueData.facilities || []).map((facility, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={facility}
                onChange={(e) => updateFacility(idx, e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="ex: Bibliothèque, École coranique..."
              />
              <button
                type="button"
                onClick={() => removeFacility(idx)}
                className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFacility}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
          >
            <Plus size={12} />
            Ajouter un équipement
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div>
        <label className="block text-xs font-medium mb-2">Galerie de photos</label>
        <div className="space-y-2">
          {(mosqueData.gallery || []).map((img, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <input
                type="text"
                value={img.src}
                onChange={(e) => updateGalleryImage(idx, 'src', e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="URL de l'image"
              />
              <input
                type="text"
                value={img.caption}
                onChange={(e) => updateGalleryImage(idx, 'caption', e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Légende"
              />
              <button
                type="button"
                onClick={() => removeGalleryImage(idx)}
                className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addGalleryImage}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
          >
            <Plus size={12} />
            Ajouter une photo à la galerie
          </button>
        </div>
      </div>
      {/* Contact */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Téléphone</label>
          <input
            type="tel"
            value={mosqueData.contactPhone || ''}
            onChange={(e) => update('contactPhone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="ex: 01 23 45 67 89"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Email</label>
          <input
            type="email"
            value={mosqueData.contactEmail || ''}
            onChange={(e) => update('contactEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="ex: contact@mosquee.fr"
          />
        </div>
      </div>

      {/* Bank Information */}
      <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
        <h3 className="font-semibold text-sm mb-3 text-gray-700">Informations bancaires (dons)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Nom du titulaire</label>
            <input
              type="text"
              value={mosqueData.bankAccountName || ''}
              onChange={(e) => update('bankAccountName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="ex: Association Al-Ihsan"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Numéro de compte (IBAN)</label>
            <input
              type="text"
              value={mosqueData.bankAccountNumber || ''}
              onChange={(e) => update('bankAccountNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="ex: FR76 1234 5678 ..."
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Banque</label>
            <input
              type="text"
              value={mosqueData.bankName || ''}
              onChange={(e) => update('bankName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="ex: BNP Paribas"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
