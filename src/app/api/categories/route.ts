import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAllCategories, createCategory, deleteCategory } from '@/lib/wiki'

// Get all categories
export async function GET() {
  try {
    const categoriesRaw = await getAllCategories()
    // Return as array of name strings for compatibility
    const categories = categoriesRaw.map((c) => c.name)
    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

// Add or remove categories (admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, category } = await request.json()

    if (!action || !category) {
      return NextResponse.json(
        { error: 'Action and category are required' },
        { status: 400 }
      )
    }

    if (action === 'add') {
      const created = await createCategory(category)
      if (!created) {
        return NextResponse.json({ error: 'Category already exists or failed to create' }, { status: 400 })
      }
      const categoriesRaw = await getAllCategories()
      const categories = categoriesRaw.map((c) => c.name)
      return NextResponse.json({ success: true, categories })
    } else if (action === 'remove') {
      await deleteCategory(category)
      const categoriesRaw = await getAllCategories()
      const categories = categoriesRaw.map((c) => c.name)
      return NextResponse.json({ success: true, categories })
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "add" or "remove"' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error managing categories:', error)
    return NextResponse.json({ error: 'Failed to manage categories' }, { status: 500 })
  }
}
