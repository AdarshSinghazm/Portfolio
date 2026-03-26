import type React from 'react';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { ChevronUp, ChevronDown } from 'lucide-react';
import * as THREE from 'three';

type ImageItem = string | { src: string; alt?: string };

interface InfiniteGalleryProps {
    images: ImageItem[];
    speed?: number;
    className?: string;
    style?: React.CSSProperties;
    // Keep unused props to avoid breaking consumers
    zSpacing?: number;
    visibleCount?: number;
    falloff?: any;
    fadeSettings?: any;
    blurSettings?: any;
}

const createGridMaterial = () => {
    return new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
            map: { value: null },
            opacity: { value: 1.0 },
            brightness: { value: 1.0 },
            blurAmount: { value: 0.0 },
        },
        vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform sampler2D map;
      uniform float opacity;
      uniform float brightness;
      uniform float blurAmount;
      varying vec2 vUv;
      
      void main() {
        vec4 color = texture2D(map, vUv);
        color.rgb *= brightness;
        
        if (blurAmount > 0.0) {
          vec2 texelSize = 1.0 / vec2(textureSize(map, 0));
          vec4 blurred = vec4(0.0);
          float total = 0.0;
          
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              vec2 offset = vec2(x, y) * texelSize * blurAmount;
              float weight = 1.0 / (1.0 + length(vec2(x, y)));
              blurred += texture2D(map, vUv + offset) * weight;
              total += weight;
            }
          }
          color = blurred / total;
        }
        
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
    });
};

function GridPlane({
    index,
    texture,
    material,
    isActive,
    isDimmed,
    gridPos,
    cameraPos,
    onClick,
}: {
    index: number;
    texture: THREE.Texture;
    material: THREE.ShaderMaterial;
    isActive: boolean;
    isDimmed: boolean;
    gridPos: THREE.Vector3;
    cameraPos: THREE.Vector3;
    onClick: (idx: number) => void;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (material && texture) {
            material.uniforms.map.value = texture;
            texture.colorSpace = THREE.SRGBColorSpace;
        }
    }, [material, texture]);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        // Mobile responsiveness check logic (assuming viewport width ~5-7 units on small screens depending on aspect ratio)
        // We'll pass isMobile as a prop, but here we can just scale based on viewport context from the parent if needed,
        // or just let the parent scale the camera/canvas. For individual plane max-size:
        const isMobile = window.innerWidth < 768;

        const imgAspect = texture.image ? (texture.image as any).width / (texture.image as any).height : 1;

        if (isActive) {
            // Screen-filling size
            const maxW = isMobile ? 4.0 : 6.5;
            const scaleX = imgAspect > 1 ? maxW * imgAspect : maxW;
            const scaleY = imgAspect > 1 ? maxW : maxW / imgAspect;

            // Target perfectly in front of the camera
            // Camera is at Z = 10. We move the plane to Z = 7 relative to the active camera.
            const targetPos = new THREE.Vector3(cameraPos.x, cameraPos.y, isMobile ? 8.0 : 7.5);
            
            meshRef.current.position.lerp(targetPos, delta * 6.0);
            meshRef.current.scale.lerp(new THREE.Vector3(scaleX, scaleY, 1), delta * 6.0);
            
            material.uniforms.opacity.value = THREE.MathUtils.lerp(material.uniforms.opacity.value, 1.0, delta * 6.0);
            material.uniforms.blurAmount.value = THREE.MathUtils.lerp(material.uniforms.blurAmount.value, 0.0, delta * 6.0);
            material.uniforms.brightness.value = THREE.MathUtils.lerp(material.uniforms.brightness.value, 1.0, delta * 6.0);
            meshRef.current.renderOrder = 100;
            material.depthTest = false; // Render entirely on top
        } else {
            // Base Grid Size
            const baseScaleMult = isHovered && !isDimmed ? 1.05 : 1.0;
            const scaleX = (imgAspect > 1 ? 4.0 * imgAspect : 4.0) * baseScaleMult;
            const scaleY = (imgAspect > 1 ? 4.0 : 4.0 / imgAspect) * baseScaleMult;
            
            // Tweak Z popping up slightly on hover if not dimmed
            const targetZ = isHovered && !isDimmed ? gridPos.z + 0.5 : gridPos.z;
            const targetPos = new THREE.Vector3(gridPos.x, gridPos.y, targetZ);

            meshRef.current.position.lerp(targetPos, delta * 6.0);
            meshRef.current.scale.lerp(new THREE.Vector3(scaleX, scaleY, 1), delta * 6.0);

            // Shading and Dimming
            const targetOpacity = isDimmed ? 0.3 : 1.0;
            const targetBlur = isDimmed ? 2.5 : 0.0;
            const targetBrightness = isDimmed ? 0.3 : (isHovered ? 1.1 : 1.0);

            material.uniforms.opacity.value = THREE.MathUtils.lerp(material.uniforms.opacity.value, targetOpacity, delta * 8.0);
            material.uniforms.blurAmount.value = THREE.MathUtils.lerp(material.uniforms.blurAmount.value, targetBlur, delta * 8.0);
            material.uniforms.brightness.value = THREE.MathUtils.lerp(material.uniforms.brightness.value, targetBrightness, delta * 8.0);
            meshRef.current.renderOrder = isHovered ? 10 : 0;
            material.depthTest = true;
        }
    });

    return (
        <mesh
            ref={meshRef}
            material={material}
            onClick={(e) => {
                e.stopPropagation();
                onClick(index);
            }}
            onPointerEnter={(e) => {
                e.stopPropagation();
                if (!isDimmed) {
                    setIsHovered(true);
                    document.body.style.cursor = 'pointer';
                }
            }}
            onPointerLeave={(e) => {
                e.stopPropagation();
                setIsHovered(false);
                document.body.style.cursor = 'auto'; // Reset cursor safely
            }}
        >
            <planeGeometry args={[1, 1, 16, 16]} />
        </mesh>
    );
}

function GridScene({
    images,
    targetScrollY,
    activeId,
    setActiveId,
}: {
    images: ImageItem[];
    targetScrollY: React.MutableRefObject<number>;
    activeId: number | null;
    setActiveId: (id: number | null) => void;
}) {
    const { camera, size } = useThree();
    const isMobile = size.width < 768;
    const isTablet = size.width >= 768 && size.width < 1024;
    
    const normalizedImages = useMemo(
        () => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
        [images]
    );

    const textures = useTexture(normalizedImages.map((img) => img.src));
    const totalImages = textures.length;

    // A unified stable mesh material pool
    const materials = useMemo(
        () => Array.from({ length: totalImages }, () => createGridMaterial()),
        [totalImages]
    );

    // Calculate permanent grid positions for every photo
    const gridCols = isMobile ? 1 : (isTablet ? 2 : 3);
    const spacingX = isMobile ? 0 : 4.5;
    const spacingY = isMobile ? 5.5 : 4.5;
    
    // Center the grid dynamically based on the amount of columns
    const xOffset = -(gridCols - 1) * spacingX * 0.5;

    const gridPositions = useMemo(() => {
        return Array.from({ length: totalImages }).map((_, i) => {
            const col = i % gridCols;
            const row = Math.floor(i / gridCols);
            // On mobile, keep it less twisted for cleaner view
            const twistZ = isMobile ? (Math.random() - 0.5) * 0.08 : (Math.random() - 0.5) * 0.2;
            const depthZ = (Math.random() - 0.5) * 0.5; 
            
            return {
                x: xOffset + col * spacingX,
                y: -row * spacingY,
                z: depthZ,
                rotZ: twistZ,
            };
        });
    }, [totalImages, gridCols, spacingX, spacingY, xOffset, isMobile]);

    // Maximum scroll constraint based on Rows
    const maxRows = Math.ceil(totalImages / gridCols);
    const maxScrollY = Math.max(0, (maxRows - 1) * spacingY);

    const scrollY = useRef(0);

    useFrame((_, delta) => {
        // Enforce scroll bounds cleanly
        targetScrollY.current = Math.max(0, Math.min(targetScrollY.current, maxScrollY));

        // Let the camera pan smoothly vertically
        scrollY.current = THREE.MathUtils.lerp(scrollY.current, targetScrollY.current, delta * 5.0);

        // Pan Camera logic: The camera naturally stares at Z=0, we move its Y coordinate to stare lower.
        // We actually want the camera Y to follow -scrollY so it moves down along the grid!
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollY.current, delta * 5.0);

        // Keep looking straight forward organically
        const targetLookAt = new THREE.Vector3(camera.position.x, camera.position.y, 0);
        camera.lookAt(targetLookAt);
    });

    if (normalizedImages.length === 0) return null;

    return (
        <group>
            {Array.from({ length: totalImages }).map((_, i) => {
                const node = gridPositions[i];
                const texture = textures[i];
                const material = materials[i];
                if (!texture || !material) return null;

                const gridPos = new THREE.Vector3(node.x, node.y, node.z);

                return (
                    // Wrap the meshes in a group representing their static slight rotations, 
                    // freeing up the individual mesh strictly for popping up/down
                    <group 
                        key={i} 
                        position={new THREE.Vector3(0, 0, 0)} 
                        rotation={new THREE.Euler(0, 0, node.rotZ)}
                    >
                        <GridPlane
                            index={i}
                            texture={texture}
                            material={material}
                            gridPos={gridPos}
                            cameraPos={camera.position}
                            isActive={activeId === i}
                            isDimmed={activeId !== null && activeId !== i}
                            onClick={(idx) => {
                                // Toggle behavior: tap an active one closes it, tap a closed one opens it.
                                if (activeId === idx) {
                                    setActiveId(null);
                                    document.body.style.cursor = 'auto';
                                } else {
                                    setActiveId(idx);
                                    document.body.style.cursor = 'auto'; // Reset pointer once clicked
                                }
                            }}
                        />
                    </group>
                );
            })}
            
            {/* Click Background to clear selection */}
            <mesh 
                position={[0, 0, -5]} 
                visible={false} 
                onClick={(e) => {
                    e.stopPropagation();
                    if (activeId !== null) setActiveId(null);
                }}
            >
                <planeGeometry args={[100, 100]} />
            </mesh>
        </group>
    );
}

function FallbackGallery({ images }: { images: ImageItem[] }) {
    const normalizedImages = useMemo(
        () => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
        [images]
    );

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
            <p className="text-gray-600 mb-4">
                WebGL not supported. Showing image list:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {normalizedImages.map((img, i) => (
                    <img
                        key={i}
                        src={img.src || '/placeholder.svg'}
                        alt={img.alt}
                        className="w-full h-32 object-cover rounded"
                    />
                ))}
            </div>
        </div>
    );
}

export default function InfiniteGallery({
    images,
    className = 'h-[750px] w-full relative',
    style,
    speed = 1,
}: InfiniteGalleryProps) {
    const [webglSupported, setWebglSupported] = useState(true);
    const [activeId, setActiveId] = useState<number | null>(null);
    const targetScrollY = useRef(0);

    useEffect(() => {
        try {
            const canvas = document.createElement('canvas');
            const gl =
                canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) {
                setWebglSupported(false);
            }
        } catch (e) {
            setWebglSupported(false);
        }
    }, []);

    // Global Keydown to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveId(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleScrollUp = () => {
        if (activeId !== null) return;
        const spacingY = window.innerWidth < 768 ? 5.5 : 4.5;
        targetScrollY.current = Math.max(0, targetScrollY.current - spacingY);
    };

    const handleScrollDown = () => {
        if (activeId !== null) return;
        const spacingY = window.innerWidth < 768 ? 5.5 : 4.5;
        targetScrollY.current += spacingY;
    };

    if (!webglSupported) {
        return (
            <div className={className} style={style}>
                <FallbackGallery images={images} />
            </div>
        );
    }

    return (
        <div 
            className={className} 
            style={style}
            onWheel={(e) => {
                // If an image is expanded in center view, optionally lock scrolling.
                // Or allow them to scroll away to dismiss it!
                if (activeId !== null) {
                    // Let's dismiss if they aggressively scroll heavily. Or just ignore it completely.
                    if (Math.abs(e.deltaY) > 50) {
                        setActiveId(null);
                    }
                } else {
                    targetScrollY.current += (e.deltaY * 0.015) * speed;
                }
            }}
            // Catch clicks safely on the React container to dismiss if they click very far outside geometry
            onClick={() => {
                if (activeId !== null) setActiveId(null);
            }}
        >
            {activeId !== null && (
                <div className="absolute top-4 right-4 z-50 text-white/50 hover:text-white pointer-events-none transition-opacity">
                    <p className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium tracking-wide border border-white/10 shadow-xl">
                        Click anywhere or press <kbd className="font-mono text-xs opacity-70">ESC</kbd> to close
                    </p>
                </div>
            )}
            
            {activeId === null && (
                <div className="absolute right-4 md:right-8 bottom-8 z-40 flex flex-col gap-3">
                    <button 
                        onClick={handleScrollUp}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all transform hover:scale-110 active:scale-95 border border-white/10 shadow-xl"
                        aria-label="Scroll Up"
                    >
                        <ChevronUp className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                    <button 
                        onClick={handleScrollDown}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-all transform hover:scale-110 active:scale-95 border border-white/10 shadow-xl"
                        aria-label="Scroll Down"
                    >
                        <ChevronDown className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </div>
            )}

            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={1} />
                <GridScene 
                    images={images} 
                    targetScrollY={targetScrollY}
                    activeId={activeId}
                    setActiveId={setActiveId}
                />
            </Canvas>
        </div>
    );
}
