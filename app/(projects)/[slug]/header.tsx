"use client";

import { ArrowLeft, Circle } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  project: {
    title: string;
    tech: string;
    description: string;
    completed?: boolean;
  };
};
export const Header: React.FC<Props> = ({ project }) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const projectTech = project.tech.split(",").map((tech) => tech.trim());

  return (
    <header ref={ref} className="relative">
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-white/10  border-zinc-200 lg:border-transparent"
        }`}
      >
        <div className="container flex  items-center justify-between p-6 mx-auto">
          <Link
            href="/"
            className={`duration-200 hover:font-medium ${
              isIntersecting
                ? " text-zinc-400 hover:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900"
            } `}
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
      <div className="container mx-auto relative isolate overflow-hidden pt-24 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mx-auto max-w-2xl lg:mx-0 flex flex-col items-center">
            <div className=" w-fit flex gap-2 justify-center items-center text-white border border-white/20 bg-white/10 pr-2  rounded-md text-xs bg-black mb-4">
              <div className="flex gap-1.5 items-center border-r border-white/20 rounded-md px-2 py-1 bg-black">
                Status
                <Circle className="w-2 h-2 text-green-400 bg-green-400 rounded-full" />
              </div>
              {project.completed ? "Completed" : "Development"}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-heading">
              {project.title}
            </h1>
            <div className="hidden w-full h-px md:block bg-zinc-800 mt-6" />
            <p className="mt-4 text-md leading-8 text-zinc-300 font-body">
              {project.description}
            </p>
            <div className="flex gap-4 justify-center mt-4 text-sm font-medium font-label">
              {projectTech.length > 0 &&
                projectTech.map((tech) => (
                  <div
                    key={tech}
                    className="text-white border border-white/20 px-2 py-1 rounded-md"
                  >
                    {tech}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
