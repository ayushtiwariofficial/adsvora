import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Section } from '../common/Section'
import { Card } from '../common/Card'
import { Link } from 'react-router-dom'
import { blogService, Blog } from '@services/blogService'

export const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll(0, 3)
        setBlogs(response.data.content)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return <Section title="Latest Blog Posts" />
  }

  return (
    <Section
      title="Latest Blog Posts"
      subtitle="Expert insights and industry trends"
      className="bg-gray-50"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {blogs.map((blog, idx) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
          >
            <Link to={`/blog/${blog.slug}`}>
              <Card>
                <div className="bg-gray-200 h-40 rounded-lg mb-4" />
                <span className="text-xs font-semibold text-primary-500 uppercase">
                  {blog.category}
                </span>
                <h3 className="text-lg font-bold my-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{blog.excerpt}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{blog.author}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link to="/blog">
          <motion.button
            className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
            whileHover={{ x: 5 }}
          >
            View All Articles →
          </motion.button>
        </Link>
      </div>
    </Section>
  )
}
