'use client'

import { useEffect, useState } from 'react'

import EditPreviewContainer from '@/components/readme-editor/EditPreviewContainer'
import { SectionsColumn } from '@/components/readme-editor/SectionsColumn'

import { sectionTemplates } from '@/constants/readme-section'

import useDarkMode from '@/hooks/useDarkMode'
import useLocalStorage from '@/hooks/useLocalStorage'

export default function Editor(props) {
  const [selectedSectionSlugs, setSelectedSectionSlugs] = useState([])
  const [sectionSlugs, setSectionSlugs] = useState(
    sectionTemplates.map((t) => t.slug),
  )
  const [focusedSectionSlug, setFocusedSectionSlug] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [templates, setTemplates] = useState(sectionTemplates)
  const { backup } = useLocalStorage()
  const [darkMode, setDarkMode] = useDarkMode()

  useEffect(() => {
    if (backup) {
      setTemplates(backup)
    }
  }, [backup])

  const getTemplate = (slug) => {
    return templates.find((t) => t.slug === slug)
  }

  useEffect(() => {
    setFocusedSectionSlug(null)
  }, [])

  useEffect(() => {
    let currentSlugList = localStorage.getItem('current-slug-list')
    if (
      currentSlugList &&
      currentSlugList.indexOf('title-and-description') === -1 &&
      (selectedSectionSlugs as any).indexOf('title-and-description') > -1
    ) {
      // Remove 'title-and-description' from selectedSectionSlugs if it's in the list
      setSelectedSectionSlugs((prevSlugs) =>
        prevSlugs.filter((slug) => slug !== 'title-and-description'),
      )
    }

    setFocusedSectionSlug((prev) => {
      // Update focused section slug if it's 'title-and-description'
      return prev === 'title-and-description' ? selectedSectionSlugs[0] : prev
    })

    // Convert selectedSectionSlugs to a string before saving to localStorage
    const selectedSlugsString = selectedSectionSlugs.join(',')
    localStorage.setItem('current-slug-list', selectedSlugsString)
  }, [selectedSectionSlugs])

  return (
    <div className='w-full h-full overflow-hidden flex gap-3 pt-2'>
      <SectionsColumn
        selectedSectionSlugs={selectedSectionSlugs}
        setSelectedSectionSlugs={setSelectedSectionSlugs}
        sectionSlugs={sectionSlugs}
        setSectionSlugs={setSectionSlugs}
        setFocusedSectionSlug={setFocusedSectionSlug}
        focusedSectionSlug={focusedSectionSlug}
        templates={templates}
        originalTemplate={sectionTemplates}
        setTemplates={setTemplates}
        getTemplate={getTemplate}
        darkMode={darkMode}
      />

      <EditPreviewContainer
        templates={templates}
        setTemplates={setTemplates}
        getTemplate={getTemplate}
        focusedSectionSlug={focusedSectionSlug}
        selectedSectionSlugs={selectedSectionSlugs}
      />
    </div>
  )
}
