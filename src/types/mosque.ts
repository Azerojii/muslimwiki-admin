export interface MosqueFounder {
  name: string
  nationality?: string
}

export interface MosqueImam {
  name: string
  from?: string
  to?: string
}

export interface CommitteeMember {
  name: string
  nationality?: string
  from?: string
  to?: string
}

export interface MosqueData {
  name?: string
  headerColor?: string
  image?: { src: string; caption: string }
  localisation?: string
  constructionDate?: string
  inaugurationDate?: string
  capacity?: number
  prayerHallArea?: number
  totalArea?: number
  minaretHeight?: number
  architect?: string
  founders?: MosqueFounder[]
  previousCommittee?: CommitteeMember[]
  currentCommittee?: CommitteeMember[]
  facilities?: string[]
  gallery?: { src: string; caption: string }[]
  region?: string
  currentImam?: string
  previousImams?: MosqueImam[]
}

export interface ImamData {
  name?: string
  headerColor?: string
  image?: { src: string; caption: string }
  birthDate?: string
  deathDate?: string
  isAlive?: boolean
  rank?: string
  nationality?: string
  region?: string
  currentMosque?: string
  previousMosques?: { name: string; from?: string; to?: string }[]
  customFields?: { label: string; value: string }[]
}
