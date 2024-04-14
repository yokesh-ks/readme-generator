import { Card, CardDescription, CardHeader, CardTitle } from '@camped-ui/card'
import Head from 'next/head'
import React from 'react'

const templates = [
  {
    title: 'Basic Project',
    description:
      'Create a foundational readme with essential sections for project description, installation, usage, contributing, and license details.',
  },
  {
    title: 'Web Application',
    description:
      'Comprehensively document web applications with sections covering project overview, features, technologies used, installation, usage examples, deployment, and contact information.',
  },
  {
    title: 'Library/Package',
    description:
      'Ideal for libraries or packages, includes sections for project description, installation, usage guide, API reference, examples, contributing guidelines, version history, and licensing details.',
  },
  {
    title: 'Command-Line Tool',
    description:
      'Effectively document command-line tools with sections for project description, installation, usage guide with examples, options/flags reference, contributing guidelines, and licensing information.',
  },
  {
    title: 'Framework',
    description:
      'Capture software frameworks comprehensively with sections covering project overview, core concepts, getting started guide, configuration options, usage examples, advanced features, contributing guidelines, and licensing details.',
  },
  {
    title: 'Documentation-Driven Development',
    description:
      'Suited for documentation-driven projects, includes sections for project introduction, requirements, use cases, design overview, API reference, examples/tutorials, testing/QA, contributing guidelines, and licensing details.',
  },
  {
    title: 'Open Source Project',
    description:
      'Perfect for open-source projects, includes sections for project overview, contribution guidelines (including code of conduct and pull request process), code structure, installation/usage, CI/CD setup, roadmap, future plans, and licensing information.',
  },
  {
    title: 'Game Development',
    description:
      'Tailored for game development projects, includes sections for game overview, installation/setup, gameplay mechanics, controls, screenshots/videos, troubleshooting, credits/acknowledgments, and licensing details.',
  },
]

function Home() {
  return (
    <div>
      <Head>
        <title>Templates - Readme</title>
        <meta name='description' content='Tools' />
      </Head>
      <div className='grid grid-cols-3 mt-4 gap-4'>
        {templates.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item?.title}</CardTitle>
              <CardDescription>{item?.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Home
