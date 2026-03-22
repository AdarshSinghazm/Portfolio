import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Award, BookOpen, Hexagon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const qualifications = [
    {
        id: 1,
        title: "B.Tech in CS (Data Science)",
        institution: "GLA University",
        year: "2024 - 2028",
        description: "Pursuing Bachelor of Technology with a specialization in Data Science.",
        icon: <BookOpen className="w-6 h-6" />
    },
    {
        id: 2,
        title: "Higher Secondary (Class 12)",
        institution: "Little Flower Children School, Mau",
        year: "Completed",
        description: "Score: 87%",
        icon: <Hexagon className="w-6 h-6" />
    },
    {
        id: 3,
        title: "Secondary Education (Class 10)",
        institution: "Little Flower Children School, Mau",
        year: "Completed",
        description: "Score: 91%",
        icon: <Award className="w-6 h-6" />
    }
];

export default function Qualifications() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".qual-header",
                { opacity: 0, y: 40 },
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

            if (cardsRef.current) {
                gsap.fromTo(
                    cardsRef.current.children,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#FDFBF7] text-[#1A1A1A] w-full relative z-30">
            <div className="text-center mb-16 md:mb-24 qual-header">
                <p className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-semibold">Education & Certifications</p>
                <h2 className="text-5xl md:text-6xl font-bold font-serif italic text-[#9A1B1E]">Qualifications</h2>
            </div>

            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {qualifications.map((item) => (
                    <div
                        key={item.id}
                        className="interactable bg-[#ffffff] p-8 rounded-2xl border border-gray-200 hover:border-[#9A1B1E] shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
                    >
                        {/* Subtle background shift on hover */}
                        <div className="absolute inset-0 bg-[#FDFBF7] opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="w-14 h-14 bg-[#9A1B1E]/10 rounded-full flex items-center justify-center mb-6 text-[#9A1B1E] group-hover:bg-[#9A1B1E] group-hover:text-white transition-colors duration-300">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-[#9A1B1E] transition-colors">{item.title}</h3>
                        <div className="flex justify-between items-center mb-4 text-sm font-serif italic">
                            <span className="text-gray-500 font-semibold">{item.institution}</span>
                            <span className="text-gray-400">{item.year}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
