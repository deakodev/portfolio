import Particles from "@/app/components/particles";
import Hero from "@/app/components/hero";
import Gallery from "@/app/components/galley";
import Footer from "@/app/components/footer";
import { getProjects } from "@/app/(projects)/utils";

export default function Home() {
  // Define the desired order
  const projectOrder = ['bedbug', 'medstudforty', 'neuroanatomy', '1_echo', '2_maze', 'enpass'];
  
  const projects = getProjects()
    .map((project) => ({
      slug: project.slug,
      metadata: {
        title: project.metadata.title,
        image: project.metadata.image || "",
        featured: project.metadata.featured,
      },
    }))
    .sort((a, b) => {
      const indexA = projectOrder.indexOf(a.slug);
      const indexB = projectOrder.indexOf(b.slug);
      // If slug not found in order, put it at the end
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  return (
    <main className="relative text-foreground">
      <Particles
        className="fixed inset-0 h-screen w-full pointer-events-none z-0"
        quantity={800}
      />
      <div className="relative z-10">
        <Hero />
        <Gallery projects={projects} />
        <Footer />
      </div>
    </main>
  );
}
