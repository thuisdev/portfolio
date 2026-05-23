interface ProjectCardProps {

    projectImgSrc: string
    projectDemoLink: string
    projectTitle: string
    projectTitle2: string
    projectPrvText: string
    projectTech: string[]
    projectGithubUrl: string
}

const ProjectCard = ({ projectGithubUrl, projectPrvText, projectTitle, projectTitle2, projectImgSrc, projectTech, projectDemoLink }: ProjectCardProps) => {
    return (
        <article className="group flex flex-col mx-auto pl-4 pr-4 pt-4 pb-5 md:pr-5 md:pl-5 md:pt-5 md:pb-6 w-full max-w-[360px] md:max-w-[368px] md:w-[368px] h-[500px] md:h-[508px] bg-white/[0.02] border border-white
                        transition-shadow duration-300
                        hover:shadow-[4px_4px_0_0_white]
                        has-[.preview:hover]:shadow-none">

            <div className="preview h-[200px] w-fit bg-border-default border border-white overflow-hidden
                            transition-shadow duration-300
                            hover:shadow-[4px_4px_0_0_white] mr-5">

                <a href={projectDemoLink} target="_blank" rel="noopener noreferrer">
                    <img src={projectImgSrc} alt="Project Preview" className="h-full object-cover" />
                </a>
            </div>
            <h3 className="font-display text-[24px] font-semibold text-text-strong  mt-4 mb-4
                            transition-transform duration-300
                            group-hover:translate-y-0.5 line-clamp-2">
                {projectTitle}<br />{projectTitle2}
            </h3>
            <p className="text-[14px] text-text-muted mb-3 line-clamp-3 ">{projectPrvText}</p>

            {/* Hover */}
            <div className="opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity duration-300 mt-auto">
                <p className="text-[14px] text-text-muted [@media(hover:none)]:opacity-100">Made with</p>
                <ul className="text-[12px] text-black bg-white mb-4 flex gap-1 px-2 py-[2px] w-fit line-clamp-1 [@media(hover:none)]:opacity-100">
                    {projectTech.map((tech, index) => (
                        <li key={tech}>
                            {tech}{index < projectTech.length - 1 ? ',' : ''}
                        </li>
                    ))}
                </ul>
                <a className="font-display text-text-strong text-[16px] [@media(hover:none)]:opacity-100" href={projectGithubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        </article>
    )
}

export default ProjectCard