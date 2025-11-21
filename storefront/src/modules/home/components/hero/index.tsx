import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-waterlike-blue relative bg-waterlike-gray">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-3xl leading-10 text-waterlike-blue font-normal wet font-serif mb-4"
          >
            waterlike™ shop
          </Heading>
          <Heading
            level="h2"
            className="text-2xl leading-10 text-waterlike-blue font-normal font-serif"
          >
            for regeneration 💭
          </Heading>
        </span>
        <a
          href="https://waterlike.tools/tools/"
          target="_blank"
        >
          <h1 style={{ textDecoration: "underline" }} className="font-mono text-base">
            Visit the tools
          </h1>
        </a>
      </div>
    </div>
  )
}

export default Hero
