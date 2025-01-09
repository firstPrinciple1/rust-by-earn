'use client'

import { AppHero } from '../ui/ui-layout'

export function HomeFeature() {
  return (
    <AppHero
      title={
        <div className="text-center animate-fade-in">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Web3 by Earn
          </h1>
          <div className="mt-6 text-2xl text-base-content/80 font-light">
            边学 Web3 边赚加密货币
          </div>
        </div>
      }
      subtitle={
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="space-y-6">
            <p className="text-xl font-light">
              完成 Web3 开发练习，立即获得加密货币奖励！
            </p>
            <div className="grid grid-cols-2 gap-12 p-6 bg-base-200/50 rounded-xl backdrop-blur-sm">
              <div className="space-y-4">
                <div className="font-bold text-primary text-lg">学习路线</div>
                <ul className="space-y-3 text-left list-none">
                  {[
                    'Rust 基础入门',
                    'Solana 智能合约',
                    'Move 智能合约',
                    'Solidity 智能合约'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-base">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="font-bold text-secondary text-lg">奖励机制</div>
                <ul className="space-y-3 text-left list-none">
                  {[
                    '每题奖励 0.1 SOL',
                    '通过即时发放',
                    '智能合约验证',
                    '支持多次尝试'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-2 text-base">
                      <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <div className="text-base opacity-80 mb-4">
              准备好了吗？立即开始你的 Web3 学习之旅！
            </div>
            <a 
              href="/basic" 
              className="btn btn-primary btn-lg px-12 font-bold hover:scale-105 transition-transform"
            >
              开始学习
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      }
    />
  )
} 