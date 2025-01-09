---
id: 3
title: "3. 复合类型"
task: "创建一个包含五个整数的数组，并打印出第一个和最后一个元素"
code: |
  fn main() {
      // 元组类型
      let tup: (i32, f64, char) = (500, 6.4, 'z');
      let (x, y, z) = tup;  // 解构

      // 数组类型
      let arr = [1, 2, 3, 4, 5];
      let first = arr[0];
      
      println!("元组: ({}, {}, {})", x, y, z);
      println!("数组第一个元素: {}", first);
  }
output: "元组: (500, 6.4, z), 数组第一个元素: 1"
description: "复合类型允许将多个值组合成一个类型。元组可以包含不同类型，数组中的所有元素必须相同类型。"
--- 