import BlogCard from "../components/BlogCard"
import ProjectCard from "../components/ProjectCard"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllBlogs } from "../api/blogs"
import { AnimatePresence, motion } from "framer-motion"
import BlockchainBackground from "../components/BlockchainBackground"
import SkillsMarquee from "../components/SkillsMarquee"
import { ProjectsData } from "../components/ProjectsData.tsx"

interface Blog {
  blog_id: number
  title: string
  content: string
  blog_prv_text: string
  blog_img_src: string
  user_id: number
  created_at: string
}

const heroHeaders = [
  "Hi, I am Adrian",
  "WEB3 Developer",
  "Crypto Enthusiast",
  "Smart Contract Engineer",
  "From Bar to Blockchain",
  "Open Source Contributor",
  "Bittensor Enthusiast",
  "Lifelong Learner",
  "Full Stack Developer",
  "Blockchain Enthusiast"
]

const Home = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const blogsInit = async () => {

      try {
        const res = await getAllBlogs()
        setBlogs(res.data as Blog[])
        setLoading(false)
      }
      catch (err) {
        setError('Failed to load blogs')
        setLoading(false)
      }
    }
    blogsInit()
  }, [])



  const [hero, setHero] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setHero(prev => (prev + 1) % heroHeaders.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])


  return (
    <>
      {/* Hero */}
      <section id="hero" className="relative text-text-strong w-full flex flex-col justify-start pt-[28vh] md:pt-[32vh] items-center h-[calc(100vh-64px)] min-h-[calc(100vh-64px)] px-5 border-b border-border-default overflow-hidden">

        <BlockchainBackground />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,transparent_60%)] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.h1
            key={hero}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative font-display font-bold text-[36px] sm:text-[42px] md:text-[54px] lg:text-[62px] 2xl:text-[74px] md:tracking-[2px] text-center"
          >
            {heroHeaders[hero]}
          </motion.h1>
        </AnimatePresence>
        <p className="relative mt-4 text-text-muted text-[14px] md:text-[18px] 2xl:text-[20px] tracking-widest px-4 py-1.5 font-mono uppercase text-center md:whitespace-nowrap">
          Building on-chain. Shipping full stack.
        </p>

      </section>


      {/* <!-- Featured Projects --> */}
      < section id="featured" className="w-full py-16 md:py-20 lg:py-32 px-5 scroll-mt-16 border-b border-border-default" >
        <div className="md:max-w-225 md:mx-auto lg:max-w-300 xl:max-w-full">
          <h2 className="font-display text-text-strong text-[32px] md:text-[40px] lg:text-[44px] font-semibold mb-10  md:mb-15">Featured Projects</h2>
          {/* <!-- Project Card --> */}
          <ul className="text-left grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:grid-cols-[repeat(auto-fit,368px)] justify-center gap-10">
            {ProjectsData.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </ul>
        </div>
      </section >

      {/* Skills & Experience */}
      < section id="skills" className="items-center justify-center py-16 lg:py-32 border-b border-border-default w-full flex flex-col px-5 md:px-8 md:py-20" >
        <div className="md:max-w-225 md:mx-auto lg:max-w-300">
          <span className="mb-2 text-[14px] text-text-muted font-mono tracking-widest">Keep on growing</span>
          <h2 className="font-display text-text-strong text-[32px] md:text-[40px] lg:text-[44px] font-semibold mb-3.75">Skills & Experience</h2>
          <p className="text-[16px] mb-10 lg:mb-15 max-w-110 md:max-w-150 lg:max-w-175 mx-auto">I started from zero – no CS degree, no coding background. Just curiosity, consistency, and a lot of late nights. In under a year I've gone from HTML basics to building full stack applications with modern tools across the entire web development stack.
            <br /> <br />
            I pick up new technologies fast and I'm not afraid to figure things out. Every project I've shipped has taught me something new – and I'm just getting started.
          </p>
        </div>

        {/* <!-- Icons --> */}
        <div className="w-full">
          <SkillsMarquee />
        </div>

      </section >

      {/* <!-- Blog Section --> */}
      < section id="blogPre" className="w-full py-16 md:py-20 lg:py-32 px-3 md:px-5 scroll-mt-16 border-b border-border-default" >
        <div className="md:max-w-225 md:mx-auto lg:max-w-300 xl:max-w-full">
          <h2 className="font-display text-text-strong text-[32px] md:text-[40px] lg:text-[44px] font-semibold mb-10 md:mb-15">Blogs</h2>
          {/* <!-- Blog Card --> */}
          <ul className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {blogs.map(blog => (
              <BlogCard
                key={blog.blog_id}
                blogId={blog.blog_id}
                blogTitle={blog.title}
                blogImgSrc={blog.blog_img_src}
                blogPrvText={blog.blog_prv_text}
                blogDate={new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
            ))}
          </ul>

          {/* <!-- View all link --> */}
          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/blogs"
              className="inline-block text-[14px] md:text-[16px] px-6 py-2.5 rounded-full
                          bg-white text-black font-medium
                          hover:bg-white/90 transition-all duration-300">
              View All
            </Link>
          </div>
        </div>
      </section >

      {/* <!-- About me Section --> */}
      <section id="aboutMe" className="flex items-center justify-center w-full py-16 md:py-20 lg:py-32 px-5 md:px-8 border-b border-border-default scroll-mt-16">

        <div className="w-full md:max-w-225 md:mx-auto lg:max-w-300">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left */}
            <div className="text-left">
              <span className="text-[14px] lg:text-[16px] text-text-muted tracking-[2px]">About me</span>
              <h2 className="font-display text-[32px] sm:text-[36px] md:text-[44px] lg:text-[52px] font-bold leading-tight mt-4">
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
      </section>

      {/* <!-- Contact --> */}
      < section id="contact" className="w-full py-10 md:py-0 px-5 md:px-8 " >
        {/* <!-- Logo ---> */}
        < div className="md:hidden" >
          <a href="#top" className="block w-fit text-white font-display font-bold text-[20px] hover:text-brand/60 transition-colors duration-300 cursor-pointer mb-4">ΛT</a>

          {/* <!-- 1 ---> */}
          <h2 className="font-inria text-text-strong text-[32px] leading-tight mb-5 text-left tracking-[2px]">
            Let's make it happen.
          </h2>

          <div className="flex md:flex-row md:items-start justify-between items-end gap-8">

            {/* <!-- 2 --> */}
            <nav>
              <ul className="flex flex-col gap-2 text-left">
                <li>
                  <span
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-text-muted text-[16px] lg:text-[18px] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    Top
                  </span>
                </li>
                <li>
                  <a href="/skills" className="text-text-muted text-[16px] hover:text-white transition-colors duration-300">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="/projects" className="text-text-muted text-[16px] hover:text-white transition-colors duration-300">
                    Work
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-text-muted text-[16px] hover:text-white transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* <!-- 3 --> */}
            <div>
              <h3 className="font-inria text-text-strong text-[18px] mb-4">Say hello</h3>
              {/* <!-- Icons ---> */}
              <ul className="flex gap-3 text-[32px] text-white">
                <li>
                  <a href="https://github.com/thuisdev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="devicon-github-original text-text-muted hover:text-brand/50 transition-colors duration-300"></i>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/thuisdev" target="_blank" rel="noopener noreferrer" aria-label="X">
                    <i className="devicon-twitter-original text-text-muted hover:text-brand/50 transition-colors duration-300"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/adrian-t-3b64172a4/?locale=de" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="devicon-linkedin-plain text-text-muted hover:text-brand/50 transition-colors duration-300"></i>
                  </a>
                </li>
                <li>
                  <a href="https://cal.com/adrian-thuis/30min?overlayCalendar=true" aria-label="Cal">
                    <i className="text-text-muted hover:text-brand/50 transition-colors duration-300">✉</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div >

        {/* TABLET LAYOUT */}
        < div className="hidden md:flex md:justify-between md:items-stretch md:gap-8" >

          {/* 1 */}
          < div className="flex-1 py-11" >
            <a href="#top" className="block w-fit text-white font-display font-bold text-[20px] lg:text-[22px] mb-6 hover:text-brand/60 transition-colors duration-300 cursor-pointer">ΛT</a>
            <h2 className="font-inria text-text-strong text-[24px] lg:text-[28px] leading-tight text-left tracking-[2px]">
              Let's make it <br />happen.
            </h2>
          </div >

          {/* <!-- 2 --> */}
          < nav className="flex-1 flex justify-center items-center border-l border-r border-border-default py-11" >
            <ul className="flex flex-col gap-2.5 text-center">
              <li>
                <span
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-text-muted text-[16px] lg:text-[18px] hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  Top
                </span>
              </li>
              <li><a href="/skills" className="text-text-muted text-[16px] lg:text-[18px] hover:text-white transition-colors duration-300">Skills</a></li>
              <li><a href="/projects" className="text-text-muted text-[16px] lg:text-[18px] hover:text-white transition-colors duration-300">Work</a></li>
              <li><a href="/contact" className="text-text-muted text-[16px] lg:text-[18px] hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </nav >

          {/* 3 */}
          < div className="flex-1 text-right flex flex-col justify-end mb-1 py-11" >
            <h3 className="font-inria text-text-strong text-[20px] lg:text-[22px] mb-4.5 mr-3">Say Hello</h3>
            <ul className="flex gap-4 justify-end text-[32px] lg:text-[38px] text-white mr-3">
              <li>
                <a href="https://github.com/thuisdev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <i className="devicon-github-original text-text-muted hover:text-brand/50 transition-colors duration-300"></i>
                </a>
              </li>
              <li>
                <a href="https://x.com/thuisdev" target="_blank" rel="noopener noreferrer" aria-label="X">
                  <i className="devicon-twitter-original text-text-muted hover:text-brand/50 transition-colors duration-300"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/adrian-t-3b64172a4/?locale=de" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <i className="devicon-linkedin-plain text-text-muted hover:text-brand/50 transition-colors duration-300"></i>
                </a>
              </li>
            </ul>
          </div >
        </div >
      </section >
    </>
  )
}

export default Home