import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getBlogById } from "../api/blogs"

interface Blog {
  blog_id: number
  title: string
  content: string
  blog_prv_text: string
  blog_img_src: string
  user_id: number
  created_at: string
}

const SingleBlog = () => {
  const { id } = useParams()

  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initBlog = async () => {
      try {
        const res = await getBlogById(id!)
        setBlog((res.data as any)[0])
        setLoading(false)
      }
      catch (err) {
        setError('Failed to load blog')
        setLoading(false)
      }
    }
    initBlog()
  }, [id])

  return (
    <>
      <article>
        <header className="text-left px-5 py-7 bg-cover bg-center bg-no-repeat h-70 md:h-100 lg:h-150 relative flex flex-col justify-between"
          style={{
            backgroundImage: blog?.blog_img_src
              ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${encodeURI(blog.blog_img_src)}')`
              : 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))'
          }}>
          <Link to="/blogs"
            className="text-[16px] text-text-muted hover:text-white transition-colors duration-300">
            Back to Blogs
          </Link>

          <h1 className="font-display text-text-strong text-[36px] md:text-[56px] lg:text-[60px] font-semibold text-left mt-auto">
            {blog?.title}
          </h1>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          <div className="flex justify-between items-start">
            <p className="text-text-muted text-[12px] lg:text-[13px] mt-6">#METANA #WEB3 #DEV</p>

            <p className="text-text-muted text-[12px] lg:text-[13px] text-right">Written by <br />
              <span className="text-white text-[14px] lg:text-[15px]">Blanca Luci</span></p>
          </div>
        </header>
        <div className="px-5 py-7 text-left">
          <p className="text-[16px] leading-relaxed mb-6">
            {blog?.content}
          </p>
          <time dateTime="2026-04-21" className="block text-text-muted text-[12px] tracking-[2px] text-right">{blog?.created_at && new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>

          {/* <!-- Scroll to Top Btn --> */}
          <div className="justify-items-center mt-7"><a href="#top" className="flex items-center justify-center text-text-muted w-9 h-9 border-border-default border rounded-full hover:text-white hover:border-white/70 transition-colors duration-300">↑</a></div>
        </div>
      </article>
    </>
  )
}

export default SingleBlog
