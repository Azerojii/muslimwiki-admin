import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { DEFAULT_FOOTER, normalizeFooterSettings } from '@/lib/footer'

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key') || 'footer'

  try {
    const supabase = getSupabase()
    const { data } = await supabase
      .from('wiki_settings')
      .select('value')
      .eq('key', key)
      .single()

    const value = key === 'footer' ? normalizeFooterSettings(data?.value) : (data?.value ?? null)
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
    const normalizedValue = key === 'footer' ? normalizeFooterSettings(value) : value
    const { error } = await supabase
      .from('wiki_settings')
      .upsert({ key, value: normalizedValue, updated_at: new Date().toISOString() }, { onConflict: 'key' })

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error saving settings:', err)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
