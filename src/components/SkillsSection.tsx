import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Code2, Database, Globe, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
    {
        icon: <Code2 className="w-6 h-6" />,
        title: "Languages",
        color: "#9A1B1E",
        skills: ["Python", "Java", "C"],
    },
    {
        icon: <Database className="w-6 h-6" />,
        title: "Data & ML",
        color: "#9A1B1E",
        skills: ["Machine Learning", "NumPy", "Pandas", "SQL", "PostgreSQL", "MongoDB"],
    },
    {
        icon: <Globe className="w-6 h-6" />,
        title: "Frontend",
        color: "#9A1B1E",
        skills: ["HTML", "CSS", "JavaScript"],
    },
    {
        icon: <Wrench className="w-6 h-6" />,
        title: "Tools",
        color: "#9A1B1E",
        skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA"],
    },
];

export default function SkillsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".skills-header", { opacity: 0, y: 30 }, {
                opacity: 1, y: 0, duration: 1, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
            });
            gsap.fromTo(".skill-card", { opacity: 0, y: 50 }, {
                opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
                scrollTrigger: { trigger: ".skills-grid", start: "top 80%" }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#FDFBF7] text-[#1A1A1A] w-full relative z-30 border-t border-gray-200"
        >
            {/* Header */}
            <div className="skills-header flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
                <div>
                    <p className="text-gray-500 uppercase tracking-widest text-sm mb-3 font-semibold">What I Work With</p>
                    <h2 className="text-5xl md:text-7xl font-bold font-serif italic text-[#9A1B1E]">Skills</h2>
                </div>
                <p className="text-gray-500 text-lg max-w-sm leading-relaxed">
                    A focused set of tools I use to build intelligent, data-driven applications.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillGroups.map((group) => (
                    <div
                        key={group.title}
                        className="skill-card interactable bg-white border border-gray-200 rounded-[1.75rem] p-7 flex flex-col gap-5 hover:border-[#9A1B1E] hover:shadow-2xl transition-all duration-400 group"
                    >
                        {/* Card Header */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[#9A1B1E]/10 flex items-center justify-center text-[#9A1B1E] group-hover:bg-[#9A1B1E] group-hover:text-white transition-all duration-300">
                                {group.icon}
                            </div>
                            <h3 className="font-bold text-xl tracking-tight">{group.title}</h3>
                        </div>

                        {/* Skill Chips */}
                        <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="text-sm font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 group-hover:border-[#9A1B1E]/20 group-hover:bg-[#9A1B1E]/5 group-hover:text-[#9A1B1E] transition-all duration-300"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
