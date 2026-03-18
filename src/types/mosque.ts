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
  department?: string
  commune?: string
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
  department?: string
  commune?: string
  currentMosque?: string
  previousMosques?: { name: string; from?: string; to?: string }[]
  customFields?: { label: string; value: string }[]
}

export interface BurialData {
  name?: string
  headerColor?: string
  image?: { src: string; caption: string }
  graveImage?: { src: string; caption: string }
  fullName?: string
  fatherName?: string
  motherName?: string
  nationality?: string
  countryOfOrigin?: string
  birthDate?: string
  deathDate?: string
  region?: string
  department?: string
  commune?: string
  cemeteryName?: string
  division?: string
  graveNumber?: string
  concessionType?: '15' | '30' | '50' | 'perpetuelle'
  contactAddress?: string
  tribute?: string
  burialStatus?: 'enterre' | 'inconnu'
  convertedToIslam?: string
  additionalInfo?: string
}
