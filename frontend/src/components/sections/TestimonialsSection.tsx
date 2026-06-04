import { motion } from 'framer-motion'
import { Section } from '../common/Section'
import { Card } from '../common/Card'
import { HiStar } from 'react-icons/hi'

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'John Smith',
      company: 'Tech Innovations Inc',
      role: 'CEO',
      content: 'AdsVora transformed our digital presence. Our revenue increased by 250% in 6 months!',
      rating: 5,
    },
    {
      name: 'Sarah Johnson',
      company: 'Fashion Forward Ltd',
      role: 'Marketing Director',
      content: 'Exceptional team with deep expertise. Highly recommend their services.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      company: 'E-Commerce Pro',
      role: 'Business Owner',
      content: 'Professional, creative, and results-driven. They truly understand our business.',
      rating: 5,
    },
  ]

  return (
    <Section
      title="What Clients Say"
      subtitle="Real testimonials from businesses we've helped succeed"
      className="bg-gray-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <div className="flex gap-1 mb-4">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <HiStar key={i} className="text-accent-500" size={18} />
                ))}
              </div>
              <p className="text-gray-600 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <p className="text-sm text-primary-500">{testimonial.company}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
