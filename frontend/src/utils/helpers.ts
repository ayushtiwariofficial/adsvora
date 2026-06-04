export const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export const classNames = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(' ')
}
