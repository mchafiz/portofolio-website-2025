"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  delayBetweenTexts?: number;
}

export function TypingAnimation({
  texts,
  className = "",
  speed = 100,
  deleteSpeed = 50,
  delayBetweenTexts = 1500,
}: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const handleTyping = () => {
      if (isPaused) {
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, delayBetweenTexts);
        return;
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    isPaused,
    texts,
    speed,
    deleteSpeed,
    delayBetweenTexts,
  ]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}