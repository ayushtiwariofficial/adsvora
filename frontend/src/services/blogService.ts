import apiClient from './apiClient'

export interface Blog {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  imageUrl: string
  author: string
  category: string
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export interface BlogCreateInput {
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  imageUrl: string
}

export const blogService = {
  getAll: (page = 0, size = 10) =>
    apiClient.get<{ content: Blog[]; totalElements: number }>('/blogs', {
      params: { page, size },
    }),
  getById: (id: number) => apiClient.get<Blog>(`/blogs/${id}`),
  getBySlug: (slug: string) => apiClient.get<Blog>(`/blogs/slug/${slug}`),
  create: (data: BlogCreateInput) => apiClient.post<Blog>('/blogs', data),
  update: (id: number, data: Partial<BlogCreateInput>) =>
    apiClient.put<Blog>(`/blogs/${id}`, data),
  delete: (id: number) => apiClient.delete(`/blogs/${id}`),
}
