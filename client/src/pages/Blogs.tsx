import BlogCard from "../components/BlogCard"
import { useEffect, useState } from "react"
import { getAllBlogs } from "../api/blogs"
import type { Blog } from "../types/models"

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {

    const blogsInit = async () => {

      try {
        const res = await getAllBlogs()
        setBlogs(res.data)
        setLoading(false)
      }
      catch (err) {
        setError('Failed to load blogs')
        setLoading(false)
      }
    }
    blogsInit()
  }, [])
  return (
    <>
      <section id="blogs" className="w-full pt-13 pb-16 md:pb-20 md:pt-13 px-5 min-h-[calc(100vh-64px)]">

        <h1 className="font-display text-text-strong text-[36px] md:text-[40px] lg:text-[44px] font-bold mb-10">Blogs</h1>
        {/* <!-- Blog Card --> */}
        <ul className="flex flex-wrap gap-4 md:gap-6 justify-center">
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
      </section>
    </>
  )
}

export default Blogs
