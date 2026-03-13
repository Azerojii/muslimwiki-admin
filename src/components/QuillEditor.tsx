'use client'

import { useEffect, useRef } from 'react'
import 'quill/dist/quill.snow.css'

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const modules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    [{ align: [] }],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list',
  'blockquote', 'code-block',
  'link', 'image',
  'align',
]

export default function QuillEditor({ value, onChange, placeholder }: QuillEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<InstanceType<typeof import('quill').default> | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return

    // Quill must be imported dynamically (client-only)
    import('quill').then(({ default: Quill }) => {
      if (!containerRef.current || quillRef.current) return

      const quill = new Quill(containerRef.current, {
        theme: 'snow',
        placeholder: placeholder || 'Commencez à écrire votre article ici...',
        modules,
        formats,
      })

      quillRef.current = quill

      // Set initial value
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value)
      }

      quill.on('text-change', () => {
        onChangeRef.current(quill.root.innerHTML)
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync external value changes (e.g. reset)
  useEffect(() => {
    const quill = quillRef.current
    if (!quill) return
    if (quill.root.innerHTML !== value) {
      quill.clipboard.dangerouslyPasteHTML(value || '')
    }
  }, [value])

  return (
    <div className="quill-wrapper">
      <div ref={containerRef} style={{ minHeight: '400px' }} />
      <style jsx global>{`
        .quill-wrapper .ql-container {
          font-size: 16px;
          font-family: Georgia, 'Times New Roman', serif;
          min-height: 400px;
        }
        .quill-wrapper .ql-editor {
          min-height: 400px;
          line-height: 1.7;
        }
        .quill-wrapper .ql-toolbar {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          border-color: #d1d5db;
          background: #f9fafb;
        }
        .quill-wrapper .ql-container {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-color: #d1d5db;
        }
        .quill-wrapper .ql-editor h2 {
          font-size: 1.5rem;
          font-weight: bold;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.25rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .quill-wrapper .ql-editor h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .quill-wrapper .ql-editor blockquote {
          border-left: 4px solid #d1d5db;
          padding-left: 1rem;
          font-style: italic;
          color: #4b5563;
        }
      `}</style>
    </div>
  )
}
