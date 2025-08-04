"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar, Footer } from "@/app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Church, Users, Globe, Heart, Target, Lightbulb, Shield, Star, Quote, ArrowRight } from "lucide-react"

// About Section Component
function AboutSection() {
  const stats = [
    { label: "Churches Served", value: "500+", icon: Church },
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Countries", value: "25+", icon: Globe },
    { label: "Events Created", value: "50,000+", icon: Heart },
  ]

  const values = [
    {
      icon: Heart,
      title: "Faith-Centered",
      description: "Every feature is designed with Christian values and ministry needs at its core.",
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building tools that strengthen connections within church communities.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your church data is protected with enterprise-grade security measures.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously evolving to meet the changing needs of modern ministry.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/20">
              <Church className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">About 34th Region</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to empower churches worldwide with innovative technology solutions that strengthen faith
            communities, enhance ministry effectiveness, and spread the Gospel in the digital age.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/20">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                To provide churches with powerful, easy-to-use technology tools that enhance ministry effectiveness,
                strengthen community connections, and enable the spread of the Gospel through digital innovation. We
                believe technology should serve the church, not complicate it.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                A world where every church, regardless of size or resources, has access to cutting-edge technology that
                amplifies their ministry impact. We envision connected faith communities that leverage digital tools to
                reach more souls and build stronger relationships.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve the church community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-full bg-primary/20">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Story Section */}
        <Card className="mb-16">
          <CardContent className="pt-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  34th Region was born from a simple observation: churches needed better tools to manage their
                  ministries and connect with their communities. Founded by a team of passionate believers and
                  experienced technologists, we saw an opportunity to bridge the gap between faith and technology.
                </p>
                <p>
                  Starting with a small church management system, we've grown into a comprehensive platform serving
                  hundreds of churches worldwide. Our journey has been guided by continuous feedback from pastors,
                  church leaders, and ministry teams who share our vision of technology-empowered ministry.
                </p>
                <p>
                  Today, 34th Region stands as a testament to what's possible when faith meets innovation. We're not
                  just building software; we're building tools that help churches fulfill the Great Commission in the
                  digital age.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a church leader, ministry team member, or passionate believer, there's a place for you in the
            34th Region community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Get Started Today
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Client Logos Carousel Component
function ClientLogosCarousel() {
  const clients = [
    { name: "Grace Community Church", logo: "/placeholder-logo.svg" },
    { name: "New Life Baptist", logo: "/placeholder-logo.svg" },
    { name: "Faith Methodist", logo: "/placeholder-logo.svg" },
    { name: "Hope Presbyterian", logo: "/placeholder-logo.svg" },
    { name: "Victory Pentecostal", logo: "/placeholder-logo.svg" },
    { name: "Trinity Lutheran", logo: "/placeholder-logo.svg" },
    { name: "Calvary Chapel", logo: "/placeholder-logo.svg" },
    { name: "Riverside Church", logo: "/placeholder-logo.svg" },
  ]

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Churches Worldwide</h2>
          <p className="text-muted-foreground">
            Join thousands of churches that trust 34th Region for their ministry technology needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={client.logo || "/placeholder.svg?height=60&width=120"}
                alt={client.name}
                className="max-h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section Component
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Pastor Michael Johnson",
      role: "Senior Pastor",
      church: "Grace Community Church",
      content:
        "34th Region has transformed how we manage our church operations. The event flyer tool alone has saved us countless hours and helped us reach more people in our community.",
      avatar: "/placeholder-user.jpg",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Ministry Coordinator",
      church: "New Life Baptist",
      content:
        "The bulk messaging feature has revolutionized our communication. We can now reach our entire congregation instantly with important updates and prayer requests.",
      avatar: "/placeholder-user.jpg",
      rating: 5,
    },
    {
      name: "Pastor David Chen",
      role: "Lead Pastor",
      church: "Faith Methodist",
      content:
        "As a small church, we needed affordable tools that didn't compromise on quality. 34th Region delivers exactly that. It's been a game-changer for our ministry.",
      avatar: "/placeholder-user.jpg",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Church Leaders Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from pastors and ministry leaders who are using 34th Region to transform their church operations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-8">
                <div className="flex items-center justify-center mb-4">
                  <Quote className="h-8 w-8 text-primary/30" />
                </div>

                <div className="flex items-center justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 text-center italic">"{testimonial.content}"</p>

                <div className="flex items-center justify-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg?height=48&width=48"} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.church}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="bg-transparent">
            Read More Testimonials
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <AboutSection />
          <ClientLogosCarousel />
          <TestimonialsSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
