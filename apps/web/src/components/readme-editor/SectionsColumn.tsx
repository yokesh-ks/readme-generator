import { Card } from '@camped-ui/card'
import { Input } from '@camped-ui/input'
import { Tabs, TabsList, TabsTrigger } from '@camped-ui/tabs'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { Icon } from '@readme/icon'
import { useEffect, useState } from 'react'

import useLocalStorage from '@/hooks/useLocalStorage'

import CustomSection from './CustomSection'
import { SortableItem } from './SortableItem'

const kebabCaseToTitleCase = (str) => {
  return str
    .split('-')
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

export const SectionsColumn = ({
  selectedSectionSlugs,
  setSelectedSectionSlugs,
  sectionSlugs,
  setSectionSlugs,
  setFocusedSectionSlug,
  focusedSectionSlug,
  templates,
  originalTemplate,
  setTemplates,
  getTemplate,
  darkMode,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const [pageRefreshed, setpageRefreshed] = useState(false)
  const [addAction, setAddAction] = useState(false)
  const [currentSlugList, setCurrentSlugList] = useState<string[]>([])
  const [slugsFromPreviousSession, setSlugsFromPreviousSession] = useState<
    string[]
  >([])
  const [searchFilter, setSearchFilter] = useState('')
  const [filteredSlugs, setFilteredSlugs] = useState([])
  const { saveBackup, deleteBackup } = useLocalStorage()

  useEffect(() => {
    const savedSlugList = localStorage.getItem('current-slug-list')
    const initialSlug =
      savedSlugList !== null ? savedSlugList : 'title-and-description'
    setSlugsFromPreviousSession([initialSlug])

    if (initialSlug.length > 0) {
      setpageRefreshed(true)

      const slugList =
        initialSlug.indexOf(',') > -1 ? initialSlug.split(',') : [initialSlug]

      slugList.forEach((entry) => {
        setSectionSlugs((prev) => prev.filter((s) => s !== entry))
      })

      setCurrentSlugList(slugList)
      setSelectedSectionSlugs(slugList)
      setFocusedSectionSlug(slugList[0])
      localStorage.setItem('current-focused-slug', slugList[0])
    }
  }, [])

  const updateSlugsOnAdd = (previousState, section) => {
    return previousState.filter((slug) => slug !== section)
  }

  const onAddSection = (e, section) => {
    localStorage.setItem('current-focused-slug', section)
    setpageRefreshed(false)
    setAddAction(true)
    setSectionSlugs((prev) => updateSlugsOnAdd(prev, section))
    setFilteredSlugs((prev) => updateSlugsOnAdd(prev, section))
    setSelectedSectionSlugs((prev) => [...prev, section])
    setFocusedSectionSlug(localStorage.getItem('current-focused-slug'))
    resetSearchFilter()
  }

  useEffect(() => {
    localStorage.setItem('current-slug-list', selectedSectionSlugs)
  }, [selectedSectionSlugs])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setSelectedSectionSlugs((sections) => {
        const oldIndex = sections.findIndex((s) => s === active.id)
        const newIndex = sections.findIndex((s) => s === over.id)

        return arrayMove(sections, oldIndex, newIndex)
      })
    }
  }

  const onDeleteSection = (e, sectionSlug) => {
    e.stopPropagation()
    setSelectedSectionSlugs((prev) => prev.filter((s) => s !== sectionSlug))
    setSectionSlugs((prev) => [...prev, sectionSlug])
    setFocusedSectionSlug(null)
    localStorage.setItem('current-focused-slug', 'noEdit')
  }

  const onResetSection = (e, sectionSlug) => {
    e.stopPropagation()

    let originalSection

    if (sectionSlug.slice(0, 6) === 'custom') {
      const sectionTitle = kebabCaseToTitleCase(
        sectionSlug.slice(6, sectionSlug.length),
      )
      originalSection = {
        slug: sectionSlug,
        name: sectionTitle,
        markdown: `
## ${sectionTitle}`,
      }
    } else {
      originalSection = originalTemplate.find((s) => s.slug === sectionSlug)
    }

    const newTemplates = templates.map((s) => {
      if (s.slug === originalSection.slug) {
        return originalSection
      }

      return s
    })
    setTemplates(newTemplates)
    saveBackup(newTemplates)
  }

  const resetSelectedSections = () => {
    const data = localStorage.getItem('current-slug-list')

    const sectionResetConfirmed = window.confirm(
      'All sections of your readme will be removed; to continue, click OK',
    )
    if (sectionResetConfirmed === true) {
      const slugList = data ? data.split(',') : []

      setSectionSlugs((prev) =>
        [...prev, ...slugList].filter((s) => s !== 'title-and-description'),
      )
      setSelectedSectionSlugs(['title-and-description'])
      setFocusedSectionSlug('title-and-description')
      localStorage.setItem('current-focused-slug', 'noEdit')
      setTemplates(originalTemplate)
      deleteBackup()
    }
  }

  useEffect(() => {
    setFocusedSectionSlug(localStorage.getItem('current-focused-slug'))
  }, [focusedSectionSlug])

  let alphabetizedSectionSlugs = sectionSlugs.sort()

  const getAutoCompleteResults = (searchQuery) => {
    const suggestedSlugs = sectionSlugs.filter((slug) => {
      return getTemplate(slug)
        .name.toLowerCase()
        .includes(searchQuery.toLowerCase())
    })

    return suggestedSlugs.length ? suggestedSlugs : [undefined]
  }

  const resetSearchFilter = () => setSearchFilter('')

  useEffect(() => {
    if (!searchFilter) {
      setFilteredSlugs([])
      return
    }

    const suggestedSlugs = getAutoCompleteResults(searchFilter.trim())

    setFilteredSlugs(suggestedSlugs)
  }, [searchFilter])

  return (
    <div className='w-72 h-full'>
      <Tabs
        defaultValue='sections'
        className='flex items-center justify-between'
      >
        <TabsList className='w-24'>
          <TabsTrigger value='sections' className='w-full'>
            Sections
          </TabsTrigger>
        </TabsList>
        <button
          className='focus:outline-none float-right flex items-center text-primary'
          type='button'
          onClick={resetSelectedSections}
        >
          <Icon name='RotateCcw' className='h-4 w-4' />
          <span className='pl-2'>Reset</span>
        </button>
      </Tabs>
      <div className='px-1 readme-editor-full mt-2.5 overflow-scroll '>
        {selectedSectionSlugs.length > 0 && (
          <h4 className='text-xs leading-6 '>
            Click on a section below to edit the contents
          </h4>
        )}
        <ul className='mb-12 space-y-3'>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={selectedSectionSlugs}>
              {
                (pageRefreshed || addAction
                  ? (selectedSectionSlugs = Array.from(
                      new Set(selectedSectionSlugs),
                    ))
                  : ' ',
                selectedSectionSlugs.map((s) => {
                  const template = getTemplate(s)
                  if (template) {
                    return (
                      <SortableItem
                        key={s}
                        id={s}
                        section={template}
                        focusedSectionSlug={focusedSectionSlug}
                        setFocusedSectionSlug={setFocusedSectionSlug}
                        onDeleteSection={onDeleteSection}
                        onResetSection={onResetSection}
                      />
                    )
                  }
                }))
              }
            </SortableContext>
          </DndContext>
        </ul>

        {sectionSlugs.length > 0 && (
          <h4 className='mb-3 text-xs leading-6 text-gray-900 dark:text-gray-300 overflow-ellipsis'>
            Click on a section below to add it to your readme
          </h4>
        )}
        <Input
          type='text'
          placeholder='Search for a section'
          data-testid='slugs-filter'
          value={searchFilter}
          className='mb-3'
          onChange={(e) => setSearchFilter(e.target.value)}
        />

        <CustomSection
          setSelectedSectionSlugs={setSelectedSectionSlugs}
          setFocusedSectionSlug={setFocusedSectionSlug}
          setpageRefreshed={setpageRefreshed}
          setAddAction={setAddAction}
          setTemplates={setTemplates}
        />
        <ul className='mb-12 space-y-3'>
          {
            (pageRefreshed &&
            slugsFromPreviousSession.indexOf('title-and-description') == -1
              ? sectionSlugs.push('title-and-description')
              : ' ',
            (alphabetizedSectionSlugs = !filteredSlugs.length
              ? sectionSlugs.sort()
              : filteredSlugs.sort()),
            pageRefreshed || addAction
              ? (alphabetizedSectionSlugs = Array.from(
                  new Set(alphabetizedSectionSlugs),
                ))
              : ' ',
            alphabetizedSectionSlugs.map((s) => {
              if (s === undefined) {
                return (
                  <h4
                    className='mb-3 text-xs leading-6'
                    key='unavailable-section'
                  >
                    The section you&apos;re looking for is unavailable
                  </h4>
                )
              } else {
                const template = getTemplate(s)
                if (template) {
                  return (
                    <li key={s}>
                      <Card
                        className='w-full h-full py-2 pl-3 pr-6 cursor-pointer'
                        onClick={(e) => onAddSection(e, s)}
                      >
                        <span>{template.name}</span>
                      </Card>
                    </li>
                  )
                }
              }
            }))
          }
        </ul>
      </div>
    </div>
  )
}
