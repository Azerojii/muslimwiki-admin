import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getEditSuggestion, updateEditSuggestionStatus, updateArticle } from '@/lib/wiki'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const suggestion = await getEditSuggestion(id)

    if (!suggestion) {
      return NextResponse.json({ error: 'Suggestion not found' }, { status: 404 })
    }

    return NextResponse.json(suggestion)
  } catch (error) {
    console.error('Error fetching edit suggestion:', error)
    return NextResponse.json({ error: 'Failed to fetch edit suggestion' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const { status } = await request.json()

    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Valid status (approved/rejected) is required' }, { status: 400 })
    }

    const suggestion = await getEditSuggestion(id)
    if (!suggestion) {
      return NextResponse.json({ error: 'Suggestion not found' }, { status: 404 })
    }

    if (status === 'approved') {
      // Apply suggested content to the article
      await updateArticle(suggestion.article_slug, { content: suggestion.suggested_content })
    }

    const updated = await updateEditSuggestionStatus(id, status)
    return NextResponse.json({ success: true, suggestion: updated })
  } catch (error) {
    console.error('Error updating edit suggestion:', error)
    return NextResponse.json({ error: 'Failed to update edit suggestion' }, { status: 500 })
  }
}
