import React from 'react'
import RustExample from '@/components/rust-example'
import chapter1 from '@/content/rust/chapter-1.md'
import chapter2 from '@/content/rust/chapter-2.md'
// 导入其他章节...

const examples = [chapter1, chapter2 /* 其他章节 */]

const RustPage: React.FC = () => {
  return (
    <div>
      {examples.map((example, index) => (
        <RustExample key={index} example={example} />
      ))}
    </div>
  )
}

export default RustPage 