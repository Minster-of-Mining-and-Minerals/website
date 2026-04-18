"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridProps {
  children?: React.ReactNode;
  className?: string;
}

export default function InteractiveGrid({ children, className }: InteractiveGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let points: { x: number; y: number; originX: number; originY: number; vx: number; vy: number }[] = [];
    const spacing = 50;
    const mouse = { x: -1000, y: -1000 };

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = containerRef.current?.offsetHeight || 400;

      points = [];
      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          points.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const t = time * 0.001;
      
      // Update and draw connections
      ctx.strokeStyle = "rgba(255, 191, 0, 0.15)"; // Golden/Amber faint lines
      ctx.lineWidth = 0.5;

      points.forEach((p, i) => {
        // Wavy movement logic
        const waveX = Math.sin(t + p.originY * 0.01) * 5;
        const waveY = Math.cos(t + p.originX * 0.01) * 5;

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, (150 - dist) / 150);
        
        p.x = p.originX + waveX + (dx / dist) * force * -40;
        p.y = p.originY + waveY + (dy / dist) * force * -40;

        // Draw node
        ctx.fillStyle = "rgba(255, 191, 0, 0.3)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fill();

        // Connect to neighbors (right and bottom)
        const neighbors = [
            points[i + 1], // next in column
            points.find(np => np.originX === p.originX + spacing && np.originY === p.originY) // next in row
        ];

        neighbors.forEach(n => {
            if (n && Math.abs(n.originX - p.originX) <= spacing && Math.abs(n.originY - p.originY) <= spacing) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(n.x, n.y);
                ctx.stroke();
            }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    init();
    draw(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative flex min-h-[35vh] w-full items-center justify-center overflow-hidden bg-black", className)}>
      {/* Background Image Underlay (Preserving original look) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url('/home-4.jpg')`,
        }}
      />

      {/* Animated Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Overlays for depth and coloring consistency */}
      <div className="pointer-events-none absolute inset-0 z-15 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black/40"></div>

      {/* Content */}
      <div className="relative z-30 py-20 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
