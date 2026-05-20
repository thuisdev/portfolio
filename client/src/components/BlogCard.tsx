import { Link } from "react-router-dom"

interface BlogCardProps {
    blogImgSrc: string
    blogTitle: string
    blogPrvText: string
    blogDate: string
    blogId: number
}

const BlogCard = ({ blogImgSrc, blogTitle, blogPrvText, blogDate, blogId }: BlogCardProps) => {
    return (

        <article className="group w-[170px] sm:w-[180px] h-[272px] md:w-[213px] md:h-[323px] lg:w-[242px] lg:h-[367px] rounded-[9px] bg-white/[0.01] p-3 md:p-4 lg:p-5 border border-white text-left 
                                transition-shadow duration-300
                                hover:shadow-[4px_4px_0_0_white]">

            <Link to={`/blogs/${blogId}`} className="flex flex-col h-full">
                <div className="rounded-[8px] w-[145px] sm:w-[155px] h-[105px] md:w-full md:h-[125px] lg:h-[140px]">
                    <img src={blogImgSrc}
                        alt="Blog Preview Image"
                        className="rounded-[8px] w-full h-full object-cover" />
                </div>

                <h3 className="text-white text-[18px] md:text-[22px] font-display font-semibold mt-4 mb-4
                                transition-transform duration-300
                                line-clamp-1
                                group-hover:translate-y-0.5">
                    {blogTitle}
                </h3>

                <p className="text-text-muted text-[13px] md:text-[15px] mb-4 flex-grow line-clamp-3">
                    {blogPrvText}
                </p>

                <time className="text-text-muted text-[10px] md:text-[12px] tracking-[2px]">
                    {blogDate}
                </time>
            </Link>
        </article>


    )
}

export default BlogCard