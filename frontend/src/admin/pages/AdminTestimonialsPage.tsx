import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Testimonial, testimonialService } from '@services/testimonialService'
import { Button } from '@components/common/Button'
import { HiTrash, HiPencil } from 'react-icons/hi'

export const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    clientName: '',
    clientTitle: '',
    clientCompany: '',
    content: '',
    rating: 5,
    imageUrl: '',
    featured: false,
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialService.getAll()
      setTestimonials(response.data)
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingId) {
        await testimonialService.update(editingId, formData)
      } else {
        await testimonialService.create(formData)
      }
      fetchTestimonials()
      setShowForm(false)
      setFormData({
        clientName: '',
        clientTitle: '',
        clientCompany: '',
        content: '',
        rating: 5,
        imageUrl: '',
        featured: false,
      })
      setEditingId(null)
    } catch (error) {
      console.error('Failed to save testimonial:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return

    try {
      await testimonialService.delete(id)
      fetchTestimonials()
    } catch (error) {
      console.error('Failed to delete testimonial:', error)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setFormData({
      clientName: testimonial.clientName,
      clientTitle: testimonial.clientTitle,
      clientCompany: testimonial.clientCompany,
      content: testimonial.content,
      rating: testimonial.rating,
      imageUrl: testimonial.imageUrl,
      featured: testimonial.featured,
    })
    setShowForm(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Testimonials</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Testimonial'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Client Name"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              placeholder="Client Title"
              value={formData.clientTitle}
              onChange={(e) => setFormData({ ...formData, clientTitle: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
            <input
              type="text"
              placeholder="Company"
              value={formData.clientCompany}
              onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
            <textarea
              placeholder="Testimonial Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            />
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Stars
                </option>
              ))}
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              Featured
            </label>
            <Button type="submit">
              {editingId ? 'Update' : 'Create'} Testimonial
            </Button>
          </div>
        </form>
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Client</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Company</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Featured</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-3">{testimonial.clientName}</td>
                  <td className="px-6 py-3">{testimonial.clientCompany}</td>
                  <td className="px-6 py-3">{'⭐'.repeat(testimonial.rating)}</td>
                  <td className="px-6 py-3">{testimonial.featured ? '✓' : '-'}</td>
                  <td className="px-6 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <HiPencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <HiTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}
