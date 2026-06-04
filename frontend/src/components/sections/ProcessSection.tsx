import { motion } from 'framer-motion'
import { Section } from '../common/Section'

export const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We analyze your business, market, and goals to develop a tailored strategy.',
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'Our experts create a comprehensive roadmap for digital success.',
    },
    {
      number: '03',
      title: 'Execution',
      description: 'We implement campaigns across all channels with precision and creativity.',
    },
    {
      number: '04',
      title: 'Optimization',
      description: 'Continuous monitoring and refinement to maximize ROI and growth.',
    },
  ]

  return (
    <Section title="Our Process" subtitle="A proven methodology for digital success">
      <div className="relative">
        {/* Timeline Line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-brand -translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Circle */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-gradient-brand flex items-center justify-center font-bold text-lg text-primary-500 shadow-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
