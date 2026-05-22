import SkillsMarquee from "../components/SkillsMarquee"
import BlockchainBackground from "../components/BlockchainBackground"

const Skills = () => {
    return (
        <>
            {/* Skills & Experience */}
            < section id="skills" className="items-center justify-center py-16 md:py-20 lg:py-32 w-full flex flex-col px-5 md:px-8 py-16 md:py-20 min-h-[calc(100vh-64px)]" >
                <BlockchainBackground />

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,transparent_60%)] pointer-events-none" />

                <div className="relative z-10">
                    <div className="md:max-w-225 md:mx-auto lg:max-w-300">
                        <span className="mb-2 text-[14px] text-text-muted font-mono tracking-widest">Keep on growing</span>
                        <h2 className="font-display  text-text-strong text-[32px] md:text-[40px] lg:text-[44px] font-semibold mb-3.75">Skills & Experience</h2>

                        <p className="text-[16px] mb-10 lg:mb-15 max-w-110 md:max-w-150 lg:max-w-175 mx-auto">I started from zero – no CS degree, no coding background. Just curiosity, consistency, and a lot of late nights. In under a year I've gone from HTML basics to building full stack applications with modern tools across the entire web development stack.
                            <br /> <br />
                            I pick up new technologies fast and I'm not afraid to figure things out. Every project I've shipped has taught me something new – and I'm just getting started.
                        </p>
                    </div>
                </div>

                {/* <!-- Icons --> */}
                <div className="w-full">
                    <SkillsMarquee />
                </div>


            </section >
        </>
    )
}

export default Skills