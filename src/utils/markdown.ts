import matter from 'gray-matter'

export interface Example {
  id: number
  title: string
  task: string
  code: string
  description: string
  output: string
}

export function parseMarkdown(content: string): Example {
  const { data, content: description } = matter(content)
  return {
    ...data,
    description
  } as Example
} 