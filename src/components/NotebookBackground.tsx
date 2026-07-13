"use client";

import { useEffect, useRef } from "react";

// Contrasting, elegant color palette for the brush strokes against the light pink background
const PALETTE = ["#2B3A41", "#5C7A82", "#A64A38", "#E6C9A8", "#4A6C5B"];

class BrushStroke {
  points: {x: number, y: number}[] = [];
  color: string;
  size: number;
  life: number = 1.0;
  active: boolean = true;

  constructor(x: number, y: number, color: string) {
    this.points.push({x, y});
    this.color = color;
    // Big thick brush strokes
    this.size = Math.random() * 40 + 20; 
  }

  addPoint(x: number, y: number) {
    if (!this.active) return;
    this.points.push({x, y});
  }

  update() {
    if (!this.active) {
      this.life -= 0.015; // Fade out slowly when mouse stops
    } else if (this.points.length > 80) { // Max length before starting new stroke
      this.active = false;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.length < 2) return;
    
    ctx.globalAlpha = Math.max(0, this.life) * 0.4; // Semi-transparent for water-color feel
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    
    // Draw continuous smooth curve through points
    for (let i = 1; i < this.points.length - 1; i++) {
      const p1 = this.points[i];
      const p2 = this.points[i + 1];
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
    }
    
    const last = this.points[this.points.length - 1];
    ctx.lineTo(last.x, last.y);
    ctx.stroke();
    
    ctx.globalAlpha = 1;
  }
}

class PaperPlane {
  x: number;
  y: number;
  speed: number;
  angle: number;
  scale: number;
  color: string;
  
  constructor(canvasWidth: number, canvasHeight: number) {
    // Start from edges
    if (Math.random() > 0.5) {
      this.x = Math.random() > 0.5 ? -50 : canvasWidth + 50;
      this.y = Math.random() * canvasHeight;
    } else {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() > 0.5 ? -50 : canvasHeight + 50;
    }
    
    // Target somewhere in the middle or other side
    const targetX = canvasWidth / 2 + (Math.random() - 0.5) * canvasWidth;
    const targetY = canvasHeight / 2 + (Math.random() - 0.5) * canvasHeight;
    
    this.angle = Math.atan2(targetY - this.y, targetX - this.x);
    this.speed = Math.random() * 1.5 + 0.5;
    this.scale = Math.random() * 0.4 + 0.4; // Slightly smaller
    this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    // Add very slight wobble
    this.angle += (Math.random() - 0.5) * 0.02;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle); 
    ctx.scale(this.scale, this.scale);
    
    // Draw simple right-facing paper plane shape
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    
    ctx.beginPath();
    ctx.moveTo(15, 0); // Tip
    ctx.lineTo(-15, -10); // Top wing
    ctx.lineTo(-5, 0); // Center back
    ctx.lineTo(-15, 10); // Bottom wing
    ctx.closePath();
    ctx.stroke();
    
    // Bottom wing fill 
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-15, 10);
    ctx.closePath();
    ctx.fill();
    
    // Center line
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(-5, 0);
    ctx.stroke();

    ctx.restore();
  }
  
  isOffScreen(canvasWidth: number, canvasHeight: number) {
    return (
      this.x < -100 || 
      this.x > canvasWidth + 100 || 
      this.y < -100 || 
      this.y > canvasHeight + 100
    );
  }
}

export default function NotebookBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let strokes: BrushStroke[] = [];
    let currentStroke: BrushStroke | null = null;
    let strokeTimeout: any;
    let planes: PaperPlane[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      if (!currentStroke || !currentStroke.active) {
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        currentStroke = new BrushStroke(mouseX, mouseY, color);
        strokes.push(currentStroke);
      } else {
        const lastP = currentStroke.points[currentStroke.points.length - 1];
        if (Math.hypot(mouseX - lastP.x, mouseY - lastP.y) > 5) {
          currentStroke.addPoint(mouseX, mouseY);
        }
      }
      
      clearTimeout(strokeTimeout);
      strokeTimeout = setTimeout(() => {
        if (currentStroke) currentStroke.active = false;
      }, 150);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (Math.random() < 0.003 && planes.length < 8) {
        planes.push(new PaperPlane(canvas.width, canvas.height));
      }
      
      for (let i = 0; i < strokes.length; i++) {
        strokes[i].update();
        strokes[i].draw(ctx);
        if (strokes[i].life <= 0) {
          strokes.splice(i, 1);
          i--;
        }
      }
      
      for (let i = 0; i < planes.length; i++) {
        planes[i].update();
        planes[i].draw(ctx);
        if (planes[i].isOffScreen(canvas.width, canvas.height)) {
          planes.splice(i, 1);
          i--;
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 opacity-80"
      />

      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-foreground) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--background)_150%)]" />
    </div>
  );
}
