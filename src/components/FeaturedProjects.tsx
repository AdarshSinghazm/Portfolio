import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "NiveshAI",
        category: "AI / Machine Learning / FinTech",
        description: "AI-powered stock analysis and portfolio optimization platform. Backtested on 6-month NSE data with real-time market intelligence.",
        image: "/niveshai_preview.png",
        year: "2025",
        link: "https://nivesh-ai-lake.vercel.app/",
        tags: ["Python", "React", "ML", "NSE API"]
    },
    {
        id: 2,
        title: "Project 2",
        category: "Under Development",
        description: "Something new is being built. A full-stack project combining machine learning and modern web tech. Dropping soon.",
        image: null,
        year: "2025",
        link: "#",
        tags: ["Coming Soon", "ML", "Full Stack"],
        comingSoon: true,
    }
];

export default function FeaturedProjects() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Header
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Animate Project Cards
            if (projectsRef.current) {
                const cards = projectsRef.current.children;
                gsap.fromTo(cards,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: projectsRef.current,
                            start: "top 85%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-[#FDFBF7] text-[#1A1A1A] w-full relative z-30">
            <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
                <div>
                    <p className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-semibold">Selected Work</p>
                    <h2 className="text-5xl md:text-7xl font-bold italic font-serif tracking-tight text-[#9A1B1E]">Featured<br />Projects</h2>
                </div>
                <button className="interactable mt-8 md:mt-0 group flex items-center gap-3 text-lg border-b border-[#1A1A1A] pb-1 hover:text-[#9A1B1E] hover:border-[#9A1B1E] transition-colors">
                    View All Work
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>

            <div ref={projectsRef} className="flex flex-col gap-16 md:gap-32">
                {projects.map((project, index) => (
                    <div key={project.id} className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-col-reverse lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center group interactable cursor-pointer`}>
                        <a href={project.link} target="_blank" rel="noreferrer" className="w-full lg:w-3/5 overflow-hidden rounded-2xl shadow-xl block">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-[400px] md:h-[550px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-[400px] md:h-[550px] bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center gap-6 border-2 border-dashed border-gray-300 group-hover:border-[#9A1B1E] transition-colors duration-500 rounded-2xl">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-4 h-4 rounded-full bg-[#9A1B1E] animate-ping opacity-60"></div>
                                        <p className="text-2xl font-black tracking-widest uppercase text-gray-400 group-hover:text-[#9A1B1E] transition-colors">Under Development</p>
                                        <p className="text-gray-400 text-sm font-semibold tracking-wider uppercase">Coming Soon</p>
                                    </div>
                                </div>
                            )}
                        </a>
                        <div className="w-full lg:w-2/5 flex flex-col justify-center gap-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[#9A1B1E] tracking-wider text-sm font-bold uppercase">{project.category}</span>
                                <span className="text-gray-400 font-serif italic">{project.year}</span>
                            </div>
                            <h3 className="text-4xl md:text-5xl font-bold group-hover:text-[#9A1B1E] transition-colors">{project.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-lg">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">{tag}</span>
                                ))}
                            </div>
                            <a href={project.link} target="_blank" rel="noreferrer" className="mt-4 w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-[#9A1B1E] group-hover:text-white group-hover:border-[#9A1B1E] transition-all shadow-sm">
                                <ArrowUpRight className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
