import { motion } from 'framer-motion'
import { Section } from '../common/Section'
import { Card } from '../common/Card'
import { FiBarChart, FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi'

export const ServicesSection = () => {
  const services = [
    {
      icon: FiTarget,
      title: 'Digital Strategy',
      description: 'Comprehensive market analysis and strategy development tailored to your business goals.',
    },
    {
      icon: FiBarChart,
      title: 'SEO & SEM',
      description: 'Boost your online visibility with our expert SEO and paid search strategies.',
    },
    {
      icon: FiTrendingUp,
      title: 'Social Media',
      description: 'Engage your audience across all platforms with data-driven content strategies.',
    },
    {
      icon: FiAward,
      title: 'Brand Design',
      description: 'Create a memorable brand identity that resonates with your target market.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <Section title="Our Services" subtitle="Comprehensive solutions for your digital marketing needs">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {services.map((service, idx) => {
          const Icon = service.icon
          return (
            <motion.div key={idx} variants={itemVariants}>
              <Card>
                <Icon className="text-primary-500 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
