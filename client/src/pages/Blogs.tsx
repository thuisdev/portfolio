import BlogCard from "../components/BlogCard"
import { useEffect, useState } from "react"
import { getAllBlogs } from "../api/blogs"

interface Blog {
  blog_id: number
  title: string
  content: string
  blog_prv_text: string
  blog_img_src: string
  user_id: number
  timestamp: string
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  useEffect(() => {
    getAllBlogs().then((res: any) => setBlogs(res.data))
  }, [])

  return (
    <>
      <section id="blogs" className="w-full border-b border-border-default pt-13 pb-16 md:pb-20 md:pt-13 px-5 scroll-mt-[62px] min-h-[calc(100vh-64px)]">
        <h1 className="font-display text-text-strong text-[36px] md:text-[40px] lg:text-[44px] font-bold mb-10">Blogs</h1>
        {/* <!-- Blog Card --> */}
        <ul className="flex flex-wrap gap-4 md:gap-6 justify-center">
          {blogs.map(blog => (
            <BlogCard
              key={blog.blog_id}
              blogId={blog.blog_id}
              blogTitle={blog.title}
              blogImgSrc={blog.blog_img_src}
              blogPrvText={blog.blog_prv_text}
              blogDate={new Date(blog.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
          ))}
        </ul>
      </section>
    </>
  )
}

export default Blogs
