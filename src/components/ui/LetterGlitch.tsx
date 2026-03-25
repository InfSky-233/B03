import { useEffect, useRef, useCallback } from "react";

interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
}

export default function LetterGlitch({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lettersRef = useRef<{ char: string; color: string; targetColor: string; x: number; y: number }[]>([]);
  const gridRef = useRef<{ cols: number; rows: number }>({ cols: 0, rows: 0 });

  const getRandomChar = useCallback(() => {
    return characters[Math.floor(Math.random() * characters.length)];
  }, [characters]);

  const getRandomColor = useCallback(() => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  }, [glitchColors]);

  const initGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const fontSize = 16;
    const cols = Math.ceil(canvas.width / fontSize);
    const rows = Math.ceil(canvas.height / fontSize);

    gridRef.current = { cols, rows };
    lettersRef.current = [];

    ctx.font = `${fontSize}px monospace`;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        lettersRef.current.push({
          char: getRandomChar(),
          color: getRandomColor(),
          targetColor: getRandomColor(),
          x: x * fontSize,
          y: y * fontSize + fontSize,
        });
      }
    }
  }, [getRandomChar, getRandomColor]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const fontSize = 16;
    ctx.font = `${fontSize}px monospace`;

    lettersRef.current.forEach((letter) => {
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, letter.x, letter.y);
    });

    if (centerVignette) {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, "rgba(10, 10, 10, 0.8)");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    if (outerVignette) {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 3,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      gradient.addColorStop(0, "rgba(10, 10, 10, 0)");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0.9)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [centerVignette, outerVignette]);

  const updateLetters = useCallback(() => {
    const updateCount = Math.floor(lettersRef.current.length / glitchSpeed);

    for (let i = 0; i < updateCount; i++) {
      const randomIndex = Math.floor(Math.random() * lettersRef.current.length);
      const letter = lettersRef.current[randomIndex];

      letter.char = getRandomChar();

      if (smooth) {
        letter.targetColor = getRandomColor();
        letter.color = letter.targetColor;
      } else {
        letter.color = getRandomColor();
      }
    }
  }, [glitchSpeed, getRandomChar, getRandomColor, smooth]);

  const animate = useCallback(() => {
    updateLetters();
    draw();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateLetters, draw]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initGrid();
    draw();
  }, [initGrid, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initGrid();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [initGrid, animate, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
