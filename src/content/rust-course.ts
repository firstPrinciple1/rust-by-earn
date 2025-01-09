import chapter1Content from './rust/chapter-1.md'
import chapter2Content from './rust/chapter-2.md'
import chapter3Content from './rust/chapter-3.md'
import { parseMarkdown, Example } from '@/utils/markdown'

export { Example }

const validateFns = {
  1: (code: string) => code.includes('println!("Hello, Rust!")'),
  2: (code: string) => code.includes('println!("{}, {}, {}, {}", logical, num, float, letter");'),
  3: (code: string) => code.includes('println!("元组: ({}, {}, {})", x, y, z);'),
}

export const RUST_EXAMPLES = [
  { ...parseMarkdown(chapter1Content), validateFn: validateFns[1] },
  { ...parseMarkdown(chapter2Content), validateFn: validateFns[2] },
  { ...parseMarkdown(chapter3Content), validateFn: validateFns[3] },
] 