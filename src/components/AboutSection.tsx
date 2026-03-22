import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GraduationCap, Trophy, Rocket, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { value: "2nd", label: "Hackathon Rank", icon: <Trophy className="w-5 h-5" /> },
    { value: "91%", label: "Class 10 Score", icon: <GraduationCap className="w-5 h-5" /> },
    { value: "87%", label: "Class 12 Score", icon: <GraduationCap className="w-5 h-5" /> },
    { value: "2+", label: "Live Projects", icon: <Rocket className="w-5 h-5" /> },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".about-left", { opacity: 0, x: -60 }, {
                opacity: 1, x: 0, duration: 1.1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
            });
            gsap.fromTo(".about-right", { opacity: 0, x: 60 }, {
                opacity: 1, x: 0, duration: 1.1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
            });
            gsap.fromTo(".stat-card", { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
                scrollTrigger: { trigger: ".stats-row", start: "top 85%" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#FDFBF7] text-[#1A1A1A] w-full relative z-30 border-t border-gray-200"
        >
            {/* Section Label */}
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-8 md:mb-16 font-semibold">About Me</p>

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

                {/* LEFT — Big Statement */}
                <div className="about-left lg:w-1/2 flex flex-col gap-8">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif italic leading-tight text-[#9A1B1E]">
                        Building where Data<br />meets Experience.
                    </h2>

                    {/* Stats Row */}
                    <div className="stats-row grid grid-cols-2 gap-4 mt-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="stat-card bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-2 hover:border-[#9A1B1E] hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-2 text-[#9A1B1E] group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <p className="text-4xl font-black tracking-tight">{stat.value}</p>
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Openness to Internship Badge */}
                    <div className="flex items-center gap-3 w-fit bg-[#9A1B1E]/10 border border-[#9A1B1E]/30 text-[#9A1B1E] px-5 py-3 rounded-full font-bold text-sm tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-[#9A1B1E] animate-pulse"></span>
                        Open to Internships & Collaborations
                    </div>
                </div>

                {/* RIGHT — Bio Text */}
                <div className="about-right lg:w-1/2 flex flex-col gap-8 pt-2">

                    <div className="flex flex-col gap-5 text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                        <p>
                            I'm a <span className="font-bold text-[#1A1A1A]">B.Tech Computer Science (Data Science)</span> student at <span className="font-bold text-[#1A1A1A]">GLA University</span>, focused on building data-driven applications and intelligent systems that solve real problems.
                        </p>
                        <p>
                            My work sits at the intersection of <span className="font-bold text-[#1A1A1A]">web development and machine learning</span>. I've built production-grade tools using JavaScript, Python, and real-time APIs — including a stock prediction app powered by a <span className="font-bold text-[#1A1A1A]">Random Forest model</span> that earned me <span className="font-bold text-[#9A1B1E]">2nd place in a startup hackathon</span>.
                        </p>
                        <p>
                            Right now, I'm sharpening my foundations in <span className="font-bold text-[#1A1A1A]">DSA with Java</span> and diving into backend development — because I want to build systems that are not just smart, but also <span className="font-bold text-[#1A1A1A]">complete and scalable</span>.
                        </p>
                        <p>
                            My goal is simple: <span className="font-bold text-[#1A1A1A]">create products that bridge data and experience</span> — things that actually get used, not just submitted.
                        </p>
                    </div>

                    {/* CTA */}
                    <a
                        href="mailto:adarshengsingh@gmail.com"
                        className="group flex items-center gap-3 w-fit text-lg font-bold border-b-2 border-[#1A1A1A] pb-1 hover:text-[#9A1B1E] hover:border-[#9A1B1E] transition-all duration-300 mt-4"
                    >
                        Let's connect
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
