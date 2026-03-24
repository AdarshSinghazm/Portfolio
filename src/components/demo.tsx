import InfiniteGallery from "@/components/ui/3d-gallery-photography";

export default function DemoOne() {
    const sampleImages = [
        { src: '/p1.jpeg', alt: 'Photo 1' },
        { src: '/p2.jpeg', alt: 'Photo 2' },
        { src: '/p3.jpeg', alt: 'Photo 3' },
        { src: '/p4.jpeg', alt: 'Photo 4' },
        { src: '/p5.jpeg', alt: 'Photo 5' },
        { src: '/new1.jpeg', alt: 'New Photo 1' },
        { src: '/new2.jpeg', alt: 'New Photo 2' },
        { src: '/new3.jpeg', alt: 'New Photo 3' },
        { src: '/new4.jpeg', alt: 'New Photo 4' },
        { src: '/new5.jpeg', alt: 'New Photo 5' },
        { src: '/new6.jpeg', alt: 'New Photo 6' },
        { src: '/new7.jpeg', alt: 'New Photo 7' },
        { src: '/new8.jpeg', alt: 'New Photo 8' },
    ];

    return (
        <section className="relative w-full h-screen bg-[#FDFBF7] z-20 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <InfiniteGallery
                    images={sampleImages}
                    speed={1.2}
                    zSpacing={3}
                    visibleCount={12}
                    falloff={{ near: 0.8, far: 14 }}
                    className="w-full h-full"
                />
            </div>

            {/* Centered Silver Text Overlay */}
            <h2
                className="absolute z-10 pointer-events-none mix-blend-difference text-center text-6xl md:text-10xl text-transparent bg-clip-text font-serif italic font-bold m-0 p-0 leading-none px-4"
                style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontFamily: "'Great Vibes', cursive",
                    backgroundImage: "linear-gradient(to right, #B0B0B0 0%, #FFFFFF 50%, #B0B0B0 100%)",
                    filter: "drop-shadow(0px 2px 12px rgba(255,255,255,0.28))"
                }}
            >
                My Photography
            </h2>

        </section>
    );
}
