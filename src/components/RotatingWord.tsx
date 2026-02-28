"use client";

import { useEffect, useState } from "react";

const WORDS = ["joy", "fur", "mischief"];
const INTERVAL = 2800;

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 300);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <span
      className="inline-block text-[#C2634E] transition-all duration-300 ease-in-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {WORDS[index]}
    </span>
  );
}
