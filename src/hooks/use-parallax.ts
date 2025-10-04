"use client"

import { useEffect, useState } from "react"

export function useParallax(speed = 0.5) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return {
    transform: `translateY(${offsetY * speed}px)`,
    opacity: 1 - Math.min(offsetY / 800, 0.8)
  }
}