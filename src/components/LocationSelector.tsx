'use client'

import { FRENCH_DEPARTMENTS, FRENCH_REGIONS } from '@/lib/regions'

interface LocationSelectorProps {
  region?: string
  department?: string
  commune?: string
  onRegionChange: (value: string | undefined) => void
  onDepartmentChange: (value: string | undefined) => void
  onCommuneChange: (value: string | undefined) => void
}

export default function LocationSelector({
  region,
  department,
  commune,
  onRegionChange,
  onDepartmentChange,
  onCommuneChange,
}: LocationSelectorProps) {
  const departments = region ? FRENCH_DEPARTMENTS[region] || [] : []

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium mb-1">Région</label>
        <select
          value={region || ''}
          onChange={(e) => onRegionChange(e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="">— Sélectionner une région —</option>
          {FRENCH_REGIONS.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Département</label>
        <select
          value={department || ''}
          onChange={(e) => onDepartmentChange(e.target.value || undefined)}
          disabled={!region}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-100 disabled:text-gray-400"
        >
          <option value="">— Sélectionner un département —</option>
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium mb-1">Commune</label>
        <input
          type="text"
          value={commune || ''}
          onChange={(e) => onCommuneChange(e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
          placeholder="Nom de la commune"
        />
      </div>
    </div>
  )
}
