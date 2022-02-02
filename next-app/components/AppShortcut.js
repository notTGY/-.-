import Link from 'next/link'

export default function AppShortcut({ data }) {
  const { title, path } = data
  return (
    <Link href={path}>
      <a>
        { title }
      </a>
    </Link>
  )
}

