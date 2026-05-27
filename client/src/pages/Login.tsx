import { useState } from "react";
import { useAuth } from "../context/AuthProvider"
import { Link, useNavigate, Navigate } from "react-router-dom";
import BlockchainBackground from "../components/BlockchainBackground"

const Login = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (isLoggedIn) return <Navigate to="/" replace />

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await login({ username, password })
      navigate('/');
    }
    catch (err: unknown) {
      const message = typeof err === 'object' && err !== null && 'response' in err
        ? ((err as { response?: { data?: { error?: string } } }).response?.data?.error ?? 'Login failed')
        : 'Login failed'
      setError(message)
      alert('Login failed!')
    }
  }

  return (
    <>
      <section className="relative flex items-center justify-center w-full min-h-[calc(100vh-64px)] overflow-hidden">

        <BlockchainBackground />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-md md:max-w-lg lg:max-w-xl w-full mx-auto bg-black/40 border border-border-default rounded-[20px] p-8 md:p-12">

          <h1 className="text-white font-display font-bold text-[36px] md:text-[40px] lg:text-[44px] tracking-[2px] mb-6 text-center">
            Welcome Back
          </h1>

          <p className="text-text-muted text-[14px] md:text-[15px] lg:text-[16px] text-center mb-10">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={e => { setUsername(e.target.value) }}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
              />
              <label htmlFor="username" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                Username
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => { setPassword(e.target.value) }}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
              />
              <label htmlFor="password" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                Password
              </label>
            </div>

            <button
              type="submit"
              className="w-full text-[14px] md:text-[16px] text-black bg-white px-4 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/90 mt-4"
            >
              Sign In
            </button>
          </form>

          <p className="text-text-muted text-[13px] text-center mt-8">
            Don't have an account?{' '}
            <Link to="/create-account" className="text-white hover:underline">Sign up</Link>
          </p>

        </div>
      </section>

      {/* Error Handler */}
      {error && <p className="text-red-400 text-[14px]">{error}</p>}
    </>
  )
}

export default Login