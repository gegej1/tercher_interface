import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EduSense 教师端',
  description: 'EmotionReco 项目教师界面',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-cn">
      <body>{children}</body>
    </html>
  )
}
