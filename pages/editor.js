import Head from 'next/head'
import { useEffect, useState } from 'react'
import EditPreviewContainer from '../components/EditPreviewContainer'
import { Nav } from '../components/Nav'
import { SectionsColumn } from '../components/SectionsColumn'
import useLocalStorage from '../hooks/useLocalStorage'
import useDarkMode from '../hooks/useDarkMode'
import { sectionTemplates } from '../data/sectionTemplates'

export default function Editor() {
  const [selectedSectionSlugs, setSelectedSectionSlugs] = useState([])
  const [sectionSlugs, setSectionSlugs] = useState(sectionTemplates.map((t) => t.slug))
  const [focusedSectionSlug, setFocusedSectionSlug] = useState(null)
  const [templates, setTemplates] = useState(sectionTemplates)
  const [showDrawer, toggleDrawer] = useState(false)
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
      currentSlugList.indexOf('title-and-description') == -1 &&
      selectedSectionSlugs.indexOf('title-and-description') > -1
    ) {
      selectedSectionSlugs.splice(selectedSectionSlugs.indexOf('title-and-description'), 1)
    }
    setFocusedSectionSlug(localStorage.getItem('current-slug-list').split(',')[0])
    localStorage.setItem('current-slug-list', selectedSectionSlugs)
  }, [selectedSectionSlugs])

  const drawerClass = showDrawer ? '' : '-translate-x-full md:transform-none'

  return (
    <div className="w-full h-full">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Mali&display=swap" rel="stylesheet" />
      </Head>

      <Nav
        selectedSectionSlugs={selectedSectionSlugs}
        getTemplate={getTemplate}
        onMenuClick={() => toggleDrawer(!showDrawer)}
        isDrawerOpen={showDrawer}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        focusedSectionSlug={focusedSectionSlug}
      />
      <div className="flex md:px-6 md:pt-6 ">
        <div
          className={`flex flex-0 drawer-height absolute md:static p-6 md:p-0 bg-white dark:bg-gray-800 md:bg-transparent shadow md:shadow-none z-10 md:z-0
        transform  transition-transform duration-500 ease-in-out ${drawerClass}`}
        >
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
        </div>

        <EditPreviewContainer
          templates={templates}
          setTemplates={setTemplates}
          getTemplate={getTemplate}
          focusedSectionSlug={focusedSectionSlug}
          setFocusedSectionSlug={setFocusedSectionSlug}
          selectedSectionSlugs={selectedSectionSlugs}
          setSelectedSectionSlugs={setSelectedSectionSlugs}
          darkMode={darkMode}
        />
      </div>
    </div>
  )
}
