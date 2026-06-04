import { motion } from 'framer-motion'
import { Section } from '../common/Section'
import { Button } from '../common/Button'
import { Link } from 'react-router-dom'

export const CTASection = () => {
  return (
    <Section className="py-20">
      <motion.div
        className="relative bg-gradient-brand rounded-2xl p-12 md:p-20 text-white text-center overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's partner together to achieve extraordinary results. Schedule a free consultation with our team today.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </motion.div>
    </Section>
  )
}
