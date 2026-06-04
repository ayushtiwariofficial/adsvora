import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Section } from '@components/common/Section'

export const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About AdsVora - Our Story & Mission</title>
        <meta name="description" content="Learn about AdsVora's mission to deliver premium digital marketing solutions." />
      </Helmet>

      <Section title="About AdsVora">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2018, AdsVora emerged from a simple vision: to revolutionize how businesses approach digital marketing. What started as a small team of passionate marketers has grown into a powerhouse agency trusted by brands worldwide.
              </p>
              <p className="text-gray-600">
                Our journey has been defined by innovation, integrity, and an unwavering commitment to client success. We believe that great marketing is both an art and a science.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To empower businesses with strategic digital solutions that drive meaningful growth and lasting impact. We are committed to delivering exceptional results through data-driven insights and creative excellence.
              </p>
              <p className="text-gray-600">
                Every project is an opportunity to exceed expectations and build lasting partnerships with our clients.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { title: 'Innovation', desc: 'We constantly push boundaries to find new solutions.' },
              { title: 'Integrity', desc: 'Transparency and honesty guide all our actions.' },
              { title: 'Excellence', desc: 'We deliver world-class results every single time.' },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                className="text-center p-8 bg-gradient-subtle rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </>
  )
}
