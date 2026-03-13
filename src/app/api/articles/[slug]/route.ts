import { NextResponse } from 'next/server'
import { getArticle, updateArticle, deleteArticle } from '@/lib/wiki'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const article = await getArticle(slug)

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const body = await request.json()
    const { title, content, excerpt, article_type, infobox, mosque_data, image_url, categories, author_name } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const article = await updateArticle(decodedSlug, {
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

    if (!article) {
      return NextResponse.json({ error: 'Article not found or failed to update' }, { status: 404 })
    }

    return NextResponse.json({ success: true, slug: article.slug, article })
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const success = await deleteArticle(decodedSlug)

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
