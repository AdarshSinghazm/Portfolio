import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Rocket, Brain, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
    {
        id: 1,
        icon: <Rocket className="w-8 h-8" />,
        headline: "I learn by building.",
        body: "Theory is where it starts. But for me, the real learning happens when I take an idea and ship it. NiveshAI didn't start with a perfect plan — it started with curiosity and code."
    },
    {
        id: 2,
        icon: <Brain className="w-8 h-8" />,
        headline: "Data-driven in everything.",
        body: "Whether I'm debugging a model or designing a UI, I follow the data. I don't guess — I measure, test, and iterate. Precision matters more to me than speed."
    },
    {
        id: 3,
        icon: <Cpu className="w-8 h-8" />,
        headline: "I ship real, working products.",
        body: "A portfolio without deployed projects is just theory. Every project I build is live, tested, and actually usable. If it isn't deployed, it isn't done."
    }
];

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".values-header",
                { opacity: 0, y: 30 },
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

            if (containerRef.current) {
                gsap.fromTo(
                    containerRef.current.children,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#FDFBF7] text-[#1A1A1A] w-full relative z-30 border-t border-gray-200">
            <div className="flex flex-col items-center text-center mb-16 md:mb-24 values-header">
                <p className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-semibold">My Philosophy</p>
                <h2 className="text-5xl md:text-7xl font-bold font-serif italic max-w-3xl text-[#9A1B1E]">What defines me</h2>
            </div>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((item) => (
                    <div
                        key={item.id}
                        className="interactable bg-white p-10 rounded-[2rem] border border-gray-200 hover:border-[#9A1B1E] hover:shadow-2xl transition-all duration-500 group flex flex-col gap-6"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[#9A1B1E]/10 flex items-center justify-center text-[#9A1B1E] group-hover:bg-[#9A1B1E] group-hover:text-white transition-all duration-300">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-[#9A1B1E] transition-colors">
                            {item.headline}
                        </h3>
                        <p className="text-gray-500 leading-relaxed text-lg">
                            {item.body}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
