// src/pages/ContactPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          subject: `🚀 [PK Portfolio] New Message from ${contactForm.name}`,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-darkwrap text-white px-6 sm:px-12 py-12 max-w-[1440px] mx-auto font-sans">
      <div className="flex items-center justify-between pb-8 mb-12 border-hairline-t-dark border-hairline-b">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
        >
          <span>← Back to Index</span>
        </Link>
        <span className="text-xs font-mono text-neutral-400">Initiate Contact</span>
      </div>

      <div className="mb-16 space-y-4">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h1 className="text-editorial-lg font-serif text-white tracking-tight">
            C<i>o</i>nt<i>a</i>ct
          </h1>
          <div className="hidden md:block flex-1 h-px bg-white/10 self-center mx-6"></div>
          <h1 className="text-editorial-lg font-serif text-white tracking-tight md:text-right">
            Dir<i>e</i>ct
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto pb-20">
        <div className="lg:col-span-5 space-y-8">
          <p className="text-2xl sm:text-3xl font-serif leading-snug">
            Feel free to reach out to collaborate on new products, discuss design engineering, or start a project.
          </p>

          <div className="space-y-3 font-mono text-xs text-neutral-400">
            <p className="font-bold uppercase tracking-widest text-white">Direct Channels</p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:godzk25@gmail.com"
                className="text-white hover:text-cassette-red transition-colors flex items-center justify-between py-2 border-b border-white/10"
              >
                <span>Email: godzk25@gmail.com</span>
                <span>↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/phakaphol-dhera/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-cassette-blue transition-colors flex items-center justify-between py-2 border-b border-white/10"
              >
                <span>LinkedIn Profile</span>
                <span>↗</span>
              </a>
              <a
                href="https://github.com/PhakapholDherachaisuphakij"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-cassette-yellow transition-colors flex items-center justify-between py-2 border-b border-white/10"
              >
                <span>GitHub Repository</span>
                <span>↗</span>
              </a>
              <a
                href="https://www.borntodev.com/author/godzk25gmail-com/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#ff7700] transition-colors flex items-center justify-between py-2 border-b border-white/10"
              >
                <span>Borntodev Technical Blog</span>
                <span>↗</span>
              </a>
              <a
                href="https://www.facebook.com/phakaphol.dherachaisuphakij/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#1877f2] transition-colors flex items-center justify-between py-2 border-b border-white/10"
              >
                <span>Facebook Profile</span>
                <span>↗</span>
              </a>
              <a
                href="https://www.instagram.com/pk._tcsk/"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#dd2a7b] transition-colors flex items-center justify-between py-2 border-b border-white/10"
              >
                <span>Instagram @pk._tcsk</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-4 bg-darkwrap-card p-8 rounded-3xl border border-white/10">
            {submitStatus === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs text-center border border-emerald-500/30">
                Message dispatched successfully!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 rounded-xl bg-rose-500/20 text-rose-300 font-mono text-xs text-center border border-rose-500/30">
                Failed to transmit. Please email directly to godzk25@gmail.com
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase">Your Name</label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                placeholder="Phakaphol"
                className="w-full bg-darkwrap border border-white/10 rounded-xl px-4 py-3.5 text-xs font-mono text-white focus:outline-none focus:border-cassette-yellow"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase">Your Email</label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                placeholder="name@domain.com"
                className="w-full bg-darkwrap border border-white/10 rounded-xl px-4 py-3.5 text-xs font-mono text-white focus:outline-none focus:border-cassette-yellow"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400 uppercase">Message</label>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="w-full bg-darkwrap border border-white/10 rounded-xl p-4 text-xs font-mono text-white focus:outline-none focus:border-cassette-yellow resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-cassette-red hover:brightness-110 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
