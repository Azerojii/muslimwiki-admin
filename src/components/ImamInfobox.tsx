'use client'

import type { ImamData } from '@/types/mosque'

interface ImamInfoboxProps {
  imam: ImamData
}

export default function ImamInfobox({ imam }: ImamInfoboxProps) {
  const headerColor = imam.headerColor || '#067782'

  return (
    <div className="w-full bg-[#f9f9f9] border border-[#a2a9b1] text-sm" style={{ maxWidth: '280px' }}>
      {/* Header */}
      <div
        className="text-white font-bold text-center py-2 px-3"
        style={{ backgroundColor: headerColor }}
      >
        {imam.name || 'Imam'}
      </div>

      {/* Image */}
      {imam.image && (
        <div className="bg-white p-2">
          <img src={imam.image.src} alt={imam.name || 'Imam'} className="w-full h-auto" />
          {imam.image.caption && (
            <p className="text-xs italic text-gray-600 text-center mt-1 px-1">
              {imam.image.caption}
            </p>
          )}
        </div>
      )}

      {/* Info section header */}
      <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
        Informations personnelles
      </div>

      <table className="w-full border-collapse">
        <tbody>
          {imam.rank && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium" style={{ width: '45%' }}>Rang / Titre</td>
              <td className="py-1.5 px-3 align-top">{imam.rank}</td>
            </tr>
          )}
          {imam.nationality && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Nationalité</td>
              <td className="py-1.5 px-3 align-top">{imam.nationality}</td>
            </tr>
          )}
          {imam.region && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Région</td>
              <td className="py-1.5 px-3 align-top">{imam.region}</td>
            </tr>
          )}
          {imam.currentMosque && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Mosquée actuelle</td>
              <td className="py-1.5 px-3 align-top">{imam.currentMosque}</td>
            </tr>
          )}
          {imam.birthDate && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Naissance</td>
              <td className="py-1.5 px-3 align-top text-[#0645ad]">{imam.birthDate}</td>
            </tr>
          )}
          {imam.isAlive ? (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Statut</td>
              <td className="py-1.5 px-3 align-top text-green-700 font-semibold">En vie</td>
            </tr>
          ) : imam.deathDate ? (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Décès</td>
              <td className="py-1.5 px-3 align-top text-[#0645ad]">{imam.deathDate}</td>
            </tr>
          ) : null}
        </tbody>
      </table>

      {/* Previous Mosques */}
      {imam.previousMosques && imam.previousMosques.length > 0 && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Mosquées précédentes
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {imam.previousMosques.map((mosque, idx) => (
                <tr key={idx} className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top">
                    <div className="font-medium">{mosque.name}</div>
                    {(mosque.from || mosque.to) && (
                      <div className="text-xs text-[#0645ad]">
                        {mosque.from && `De ${mosque.from}`}
                        {mosque.from && mosque.to && ' — '}
                        {mosque.to && `À ${mosque.to}`}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Custom Fields */}
      {imam.customFields && imam.customFields.length > 0 && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Informations supplémentaires
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {imam.customFields.map((field, idx) => (
                <tr key={idx} className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium" style={{ width: '45%' }}>{field.label}</td>
                  <td className="py-1.5 px-3 align-top">{field.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {/* Contact */}
      {(imam.contactPhone || imam.contactEmail) && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Contact
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {imam.contactPhone && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium" style={{ width: '45%' }}>Téléphone</td>
                  <td className="py-1.5 px-3 align-top">{imam.contactPhone}</td>
                </tr>
              )}
              {imam.contactEmail && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Email</td>
                  <td className="py-1.5 px-3 align-top">{imam.contactEmail}</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
