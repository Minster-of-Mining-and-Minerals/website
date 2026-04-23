"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function TwoSidedGlobe({ frontUrl, backUrl }: { frontUrl: string; backUrl: string }) {
    const meshRef = useRef<THREE.Mesh>(null!);

    const frontTexture = useTexture(frontUrl);
    const backTexture = useTexture(backUrl);

    // Create a shader material to blend two textures based on hemisphere
    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            frontTexture: { value: frontTexture },
            backTexture: { value: backTexture },
        },
        vertexShader: `
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
        fragmentShader: `
      uniform sampler2D frontTexture;
      uniform sampler2D backTexture;
      varying vec2 vUv;
      varying vec3 vPos;

      void main() {
        // Use x position to determine hemisphere
        vec4 color = vPos.x > 0.0 ? texture2D(frontTexture, vUv) : texture2D(backTexture, vUv);
        gl_FragColor = color;
      }
    `,
    });

    // Animate rotation
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.x += 0.002;
        }
    });

    return (
        <mesh ref={meshRef} castShadow receiveShadow>
            <sphereGeometry args={[4, 128, 128]} />
            <primitive object={shaderMaterial} attach="material" />
        </mesh>
    );
}

// Optional shadow plane
function ShadowPlane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.2} />
        </mesh>
    );
}


export default function GlobeTwoSided({ frontUrl, backUrl }: { frontUrl: string; backUrl: string }) {
    return (
        <div
            // style={{
            //     width: "clamp(300px, 40vw, 600px)",
            //     height: "clamp(280px, 40vh, 600px)",
            // }}
            className="w-full  flex items-center justify-center   h-[clamp(260px,50vw,500px)] md:h-[clamp(280px,40vh,600px)] md:w-[clamp(300px,40vw,600px)]">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 50 }}
                shadows
                className="w-full h-[100vh]" // Full viewport height
            >
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <TwoSidedGlobe frontUrl={frontUrl} backUrl={backUrl} />
                <ShadowPlane />
            </Canvas>
        </div>
    );
}
