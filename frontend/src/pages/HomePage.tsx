import { Helmet } from 'react-helmet-async'
import { HeroSection } from '@components/sections/HeroSection'
import { ClientsSection } from '@components/sections/ClientsSection'
import { ServicesSection } from '@components/sections/ServicesSection'
import { CaseStudiesSection } from '@components/sections/CaseStudiesSection'
import { ProcessSection } from '@components/sections/ProcessSection'
import { TestimonialsSection } from '@components/sections/TestimonialsSection'
import { BlogSection } from '@components/sections/BlogSection'
import { CTASection } from '@components/sections/CTASection'

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>AdsVora - Premium Digital Marketing Agency</title>
        <meta name="description" content="Transform your business with our data-driven digital marketing strategies and innovative solutions." />
        <meta name="keywords" content="digital marketing, SEO, social media, branding" />
        <meta property="og:title" content="AdsVora - Premium Digital Marketing Agency" />
        <meta property="og:description" content="Transform your business with our data-driven digital marketing strategies." />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </>
  )
}
