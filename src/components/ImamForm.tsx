'use client'

import { Plus, X } from 'lucide-react'
import type { ImamData } from '@/types/mosque'
import { FRENCH_REGIONS } from '@/lib/regions'

interface ImamFormProps {
  imamData: ImamData
  onChange: (data: ImamData) => void
}

export default function ImamForm({ imamData, onChange }: ImamFormProps) {
  const update = (field: keyof ImamData, value: unknown) => {
    onChange({ ...imamData, [field]: value })
  }

  const addPreviousMosque = () => {
    onChange({ ...imamData, previousMosques: [...(imamData.previousMosques || []), { name: '' }] })
  }
  const updatePreviousMosque = (idx: number, key: 'name' | 'from' | 'to', val: string) => {
    const updated = [...(imamData.previousMosques || [])]
    updated[idx] = { ...updated[idx], [key]: val }
    onChange({ ...imamData, previousMosques: updated })
  }
  const removePreviousMosque = (idx: number) => {
    onChange({ ...imamData, previousMosques: (imamData.previousMosques || []).filter((_, i) => i !== idx) })
  }

  const addCustomField = () => {
    onChange({ ...imamData, customFields: [...(imamData.customFields || []), { label: '', value: '' }] })
  }

  const updateCustomField = (idx: number, key: 'label' | 'value', val: string) => {
    const updated = [...(imamData.customFields || [])]
    updated[idx] = { ...updated[idx], [key]: val }
    onChange({ ...imamData, customFields: updated })
  }

  const removeCustomField = (idx: number) => {
    onChange({ ...imamData, customFields: (imamData.customFields || []).filter((_, i) => i !== idx) })
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-4">
      <div>
        <label className="block text-sm font-bold mb-2">Données Imam</label>
        <p className="text-xs text-gray-600 mb-4">
          Ces champs s'affichent dans l'infobox spécifique aux imams.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Nom affiché dans l'infobox</label>
          <input
            type="text"
            value={imamData.name || ''}
            onChange={(e) => update('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Nom de l'imam"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Couleur de l'en-tête</label>
          <input
            type="color"
            value={imamData.headerColor || '#067782'}
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
            value={imamData.image?.src || ''}
            onChange={(e) => update('image', { src: e.target.value, caption: imamData.image?.caption || '' })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Légende de l'image</label>
          <input
            type="text"
            value={imamData.image?.caption || ''}
            onChange={(e) => update('image', { src: imamData.image?.src || '', caption: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Légende..."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Rang / Titre</label>
          <input
            type="text"
            value={imamData.rank || ''}
            onChange={(e) => update('rank', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="ex: Imam, Cheikh..."
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Nationalité</label>
          <input
            type="text"
            value={imamData.nationality || ''}
            onChange={(e) => update('nationality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="ex: Algérien 🇩🇿"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Date de naissance</label>
          <input
            type="text"
            value={imamData.birthDate || ''}
            onChange={(e) => update('birthDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="1960"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Date de décès</label>
          <input
            type="text"
            value={imamData.deathDate || ''}
            onChange={(e) => update('deathDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Laisser vide si en vie"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Région (France)</label>
        <select
          value={imamData.region || ''}
          onChange={(e) => update('region', e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="">— Sélectionner une région —</option>
          {FRENCH_REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isAlive"
          checked={imamData.isAlive || false}
          onChange={(e) => update('isAlive', e.target.checked)}
          className="rounded"
        />
        <label htmlFor="isAlive" className="text-xs font-medium">Toujours en vie</label>
      </div>

      {/* Current Mosque */}
      <div>
        <label className="block text-xs font-medium mb-1">Mosquée actuelle</label>
        <input
          type="text"
          value={imamData.currentMosque || ''}
          onChange={(e) => update('currentMosque', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          placeholder="Nom de la mosquée actuelle"
        />
      </div>

      {/* Previous Mosques */}
      <div>
        <label className="block text-xs font-medium mb-2">Mosquées précédentes</label>
        <div className="space-y-2">
          {(imamData.previousMosques || []).map((mosque, idx) => (
            <div key={idx} className="flex gap-2 flex-wrap">
              <input
                type="text"
                value={mosque.name}
                onChange={(e) => updatePreviousMosque(idx, 'name', e.target.value)}
                className="flex-1 min-w-[140px] px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Nom de la mosquée"
              />
              <input
                type="text"
                value={mosque.from || ''}
                onChange={(e) => updatePreviousMosque(idx, 'from', e.target.value)}
                className="w-24 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="De (année)"
              />
              <input
                type="text"
                value={mosque.to || ''}
                onChange={(e) => updatePreviousMosque(idx, 'to', e.target.value)}
                className="w-24 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="À (année)"
              />
              <button
                type="button"
                onClick={() => removePreviousMosque(idx)}
                className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPreviousMosque}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
          >
            <Plus size={12} />
            Ajouter une mosquée précédente
          </button>
        </div>
      </div>

      {/* Custom Fields */}
      <div>
        <label className="block text-xs font-medium mb-2">Champs supplémentaires</label>
        <div className="space-y-2">
          {(imamData.customFields || []).map((field, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateCustomField(idx, 'label', e.target.value)}
                className="w-1/3 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Label"
              />
              <input
                type="text"
                value={field.value}
                onChange={(e) => updateCustomField(idx, 'value', e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                placeholder="Valeur"
              />
              <button
                type="button"
                onClick={() => removeCustomField(idx)}
                className="px-2 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCustomField}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 rounded text-xs"
          >
            <Plus size={12} />
            Ajouter un champ
          </button>
        </div>
      </div>
    </div>
  )
}
