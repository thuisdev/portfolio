import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-[64px]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout