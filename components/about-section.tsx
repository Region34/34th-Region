"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Church, Users, Globe, Heart, Target, Lightbulb } from "lucide-react"

export function AboutSection() {
  const stats = [
    { label: "Churches Served", value: "500+", icon: Church },
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Countries", value: "25+", icon: Globe },
    { label: "Lives Touched", value: "50,000+", icon: Heart },
  ]

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower churches worldwide with innovative digital tools that strengthen communities and spread the Gospel effectively.",
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      description:
        "A world where every church, regardless of size or resources, has access to powerful technology that amplifies their ministry impact.",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Faith-centered innovation, community-driven development, accessibility for all, and unwavering commitment to serving God's kingdom.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About 34th Region
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">Empowering Churches Through Technology</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe that every church deserves access to powerful, easy-to-use tools that help them connect with
            their community, manage their operations, and spread the Gospel more effectively. Our platform is built by
            believers, for believers.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                34th Region was born from a simple observation: many churches struggle with outdated systems and limited
                resources to effectively manage their ministries and reach their communities.
              </p>
              <p>
                Founded by a team of passionate believers and experienced technologists, we set out to create a
                comprehensive platform that would level the playing field, giving every church access to
                enterprise-level tools at an affordable price.
              </p>
              <p>
                Today, we're proud to serve hundreds of churches across the globe, helping them streamline their
                operations, enhance their outreach, and focus on what matters most: building God's kingdom.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=600&text=Church+Community"
              alt="Church community"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">What Drives Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core values guide everything we do, from product development to customer support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <value.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
