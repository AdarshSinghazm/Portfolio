import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        id: 1,
        role: "Hackathon Finalist (2nd Rank)",
        company: "Startup Hackathon – GLA University",
        period: "2025",
        description: "Built a stock prediction web application using Yahoo Finance API and a Random Forest machine learning model. Developed the frontend using HTML, CSS, and JavaScript, and implemented real-time data visualization.",
        images: [
            "/hackathon1.jpeg",
            "/hackathon2.jpeg",
            "/hackathon3.jpeg"
        ]
    },
    {
        id: 2,
        role: "Self-Employed Developer",
        company: "Personal Projects",
        period: "2024 - Present",
        description: "Developing web applications and machine learning projects. Currently focusing on Data Structures and Algorithms in Java and improving problem-solving skills.",
    }
];

export default function Experiences() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".exp-header",
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            if (listRef.current) {
                const items = listRef.current.children;
                gsap.fromTo(items,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: listRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-24 bg-[#FDFBF7] text-[#1A1A1A] w-full relative z-30 border-t border-gray-200">
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24">

                <div className="w-full lg:w-1/3 exp-header">
                    <p className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-semibold">Career</p>
                    <h2 className="text-5xl md:text-7xl font-bold font-serif italic mb-8 text-[#9A1B1E]">Work<br />Experience</h2>
                    <p className="text-gray-600 leading-relaxed text-lg max-w-sm">
                        A timeline of my professional journey, building tools and experiences for millions of users worldwide.
                    </p>
                </div>

                <div ref={listRef} className="w-full lg:w-2/3 flex flex-col pt-8">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.id}
                            className={`flex flex-col md:flex-row gap-4 md:gap-12 py-10 interactable group cursor-pointer ${index !== experiences.length - 1 ? 'border-b border-gray-200' : ''}`}
                        >
                            <div className="md:w-1/4 pt-1">
                                <span className="text-gray-500 font-serif italic text-lg font-medium">{exp.period}</span>
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="text-3xl font-bold mb-2 group-hover:text-[#9A1B1E] transition-colors">{exp.role}</h3>
                                <h4 className="text-xl text-gray-500 mb-6 group-hover:text-black transition-colors">{exp.company}</h4>
                                <p className="text-gray-600 leading-relaxed max-w-2xl group-hover:text-black transition-colors pb-6">
                                    {exp.description}
                                </p>
                                {exp.images && (
                                    <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
                                        {exp.images.map((img, i) => (
                                            <img 
                                                key={i} 
                                                src={img} 
                                                alt={`Hackathon capture ${i+1}`} 
                                                className="w-48 h-32 md:w-64 md:h-48 object-cover rounded-xl border border-gray-200 snap-center hover:border-[#9A1B1E] transition-colors shadow-md"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
