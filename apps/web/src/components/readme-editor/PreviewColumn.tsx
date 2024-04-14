import { Tabs, TabsContent, TabsList, TabsTrigger } from '@camped-ui/tabs'
import { useTheme } from 'next-themes'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import '../../styles/markdown.css'
import RawPreview from './RawPreview'

export const PreviewColumn = ({ selectedSectionSlugs, getTemplate }) => {
  selectedSectionSlugs = Array.from(new Set(selectedSectionSlugs))
  const markdown = selectedSectionSlugs.reduce((acc, section) => {
    const template = getTemplate(section)
    if (template) {
      return `${acc}${template.markdown}`
    } else {
      return acc
    }
  }, ``)

  const { theme } = useTheme()

  return (
    <Tabs defaultValue='preview'>
      <TabsList className='grid w-48 grid-cols-2'>
        <TabsTrigger value='preview'>Preview</TabsTrigger>
        <TabsTrigger value='raw'>Raw</TabsTrigger>
      </TabsList>
      <TabsContent
        value='preview'
        className='p-4 overflow-scroll readme-editor-full preview [data-theme=light] markdown-body'
      >
        <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      </TabsContent>
      <TabsContent value='raw' className='overflow-scroll readme-editor-full'>
        <RawPreview text={markdown} />
      </TabsContent>
    </Tabs>
  )
}
