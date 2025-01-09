import './globals.css'
import {SolanaProvider} from '@/components/solana/solana-provider'
import {UiLayout} from '@/components/ui/ui-layout'
import {ReactQueryProvider} from './react-query-provider'

export const metadata = {
  title: 'Web3 by Earn',
  description: 'Learn Web3 Development and earn crypto rewards',
}

const links: { label: string; path: string }[] = [
  { label: 'Rust by Earn', path: '/basic' },
  { label: 'Solana by Earn', path: '/solana' },
  { label: 'Move by Earn', path: '/move' },
  { label: 'Solidity by Earn', path: '/solidity' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <SolanaProvider>
            <UiLayout links={links}>{children}</UiLayout>
          </SolanaProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
