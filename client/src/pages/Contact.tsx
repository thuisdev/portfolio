import { useState } from 'react'
import emailjs from '@emailjs/browser'
import BlockchainBackground from "../components/BlockchainBackground"

const Contact = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: `${firstName} ${lastName}`,
          email: email,
          message: message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      alert('Message sent successfully!')
      setFirstName(''); setLastName(''); setEmail(''); setMessage('')
    } catch (error) {
      alert('Failed to send message')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <section className="relative flex items-center justify-center w-full py-16 px-5 md:px-8 min-h-[calc(100vh-64px)] overflow-hidden">

        <BlockchainBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 bg-black/40 border border-border-default rounded-[20px] p-8 md:p-12">

          {/* Info */}
          <div className="flex flex-col justify-between md:w-1/2">
            <div>
              <h1 className="text-white font-display font-bold text-[36px] md:text-[44px] tracking-[2px] mb-6 text-left">
                Get in touch with me!
              </h1>
              <p className="text-text-muted text-[16px] leading-relaxed mb-10 text-left">
                Have a project in mind or just want to say hello? I'm always open to new opportunities, collaborations, and interesting conversations. Drop me a message and I'll get back to you!
              </p>
            </div>
            <ul className="flex gap-6 text-[36px] md:text-[48px] justify-center md:justify-start">
              <li><a href="https://github.com/thuisdev" target="_blank" aria-label="GitHub"><i className="devicon-github-original text-text-muted hover:text-brand/50 transition-colors duration-300"></i></a></li>
              <li><a href="https://x.com/thuisondev" target="_blank" aria-label="X"><i className="devicon-twitter-original text-text-muted hover:text-brand/50 transition-colors duration-300"></i></a></li>
              <li><a href="https://www.linkedin.com/in/adrian-t-3b64172a4/?locale=de" target="_blank" aria-label="LinkedIn"><i className="devicon-linkedin-plain text-text-muted hover:text-brand/50 transition-colors duration-300"></i></a></li>
              <li><a href="https://mail.google.com/mail/?view=cm&to=adrian.thuis04@gmail.com" aria-label="E-Mail"><i className="text-text-muted hover:text-brand/50 transition-colors duration-300">✉</i></a></li>
            </ul>
          </div>

          {/* Form */}
          <div className="md:w-1/2 bg-black/40 border border-border-default rounded-[12px] p-6 md:p-8 flex flex-col gap-6">
            <h2 className="font-display text-text-strong text-[22px] font-semibold text-left">Contact me</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div className="flex gap-4">
                <div className="relative w-1/2">
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
                  />
                  <label htmlFor="firstName" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[13px] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                    First Name
                  </label>
                </div>
                <div className="relative w-1/2">
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    placeholder=" "
                    required
                    className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
                  />
                  <label htmlFor="lastName" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[13px] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                    Last Name
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300"
                />
                <label htmlFor="email" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[13px] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                  Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={4}
                  placeholder=" "
                  required
                  className="peer w-full bg-transparent border-b border-border-default text-text-body text-[14px] pt-5 pb-2 outline-none focus:border-white transition-colors duration-300 resize-none"
                />
                <label htmlFor="message" className="absolute left-0 top-5 text-text-muted text-[13px] transition-all duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-[13px] peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-white peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[11px]">
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full text-[14px] md:text-[16px] text-black bg-white px-4 py-3 rounded-full font-medium transition-all duration-300 hover:bg-white/90 disabled:opacity-50 mt-2"
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>

        </div>
      </section>
    </>
  )
}

export default Contact