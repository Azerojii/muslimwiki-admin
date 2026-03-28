'use client'

import type { MosqueData } from '@/types/mosque'

interface MosqueInfoboxProps {
  mosque: MosqueData
}

export default function MosqueInfobox({ mosque }: MosqueInfoboxProps) {
  const headerColor = mosque.headerColor || '#067782'

  return (
    <div className="w-full bg-[#f9f9f9] border border-[#a2a9b1] text-sm rounded-lg overflow-hidden">
      {/* Header */}
      <div
        className="text-white font-bold text-center py-2 px-3"
        style={{ backgroundColor: headerColor }}
      >
        {mosque.name || 'Mosquée'}
      </div>

      {/* Image */}
      {mosque.image && (
        <div className="bg-white p-2">
          <img src={mosque.image.src} alt={mosque.name || 'Mosquée'} className="w-full h-auto" />
          {mosque.image.caption && (
            <p className="text-xs italic text-gray-600 text-center mt-1 px-1">
              {mosque.image.caption}
            </p>
          )}
        </div>
      )}

      {/* Info section header */}
      <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
        Informations
      </div>

      <table className="w-full border-collapse">
        <tbody>
          {mosque.localisation && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium" style={{ width: '45%' }}>Localisation</td>
              <td className="py-1.5 px-3 align-top">{mosque.localisation}</td>
            </tr>
          )}
          {mosque.constructionDate && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Construction</td>
              <td className="py-1.5 px-3 align-top text-[#0645ad]">{mosque.constructionDate}</td>
            </tr>
          )}
          {mosque.inaugurationDate && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Inauguration</td>
              <td className="py-1.5 px-3 align-top text-[#0645ad]">{mosque.inaugurationDate}</td>
            </tr>
          )}
          {mosque.capacity != null && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Capacité</td>
              <td className="py-1.5 px-3 align-top">{mosque.capacity.toLocaleString('fr-FR')} fidèles</td>
            </tr>
          )}
          {mosque.prayerHallArea != null && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Salle de prière</td>
              <td className="py-1.5 px-3 align-top">{mosque.prayerHallArea} m²</td>
            </tr>
          )}
          {mosque.totalArea != null && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Surface totale</td>
              <td className="py-1.5 px-3 align-top">{mosque.totalArea} m²</td>
            </tr>
          )}
          {mosque.minaretHeight != null && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Hauteur minaret</td>
              <td className="py-1.5 px-3 align-top">{mosque.minaretHeight} m</td>
            </tr>
          )}
          {mosque.architect && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Architecte</td>
              <td className="py-1.5 px-3 align-top">{mosque.architect}</td>
            </tr>
          )}
          {mosque.region && (
            <tr className="border-t border-[#a2a9b1]">
              <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Région</td>
              <td className="py-1.5 px-3 align-top">{mosque.region}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Founders */}
      {mosque.founders && mosque.founders.length > 0 && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Fondateurs
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {mosque.founders.map((founder, idx) => (
                <tr key={idx} className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top">
                    <div className="font-medium">{founder.name}</div>
                    {founder.nationality && (
                      <div className="text-xs text-gray-500">{founder.nationality}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Previous Committee */}
      {mosque.previousCommittee && mosque.previousCommittee.length > 0 && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Anciens membres du comité
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {mosque.previousCommittee.map((member, idx) => (
                <tr key={idx} className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top">
                    <div className="font-medium">{member.name}</div>
                    {member.nationality && (
                      <div className="text-xs text-gray-500">{member.nationality}</div>
                    )}
                    {(member.from || member.to) && (
                      <div className="text-xs text-[#0645ad]">
                        {member.from && `De ${member.from}`}
                        {member.from && member.to && ' — '}
                        {member.to && `À ${member.to}`}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Current Committee */}
      {mosque.currentCommittee && mosque.currentCommittee.length > 0 && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Membres actuels du comité
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {mosque.currentCommittee.map((member, idx) => (
                <tr key={idx} className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top">
                    <div className="font-medium">{member.name}</div>
                    {member.nationality && (
                      <div className="text-xs text-gray-500">{member.nationality}</div>
                    )}
                    {member.from && (
                      <div className="text-xs text-[#0645ad]">Depuis {member.from}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Current Imam */}
      {mosque.currentImam && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Imam actuel
          </div>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-t border-[#a2a9b1]">
                <td className="py-1.5 px-3 align-top font-medium">{mosque.currentImam}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

      {/* Previous Imams */}
      {mosque.previousImams && mosque.previousImams.length > 0 && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Imams précédents
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {mosque.previousImams.map((imam, idx) => (
                <tr key={idx} className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top">
                    <div className="font-medium">{imam.name}</div>
                    {(imam.from || imam.to) && (
                      <div className="text-xs text-[#0645ad]">
                        {imam.from && `De ${imam.from}`}
                        {imam.from && imam.to && ' — '}
                        {imam.to && `À ${imam.to}`}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Facilities */}
      {mosque.facilities && mosque.facilities.length > 0 && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Équipements
          </div>
          <div className="p-2 flex flex-wrap gap-1">
            {mosque.facilities.map((facility, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-[#067782]/10 text-[#067782] rounded text-xs border border-[#067782]/20"
              >
                {facility}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Gallery */}
      {mosque.gallery && mosque.gallery.length > 0 && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Galerie
          </div>
          <div className="p-2 grid grid-cols-2 gap-1">
            {mosque.gallery.map((item, idx) => (
              <div key={idx}>
                <img
                  src={item.src}
                  alt={item.caption || `Image ${idx + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
                {item.caption && (
                  <p className="text-xs text-gray-500 text-center mt-0.5 truncate">{item.caption}</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {/* Contact */}
      {(mosque.contactPhone || mosque.contactEmail) && (
        <>
          <div className="bg-[#eaecf0] text-gray-800 font-semibold px-3 py-1.5 text-center">
            Contact
          </div>
          <table className="w-full border-collapse">
            <tbody>
              {mosque.contactPhone && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium" style={{ width: '45%' }}>Téléphone</td>
                  <td className="py-1.5 px-3 align-top">{mosque.contactPhone}</td>
                </tr>
              )}
              {mosque.contactEmail && (
                <tr className="border-t border-[#a2a9b1]">
                  <td className="py-1.5 px-3 align-top text-gray-700 font-medium">Email</td>
                  <td className="py-1.5 px-3 align-top">{mosque.contactEmail}</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
