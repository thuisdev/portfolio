import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
    <section className="text-text-strong border-b border-border-default w-full flex flex-col justify-center items-center py-30.5 md:py-45 lg:py-55 px-5 min-h-[calc(100vh-64px)]">
        <p className="text-[16px] text-text-muted tracking-[2px] mb-4">Oops</p>
         <h1 className="font-display font-bold text-[80px] md:text-[120px] lg:text-[160px] tracking-[2px] leading-none">404</h1>
        <p className="text-text-muted text-[18px] md:text-[18px] mt-4">This page got lost in the blockchain.</p>
              <div className="px-5 pt-15 flex justify-center">
        <Link to="/" className="inline-block text-[16px] text-text-muted px-4 py-2 rounded-[20px]
                        border border-transparent
                        transition-all duration-300
                        hover:text-white/80 hover:border-border-default hover:bg-white/[0.02]">← Back to Home</Link>
      </div>
      </section>
    </>
  )
}

export default NotFound