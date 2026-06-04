import apiClient from './apiClient'

export interface Service {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  features: string[]
  imageUrl: string
  order: number
  createdAt: string
  updatedAt: string
}

export interface ServiceCreateInput {
  name: string
  description: string
  icon: string
  features: string[]
  imageUrl: string
  order: number
}

export const serviceService = {
  getAll: () => apiClient.get<Service[]>('/services'),
  getById: (id: number) => apiClient.get<Service>(`/services/${id}`),
  create: (data: ServiceCreateInput) => apiClient.post<Service>('/services', data),
  update: (id: number, data: Partial<ServiceCreateInput>) =>
    apiClient.put<Service>(`/services/${id}`, data),
  delete: (id: number) => apiClient.delete(`/services/${id}`),
}
