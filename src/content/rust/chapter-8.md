---
id: 8
title: "8. 特质(Trait)"
task: "为 NewsArticle 实现 Summary 特质"
code: |
  trait Summary {
      fn summarize(&self) -> String;
  }

  struct NewsArticle {
      headline: String,
      content: String,
  }

  impl Summary for NewsArticle {
      fn summarize(&self) -> String {
          format!("{}: {}", self.headline, self.content)
      }
  }

  fn main() {
      let article = NewsArticle {
          headline: String::from("Breaking News"),
          content: String::from("Rust is awesome!"),
      };
      
      println!("{}", article.summarize());
  }
output: "Breaking News: Rust is awesome!"
---

特质定义了类型可以具有的共同行为：

1. 定义特质
   - 使用 trait 关键字
   - 声明方法签名
   - 可以提供默认实现

2. 实现特质
   - 使用 impl Trait for Type 语法
   - 必须实现所有必需的方法
   - 可以覆盖默认实现

3. 特质作为参数
   - impl Trait 语法
   - trait bound 语法
   - 可以组合多个特质 