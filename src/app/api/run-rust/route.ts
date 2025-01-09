import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { code } = await req.json();
  
  try {
    // TODO: 实现实际的 Rust 代码运行逻辑
    // 这需要在服务器端设置 Rust 编译环境或使用 WebAssembly
    
    return NextResponse.json({ output: '示例输出' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 