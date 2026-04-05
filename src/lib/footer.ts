export interface FooterLink {
  label: string
  url: string
  type?: string
}

export interface FooterContactItem {
  label: string
  value: string
  url?: string
}

export interface FooterInfoSection {
  title: string
  items: FooterContactItem[]
}

export interface FooterSettings {
  title: string
  description: string
  socialLinks: FooterLink[]
  friendlySites: FooterLink[]
  contactItems: FooterContactItem[]
  infoSections: FooterInfoSection[]
  legalText: string
}

export const DEFAULT_FOOTER: FooterSettings = {
  title: 'Musulmans Francais',
  description: "L'encyclopedie libre sur la Grande Mosquee de Paris.",
  socialLinks: [
    { label: 'Facebook', url: 'https://www.facebook.com/GrandeMosqueeDeParis', type: 'facebook' },
    { label: 'Instagram', url: 'https://www.instagram.com/grandemosqueedeparis', type: 'instagram' },
    { label: 'YouTube', url: 'https://www.youtube.com/@GrandeMosqueedeParis', type: 'youtube' },
  ],
  friendlySites: [
    { label: 'Site officiel - Grande Mosquee de Paris', url: 'https://www.grande-mosquee-de-paris.org' },
  ],
  contactItems: [
    { label: 'Adresse', value: '2bis Place du Puits de l Ermite, 75005 Paris' },
    { label: 'Telephone', value: '+33 1 45 35 97 33', url: 'tel:+33145359733' },
  ],
  infoSections: [],
  legalText: 'Musulmans Francais - Encyclopedie libre sur la Grande Mosquee de Paris',
}

export function normalizeFooterSettings(value: unknown): FooterSettings {
  const raw = value as Partial<FooterSettings> | null | undefined

  return {
    title: raw?.title || DEFAULT_FOOTER.title,
    description: raw?.description || DEFAULT_FOOTER.description,
    socialLinks: Array.isArray(raw?.socialLinks) ? raw.socialLinks.filter(Boolean) : DEFAULT_FOOTER.socialLinks,
    friendlySites: Array.isArray(raw?.friendlySites) ? raw.friendlySites.filter(Boolean) : DEFAULT_FOOTER.friendlySites,
    contactItems: Array.isArray(raw?.contactItems) ? raw.contactItems.filter(Boolean) : DEFAULT_FOOTER.contactItems,
    infoSections: Array.isArray(raw?.infoSections) ? raw.infoSections.filter(Boolean) : DEFAULT_FOOTER.infoSections,
    legalText: raw?.legalText || DEFAULT_FOOTER.legalText,
  }
}
