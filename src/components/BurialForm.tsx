'use client'

import type { BurialData } from '@/types/mosque'
import LocationSelector from './LocationSelector'
import ImageUploader from './ImageUploader'

interface BurialFormProps {
  burialData: BurialData
  onChange: (data: BurialData) => void
}

export default function BurialForm({ burialData, onChange }: BurialFormProps) {
  const update = (field: keyof BurialData, value: unknown) => {
    onChange({ ...burialData, [field]: value })
  }

  const tributeLength = (burialData.tribute || '').length

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 space-y-4">
      <div>
        <label className="block text-sm font-bold mb-2">Données Mort Musulman</label>
        <p className="text-xs text-gray-600 mb-4">
          Ces champs s'affichent dans l'infobox spécifique aux morts musulmans.
        </p>
      </div>

      {/* Burial Status */}
      <div>
        <label className="block text-xs font-medium mb-1">Statut de sépulture</label>
        <select
          value={burialData.burialStatus || 'enterre'}
          onChange={(e) => update('burialStatus', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="enterre">Enterré</option>
          <option value="inconnu">Lieu inconnu (non retrouvé)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Nom affiché dans l'infobox</label>
          <input
            type="text"
            value={burialData.name || ''}
            onChange={(e) => update('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Nom du défunt"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Couleur de l'en-tête</label>
          <input
            type="color"
            value={burialData.headerColor || '#4a5568'}
            onChange={(e) => update('headerColor', e.target.value)}
            className="w-full h-10 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Identity */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Nom complet</label>
          <input
            type="text"
            value={burialData.fullName || ''}
            onChange={(e) => update('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="Prénom et nom complet"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Nationalité</label>
          <input
            type="text"
            value={burialData.nationality || ''}
            onChange={(e) => update('nationality', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="ex: Française"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Nom du père</label>
          <input
            type="text"
            value={burialData.fatherName || ''}
            onChange={(e) => update('fatherName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Nom de la mère</label>
          <input
            type="text"
            value={burialData.motherName || ''}
            onChange={(e) => update('motherName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Pays d'origine</label>
        <input
          type="text"
          value={burialData.countryOfOrigin || ''}
          onChange={(e) => update('countryOfOrigin', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          placeholder="ex: Algérie"
        />
      </div>

      {/* Conversion & Additional Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Converti à l'Islam (année)</label>
          <input
            type="text"
            value={burialData.convertedToIslam || ''}
            onChange={(e) => update('convertedToIslam', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="ex: 1985"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium mb-1">Date de naissance</label>
          <input
            type="text"
            value={burialData.birthDate || ''}
            onChange={(e) => update('birthDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="ex: 15/03/1930"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Date de décès</label>
          <input
            type="text"
            value={burialData.deathDate || ''}
            onChange={(e) => update('deathDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="ex: 22/11/2005"
          />
        </div>
      </div>

      {/* Location */}
      <LocationSelector
        region={burialData.region}
        department={burialData.department}
        commune={burialData.commune}
        onRegionChange={(v) => onChange({ ...burialData, region: v, department: undefined })}
        onDepartmentChange={(v) => update('department', v)}
        onCommuneChange={(v) => update('commune', v)}
      />

      {/* Cemetery details - hidden when burial status is unknown */}
      {burialData.burialStatus !== 'inconnu' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Nom du cimetière</label>
              <input
                type="text"
                value={burialData.cemeteryName || ''}
                onChange={(e) => update('cemeteryName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                placeholder="ex: Cimetière du Père-Lachaise"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Division</label>
              <input
                type="text"
                value={burialData.division || ''}
                onChange={(e) => update('division', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                placeholder="ex: Division 87"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Numéro de tombe</label>
              <input
                type="text"
                value={burialData.graveNumber || ''}
                onChange={(e) => update('graveNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Type de concession</label>
              <select
                value={burialData.concessionType || ''}
                onChange={(e) => update('concessionType', e.target.value || undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              >
                <option value="">— Sélectionner —</option>
                <option value="15">15 ans</option>
                <option value="30">30 ans</option>
                <option value="50">50 ans</option>
                <option value="perpetuelle">Perpétuelle</option>
              </select>
            </div>
          </div>
        </>
      )}

      <div>
        <label className="block text-xs font-medium mb-1">Adresse de contact</label>
        <input
          type="text"
          value={burialData.contactAddress || ''}
          onChange={(e) => update('contactAddress', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      </div>

      {/* Photos */}
      <div>
        <label className="block text-xs font-medium mb-2">Photo portrait</label>
        <ImageUploader
          onImageInsert={() => {}}
          onImageSelected={({ src, caption }) => update('image', { src, caption: caption || '' })}
        />
        {burialData.image?.src && (
          <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
            <img src={burialData.image.src} alt="Portrait" className="w-32 h-32 object-cover rounded" />
            <button type="button" onClick={() => update('image', undefined)} className="mt-1 text-xs text-red-600 hover:underline">
              Supprimer
            </button>
          </div>
        )}
      </div>

      {burialData.burialStatus !== 'inconnu' && (
        <div>
          <label className="block text-xs font-medium mb-2">Photo de la tombe</label>
          <ImageUploader
            onImageInsert={() => {}}
            onImageSelected={({ src, caption }) => update('graveImage', { src, caption: caption || '' })}
          />
          {burialData.graveImage?.src && (
            <div className="mt-2 p-2 bg-white border border-gray-300 rounded">
              <img src={burialData.graveImage.src} alt="Tombe" className="w-32 h-32 object-cover rounded" />
              <button type="button" onClick={() => update('graveImage', undefined)} className="mt-1 text-xs text-red-600 hover:underline">
                Supprimer
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tribute */}
      <div>
        <label className="block text-xs font-medium mb-1">
          Hommage <span className="text-gray-400">({tributeLength}/300)</span>
        </label>
        <textarea
          value={burialData.tribute || ''}
          onChange={(e) => {
            if (e.target.value.length <= 300) update('tribute', e.target.value)
          }}
          maxLength={300}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
          placeholder="Quelques mots en hommage au défunt..."
        />
      </div>
    </div>
  )
}
