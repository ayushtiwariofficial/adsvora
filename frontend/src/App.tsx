import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from '@context/AuthContext'
import { Header } from '@components/common/Header'
import { Footer } from '@components/common/Footer'
import { HomePage } from '@pages/HomePage'
import { AboutPage } from '@pages/AboutPage'
import { ServicesPage } from '@pages/ServicesPage'
import { CaseStudiesPage } from '@pages/CaseStudiesPage'
import { BlogPage } from '@pages/BlogPage'
import { BlogDetailPage } from '@pages/BlogDetailPage'
import { ContactPage } from '@pages/ContactPage'
import { AdminDashboard } from '@admin/pages/AdminDashboard'
import { AdminLogin } from '@admin/pages/AdminLogin'

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
