import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

const DEFAULT_FOOTER = {
  socialLinks: [
    { label: 'Facebook', url: 'https://www.facebook.com/GrandeMosqueeDeParis', type: 'facebook' },
    { label: 'Instagram', url: 'https://www.instagram.com/grandemosqueedeparis', type: 'instagram' },
    { label: 'YouTube', url: 'https://www.youtube.com/@GrandeMosqueedeParis', type: 'youtube' },
  ],
  friendlySites: [
    { label: 'Site officiel — Grande Mosquée de Paris', url: 'https://www.grande-mosquee-de-paris.org' },
  ],
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key') || 'footer'
  try {
    const supabase = getSupabase()
    const { data } = await supabase
      .from('wiki_settings')
      .select('value')
      .eq('key', key)
      .single()
    const value = data?.value ?? (key === 'footer' ? DEFAULT_FOOTER : null)
    return NextResponse.json({ key, value })
  } catch {
    return NextResponse.json({ key, value: key === 'footer' ? DEFAULT_FOOTER : null })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json()
    if (!key || value === undefined) {
      return NextResponse.json({ error: 'key and value are required' }, { status: 400 })
    }
    const supabase = getSupabase()
    const { error } = await supabase
      .from('wiki_settings')
      .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error saving settings:', err)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
