import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Section } from '@components/common/Section'
import { Blog, blogService } from '@services/blogService'
import { formatDate } from '@utils/helpers'

export const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll(page, 9)
        setBlogs(response.data.content)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [page])

  return (
    <>
      <Helmet>
        <title>Blog - AdsVora</title>
        <meta name="description" content="Expert insights and industry trends in digital marketing." />
      </Helmet>

      <Section title="Blog" subtitle="Expert insights and industry trends">
        {loading ? (
          <div className="text-center py-12">Loading articles...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {blogs.map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/blog/${blog.slug}`} className="block h-full">
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow h-full">
                      <div className="bg-gray-200 h-48" />
                      <div className="p-6">
                        <span className="text-xs font-semibold text-primary-500 uppercase">
                          {blog.category}
                        </span>
                        <h3 className="text-lg font-bold my-2 line-clamp-2">{blog.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{blog.author}</span>
                          <span>{formatDate(blog.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
              {page > 0 && (
                <button
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
              <button
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </Section>
    </>
  )
}
