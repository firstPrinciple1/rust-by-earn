'use client';

import { useState, useEffect } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import styles from './basic-feature.module.css';
import dynamic from 'next/dynamic';
import AceEditor from 'react-ace';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import Prism from 'prismjs';
import '@/styles/prism-vscode.css';  // 使用自定义主题
import 'prismjs/components/prism-rust';  // Rust 语言支持

// 动态导入 Ace 编辑器的必要组件
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/theme-dracula';  // 使用 dracula 主题
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/keybinding-vscode';

interface Example {
  id: number;
  title: string;
  task: string;
  code: string;
  description: string;
  output: string;
  validateFn?: (code: string) => boolean;
}

const RUST_EXAMPLES: Example[] = [
  {
    id: 1,
    title: '1. Hello World',
    task: '修改程序，让它输出 "Hello, Rust!"',
    code: `fn main() {
    // 这是注释
    println!("Hello, world!");  // 使用宏打印
}`,
    description: '每个 Rust 程序都从 main 函数开始。println! 是一个宏，用于打印文本到控制台。',
    output: `Hello, world!`,
    validateFn: (code: string) => {
      return code.includes('println!("Hello, Rust!")');
    }
  },
  {
    id: 2,
    title: '2. 基本类型',
    task: '创建一个 f32 类型的变量 pi，赋值为 3.14159，并打印出来',
    code: `fn main() {
    let logical: bool = true;    // 布尔类型
    let num: i32 = 42;          // 32位整数
    let float: f64 = 3.14;      // 64位浮点数
    let letter: char = 'a';     // 字符类型
    
    println!("{}, {}, {}, {}", logical, num, float, letter);
}`,
    description: 'Rust 是静态类型语言，但具有类型推断功能。这里展示了一些基本数据类型。',
    output: `true, 42, 3.14, a`,
    validateFn: (code: string) => {
      return code.includes('println!("{}, {}, {}, {}", logical, num, float, letter");');
    }
  },
  {
    id: 3,
    title: '3. 复合类型',
    task: '创建一个包含五个整数的数组，并打印出第一个和最后一个元素',
    code: `fn main() {
    // 元组类型
    let tup: (i32, f64, char) = (500, 6.4, 'z');
    let (x, y, z) = tup;  // 解构

    // 数组类型
    let arr = [1, 2, 3, 4, 5];
    let first = arr[0];
    
    println!("元组: ({}, {}, {})", x, y, z);
    println!("数组第一个元素: {}", first);
}`,
    description: '复合类型允许将多个值组合成一个类型。元组可以包含不同类型，数组中的所有元素必须相同类型。',
    output: `元组: (500, 6.4, z), 数组第一个元素: 1`,
    validateFn: (code: string) => {
      return code.includes('println!("元组: ({}, {}, {})", x, y, z);');
    }
  },
  {
    id: 4,
    title: '4. 结构体',
    code: `struct User {
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
}`,
    description: '结构体是一个自定义数据类型，允许你命名和包装多个相关的值。',
    output: `用户: rust_lover (rust@example.com)`,
    validateFn: (code: string) => {
      return code.includes('println!("用户: {} ({})", user.username, user.email);');
    }
  },
  {
    id: 5,
    title: '5. 枚举',
    code: `enum Message {
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
}`,
    description: '枚举允许你定义一个类型，它可以是多个可能的变体之一。match 表达式用于处理所有可能的情况。',
    output: `文本消息: hello`,
    validateFn: (code: string) => {
      return code.includes('println!("文本消息: {}", text);');
    }
  },
  {
    id: 6,
    title: '6. 错误处理',
    code: `fn divide(x: f64, y: f64) -> Result<f64, String> {
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
}`,
    description: 'Rust 使用 Result 类型进行错误处理，强制你明确处理错误情况。? 运算符简化了错误传播。',
    output: `结果: 5, 错误: 除数不能为零`,
    validateFn: (code: string) => {
      return code.includes('println!("结果: 5, 错误: 除数不能为零");');
    }
  },
  {
    id: 7,
    title: '7. 泛型',
    code: `struct Point<T> {
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
}`,
    description: '泛型允许你编写适用于多种类型的代码，提高代码的复用性。',
    output: `最大值: 100`,
    validateFn: (code: string) => {
      return code.includes('println!("最大值: {}", largest(&numbers));');
    }
  },
  {
    id: 8,
    title: '8. 特质(Trait)',
    code: `trait Summary {
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
}`,
    description: '特质定义了类型可以具有的共同行为。类似于其他语言中的接口。',
    output: `Breaking News: Rust is awesome!`,
    validateFn: (code: string) => {
      return code.includes('println!("{}", article.summarize());');
    }
  },
  {
    id: 9,
    title: '9. Solana 程序入门',
    code: `use anchor_lang::prelude::*;

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
pub struct Initialize {}`,
    description: '这是一个基本的 Solana 程序结构。使用 Anchor 框架可以简化 Solana 程序的开发。',
    output: `程序初始化成功!`,
    validateFn: (code: string) => {
      return code.includes('msg!("程序初始化成功!");');
    }
  },
  {
    id: 10,
    title: '10. Solana 账户',
    code: `#[account]
pub struct Counter {
    pub authority: Pubkey,    // 32 bytes
    pub count: u64,          // 8 bytes
    pub bump: u8,           // 1 byte
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8 + 1,
        seeds = [b"counter", user.key().as_ref()],
        bump
    )]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}`,
    description: 'Solana 中的账户用于存储状态。这个例子展示了如何定义和初始化一个计数器账户。',
    output: `账户初始化成功`,
    validateFn: (code: string) => {
      return code.includes('msg!("账户初始化成功");');
    }
  },
  {
    id: 11,
    title: '11. PDA 和种子',
    code: `// 使用 PDA (Program Derived Address)
#[derive(Accounts)]
pub struct UpdateCounter<'info> {
    #[account(
        mut,
        seeds = [b"counter", authority.key().as_ref()],
        bump = counter.bump,
        has_one = authority
    )]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

// 程序逻辑
pub fn update_counter(ctx: Context<UpdateCounter>) -> Result<()> {
    let counter = &mut ctx.accounts.counter;
    counter.count = counter.count.checked_add(1).unwrap();
    Ok(())
}`,
    description: 'PDA (Program Derived Address) 是 Solana 特有的概念，用于确定性地生成账户地址。',
    output: `计数器更新成功`,
    validateFn: (code: string) => {
      return code.includes('msg!("计数器更新成功");');
    }
  },
  {
    id: 12,
    title: '12. 跨程序调用 (CPI)',
    code: `use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction;

pub fn transfer_sol(
    ctx: Context<TransferSol>,
    amount: u64,
) -> Result<()> {
    let ix = system_instruction::transfer(
        &ctx.accounts.from.key(),
        &ctx.accounts.to.key(),
        amount
    );
    
    invoke(
        &ix,
        &[
            ctx.accounts.from.to_account_info(),
            ctx.accounts.to.to_account_info(),
        ],
    )?;
    
    Ok(())
}

#[derive(Accounts)]
pub struct TransferSol<'info> {
    #[account(mut)]
    pub from: Signer<'info>,
    #[account(mut)]
    pub to: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}`,
    description: 'CPI 允许一个程序调用另一个程序。这个例子展示了如何在程序中转账 SOL。',
    output: `转账成功`,
    validateFn: (code: string) => {
      return code.includes('msg!("转账成功");');
    }
  },
  {
    id: 13,
    title: '13. 错误处理和验证',
    code: `#[error_code]
pub enum MyError {
    #[msg("金额必须大于 0")]
    InvalidAmount,
    #[msg("没有足够的权限")]
    Unauthorized,
}

pub fn process_transaction(
    ctx: Context<ProcessTx>,
    amount: u64,
) -> Result<()> {
    // 验证金额
    require!(amount > 0, MyError::InvalidAmount);
    
    // 验证权限
    require!(
        ctx.accounts.user.key() == ctx.accounts.auth.key(),
        MyError::Unauthorized
    );
    
    // ... 处理逻辑
    Ok(())
}`,
    description: 'Solana 程序中的错误处理和验证是确保程序安全的重要部分。',
    output: `交易处理成功`,
    validateFn: (code: string) => {
      return code.includes('msg!("交易处理成功");');
    }
  }
];

// 添加 PlayIcon 组件
const PlayIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

// 添加 LoadingIcon 组件
const LoadingIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    className={styles.loadingIcon}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a10 10 0 0 1 10 10"></path>
  </svg>
);

// 添加新的图标组件
const ResetIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
  </svg>
);

const CopyIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const CodeEditor = ({ code, onChange, onReset, onRun, isRunning = false, language = 'rust' }) => {
  const [showCopyTip, setShowCopyTip] = useState(false);
  
  // 计算内容行数来设置编辑器高度
  const lineCount = code.split('\n').length;
  const lineHeight = 21; // 每行的高度（包括行间距）
  const minHeight = 150; // 最小高度
  const editorHeight = Math.max(minHeight, lineCount * lineHeight + 20); // 20px 作为底部缓冲

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowCopyTip(true);
      setTimeout(() => {
        setShowCopyTip(false);
      }, 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  useEffect(() => {
    Prism.highlightAll();  // 高亮所有代码块
  }, [code]);

  return (
    <div className={styles.editor}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.button}
          onClick={handleCopy}
          title="复制代码"
        >
          <CopyIcon />
          {showCopyTip && <span className={styles.copyTip}>已复制！</span>}
        </button>
        <button
          className={styles.button}
          onClick={onReset}
          title="重置代码"
        >
          <ResetIcon />
        </button>
        <button
          className={styles.button}
          onClick={onRun}
          disabled={isRunning}
          title="运行代码"
        >
          {isRunning ? <LoadingIcon /> : <PlayIcon />}
        </button>
      </div>
      <AceEditor
        mode="rust"
        theme="dracula"  // 使用 dracula 主题
        value={code}
        onChange={onChange}
        name="code-editor"
        editorProps={{ 
          $blockScrolling: true,
          $fontFamily: "'Fira Code', monospace",
        }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
          showPrintMargin: false,
          fontSize: 14,
          highlightActiveLine: true,
          highlightSelectedWord: true,
          cursorStyle: "smooth",
          copyWithEmptySelection: false,
          displayIndentGuides: true,
          scrollPastEnd: 0, // 移除底部滚动空间
          keybinding: "vscode",
          maxLines: Infinity, // 允许无限行数
          minLines: 5, // 最少显示5行
        }}
        style={{
          width: '100%',
          height: `${editorHeight}px`, // 动态设置高度
          backgroundColor: '#1e1e1e',  // VS Code 的背景色
        }}
        className={styles.aceEditor}
        commands={[
          {
            name: 'save',
            bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
            exec: () => {/* 可以添加保存功能 */}
          },
          {
            name: 'run',
            bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
            exec: () => onRun?.()
          }
        ]}
      />
    </div>
  );
};

// 修改常量定义
const TREASURY_PUBKEY = new PublicKey("7yWwaVb7EvpqyNNdhVuFpemSQQjZWWAwQZaFEgg76aNL"); // devnet 测试网国库
const REWARD_AMOUNT = 0.1 * LAMPORTS_PER_SOL;

export default function BasicFeature() {
  const [editableCode, setEditableCode] = useState<{ [key: number]: string }>({});
  const [outputs, setOutputs] = useState<{ [key: number]: string }>({});
  const [isRunning, setIsRunning] = useState<{ [key: number]: boolean }>({});
  const [exerciseStatus, setExerciseStatus] = useState<{ [key: number]: boolean }>({});
  const [claimedExercises, setClaimedExercises] = useState<{ [key: number]: boolean }>({});
  const [isClaimLoading, setIsClaimLoading] = useState<{ [key: number]: boolean }>({});
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleCodeChange = (id: number, newValue: string) => {
    setEditableCode(prev => ({
      ...prev,
      [id]: newValue
    }));
  };

  const claimSol = async (id: number) => {
    if (!publicKey) {
      alert('请先连接钱包');
      return;
    }

    if (claimedExercises[id]) {
      alert('该练习已领取过奖励');
      return;
    }

    setIsClaimLoading(prev => ({ ...prev, [id]: true }));

    try {
      // 检查国库余额
      const treasuryBalance = await connection.getBalance(TREASURY_PUBKEY);
      if (treasuryBalance < REWARD_AMOUNT) {
        throw new Error('奖励池余额不足，请联系管理员充值');
      }

      // 检查用户是否在 devnet
      const cluster = localStorage.getItem('cluster');
      if (cluster !== 'devnet') {
        throw new Error('请切换到 Devnet 测试网');
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: TREASURY_PUBKEY,
          toPubkey: publicKey,
          lamports: REWARD_AMOUNT,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      
      // 添加交易确认等待提示
      setOutputs(prev => ({
        ...prev,
        [id]: '交易确认中，请稍候...'
      }));

      const confirmation = await connection.confirmTransaction(signature, 'confirmed');

      if (confirmation.value.err) {
        throw new Error('交易确认失败');
      }

      setClaimedExercises(prev => ({ ...prev, [id]: true }));
      
      // 更新输出消息
      setOutputs(prev => ({
        ...prev,
        [id]: `✅ 恭喜！${REWARD_AMOUNT / LAMPORTS_PER_SOL} SOL 已发送到您的钱包\n交易签名: ${signature}`
      }));

      // 保存领取记录到本地存储
      const savedClaims = localStorage.getItem('claimedExercises');
      const claims = savedClaims ? JSON.parse(savedClaims) : {};
      claims[`${publicKey.toBase58()}_${id}`] = true;
      localStorage.setItem('claimedExercises', JSON.stringify(claims));

    } catch (error) {
      console.error('Claim SOL failed:', error);
      setOutputs(prev => ({
        ...prev,
        [id]: `❌ ${error.message || '领取失败，请稍后重试'}`
      }));
    } finally {
      setIsClaimLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  // 在组件加载时检查已领取记录
  useEffect(() => {
    if (publicKey) {
      const savedClaims = localStorage.getItem('claimedExercises');
      if (savedClaims) {
        const claims = JSON.parse(savedClaims);
        const userClaims: { [key: number]: boolean } = {};
        
        Object.keys(claims).forEach(key => {
          if (key.startsWith(publicKey.toBase58())) {
            const exerciseId = parseInt(key.split('_')[1]);
            userClaims[exerciseId] = true;
          }
        });
        
        setClaimedExercises(userClaims);
      }
    }
  }, [publicKey]);

  const renderClaimButton = (id: number, isCorrect: boolean) => {
    // 如果已经领取过，显示已领取标签
    if (claimedExercises[id]) {
      return <div className={styles.claimedBadge}>已领取</div>;
    }
    
    // 始终显示按钮，但根据状态设置不同的样式和禁用状态
    return (
      <button 
        className={styles.claimButton}
        onClick={() => claimSol(id)}
        disabled={!isCorrect || isClaimLoading[id]}
      >
        {isClaimLoading[id] ? (
          <span className={styles.loading}>领取中...</span>
        ) : (
          `领取 ${REWARD_AMOUNT / LAMPORTS_PER_SOL} SOL`
        )}
      </button>
    );
  };

  // 修改输出显示
  const getOutputMessage = (id: number, isCorrect: boolean) => {
    if (outputs[id]) {  // 只有在有输出时才显示消息
      if (isCorrect) {
        if (claimedExercises[id]) {
          return '✅ 练习已完成';
        }
        return '✅ 恭喜！练习通过！可以领取奖励';
      }
      return '❌ 请继续尝试，还未达到练习要求';
    }
    return '';  // 初始状态返回空字符串
  };

  const runCode = async (id: number) => {
    setIsRunning(prev => ({ ...prev, [id]: true }));
    try {
      const example = RUST_EXAMPLES.find(ex => ex.id === id);
      const code = editableCode[id] || example?.code;
      
      // 验证代码
      const isCorrect = example?.validateFn?.(code) ?? false;
      setExerciseStatus(prev => ({
        ...prev,
        [id]: isCorrect
      }));

      // 设置输出
      setOutputs(prev => ({
        ...prev,
        [id]: isCorrect 
          ? '✅ 恭喜！练习通过！点击领取 0.1 SOL' 
          : '❌ 请继续尝试，还未达到练习要求'
      }));

      // 如果通过了，显示领取按钮
      if (isCorrect) {
        return (
          <div className={styles.claimContainer}>
            <button 
              className={styles.claimButton}
              onClick={() => claimSol(id)}
            >
              领取 0.1 SOL
            </button>
          </div>
        );
      }

    } catch (error) {
      setOutputs(prev => ({
        ...prev,
        [id]: `错误: ${error.message}`
      }));
    } finally {
      setIsRunning(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleReset = (id: number) => {
    const example = RUST_EXAMPLES.find(ex => ex.id === id);
    if (example) {
      setEditableCode(prev => ({
        ...prev,
        [id]: example.code
      }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">Rust by Earn</h1>
          <div className="mt-4 text-xl text-base-content/80">
            学习 Rust 开发，完成练习赚取奖励
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.mainContentInner}>
            {RUST_EXAMPLES.map((example) => (
              <div key={example.id} className={styles.section}>
                <h2>
                  {example.title}
                  {exerciseStatus[example.id] && (
                    <span className={styles.passedBadge}>已通过</span>
                  )}
                </h2>
                <p className={styles.description}>
                  {example.description}
                </p>
                <div className={styles.codeBlock}>
                  <CodeEditor
                    code={editableCode[example.id] ?? example.code}
                    onChange={(newValue) => handleCodeChange(example.id, newValue)}
                    onReset={() => handleReset(example.id)}
                    onRun={() => runCode(example.id)}
                    isRunning={isRunning[example.id]}
                  />
                </div>
                
                <div className={styles.task}>
                  <p>{example.task}</p>
                </div>
                
                <div className={`${styles.output} ${exerciseStatus[example.id] ? styles.success : ''}`}>
                  <pre>
                    <code>{getOutputMessage(example.id, exerciseStatus[example.id])}</code>
                  </pre>
                  {renderClaimButton(example.id, exerciseStatus[example.id])}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
