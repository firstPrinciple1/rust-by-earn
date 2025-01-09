import React from 'react'
import { Example } from '@/content/rust-course'

interface RustExampleProps {
  example: Example
}

const RustExample: React.FC<RustExampleProps> = ({ example }) => {
  return (
    <div>
      <h2>{example.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: example.description }} />
      <pre>
        <code>{example.code}</code>
      </pre>
      <p>任务: {example.task}</p>
      <p>预期输出: {example.output}</p>
    </div>
  )
}

export default RustExample 