import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Blog, blogService } from '@services/blogService'
import { Section } from '@components/common/Section'
import { formatDate } from '@utils/helpers'

export const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const fetchBlog = async () => {
      try {
        const response = await blogService.getBySlug(slug)
        setBlog(response.data)
      } catch (error) {
        console.error('Failed to fetch blog:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  if (loading) return <div className="text-center py-12">Loading...</div>
  if (!blog) return <div className="text-center py-12">Blog not found</div>

  return (
    <>
      <Helmet>
        <title>{blog.title} - AdsVora Blog</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <Section>
        <div className="max-w-3xl mx-auto">
          <article>
            <header className="mb-8">
              <span className="text-primary-500 font-semibold text-sm uppercase">
                {blog.category}
              </span>
              <h1 className="text-5xl font-bold my-4">{blog.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <span>By {blog.author}</span>
                <span>•</span>
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
            </header>

            <div className="bg-gray-200 h-96 rounded-lg mb-8" />

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </article>
        </div>
      </Section>
    </>
  )
}
