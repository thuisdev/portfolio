import SkillsMarquee from "../components/SkillsMarquee"

const Skills = () => {
    return (
        <>
            {/* Skills & Experience */}
            {/* Skills & Experience */}
            < section id="skills" className="flex items-center justify-center py-16 md:py-20 lg:py-32 border-b border-border-default w-full flex flex-col px-5 py-16 md:py-20" >
                <div className="md:max-w-225 md:mx-auto lg:max-w-300">
                    <span className="mb-2 text-[14px] text-text-muted font-mono tracking-widest">Keep on growing</span>
                    <h2 className="font-display text-text-strong text-[32px] md:text-[40px] lg:text-[44px] font-semibold mb-3.75">Skills & Experience</h2>
                    <p className="text-[16px] mb-10 lg:mb-15 max-w-110 md:max-w-150 lg:max-w-175 mx-auto">I started from zero – no CS degree, no coding background. Just curiosity, consistency, and a lot of late nights. In under a year I've gone from HTML basics to building full stack applications with modern tools across the entire web development stack.
                        <br /> <br />
                        I pick up new technologies fast and I'm not afraid to figure things out. Every project I've shipped has taught me something new – and I'm just getting started.
                    </p>
                    {/* <!-- Icons --> */}
                    <SkillsMarquee />
                </div>
            </section >
        </>
    )
}

export default Skills