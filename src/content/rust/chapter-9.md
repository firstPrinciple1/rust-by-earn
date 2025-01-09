---
id: 9
title: "9. Solana 程序入门"
task: "创建一个基本的 Solana 程序"
code: |
  use anchor_lang::prelude::*;

  declare_id!("your_program_id");

  #[program]
  pub mod basic_example {
      use super::*;
      
      pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
          msg!("程序初始化成功!");
          Ok(())
      }
  }

  #[derive(Accounts)]
  pub struct Initialize {}
output: "程序初始化成功!"
---

Solana 程序开发基础：

1. 程序结构
   - 使用 Anchor 框架
   - 程序 ID 声明
   - 指令处理函数

2. Anchor 特性
   - #[program] 标注程序模块
   - #[derive(Accounts)] 用于账户验证
   - Context 包含指令的上下文

3. 基本概念
   - 程序是无状态的
   - 通过账户存储状态
   - 使用 msg! 输出日志 