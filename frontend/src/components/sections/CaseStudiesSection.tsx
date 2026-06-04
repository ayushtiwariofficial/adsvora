import { motion } from 'framer-motion'
import { Section } from '../common/Section'
import { Card } from '../common/Card'

export const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: 'TechCorp: 300% Revenue Growth',
      category: 'Digital Strategy',
      image: 'bg-blue-100',
      result: '300% increase in online revenue',
    },
    {
      title: 'Fashion Brand: Social Domination',
      category: 'Social Media',
      image: 'bg-pink-100',
      result: '2M+ followers across platforms',
    },
    {
      title: 'E-Commerce: Traffic Explosion',
      category: 'SEO & SEM',
      image: 'bg-green-100',
      result: '500% organic traffic growth',
    },
  ]

  return (
    <Section
      title="Case Studies"
      subtitle="Real results from real clients"
      className="bg-gray-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudies.map((study, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden">
              <div className={`${study.image} h-48 mb-4 rounded-lg`} />
              <span className="text-xs font-semibold text-primary-500 uppercase">
                {study.category}
              </span>
              <h3 className="text-xl font-bold my-2">{study.title}</h3>
              <p className="text-gray-600 text-sm">{study.result}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
