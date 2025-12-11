import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type TableProps = {
  data: {
    headers: string[]
    rows: string[][]
  }
}

function Table({ data }: TableProps) {
  const headers = data.headers.map((header: string, index: number) => (
    <th key={index} className="px-4 py-2 text-left border-b border-white/20">{header}</th>
  ))
  const rows = data.rows.map((row: string[], index: number) => (
    <tr key={index} className="border-b border-white/10">
      {row.map((cell: string, cellIndex: number) => (
        <td key={cellIndex} className="px-4 py-2">{cell}</td>
      ))}
    </tr>
  ))

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

type LinkProps = {
  href: string
  children: React.ReactNode
  [key: string]: unknown
}

function CustomLink(props: LinkProps) {
  const { href, children, ...restProps } = props

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...restProps}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a href={href} {...restProps}>{children}</a>
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...restProps}>{children}</a>
}

type ImageProps = {
  alt?: string
  src: string
  [key: string]: unknown
}

function RoundedImage(props: ImageProps) {
  const { alt, src, ...restProps } = props
  return (
    <div className="my-8 overflow-hidden squircle">
      <Image 
        src={src} 
        alt={alt || ''} 
        className="w-full h-auto object-cover" 
        width={1200}
        height={600}
        priority={false}
        {...restProps} 
      />
    </div>
  )
}

type CodeProps = {
  children: string
  className?: string
  [key: string]: unknown
}

function Code({ children, className, ...props }: CodeProps) {
  const isInline = !className?.includes('language-')
  
  if (isInline) {
    const codeHTML = highlight(children)
    return (
      <code 
        className="bg-white/10 text-white px-1.5 py-0.5 rounded text-sm font-code"
        dangerouslySetInnerHTML={{ __html: codeHTML }} 
        {...props} 
      />
    )
  }
  
  // For code blocks, return as-is and let the prose styles handle it
  return <code className={className} {...props}>{children}</code>
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(String(children))
    return React.createElement(
      `h${level}`,
      { id: slug },
      React.createElement('a', {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: 'anchor',
      }),
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

type VideoProps = {
  kind?: 'youtube'
  youtubeId?: string
  title?: string
}

function Video({ kind = 'youtube', youtubeId, title }: VideoProps) {
  if (kind === 'youtube' && youtubeId) {
    return (
      <div className="my-8 aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title || 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }
  return null
}

type ActionButtonProps = {
  href: string
  target?: string
  children: React.ReactNode
  [key: string]: unknown
}

function ActionButton({ href, target, children, ...props }: ActionButtonProps) {
  const isExternal = href.startsWith('http') || href.startsWith('//')
  
  if (isExternal || target === '_blank') {
    return (
      <div className="my-6">
        <Link 
          href={href} 
          target={target || '_blank'} 
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }), 'font-label !no-underline ')}
          {...props}
        >
          {children}
        </Link>
      </div>
    )
  }
  
  return (
    <div className="my-6">
      <Link 
        href={href} 
        className={cn(buttonVariants({ variant: 'default' }), 'font-label !no-underline')}
        {...props}
      >
        {children}
      </Link>
    </div>
  )
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  Video,
  ActionButton,
}

type CustomMDXProps = {
  source: string
  components?: Record<string, React.ComponentType<unknown>>
  [key: string]: unknown
}

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
