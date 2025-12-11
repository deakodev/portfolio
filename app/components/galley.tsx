"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type GalleryProps = {
  projects: Array<{
    metadata: {
      title: string;
      image: string;
      featured?: boolean;
    };
    slug: string;
  }>;
};

export default function Gallery({ projects }: GalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative py-20 z-10">
      <div
        ref={ref}
        className="container mx-auto px-4 md:px-24 lg:px-36 items-center"
      >
        <motion.h2
          className="mb-12 text-center text-3xl font-bold sm:text-4xl font-heading"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>
        <div className="flex justify-center">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                className="group relative overflow-hidden squircle border border-border/50 hover:border-border transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={project.metadata.image || "/placeholder.svg"}
                    alt={project.metadata.title}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <Link
                  href={`/${project.slug}`}
                  className="absolute inset-0 flex items-center justify-center bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <h3 className="lg:text-3xl font-semibold text-white font-heading">
                    {project.metadata.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
