import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type ProjectMetadata = {
  title: string
  featured?: boolean
  tech?: string | string[]
  description: string
  image?: string
  completed?: boolean
}

type NormalizedProjectMetadata = {
  title: string
  featured?: boolean
  tech: string
  description: string
  image?: string
  completed?: boolean
}

type Project = {
  slug: string
  metadata: NormalizedProjectMetadata
  content: string
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string): { metadata: ProjectMetadata; content: string } {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    metadata: data as ProjectMetadata,
    content,
  }
}

function getMDXData(dir: string): Project[] {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const filePath = path.join(dir, file)
    const { metadata, content } = readMDXFile(filePath)
    const slug = path.basename(file, path.extname(file))
    
    // Normalize tech to string if it's an array
    let techString = ''
    if (Array.isArray(metadata.tech) && metadata.tech.length > 0) {
      techString = metadata.tech.join(', ')
    } else if (typeof metadata.tech === 'string' && metadata.tech.trim()) {
      techString = metadata.tech
    }
    
    return {
      slug,
      metadata: {
        ...metadata,
        tech: techString,
      } as NormalizedProjectMetadata,
      content,
    }
  })
}

export function getProjects(): Project[] {
  const postsDirectory = path.join(process.cwd(), 'app/(projects)/posts')
  return getMDXData(postsDirectory)
}

