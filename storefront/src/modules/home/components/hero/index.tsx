"use client"

import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { useRef, MouseEvent, useEffect, useState } from "react"
import { useMenu } from "@lib/context/menu-context"
import { clx } from "@medusajs/ui"

const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const { isMenuOpen } = useMenu()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    // Set initial scroll
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window

    // Calculate mouse position relative to center of screen (since hero covers most of it)
    const x = (clientX - innerWidth / 2) / (innerWidth / 2)
    const y = (clientY - innerHeight / 2) / (innerHeight / 2)

    // Apply tilt and translation
    // Rotate: limited to 5 degrees
    // Translate: move slightly (20px max) in direction of mouse
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateX(${x * 20}px) translateY(${y * 20 + scrollY * 0.5}px)`

    // Dynamic Shadow: moves opposite to the card (light source simulation)
    // Heavier shadow when tilted
    cardRef.current.style.boxShadow = `${-x * 20}px ${-y * 20}px 30px rgba(0, 42, 82, 0.15)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      // Return to idle state (keep scroll parallax)
      cardRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateX(0px) translateY(${scrollY * 0.5}px)`
      cardRef.current.style.boxShadow = `0px 10px 30px rgba(0, 42, 82, 0.1)` // Default shadow
    }
  }

  // Update transform on scroll if no mouse interaction is happening
  useEffect(() => {
    if (cardRef.current) {
      const currentTransform = cardRef.current.style.transform
      // If we are not currently tilting (mouse interaction), apply scroll effects
      if (!currentTransform.includes("rotateY(")) {
        // Mobile/Idle behavior:
        // Rotate X slightly based on scroll to "tumble" away
        // Translate Y for parallax
        const rotation = Math.min(scrollY / 10, 10) // Max 10 deg rotation
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotation}deg) translateY(${scrollY * 0.5}px)`
      }
    }
  }, [scrollY])

  return (
    <div
      className="h-[75vh] w-full border-b border-waterlike-blue relative bg-waterlike-gray overflow-hidden flex items-center justify-center group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/waterlike-heroimage.png"
          alt="Waterlike Hero"
          className="w-full h-full object-cover"
          style={{
            transform: `translateY(${scrollY * 0.2}px)` // Parallax for background
          }}
        />
      </div>
      <div
        ref={cardRef}
        style={{
          transform: `translateY(${scrollY * 0.5}px)`, // Parallax for card
        }}
        className={clx(
          "z-10 flex flex-col items-center gap-6 bg-white/60 backdrop-blur-2xl border border-waterlike-blue p-8 shadow-lg transition-all duration-100 ease-out will-change-transform m-8 rounded-rounded",
          // Add floating animation ONLY when menu is closed and NOT hovering (hover disables animation via inline styles usually, but let's be explicitly)
          !isMenuOpen && "animate-float",
          isMenuOpen ? "opacity-0 translate-y-4 scale-95 pointer-events-none backdrop-blur-none" : "opacity-100 scale-100 backdrop-blur-2xl"
        )}
      >
        <span>
          <Heading
            level="h1"
            className="text-2xl md:text-3xl leading-10 text-waterlike-blue font-normal font-serif mb-4"
          >
            shop.
          </Heading>
          <Heading
            level="h2"
            className="text-xl md:text-2xl leading-10 text-waterlike-blue font-normal font-serif"
          >
            waterlike
          </Heading>
        </span>
        <a
          href="/store"
        >
          <h1 style={{ textDecoration: "underline" }} className="font-mono text-base text-waterlike-blue">
            .tools
          </h1>
        </a>
      </div>
    </div>
  )
}

export default Hero
