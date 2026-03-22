import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer id="contact" ref={footerRef} className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#FDFBF7] text-[#1A1A1A] w-full relative z-30 overflow-hidden rounded-t-[3rem] border-t border-gray-300 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="flex flex-col items-center justify-center text-center mb-20 md:mb-32">
                <p className="text-gray-500 tracking-widest uppercase text-sm font-semibold mb-6">Have an idea?</p>
                <h2 ref={textRef} className="text-[3rem] sm:text-6xl md:text-[8rem] lg:text-[10rem] font-bold tracking-tighter leading-none interactable hover:text-[#9A1B1E] transition-colors cursor-pointer text-[#1A1A1A]">
                    Let's Talk
                </h2>
                <a href="mailto:adarshengsingh@gmail.com" className="mt-8 md:mt-12 text-base md:text-2xl lg:text-4xl font-serif italic border-b border-gray-300 pb-2 hover:border-[#9A1B1E] hover:text-[#9A1B1E] transition-colors interactable break-all text-center">
                    adarshengsingh@gmail.com
                </a>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 flex-wrap gap-4">
                <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
                    <a href="https://github.com/AdarshSinghazm" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#9A1B1E] transition-colors interactable text-sm font-semibold uppercase tracking-wider">GitHub</a>
                    <a href="https://www.linkedin.com/in/adarsh-singh-5729b2325/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#9A1B1E] transition-colors interactable text-sm font-semibold uppercase tracking-wider">LinkedIn</a>
                    <a href="https://www.instagram.com/chiku.adarsh/?hl=en" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#9A1B1E] transition-colors interactable text-sm font-semibold uppercase tracking-wider">Instagram</a>
                </div>

                <div className="flex items-center gap-8">
                    <p className="text-gray-500 text-sm font-medium">© 2026 Adarsh Singh. All rights reserved.</p>
                    <button onClick={scrollToTop} className="interactable text-gray-500 hover:text-[#9A1B1E] transition-colors text-sm font-semibold uppercase tracking-wider hidden md:block">
                        Back to Top ↑
                    </button>
                </div>
            </div>
        </footer>
    );
}
