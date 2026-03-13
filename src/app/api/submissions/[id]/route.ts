import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSubmission, updateSubmissionStatus, updateSubmission, createArticle } from '@/lib/wiki'

// Get single submission
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
    const submission = await getSubmission(id)

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Error fetching submission:', error)
    return NextResponse.json({ error: 'Failed to fetch submission' }, { status: 500 })
  }
}

// Update submission (approve / reject / edit data)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, title, content, excerpt, article_type, infobox, mosque_data, image_url, categories, author_name } = body
    const { id } = await params

    const submission = await getSubmission(id)
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    if (action === 'approve') {
      if (!title || !content) {
        return NextResponse.json({ error: 'Title and content are required to approve' }, { status: 400 })
      }

      const slug = title.trim().replace(/\s+/g, '_')

      // Publish to wiki_articles
      const article = await createArticle({
        slug,
        title,
        content,
        excerpt: excerpt || submission.excerpt || '',
        article_type: article_type || submission.article_type || 'article',
        infobox: infobox || submission.infobox || null,
        mosque_data: mosque_data || submission.mosque_data || null,
        image_url: image_url || submission.image_url || null,
        categories: categories || submission.categories || [],
        author_name: author_name || submission.author_name || null,
      })

      // Mark submission as approved
      await updateSubmissionStatus(id, 'approved')

      return NextResponse.json({
        success: true,
        slug: article?.slug || slug,
        message: 'Article approuvé et publié',
      })
    } else if (action === 'reject') {
      await updateSubmissionStatus(id, 'rejected')
      return NextResponse.json({ success: true, message: 'Soumission rejetée' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error processing submission:', error)
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 })
  }
}

// Patch submission status or data
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
    const body = await request.json()

    // If only status is provided, use updateSubmissionStatus
    if (body.status && Object.keys(body).length === 1) {
      const submission = await updateSubmissionStatus(id, body.status)
      if (!submission) {
        return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, submission })
    }

    // Otherwise update full data
    const submission = await updateSubmission(id, body)
    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
  }
}
