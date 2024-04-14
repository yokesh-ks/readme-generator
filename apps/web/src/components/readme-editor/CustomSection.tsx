import { Button } from '@camped-ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@camped-ui/dialog'
import { Input } from '@camped-ui/input'
import { Icon } from '@readme/icon'
import { useRef, useState } from 'react'

import useLocalStorage from '@/hooks/useLocalStorage'

const CustomSection = ({
  setTemplates,
  setSelectedSectionSlugs,
  setFocusedSectionSlug,
  setpageRefreshed,
  setAddAction,
}) => {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const { saveBackup } = useLocalStorage()

  const inputRef = useRef(null)

  const addCustomSection = () => {
    setShowModal(false)

    const section = {
      slug: 'custom-' + title.toLowerCase().replace(/\s/g, '-'),
      name: title,
      markdown: `
## ${title}`,
    }

    localStorage.setItem('current-focused-slug', section.slug)
    setTemplates((prev) => {
      const newTemplates = [...prev, section]
      saveBackup(newTemplates)
      return newTemplates
    })
    setpageRefreshed(false)
    setAddAction(true)
    setSelectedSectionSlugs((prev) => [...prev, section.slug])
    setFocusedSectionSlug(localStorage.getItem('current-focused-slug'))
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => setShowModal(true)} className='mb-3 w-full'>
            <Icon name='Plus' className='w-4 h-4 mr-2' />
            Custom Section
          </Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle> New Custom Section</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Input
              id='title'
              defaultValue=''
              placeholder='Section Title'
              ref={inputRef}
              type='text'
              name='title'
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button type='submit' onClick={addCustomSection}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CustomSection
