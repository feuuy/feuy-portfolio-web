import React from 'react'

import { findPublishedProjects } from '@/lib/project-repository'
import HeroSection from './_sections/hero-section'
import WorkSection from './_sections/work-section'
import AboutSection from './_sections/about-section'
import ContactSection from './_sections/contact-section'

export default async function HomePage() {
  const publishedProjects = await findPublishedProjects()

  const contactEmail = process.env.CONTACT_EMAIL ?? ''

  return (
    <main className="w-full" id="main-content">
      <HeroSection />
      <WorkSection projects={publishedProjects} />
      <AboutSection />
      <ContactSection email={contactEmail} />
    </main>
  )
}
