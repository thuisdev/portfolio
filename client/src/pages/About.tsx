import BlockchainBackground from "../components/BlockchainBackground"

const About = () => {
  return (
    <>
      <section id="aboutMe" className="flex items-center justify-center w-full py-16 md:py-20 lg:py-32 px-5 min-h-[calc(100vh-64px)]">

        <BlockchainBackground />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10">
          <div className="w-full md:max-w-225 md:mx-auto lg:max-w-300">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left */}
              <div className="text-left">
                <span className="text-[14px] text-text-muted tracking-[2px]">About me</span>
                <h2 className="font-display text-[48px] lg:text-[64px] font-bold leading-tight mt-4">
                  From Bar<br />
                  <span className="text-brand/50">to Blockchain.</span>
                </h2>
              </div>

              {/* Right */}
              <div className="text-left space-y-6">
                <p className="text-[16px] lg:text-[18px] leading-relaxed">
                  I'm Adrian Thuis, a Salzburg-based full stack developer transitioning from hospitality into Web3 engineering. After years of managing high-pressure environments as a bartender, I found that the same skills that make a great host – problem-solving under pressure, reading people, and delivering results – translate directly into building great software.
                </p>
                <br />
                <p className="text-[16px] lg:text-[18px] leading-relaxed">
                  Currently enrolled in Metana's Full Stack Web3 Bootcamp, I've gone from zero coding experience to building full stack applications. My focus is on clean architecture, reusable components, and shipping things that actually work.
                </p>
                <br />
                <p className="text-[16px] lg:text-[18px] leading-relaxed">
                  The same skills that made me good behind the bar – staying calm under pressure, reading situations fast, and always putting the end user first – are the same ones I bring to every project I build.
                </p>
                <br />
                <p className="text-[16px] leading-relaxed lg:text-[18px]">
                  I'm actively looking for a Junior Developer role where I can contribute from day one, keep learning fast, and be part of a team building something meaningful. If that sounds like a fit, let's talk.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
