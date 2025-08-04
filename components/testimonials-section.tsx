"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Pastor Michael Johnson",
      role: "Senior Pastor",
      church: "Grace Community Church",
      image: "/placeholder-user.jpg",
      rating: 5,
      testimonial:
        "34th Region has revolutionized how we manage our church operations. The event flyer tool alone has saved us countless hours and helped us reach more people in our community.",
    },
    {
      name: "Sarah Williams",
      role: "Ministry Coordinator",
      church: "Faith Baptist Church",
      image: "/placeholder-user.jpg",
      rating: 5,
      testimonial:
        "The bulk messaging feature has transformed our outreach efforts. We can now communicate with our entire congregation instantly and track engagement like never before.",
    },
    {
      name: "Pastor David Chen",
      role: "Lead Pastor",
      church: "New Life Assembly",
      image: "/placeholder-user.jpg",
      rating: 5,
      testimonial:
        "As a small church, we couldn't afford expensive software solutions. 34th Region gives us enterprise-level tools at a price we can manage. It's been a game-changer for our ministry.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Church Leaders Are Saying</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what pastors and ministry leaders have to say about their experience
            with 34th Region.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-muted-foreground mb-6 italic">"{testimonial.testimonial}"</blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.church}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
