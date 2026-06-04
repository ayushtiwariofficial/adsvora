import { motion } from 'framer-motion'

interface SectionProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
}

export const Section = ({ children, className = '', title, subtitle }: SectionProps) => {
  return (
    <motion.section
      className={`section-padding ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-brand bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </motion.section>
  )
}
