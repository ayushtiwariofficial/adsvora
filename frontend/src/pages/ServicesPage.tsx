import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '@components/common/Section'
import { Card } from '@components/common/Card'
import { Service, serviceService } from '@services/serviceService'

export const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAll()
        setServices(response.data)
      } catch (error) {
        console.error('Failed to fetch services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <>
      <Helmet>
        <title>Our Services - AdsVora</title>
        <meta name="description" content="Comprehensive digital marketing services tailored to your business needs." />
      </Helmet>

      <Section title="Our Services" subtitle="Comprehensive solutions for every aspect of your digital marketing">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        ✓ {feature}
                      </p>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </>
  )
}
