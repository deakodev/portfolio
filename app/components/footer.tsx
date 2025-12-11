import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-zinc-800 py-8 mt-24 z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-md text-gray-400 font-body">
            © {new Date().getFullYear()} Zachary Deak. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="mailto:deakzach@msu.edu"
              className="text-gray-400 hover:text-white font-label"
            >
              Email
            </Link>
            <Link
              href="https://github.com/deakodev"
              className="text-gray-400 hover:text-white font-label"
            >
              Github
            </Link>
            <Link
              href="https://www.linkedin.com/in/deakodev/"
              className="text-gray-400 hover:text-white font-label"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
