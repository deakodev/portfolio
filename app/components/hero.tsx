"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ChevronDown, FileUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden text-foreground z-10">
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center gap-6">
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/avatar.jpg"
            alt="Picture of Zachary Deak"
            className=" h-32 w-32 sm:h-44 sm:w-44 squircle object-cover border border-border"
          />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-heading leading-tight">
            ZACHARY
            <br />
            DEAK, DO
          </h1>
        </motion.div>
        <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto" />

        <motion.p
          className="max-w-[600px] text-lg sm:text-xl font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Building tools that make healthcare and education more personal,
          accessible, and sustainable.
        </motion.p>

        <motion.div
          className="flex items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" size="icon">
                <Link
                  href="mailto:deakzach@msu.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <Mail className="!h-6 !w-6" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              Email
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" size="icon">
                <Link
                  href="https://github.com/deakodev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="!h-6 !w-6" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              GitHub
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" size="icon">
                <Link
                  href="https://www.linkedin.com/in/deakodev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="!h-6 !w-6" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              LinkedIn
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="outline" size="icon">
                <Link
                  href="/deak_cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Resume"
                >
                  <FileUser className="!h-6 !w-6" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              CV
            </TooltipContent>
          </Tooltip>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="text-sm uppercase tracking-widest font-label">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 " />
        </motion.div>
      </motion.div>
    </div>
  );
}
