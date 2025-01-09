---
id: 6
title: "6. 错误处理"
task: "实现一个除法函数，处理除数为零的错误情况"
code: |
  fn divide(x: f64, y: f64) -> Result<f64, String> {
      if y == 0.0 {
          Err(String::from("除数不能为零"))
      } else {
          Ok(x / y)
      }
  }

  fn main() {
      let result = divide(10.0, 2.0);
      match result {
          Ok(value) => println!("结果: {}", value),
          Err(error) => println!("错误: {}", error),
      }
      
      // 使用 ? 运算符
      fn try_divide() -> Result<f64, String> {
          let value = divide(10.0, 2.0)?;
          Ok(value * 2.0)
      }
  }
output: "结果: 5"
---

Rust 使用 Result 类型进行错误处理：

1. Result 枚举
   - Ok(T): 成功时返回的值
   - Err(E): 错误时返回的值

2. 错误处理方式
   - match 表达式详细处理
   - ? 运算符简化错误传播
   - unwrap/expect 用于简单场景

3. 最佳实践
   - 避免使用 panic!
   - 合理使用错误类型
   - 提供有意义的错误信息 