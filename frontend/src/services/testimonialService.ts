import apiClient from './apiClient'

export interface Testimonial {
  id: number
  clientName: string
  clientTitle: string
  clientCompany: string
  content: string
  rating: number
  imageUrl: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface TestimonialCreateInput {
  clientName: string
  clientTitle: string
  clientCompany: string
  content: string
  rating: number
  imageUrl: string
  featured: boolean
}

export const testimonialService = {
  getAll: () => apiClient.get<Testimonial[]>('/testimonials'),
  getFeatured: () => apiClient.get<Testimonial[]>('/testimonials/featured'),
  getById: (id: number) => apiClient.get<Testimonial>(`/testimonials/${id}`),
  create: (data: TestimonialCreateInput) =>
    apiClient.post<Testimonial>('/testimonials', data),
  update: (id: number, data: Partial<TestimonialCreateInput>) =>
    apiClient.put<Testimonial>(`/testimonials/${id}`, data),
  delete: (id: number) => apiClient.delete(`/testimonials/${id}`),
}
