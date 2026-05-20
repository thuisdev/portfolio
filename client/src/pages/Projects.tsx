import ProjectCard from "../components/ProjectCard"

const projects = [
  {
    projectImgSrc: "https://picsum.photos/200/200?random=1",
    projectDemoLink: "https://demo.com",
    projectTitle: "AI",
    projectTitle2: "Dashboard",
    projectPrvText: "AI-powered sales material generator.",
    projectTech: ["React", "TypeScript", "Tailwind"],
    projectGithubUrl: "https://github.com/thuisontao"
  },
  {
    projectImgSrc: "https://picsum.photos/200/200?random=2",
    projectDemoLink: "https://demo.com",
    projectTitle: "Mood-based-todo-app",
    projectTitle2: "Todo-app",
    projectPrvText: "A mood-based todo app with localStorage persistence and cookie support.",
    projectTech: ["JavaScript", "CSS", "Node.js"],
    projectGithubUrl: "https://github.com/thuisontao"
  },
  {
    projectImgSrc: "https://picsum.photos/200/200?random=3",
    projectDemoLink: "https://demo.com",
    projectTitle: "Magic Number",
    projectTitle2: "Game",
    projectPrvText: "A number guessing game built with vanilla JavaScript and DOM manipulation.",
    projectTech: ["JavaScript", "HTML", "CSS"],
    projectGithubUrl: "https://github.com/thuisontao"
  },
]

const Projects = () => {
  return (
    <>
      <section id="featured" className="w-full border-b border-border-default pt-13 pb-16 md:pb-20 md:pt-13 px-5 scroll-mt-[62px] min-h-[calc(100vh-64px)]">
        <div className="md:max-w-225 md:mx-auto lg:max-w-300 xl:max-w-full">
          <h2 className="font-display text-text-strong text-[32px] md:text-[40px] lg:text-[44px] font-semibold mb-10  md:mb-15">Featured Projects</h2>
          {/* <!-- Project Card --> */}
          <ul className="text-left grid grid-cols-[repeat(auto-fit,360px)] md:grid-cols-[repeat(auto-fit,368px)] justify-center gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

export default Projects
