const skills = [
  { icon: "devicon-html5-plain", label: "HTML5" },
  { icon: "devicon-css3-plain", label: "CSS3" },
  { icon: "devicon-javascript-plain", label: "JavaScript" },
  { icon: "devicon-typescript-plain", label: "TypeScript" },
  { icon: "devicon-react-original", label: "React" },
  { icon: "devicon-tailwindcss-plain", label: "Tailwind" },
  { icon: "devicon-nodejs-plain", label: "Node.js" },
  { icon: "devicon-express-original", label: "Express" },
  { icon: "devicon-mongodb-plain", label: "MongoDB" },
  { icon: "devicon-postgresql-plain", label: "PostgreSQL" },
  { icon: "devicon-git-plain", label: "Git" },
  { icon: "devicon-figma-plain", label: "Figma" },
  { icon: "devicon-react-original", label: "React" },
  { icon: "devicon-visualstudio-plain", label: "VS Code" },
]

const SkillsMarquee = () => {
  // Duplicate for seamless loop
  const items = [...skills, ...skills]

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((skill, index) => (
          <div
            key={index}
            className="group flex flex-col items-center justify-center gap-3 mx-8 cursor-default select-none"
          >
            <i
              className={`${skill.icon} text-text-strong text-[40px] md:text-[48px]
                group-hover:text-brand transition-colors duration-300`}
            />
            <span className="text-text-muted text-[12px] tracking-wider uppercase
              group-hover:text-brand transition-colors duration-300">
              {skill.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsMarquee
