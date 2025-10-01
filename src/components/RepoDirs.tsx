import Link from 'next/link'
import { GitHubContent } from '@/types/github'

interface RepoProps {
  name: string
}

export default async function RepoDirs({ name }: RepoProps) {
  const username = 'Min'
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await fetch(
    `https://api.github.com/repos/${username}/${name}/contents`
  )

  const contents: GitHubContent[] = await response.json()
  const dirs = contents.filter((content) => content.type === 'dir')

  return (
    <div className="mt-2">
      <h3 className="text-xl font-bold">Directories</h3>
      <ul>
        {dirs.map((dir) => (
          <li key={dir.path}>
            <Link
              className="underline"
              href={`https://github.com/${username}/${name}/tree/master/${dir.path}`}
            >
              {dir.path}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
