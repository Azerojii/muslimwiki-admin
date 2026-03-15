import { NextResponse } from 'next/server'
import { getEditSuggestions, createEditSuggestion } from '@/lib/wiki'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined
    const suggestions = await getEditSuggestions(status)
    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error fetching edit suggestions:', error)
    return NextResponse.json({ error: 'Failed to fetch edit suggestions' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { article_slug, article_title, suggested_content, reason, suggester_name } = body

    if (!article_slug || !article_title || !suggested_content) {
      return NextResponse.json(
        { error: 'article_slug, article_title, and suggested_content are required' },
        { status: 400 }
      )
    }

    const suggestion = await createEditSuggestion({
      article_slug,
      article_title,
      suggested_content,
      reason: reason || undefined,
      suggester_name: suggester_name || undefined,
    })

    if (!suggestion) {
      return NextResponse.json({ error: 'Failed to create edit suggestion' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: suggestion.id, suggestion })
  } catch (error) {
    console.error('Error creating edit suggestion:', error)
    return NextResponse.json({ error: 'Failed to create edit suggestion' }, { status: 500 })
  }
}
