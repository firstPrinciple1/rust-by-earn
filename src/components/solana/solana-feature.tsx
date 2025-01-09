'use client'

import { AppHero } from '../ui/ui-layout'

export function SolanaFeature() {
  return (
    <AppHero
      title={
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">Solana by Earn</h1>
          <div className="mt-4 text-xl text-base-content/80">
            学习 Solana 智能合约开发，完成练习赚取奖励
          </div>
        </div>
      }
      subtitle={
        <div className="max-w-lg mx-auto text-center">
          <p className="mb-4">
            即将上线，敬请期待！
          </p>
        </div>
      }
    />
  )
} 