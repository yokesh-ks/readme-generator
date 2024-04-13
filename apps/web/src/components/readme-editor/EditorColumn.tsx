import Editor from '@monaco-editor/react'
import { useEffect, useState } from 'react'

import useLocalStorage from '@/hooks/useLocalStorage'

export const EditorColumn = ({
  focusedSectionSlug,
  templates,
  setTemplates,
  theme,
}) => {
  const getMarkdown = () => {
    const section = templates.find((s) => s.slug === focusedSectionSlug)
    return section ? section.markdown : ''
  }

  const [markdown, setMarkdown] = useState(getMarkdown())
  const { saveBackup } = useLocalStorage()

  useEffect(() => {
    const markdown = getMarkdown()
    setMarkdown(markdown)
  }, [focusedSectionSlug, templates])

  const onEdit = (val) => {
    setMarkdown(val)
    const newTemplates = templates.map((template) => {
      if (template.slug === focusedSectionSlug) {
        return { ...template, markdown: val }
      }
      return template
    })
    setTemplates(newTemplates)
    saveBackup(newTemplates)
  }

  if (focusedSectionSlug == 'noEdit') {
    return (
      <p className='font-sm text-primary max-w-[28rem] text-center mx-auto mt-10'>
        Select a section from the left sidebar to edit the contents
      </p>
    )
  }

  const options = {
    minimap: { enabled: false },
    lineNumbers: false,
    wordWrap: true,
  }

  return (
    <Editor
      width={`100%`}
      language={'markdown'}
      value={markdown}
      theme={theme}
      defaultValue=''
      onChange={onEdit}
      keepCurrentModel={false}
      loading={'Loading...'}
      className='overflow-hidden pt-3'
      aria-label='Markdown Editor'
      options={options}
    />
  )
}
