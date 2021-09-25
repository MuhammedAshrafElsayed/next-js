
import Link from 'next/link'
import Home from './index'

export default function Index() {
  return (
    <div>
      <h1>Hello Next.js 👋</h1>
      <Link href='/klam'><p>Home</p></Link>
    </div>
  )
}