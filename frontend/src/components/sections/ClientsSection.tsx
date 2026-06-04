import { motion } from 'framer-motion'
import { Section } from '../common/Section'

export const ClientsSection = () => {
  const clients = [
    { name: 'TechCorp', color: 'bg-blue-100' },
    { name: 'FashionBrand', color: 'bg-pink-100' },
    { name: 'FinanceHub', color: 'bg-green-100' },
    { name: 'HealthCare+', color: 'bg-orange-100' },
    { name: 'EduTech', color: 'bg-purple-100' },
    { name: 'RetailPro', color: 'bg-yellow-100' },
  ]

  return (
    <Section className="bg-gray-50">
      <div className="text-center mb-12">
        <p className="text-gray-600 font-semibold mb-2">TRUSTED BY LEADING BRANDS</p>
        <h2 className="text-3xl font-bold mb-4">
          Partnered with <span className="bg-gradient-brand bg-clip-text text-transparent">Industry Leaders</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {clients.map((client, idx) => (
          <motion.div
            key={idx}
            className={`${client.color} rounded-xl p-6 h-24 flex items-center justify-center font-semibold text-gray-700`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {client.name}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
