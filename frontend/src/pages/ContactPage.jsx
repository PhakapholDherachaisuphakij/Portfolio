import { useState } from "react";
import { Link } from "react-router-dom";
import { socialLinks } from "../data/Data";

const name = "Phakaphol";
const nickname = "PK";
const description =
  "I build playful & interactive web experiences that make the internet feel a little more fun.";

const renderSocialLogo = (social) => {
  const logos = {
    github:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    ig: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    Facebook:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg",
    Borntodev:
      "https://imgs.search.brave.com/ddpvfJJGQdC_7DWqFg0qp2a372PS_wC7WPomhXsM3OY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXNv/dXJjZS5za2lsbGxh/bmUuY29tL3VzZXJz/L2ltYWdlcy8wMDEv/NzQ3LzUyNi9tZWRp/dW0vMzgwMzMzNTRf/MTkwNDI4Nzg3OTYy/OTQ5Nl8xNTY1NzAx/NzYxOTI5MzE0MzA0/X24ucG5nPzE2Mjkz/NzE4MTY",
  };

  if (logos[social.id]) {
    return (
      <img
        src={logos[social.id]}
        alt={social.name}
        className="size-8 object-contain group-hover:scale-110 transition-transform"
      />
    );
  }
  return (
    <span className="material-symbols-outlined text-3xl">{social.icon}</span>
  );
};

export default function ContactPage() {
  // 1. สร้าง State มารับค่าจาก Form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State สำหรับเช็คว่ากำลังโหลดส่งข้อมูลอยู่ไหม
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State สำหรับแสดงผลลัพธ์ (สำเร็จ/ไม่สำเร็จ)
  const [submitResult, setSubmitResult] = useState(null);

  // ฟังก์ชันอัปเดตค่าเมื่อพิมพ์ข้อความ
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // 2. ฟังก์ชันส่งข้อมูลเข้า Web3Forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `🚀 New Contact from ${formData.name} via PK.dev!`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitResult("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitResult("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitResult("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-6 max-w-7xl mx-auto flex flex-col text-[#111813] dark:text-white font-display overflow-x-hidden">
      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111813] dark:text-white leading-tight tracking-tight">
                Let's build something{" "}
                <span className="text-primary inline-block transform hover:rotate-2 transition-transform cursor-default">
                  together!
                </span>
              </h1>
              <p className="text-lg text-[#4b5563] dark:text-slate-300 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                {description}
              </p>
            </div>

            <div className="relative w-full aspect-square max-w-[400px] mx-auto lg:mx-0 animate-float order-first lg:order-last mb-6 lg:mb-0">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-75 translate-y-10"></div>
              <img
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=PK"
                alt="Playful mascot waving hello"
                className="w-full h-full object-contain drop-shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="hidden lg:flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center w-14 h-14 bg-white dark:bg-surface-dark rounded-2xl border-2 border-gray-100 dark:border-slate-600 text-[#4b5563] dark:text-slate-300 hover:text-primary hover:border-primary transition-all shadow-sm hover:translate-y-[-4px]"
                >
                  {renderSocialLogo(social)}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="order-1 lg:order-2 w-full">
            <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 sm:p-10 shadow-card border-2 border-border-color relative overflow-hidden transition-all hover:border-primary">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>

              <form
                className="flex flex-col gap-6 relative z-10"
                onSubmit={handleSubmit}
              >
                {/* Alert ข้อความแจ้งเตือนเมื่อส่งสำเร็จ หรือ ไม่สำเร็จ */}
                {submitResult === "success" && (
                  <div className="p-4 bg-green-100 text-green-700 rounded-xl border-2 border-green-200 font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    Your message has been sent successfully!
                  </div>
                )}
                {submitResult === "error" && (
                  <div className="p-4 bg-red-100 text-red-700 rounded-xl border-2 border-red-200 font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    Something went wrong. Please try again.
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <label
                    className="text-[#111813] dark:text-white text-sm font-bold uppercase tracking-wide ml-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-primary transition-colors">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="What's your name?"
                      className="input-playful w-full bg-[#f5f8f6] dark:bg-background-dark border-2 border-transparent text-[#111813] dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-lg font-medium rounded-2xl py-4 pl-12 pr-4 focus:bg-white dark:focus:bg-surface-dark focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    className="text-[#111813] dark:text-white text-sm font-bold uppercase tracking-wide ml-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within/input:text-primary transition-colors">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Where can I reach you?"
                      className="input-playful w-full bg-[#f5f8f6] dark:bg-background-dark border-2 border-transparent text-[#111813] dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-lg font-medium rounded-2xl py-4 pl-12 pr-4 focus:bg-white dark:focus:bg-surface-dark focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    className="text-[#111813] dark:text-white text-sm font-bold uppercase tracking-wide ml-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your idea..."
                    rows={4}
                    className="input-playful w-full bg-[#f5f8f6] dark:bg-background-dark border-2 border-transparent text-[#111813] dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-lg font-medium rounded-2xl p-4 focus:bg-white dark:focus:bg-surface-dark focus:border-primary transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-primary text-white border-b-4 border-primary-dark text-lg font-black uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 mt-2 transition-all 
                  ${isSubmitting ? "opacity-70 cursor-not-allowed border-b-0 translate-y-[4px]" : "hover:brightness-105 active:border-b-0 active:translate-y-[4px]"}`}
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  {!isSubmitting && (
                    <span className="material-symbols-outlined font-bold">
                      send
                    </span>
                  )}
                  {isSubmitting && (
                    <span className="material-symbols-outlined font-bold animate-spin">
                      progress_activity
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Social Mobile */}
            <div className="flex lg:hidden justify-center gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-white dark:bg-surface-dark rounded-xl border-2 border-gray-100 dark:border-slate-600 text-[#4b5563] dark:text-slate-300 hover:text-primary transition-all shadow-sm"
                >
                  {renderSocialLogo(social)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
