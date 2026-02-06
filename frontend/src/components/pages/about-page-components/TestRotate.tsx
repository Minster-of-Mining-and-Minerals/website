"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function TwoSidedGlobe({ frontUrl, backUrl }: { frontUrl: string; backUrl: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const groupRef = useRef<THREE.Group>(null!);

    const frontTexture = useTexture(frontUrl);
    const backTexture = useTexture(backUrl);

    // Create a shader material to blend two textures based on hemisphere
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            frontTexture: { value: frontTexture },
            backTexture: { value: backTexture },
            time: { value: 0 }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vPos;
            uniform float time;
            void main() {
                vUv = uv;
                vPos = position;
                
                // Add subtle wave effect
                float wave = sin(time * 0.5 + position.y * 2.0) * 0.02;
                vec3 pos = position * (1.0 + wave);
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D frontTexture;
            uniform sampler2D backTexture;
            uniform float time;
            varying vec2 vUv;
            varying vec3 vPos;

            void main() {
                // Smooth transition between hemispheres
                float transition = smoothstep(-0.1, 0.1, vPos.x);
                vec4 frontColor = texture2D(frontTexture, vUv);
                vec4 backColor = texture2D(backTexture, vUv);
                
                // Blend based on hemisphere with smooth transition
                vec4 color = mix(backColor, frontColor, transition);
                
                // Add subtle pulsating glow
                float pulse = sin(time * 1.5) * 0.1 + 0.9;
                color.rgb *= pulse;
                
                gl_FragColor = color;
            }
        `,
    });

    // Animate rotation and time uniform
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

            // Update shader time uniform
            if (meshRef.current.material instanceof THREE.ShaderMaterial) {
                meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
            }
        }
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh ref={meshRef} castShadow receiveShadow>
                <sphereGeometry args={[6, 256, 256]} />
                <primitive object={shaderMaterial} attach="material" />
            </mesh>
        </group>
    );
}

function ShadowPlane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, 0]} receiveShadow>
            <circleGeometry args={[10, 64]} />
            <shadowMaterial opacity={0.3} />
        </mesh>
    );
}

function Atmosphere() {
    return (
        <mesh scale={[1.15, 1.15, 1.15]}>
            <sphereGeometry args={[6, 64, 64]} />
            <meshBasicMaterial
                color="#87CEEB"
                transparent
                opacity={0.1}
                side={THREE.BackSide}
            />
        </mesh>
    );
}

function Stars({ count = 5000 }) {
    const pointsRef = useRef<THREE.Points>(null!);

    useFrame(() => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0002;
        }
    });

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        // Create stars in a larger sphere
        const radius = 20 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        sizes[i] = Math.random() * 2;
    }

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={count}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                sizeAttenuation={true}
                color="#ffffff"
                transparent
                opacity={0.8}
            />
        </points>
    );
}

export default function GlobeTwoSided({ frontUrl, backUrl }: { frontUrl: string; backUrl: string }) {
    return (
        <div className="relative w-full h-[70vh] min-h-[600px]">
            <div className="absolute inset-0">
                <Canvas
                    camera={{
                        position: [0, 0, 15],
                        fov: 45,
                        near: 0.1,
                        far: 100
                    }}
                    shadows
                    className="w-full h-full"
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.3} />
                        <directionalLight
                            position={[10, 10, 5]}
                            intensity={1.5}
                            castShadow
                            shadow-mapSize-width={2048}
                            shadow-mapSize-height={2048}
                            shadow-camera-far={50}
                            shadow-camera-left={-10}
                            shadow-camera-right={10}
                            shadow-camera-top={10}
                            shadow-camera-bottom={-10}
                        />

                        {/* Add some rim lighting */}
                        <directionalLight
                            position={[-10, -10, -5]}
                            intensity={0.5}
                            color="#0066ff"
                        />

                        <Environment preset="night" />

                        <TwoSidedGlobe frontUrl={frontUrl} backUrl={backUrl} />
                        <Atmosphere />
                        <ShadowPlane />
                        <Stars />
                    </Suspense>
                </Canvas>
            </div>

            {/* Overlay controls and info */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex items-center gap-4 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span>Interactive Globe</span>
                    </div>
                    <div className="h-4 w-px bg-white/30"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded border border-white/50 flex items-center justify-center">
                            <span className="text-xs">⟳</span>
                        </div>
                        <span>Auto-Rotating</span>
                    </div>
                </div>
            </div>

            {/* Hemisphere indicator */}
            <div className="absolute top-6 right-6 z-10">
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-white text-sm mb-2 font-medium">Hemispheres</div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <span className="text-xs text-white/80">Front View</span>
                        </div>
                        <div className="w-px h-4 bg-white/30"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500"></div>
                            <span className="text-xs text-white/80">Back View</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}