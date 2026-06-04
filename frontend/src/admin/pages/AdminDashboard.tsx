import { useNavigate, Routes, Route } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { motion } from 'framer-motion'
import { HiLogout, HiDocumentText, HiCog } from 'react-icons/hi'
import { AdminBlogsPage } from './AdminBlogsPage'
import { AdminServicesPage } from './AdminServicesPage'
import { AdminTestimonialsPage } from './AdminTestimonialsPage'

export const AdminDashboard = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate('/admin/login')
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col grow overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <h1 className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">
              AdsVora Admin
            </h1>
          </div>

          <nav className="flex flex-col gap-2 px-4 py-8">
            {[
              { label: 'Blogs', href: '/admin/blogs', icon: HiDocumentText },
              { label: 'Services', href: '/admin/services', icon: HiCog },
              { label: 'Testimonials', href: '/admin/testimonials', icon: HiDocumentText },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={idx}
                  onClick={() => navigate(item.href)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors"
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="mt-auto border-t border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-3">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <HiLogout size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          <Routes>
            <Route path="blogs/*" element={<AdminBlogsPage />} />
            <Route path="services/*" element={<AdminServicesPage />} />
            <Route path="testimonials/*" element={<AdminTestimonialsPage />} />
            <Route path="*" element={<AdminBlogsPage />} />
          </Routes>
        </motion.div>
      </div>
    </div>
  )
}
