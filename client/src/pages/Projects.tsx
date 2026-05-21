import ProjectCard from "../components/ProjectCard"
import BlockchainBackground from "../components/BlockchainBackground"
import { ProjectsData } from "../components/ProjectsData.tsx"

const Projects = () => {
  return (
    <>
      <section id="featured" className="w-full border-b border-border-default pt-13 pb-16 md:pb-20 md:pt-13 px-5 scroll-mt-[62px] min-h-[calc(100vh-64px)]">
        <BlockchainBackground />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-100">
          <div className="md:max-w-225 md:mx-auto lg:max-w-300 xl:max-w-full">
            <h2 className="font-display text-text-strong text-[32px] md:text-[40px] lg:text-[44px] font-semibold mb-10  md:mb-15">Featured Projects</h2>
            {/* <!-- Project Card --> */}
            <ul className="text-left grid grid-cols-[repeat(auto-fit,360px)] md:grid-cols-[repeat(auto-fit,368px)] justify-center gap-10">
              {ProjectsData.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects
