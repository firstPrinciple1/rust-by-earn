---
id: 5
title: "5. 枚举"
task: "创建一个消息枚举并使用 match 处理不同类型的消息"
code: |
  enum Message {
      Quit,
      Move { x: i32, y: i32 },
      Write(String),
      ChangeColor(i32, i32, i32),
  }

  fn main() {
      let msg = Message::Write(String::from("hello"));
      
      match msg {
          Message::Quit => println!("退出"),
          Message::Move { x, y } => println!("移动到 ({}, {})", x, y),
          Message::Write(text) => println!("文本消息: {}", text),
          Message::ChangeColor(r, g, b) => println!("颜色: RGB({},{},{})", r, g, b),
      }
  }
output: "文本消息: hello"
---

枚举允许你定义一个类型，它可以是多个可能的变体之一：

1. 变体类型
   - 无参数变体 (Quit)
   - 结构体风格变体 (Move)
   - 元组风格变体 (Write, ChangeColor)

2. match 表达式
   - 必须处理所有可能的情况
   - 每个分支使用 => 连接模式和代码
   - 支持复杂的模式匹配 