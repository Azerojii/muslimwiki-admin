import { NextResponse } from 'next/server'
import { getSubmissions, createSubmission } from '@/lib/wiki'

// Get all submissions (optionally filtered by status)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined

    const submissions = await getSubmissions(status)
    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}

// Create a new submission
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, excerpt, article_type, infobox, mosque_data, image_url, categories, author_name } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const submission = await createSubmission({
      slug: title.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, ''),
      title,
      content,
      excerpt: excerpt || '',
      article_type: article_type || 'article',
      infobox: infobox || null,
      mosque_data: mosque_data || null,
      image_url: image_url || null,
      categories: categories || [],
      author_name: author_name || null,
    })

    if (!submission) {
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      id: submission.id,
      message: 'Soumission enregistrée avec succès',
    })
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: `Failed to create submission: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
