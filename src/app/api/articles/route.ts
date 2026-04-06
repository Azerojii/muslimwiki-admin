import { NextResponse } from 'next/server'
import { getAllArticles, createArticle } from '@/lib/wiki'

export async function GET() {
  try {
    const articles = await getAllArticles()
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, excerpt, article_type, infobox, mosque_data, imam_data, burial_data, image_url, categories, author_name, references } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const slug = title.trim().replace(/\s+/g, '_')

    const article = await createArticle({
      slug,
      title,
      content,
      excerpt: excerpt || '',
      article_type: article_type || 'article',
      infobox: infobox || null,
      mosque_data: mosque_data || null,
      imam_data: imam_data || null,
      burial_data: burial_data || null,
      references: references || null,
      image_url: image_url || null,
      categories: categories || [],
      author_name: author_name || null,
    })

    if (!article) {
      return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
    }

    return NextResponse.json({ success: true, slug: article.slug, article })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
