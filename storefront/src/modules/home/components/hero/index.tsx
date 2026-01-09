"use client"

import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { useRef, MouseEvent } from "react"

const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window

    // Calculate mouse position relative to center of screen (since hero covers most of it)
    const x = (clientX - innerWidth / 2) / (innerWidth / 2)
    const y = (clientY - innerHeight / 2) / (innerHeight / 2)

    // Apply tilt: limited to 5 degrees for a "slight" effect
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"
    }
  }

  return (
    <div
      className="h-[75vh] w-full border-b border-waterlike-blue relative bg-waterlike-gray overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/waterlike-heroimage.png"
          alt="Waterlike Hero"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        ref={cardRef}
        className="z-10 flex flex-col items-center gap-6 bg-white/60 backdrop-blur-2xl border border-waterlike-blue p-8 shadow-lg transition-transform duration-75 ease-out will-change-transform m-8"
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
            .waterlike
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
