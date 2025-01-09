---
id: 7
title: "7. 泛型"
task: "实现一个泛型函数，找出列表中的最大值"
code: |
  struct Point<T> {
      x: T,
      y: T,
  }

  fn largest<T: PartialOrd>(list: &[T]) -> &T {
      let mut largest = &list[0];
      for item in list {
          if item > largest {
              largest = item;
          }
      }
      largest
  }

  fn main() {
      let p = Point { x: 5, y: 10 };
      let numbers = vec![34, 50, 25, 100, 65];
      
      println!("最大值: {}", largest(&numbers));
  }
output: "最大值: 100"
---

泛型允许你编写适用于多种类型的代码：

1. 泛型数据类型
   - 结构体中的泛型
   - 枚举中的泛型
   - 方法中的泛型

2. 泛型函数
   - 类型参数放在函数名后的尖括号中
   - 可以指定类型约束
   - 支持多个类型参数

3. 类型约束
   - 使用 trait 限制类型
   - 多重约束使用 + 连接
   - where 子句用于复杂约束 