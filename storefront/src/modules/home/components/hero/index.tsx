"use client"

import { Button, Heading, clx } from "@medusajs/ui"
import { useRef, MouseEvent, useEffect } from "react"
import { useMenu } from "@lib/context/menu-context"

const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)
  const { isMenuOpen } = useMenu()
  const isHovering = useRef(false)
  const scrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY

      // Update background parallax
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY.current * 0.2}px)`
      }

      // Update card transform if not hovering (mobile/idle support)
      if (!isHovering.current && cardRef.current) {
        // Ensure no transition lag during scroll
        cardRef.current.style.transition = "none"
        const rotation = Math.min(scrollY.current / 10, 10) // Max 10 deg rotation

        // Calculate fade and blur
        // Opacity goes from 1 to 0 over 300px
        const opacity = Math.max(0, 1 - scrollY.current / 300)
        // Blur goes from 0 to 10px over 300px
        const blur = Math.min(10, (scrollY.current / 300) * 10)

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotation}deg) translateY(${scrollY.current * 0.5}px)`
        cardRef.current.style.opacity = opacity.toString()
        cardRef.current.style.filter = `blur(${blur}px)`
      }
    }

    // Initial call to set positions
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMenuOpen) return
    isHovering.current = true

    // Remove transition during interaction for instant response (no lag)
    cardRef.current.style.transition = 'none'

    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window

    // Calculate mouse position relative to center
    const x = (clientX - innerWidth / 2) / (innerWidth / 2)
    const y = (clientY - innerHeight / 2) / (innerHeight / 2)

    // Apply tilt and translation
    // Increased multiplier slightly for "faster" feel as requested
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateX(${x * 24}px) translateY(${y * 24 + scrollY.current * 0.5}px)`

    // Dynamic Shadow
    cardRef.current.style.boxShadow = `${-x * 25}px ${-y * 25}px 40px rgba(0, 42, 82, 0.15)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    isHovering.current = false

    // Smooth return to idle state
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)'

    const rotation = Math.min(scrollY.current / 10, 10)
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotation}deg) translateY(${scrollY.current * 0.5}px)`
    cardRef.current.style.boxShadow = `0px 10px 30px rgba(0, 42, 82, 0.1)`
  }

  return (
    <div
      className="h-[75vh] w-full border-b border-waterlike-blue relative bg-waterlike-gray overflow-hidden flex items-center justify-center group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          ref={bgRef}
          src="/waterlike-heroimage.png"
          alt="Waterlike Hero"
          className="w-full h-full object-cover will-change-transform"
        />
      </div>

      {/* Floating Wrapper - only active when menu is closed */}
      <div className={clx(
        "z-10 relative flex flex-col items-center justify-center",
        !isMenuOpen && "animate-float"
      )}>
        <div
          ref={cardRef}
          className={clx(
            "flex flex-col items-center gap-6 bg-white/60 border border-waterlike-blue p-8 shadow-lg m-8 rounded-rounded will-change-transform",
            isMenuOpen
              ? "opacity-0 translate-y-4 scale-95 pointer-events-none backdrop-blur-none transition-all duration-300"
              : "opacity-100 scale-100 backdrop-blur-2xl"
          )}
          style={{
            boxShadow: "0px 10px 30px rgba(0, 42, 82, 0.1)" // Default shadow
          }}
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
          <a href="/store">
            <h1 style={{ textDecoration: "underline" }} className="font-mono text-base text-waterlike-blue">
              .tools
            </h1>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
