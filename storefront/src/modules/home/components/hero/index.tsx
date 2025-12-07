import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-waterlike-blue relative bg-waterlike-gray overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/waterlike-heroimage.png"
          alt="Waterlike Hero"
          className="w-full h-full object-cover wet opacity-50"
        />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-2xl md:text-3xl leading-10 text-waterlike-blue font-normal font-serif mb-4"
          >
            waterlike™ shop
          </Heading>
          <Heading
            level="h2"
            className="text-xl md:text-2xl leading-10 text-waterlike-blue font-normal font-serif"
          >
            for regeneration 💭
          </Heading>
        </span>
        <a
          href="/store"
        >
          <h1 style={{ textDecoration: "underline" }} className="font-mono text-base text-waterlike-blue">
            Visit the store
          </h1>
        </a>
      </div>
    </div>
  )
}

export default Hero
