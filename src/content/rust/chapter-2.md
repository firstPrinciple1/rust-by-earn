---
id: 2
title: "2. 基本类型"
task: "创建一个 f32 类型的变量 pi，赋值为 3.14159，并打印出来"
code: |
  fn main() {
      let logical: bool = true;    // 布尔类型
      let num: i32 = 42;          // 32位整数
      let float: f64 = 3.14;      // 64位浮点数
      let letter: char = 'a';     // 字符类型
      
      println!("{}, {}, {}, {}", logical, num, float, letter);
  }
output: "true, 42, 3.14, a"
description: "Rust 是静态类型语言，但具有类型推断功能。这里展示了一些基本数据类型。"
--- 