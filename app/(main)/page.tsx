import Contact from '@/components/sections/contact'
import Faq from '@/components/sections/faq'
import Hero from '@/components/sections/hero'
import Media from '@/components/sections/media'
import Testimonials from '@/components/sections/testimonials'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero/>
      <Media/>
      <Faq/>
      <Testimonials/>
      <Contact/>
    </div>
  )
}

export default page
