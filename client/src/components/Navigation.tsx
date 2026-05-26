import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";

const Navigation = () => {
  const { isLoggedIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setAtContact(false);

    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };

    const contactSection = document.querySelector('#contact');
    const observer = contactSection
      ? new IntersectionObserver(
        ([entry]) => setAtContact(entry.isIntersecting),
        { threshold: 0.15 }
      )
      : null;

    if (observer && contactSection) observer.observe(contactSection);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return (
    <nav
      id="navBar"
      className={`fixed top-0 left-0 right-0 text-text-strong h-[64px] w-full flex justify-between items-center z-50 transition-all duration-700
        ${atContact ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 translate-y-0'}
        ${scrolled
          ? 'bg-black/75  border-b border-border-default backdrop-blur-md'
          : 'bg-transparent border-b border-transparent backdrop-blur-none'
        }`}
    >
      <Link to="/" className="font-display font-bold text-[20px] p-[19px] hover:text-brand/50 transition-colors duration-300 inline-block cursor-pointer">
        ΛT
      </Link>

      <div>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="inline-block text-[16px] text-text-muted px-2 sm:px-4 py-2 mr-2 sm:mr-4.75 transition-all duration-300 hover:text-white">
              Profile
            </Link>
            <button onClick={logout} className="inline-block text-[16px] text-text-muted px-2 sm:px-4 py-2 mr-2 sm:mr-4.75 transition-all duration-300 hover:text-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="inline-block text-[16px] text-text-muted px-2 sm:px-4 py-2 mr-2 sm:mr-4.75 transition-all duration-300 hover:text-white">
              Login
            </Link>
            <Link to="/create-account" className="inline-block text-[16px] text-text-muted px-2 sm:px-4 py-2 mr-2 sm:mr-4.75 transition-all duration-300 hover:text-white">
              Sign Up
            </Link>
          </>
        )}
        <Link to="/contact" className="inline-block text-[16px] px-2 sm:px-4 py-2 mr-2 sm:mr-4.75 rounded-full
        bg-white text-black font-medium
        hover:bg-white/90 transition-all duration-300">
          Let's Talk
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;