"use client"

import { useEffect, useState } from "react"

export function ClientLogosCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const logos = [
    { name: "Grace Community Church", logo: "/placeholder-logo.svg" },
    { name: "Faith Baptist Church", logo: "/placeholder-logo.svg" },
    { name: "New Life Assembly", logo: "/placeholder-logo.svg" },
    { name: "Christ Methodist Church", logo: "/placeholder-logo.svg" },
    { name: "Hope Presbyterian", logo: "/placeholder-logo.svg" },
    { name: "Trinity Lutheran", logo: "/placeholder-logo.svg" },
    { name: "Calvary Chapel", logo: "/placeholder-logo.svg" },
    { name: "Bethel Pentecostal", logo: "/placeholder-logo.svg" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(logos.length / 4))
    }, 3000)

    return () => clearInterval(timer)
  }, [logos.length])

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Trusted by Churches Worldwide</h2>
          <p className="text-muted-foreground">
            Join hundreds of churches that have transformed their ministry with our platform
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: Math.ceil(logos.length / 4) }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                  {logos.slice(slideIndex * 4, slideIndex * 4 + 4).map((client, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                    >
                      <img
                        src={client.logo || "/placeholder.svg"}
                        alt={client.name}
                        className="h-12 w-auto max-w-[120px] object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(logos.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
