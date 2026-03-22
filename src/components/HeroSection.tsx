import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Code2, Database, BrainCircuit, Terminal, LineChart, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Massive text entrance
            gsap.fromTo(
                ".massive-text span",
                { y: 150, opacity: 0, skewY: 10 },
                { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.1, ease: "power4.out", delay: 0.2 }
            );

            // Center image entrance
            gsap.fromTo(
                ".center-photo",
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "expo.out", delay: 0.6 }
            );

            // Left/Right content fade in
            gsap.fromTo(
                ".side-fade",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 1 }
            );

            // Bottom banner scroll loop
            gsap.to(".marquee-content", {
                xPercent: -50,
                ease: "none",
                duration: 20,
                repeat: -1
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const scrollToWork = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#FDFBF7] overflow-hidden flex flex-col justify-between pt-8 pb-0 text-[#1A1A1A] font-sans">
            
            {/* Top Navbar Area */}
            <div className="side-fade w-full px-8 md:px-16 flex justify-between items-center z-20">
                <div className="font-bold tracking-widest text-sm flex items-center gap-2">
                    <span className="text-xl">✺</span> ADARSH
                </div>
                {/* Nav Links */}
                <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-600">
                    <a href="#about" className="hover:text-black transition-colors">About</a>
                    <a href="#portfolio" className="hover:text-black transition-colors">Portfolio</a>
                    <a href="#contact" className="hover:text-black transition-colors">Contact</a>
                </div>

                {/* Right: Status + Theme Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#9A1B1E] hover:text-[#9A1B1E] transition-all duration-300"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </button>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-bold">Open to work</span>
                    </div>
                </div>
            </div>

            {/* Massive Background Text */}
            <div className="absolute top-[40%] md:top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none overflow-hidden">
                <h1 className="massive-text text-[20vw] md:text-[22vw] leading-[0.8] font-black tracking-tighter text-[#9A1B1E] uppercase flex justify-center gap-4 whitespace-nowrap">
                    <span className="inline-block">ADARSH</span>
                </h1>
            </div>

            {/* Central Layout — Mobile: stacked column, Desktop: three columns */}
            <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-between px-4 md:px-24 mt-4 md:mt-24 gap-6 md:gap-0">
                
                {/* Left Side: Bio — hidden on mobile, shown on desktop */}
                <div className="side-fade hidden md:flex w-full md:w-1/3 flex-col gap-6 md:order-1 md:mt-40 lg:mt-64 text-left bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-2xl relative z-10">
                    <p className="text-xl md:text-2xl font-medium leading-relaxed text-[#2A2A2A] max-w-sm drop-shadow-sm">
                        Hey there! I'm a Data Scientist & Machine Learning Engineer building predictive models and intelligent web apps.
                    </p>
                    <button 
                        onClick={scrollToWork}
                        className="group flex w-max items-center gap-2 text-md font-bold tracking-widest uppercase hover:text-[#9A1B1E] transition-colors"
                    >
                        // View Projects
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>

                {/* Center: Photo Container */}
                <div className="center-photo w-full md:w-1/3 flex justify-center items-center md:order-2 relative h-[45vh] md:h-[65vh]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(#d1cfc7_1px,transparent_1px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] z-[-1]"></div>
                    <div 
                        className="relative w-full max-w-[280px] md:max-w-[400px] h-[95%] hover:scale-[1.02] transition-transform duration-500"
                        style={{
                            maskImage: ["linear-gradient(to bottom, transparent 0%, black 12%, black 58%, transparent 96%)", "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)"].join(", "),
                            WebkitMaskImage: ["linear-gradient(to bottom, transparent 0%, black 12%, black 58%, transparent 96%)", "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)"].join(", "),
                            maskComposite: "intersect",
                            WebkitMaskComposite: "source-in"
                        }}
                    >
                        <img 
                            src="/profile.jpeg" 
                            alt="Adarsh Singh" 
                            className="w-full h-full object-cover"
                            style={{ objectPosition: "50% 20%" }}
                        />
                    </div>
                </div>

                {/* Right Side: Skills — hidden on mobile */}
                <div className="side-fade hidden md:flex w-full md:w-1/3 flex-col items-end gap-4 md:order-3 md:mt-40 lg:mt-64 relative z-10">
                    <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl border border-white/50 shadow-2xl">
                        <ul className="text-xl text-right font-medium flex flex-col gap-4 drop-shadow-sm">
                            <li className="text-gray-500 hover:text-black transition-colors cursor-pointer">Machine Learning</li>
                            <li className="text-[#9A1B1E] font-bold">Data Science</li>
                            <li className="text-gray-500 hover:text-black transition-colors cursor-pointer">React / Web Dev</li>
                            <li className="text-gray-500 hover:text-black transition-colors cursor-pointer">Algorithms</li>
                        </ul>
                    </div>
                </div>

                {/* Mobile-only: compact bio below the photo */}
                <div className="flex md:hidden flex-col items-center text-center gap-4 px-4 pb-4 z-10">
                    <p className="text-base font-medium leading-relaxed text-[#2A2A2A]">
                        Data Scientist & ML Engineer — building predictive models and intelligent web apps.
                    </p>
                    <button 
                        onClick={scrollToWork}
                        className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#9A1B1E]"
                    >
                        // View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Bottom Marquee / Technologies */}
            <div className="side-fade w-full border-t border-gray-200 mt-auto bg-white py-6 overflow-hidden flex z-20">
                <div className="marquee-content flex gap-16 md:gap-32 items-center min-w-max px-8">
                    {/* First Loop */}
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Terminal className="w-6 h-6"/> PYTHON</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Code2 className="w-6 h-6"/> JAVA</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Code2 className="w-6 h-6"/> C</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Database className="w-6 h-6"/> SQL</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Database className="w-6 h-6"/> POSTGRESQL</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><BrainCircuit className="w-6 h-6"/> MACHINE LEARNING</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><BrainCircuit className="w-6 h-6"/> TENSORFLOW</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><LineChart className="w-6 h-6"/> DATA ANALYSIS</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Code2 className="w-6 h-6"/> REACT.JS</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Code2 className="w-6 h-6"/> FRONTEND DEV</div>
                    {/* Duplicate for seamless looping */}
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Terminal className="w-6 h-6"/> PYTHON</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Code2 className="w-6 h-6"/> JAVA</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Code2 className="w-6 h-6"/> C</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Database className="w-6 h-6"/> SQL</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Database className="w-6 h-6"/> POSTGRESQL</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><BrainCircuit className="w-6 h-6"/> MACHINE LEARNING</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><BrainCircuit className="w-6 h-6"/> TENSORFLOW</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><LineChart className="w-6 h-6"/> DATA ANALYSIS</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Code2 className="w-6 h-6"/> REACT.JS</div>
                    <div className="flex items-center gap-3 text-gray-500 font-bold tracking-widest"><Code2 className="w-6 h-6"/> FRONTEND DEV</div>
                </div>
            </div>
            
            {/* Blend transition to the dark sections below - REMOVED since entire site is light */}
            <div className="absolute -bottom-1 left-0 w-full h-8 bg-[#FDFBF7] z-10 pointer-events-none"></div>
        </section>
    );
}
