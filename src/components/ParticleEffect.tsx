import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

interface ParticleEffectProps {
  type?: "stars" | "fireflies" | "snow" | "confetti";
  intensity?: number;
  className?: string;
}

export function ParticleEffect({
  type = "stars",
  intensity = 30,
  className = ""
}: ParticleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number>();

  // 颜色配置
  const colorSchemes = {
    stars: ["#FFD700", "#FFF8DC", "#FFA500", "#FFE4B5"],
    fireflies: ["#ADFF2F", "#7FFF00", "#9ACD32", "#F0E68C"],
    snow: ["#FFFFFF", "#E0FFFF", "#F0F8FF", "#B0E0E6"],
    confetti: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"],
  };

  const colors = colorSchemes[type];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // 初始化粒子
    const initParticles = (): Particle[] => {
      return Array.from({ length: intensity }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: type === "snow" ? Math.random() * 3 + 1 : Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * (type === "confetti" ? 4 : 1),
        speedY: type === "snow"
          ? Math.random() * 2 + 0.5
          : type === "confetti"
            ? -Math.random() * 3 - 1
            : (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    setParticles(initParticles());

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          let { x, y, speedX, speedY, size, opacity } = p;

          // 更新位置
          x += speedX;
          y += speedY;

          // 边界处理
          if (type === "snow") {
            if (y > canvas.height) {
              y = -10;
              x = Math.random() * canvas.width;
            }
            if (x > canvas.width) x = 0;
            if (x < 0) x = canvas.width;
          } else if (type === "confetti") {
            speedY += 0.05; // 重力
            if (y > canvas.height) {
              y = -10;
              x = Math.random() * canvas.width;
              speedY = -Math.random() * 3 - 1;
            }
          } else {
            // 星星和萤火虫 - 轻微漂浮
            if (x > canvas.width + 10) x = -10;
            if (x < -10) x = canvas.width + 10;
            if (y > canvas.height + 10) y = -10;
            if (y < -10) y = canvas.height + 10;

            // 闪烁效果
            opacity = Math.random() * 0.5 + 0.3;
          }

          // 绘制粒子
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = opacity;
          ctx.fill();
          ctx.globalAlpha = 1;

          // 萤火虫发光效果
          if (type === "fireflies") {
            ctx.beginPath();
            ctx.arc(x, y, size * 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = opacity * 0.3;
            ctx.fill();
            ctx.globalAlpha = 1;
          }

          return { ...p, x, y, speedX, speedY, opacity };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [type, intensity, colors]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
