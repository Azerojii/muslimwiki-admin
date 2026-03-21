'use client'

import type { BurialData } from '@/types/mosque'

interface BurialInfoboxProps {
  burial: BurialData
}

export default function BurialInfobox({ burial }: BurialInfoboxProps) {
  const headerColor = burial.headerColor || '#4a5568'

  const concessionLabel: Record<string, string> = {
    '15': '15 ans',
    '30': '30 ans',
    '50': '50 ans',
    'perpetuelle': 'Perpétuelle',
  }

  return (
    <div className="w-full bg-[#f9f9f9] border border-[#a2a9b1] text-sm rounded-lg overflow-hidden" style={{ maxWidth: '280px' }}>
      {/* Header */}
      <div
        className="text-white font-bold text-center py-2 px-3"
        style={{ backgroundColor: headerColor }}
      >
        {burial.name || burial.fullName || 'Mort Musulman'}
      </div>

      {/* Portrait */}
      {burial.image && (
        <div className="bg-white p-2">
          <img src={burial.image.src} alt={burial.name || 'Portrait'} className="w-full h-auto" />
          {burial.image.caption && (
            <p className="text-xs italic text-gray-600 text-center mt-1 px-1">{burial.image.caption}</p>
          )}
        </div>
      )}

      {/* Identity */}
      <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
        Identité
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {burial.fullName && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium" style={{ width: '45%' }}>Nom complet</td>
              <td className="py-1.5 px-3 align-top">{burial.fullName}</td>
            </tr>
          )}
          {burial.fatherName && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Père</td>
              <td className="py-1.5 px-3 align-top">{burial.fatherName}</td>
            </tr>
          )}
          {burial.motherName && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Mère</td>
              <td className="py-1.5 px-3 align-top">{burial.motherName}</td>
            </tr>
          )}
          {burial.nationality && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Nationalité</td>
              <td className="py-1.5 px-3 align-top">{burial.nationality}</td>
            </tr>
          )}
          {burial.countryOfOrigin && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Pays d'origine</td>
              <td className="py-1.5 px-3 align-top">{burial.countryOfOrigin}</td>
            </tr>
          )}
          {burial.convertedToIslam && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Converti à l'Islam</td>
              <td className="py-1.5 px-3 align-top">{burial.convertedToIslam}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Dates */}
      {(burial.birthDate || burial.deathDate) && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Dates
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {burial.birthDate && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium" style={{ width: '45%' }}>Naissance</td>
                  <td className="py-1.5 px-3 align-top text-[#0645ad]">{burial.birthDate}</td>
                </tr>
              )}
              {burial.deathDate && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Décès</td>
                  <td className="py-1.5 px-3 align-top text-[#0645ad]">{burial.deathDate}</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {/* Burial Location */}
      <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
        Lieu de sépulture
      </div>
      {burial.burialStatus === 'inconnu' ? (
        <div className="p-3 text-sm text-gray-600 italic text-center">
          Lieu de sépulture inconnu
        </div>
      ) : (
        <>
          <table className="w-full border-collapse">
            <tbody>
              {burial.cemeteryName && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium" style={{ width: '45%' }}>Cimetière</td>
                  <td className="py-1.5 px-3 align-top">{burial.cemeteryName}</td>
                </tr>
              )}
              {burial.commune && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Commune</td>
                  <td className="py-1.5 px-3 align-top">{burial.commune}</td>
                </tr>
              )}
              {burial.department && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Département</td>
                  <td className="py-1.5 px-3 align-top">{burial.department}</td>
                </tr>
              )}
              {burial.region && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Région</td>
                  <td className="py-1.5 px-3 align-top">{burial.region}</td>
                </tr>
              )}
              {burial.division && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Division</td>
                  <td className="py-1.5 px-3 align-top">{burial.division}</td>
                </tr>
              )}
              {burial.graveNumber && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium">N° de tombe</td>
                  <td className="py-1.5 px-3 align-top">{burial.graveNumber}</td>
                </tr>
              )}
              {burial.concessionType && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Concession</td>
                  <td className="py-1.5 px-3 align-top">{concessionLabel[burial.concessionType] || burial.concessionType}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Grave photo */}
          {burial.graveImage && (
            <>
              <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
                Photo de la tombe
              </div>
              <div className="bg-white p-2">
                <img src={burial.graveImage.src} alt="Tombe" className="w-full h-auto" />
                {burial.graveImage.caption && (
                  <p className="text-xs italic text-gray-600 text-center mt-1 px-1">{burial.graveImage.caption}</p>
                )}
              </div>
            </>
          )}
        </>
      )}

      {/* Contact */}
      {burial.contactAddress && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Contact
          </div>
          <div className="p-2 text-xs text-gray-700">{burial.contactAddress}</div>
        </>
      )}

      {/* Tribute */}
      {burial.tribute && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Hommage
          </div>
          <div className="p-3 text-xs italic text-gray-700 leading-relaxed">
            {burial.tribute}
          </div>
        </>
      )}
    </div>
  )
}
