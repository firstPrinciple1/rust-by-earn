---
id: 4
title: "4. 结构体"
task: "创建一个 User 结构体并打印用户信息"
code: |
  struct User {
      username: String,
      email: String,
      active: bool,
  }

  fn main() {
      let user = User {
          username: String::from("rust_lover"),
          email: String::from("rust@example.com"),
          active: true,
      };
      
      println!("用户: {} ({})", user.username, user.email);
  }
output: "用户: rust_lover (rust@example.com)"
---

结构体是一个自定义数据类型，允许你命名和包装多个相关的值：

1. 字段和类型
   - 每个字段都有明确的类型
   - 字段使用逗号分隔
   - 最后一个字段后的逗号可选

2. 实例化
   - 使用花括号创建实例
   - 必须为所有字段赋值
   - 字段顺序可以不同

3. 访问字段
   - 使用点号访问字段
   - 如果实例是可变的，可以修改字段值 