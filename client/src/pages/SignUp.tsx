import { useState } from "react";
import { useAuth } from "../context/AuthProvider"
import { Link, useNavigate, Navigate } from "react-router-dom";
import BlockchainBackground from "../components/BlockchainBackground"

const SignUp = () => {
  const navigate = useNavigate();
  const { register, isLoggedIn } = useAuth();

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (isLoggedIn) return <Navigate to="/" replace />

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await register({ username, name, email, password });
      navigate('/')
    }
    catch (err: any) {
      setError(err.response?.data?.error || 'Registraion failed')
    }
  }

  return (
    <>
      <section className="relative flex items-center justify-center w-full py-16 px-5 md:px-8 min-h-[calc(100vh-64px)] overflow-hidden">

        <BlockchainBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto w-full bg-black/40 border border-border-default rounded-[20px] p-6 sm:p-8 md:p-10 lg:p-12">

          <div className="mb-6 sm:mb-8 md:mb-10">
            <h1 className="text-white font-display font-bold text-[28px] sm:text-[32px] md:text-[36px] lg:text-[44px] tracking-[2px] mb-3 sm:mb-4 text-center">
              Create Account
            </h1>
            <p className="text-text-muted text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-center">
              Join us to start your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">

            {/* Username */}
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
              />
              <label
                htmlFor="username"
                className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[13px] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]"
              >
                Username
              </label>
            </div>

            {/* Name */}
            <div className="relative">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[13px] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]"
              >
                Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[13px] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]"
              >
                Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[13px] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]"
              >
                Password
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-[16px] text-black bg-white px-4 sm:py-3 py-2 rounded-[20px] font-medium transition-all duration-300 hover:bg-white/90 mt-2 sm:mt-4"
            >
              Create Account
            </button>

            {/* Link to Login */}
            <p className="text-text-muted text-[13px] sm:text-[14px] text-center">
              Already have an account?{' '}<br className="sm:hidden" />
              <Link to="/login" className="text-white hover:underline transition-colors duration-300">
                Sign in
              </Link>
            </p>
          </form>

        </div>
      </section>
      {error && <p className="text-red-400 text-[14px]">{error}</p>}
    </>
  )
}

export default SignUp