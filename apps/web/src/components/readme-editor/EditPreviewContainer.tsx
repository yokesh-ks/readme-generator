import { Card } from '@camped-ui/card'
import { Tabs, TabsList, TabsTrigger } from '@camped-ui/tabs'
import { useTheme } from 'next-themes'

import { EditorColumn } from './EditorColumn'
import { PreviewColumn } from './PreviewColumn'

const EditPreviewContainer = ({
  templates,
  setTemplates,
  getTemplate,
  focusedSectionSlug,
  selectedSectionSlugs,
}) => {
  const { theme } = useTheme()
  return (
    <div className='grid grid-cols-2 gap-3 flex-1'>
      <div className='w-full h-full'>
        <Tabs defaultValue='editor'>
          <TabsList className='w-24'>
            <TabsTrigger className='w-full' value='editor'>
              Editor
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className='mt-2.5 h-full readme-editor-full'>
          <EditorColumn
            focusedSectionSlug={focusedSectionSlug}
            templates={templates}
            setTemplates={setTemplates}
            theme={'vs-light'}
          />
        </Card>
      </div>

      <PreviewColumn
        selectedSectionSlugs={selectedSectionSlugs}
        getTemplate={getTemplate}
      />
    </div>
  )
}

export default EditPreviewContainer
