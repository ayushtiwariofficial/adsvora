import apiClient from './apiClient'

export interface ContactForm {
  id: number
  name: string
  email: string
  phone: string
  company: string
  message: string
  createdAt: string
}

export interface ContactFormInput {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export const contactService = {
  submit: (data: ContactFormInput) =>
    apiClient.post<ContactForm>('/contacts', data),
}
