import { notFound } from "next/navigation";
import { CustomMDX } from "@/app/components/mdx";
import { getProjects } from "@/app/(projects)/utils";
import { baseUrl } from "@/app/sitemap";
import { Header } from "./header";
import "./mdx.css";

type ProjectsProps = {
  params: {
    slug: string;
  };
};

export default async function ProjectPage({ params }: ProjectsProps) {
  const { slug } = await params;
  const post = getProjects().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header project={post.metadata} />
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProjectPosting",
              headline: post.metadata.title,
              description: post.metadata.description,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/${post.slug}`,
              author: {
                "@type": "Person",
                name: "My Portfolio",
              },
            }),
          }}
        />

        <article className="prose prose-lg prose-invert prose-zinc max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="markdown-content">
            <CustomMDX source={post.content} />
          </div>
        </article>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const posts = getProjects();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ProjectsProps) {
  const { slug } = await params;
  const post = getProjects().find((post) => post.slug === slug);
  if (!post) {
    return;
  }

  const { title, description, image } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
