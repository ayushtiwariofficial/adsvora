import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  hover?: boolean
  className?: string
}

export const Card = ({ children, hover = true, className = '' }: CardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-xl p-6 border border-gray-100 ${className}`}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
