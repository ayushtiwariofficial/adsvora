import { Helmet } from 'react-helmet-async'
import { Section } from '@components/common/Section'

export const CaseStudiesPage = () => {
  const caseStudies = [
    {
      id: 1,
      title: 'E-Commerce Platform Growth',
      category: 'SEO & SEM',
      description: 'Helped an e-commerce platform achieve 500% organic traffic growth and 300% revenue increase.',
      results: ['500% organic growth', '300% revenue increase', '50+ keywords on page 1'],
    },
    {
      id: 2,
      title: 'Social Media Expansion',
      category: 'Social Media',
      description: 'Built a social media presence from scratch for a fashion brand, reaching 2M+ followers.',
      results: ['2M+ followers', '50M+ impressions monthly', '10x engagement rate'],
    },
    {
      id: 3,
      title: 'Brand Repositioning',
      category: 'Brand Strategy',
      description: 'Successfully repositioned a traditional brand as a modern, tech-forward company.',
      results: ['40% increase in leads', 'New market segment acquisition', 'Industry recognition'],
    },
  ]

  return (
    <>
      <Helmet>
        <title>Case Studies - AdsVora</title>
        <meta name="description" content="Real results from real clients. Explore our case studies." />
      </Helmet>

      <Section title="Case Studies" subtitle="Proven results across diverse industries">
        <div className="space-y-8">
          {caseStudies.map((study, idx) => (
            <div
              key={study.id}
              className="border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <span className="text-primary-500 font-semibold text-sm">{study.category}</span>
                  <h3 className="text-2xl font-bold my-2">{study.title}</h3>
                  <p className="text-gray-600">{study.description}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-3">Key Results</h4>
                  <ul className="space-y-2">
                    {study.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-gray-600">
                        ✓ {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
