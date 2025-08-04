"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeProvider } from "@/components/theme-provider"
import {
  Search,
  Church,
  Megaphone,
  Send,
  ThumbsUp,
  TrendingUp,
  Moon,
  Sun,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  User,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

// Types
interface Suggestion {
  id: string
  text: string
  author: string
  votes: number
  timestamp: Date
  contributions: number
}

// Navbar Component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/98 backdrop-blur-md supports-[backdrop-filter]:bg-background/95 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Church className="h-8 w-8 text-primary drop-shadow-sm" />
          <span className="text-xl font-bold text-foreground">34th Region</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
          >
            Tools
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
          >
            Login
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            Register
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-3">
            <Link href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Tools
            </Link>
            <Link href="#" className="block text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Register
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

// Typing Animation Component
function TypingAnimation() {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const texts = [
    "Empowering Churches. Connecting Souls.",
    "Building Faith Communities.",
    "Spreading God's Love Digitally.",
  ]

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = texts[currentIndex]

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1))
        } else {
          setCurrentText(current.substring(0, currentText.length + 1))
        }

        if (!isDeleting && currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000)
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false)
          setCurrentIndex((currentIndex + 1) % texts.length)
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentIndex, isDeleting, texts])

  return (
    <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 min-h-[120px] md:min-h-[160px] flex items-center justify-center text-white drop-shadow-2xl [text-shadow:_3px_3px_12px_rgb(0_0_0_/_90%)] md:[text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
      {currentText}
      <span className="animate-pulse text-white/90">|</span>
    </h1>
  )
}

// Search Registration Dialog
function SearchRegistrationDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [userType, setUserType] = useState("")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register Your Organization</DialogTitle>
          <DialogDescription>We couldn't find your search. Let's get you registered!</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="orgName">Church/Denomination Name</Label>
            <Input id="orgName" placeholder="Enter organization name" />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="City, State/Country" />
          </div>
          <div>
            <Label htmlFor="userType">Register as</Label>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leader">Church Leader</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button className="flex-1" onClick={onClose}>
              Register Organization
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hero Section
function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showRegistration, setShowRegistration] = useState(false)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Simulate search failure for demo
      setTimeout(() => {
        setShowRegistration(true)
      }, 1000)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto text-center px-4 py-20">
        <TypingAnimation />

        <p className="text-xl md:text-2xl text-white/95 mb-12 font-medium drop-shadow-lg [text-shadow:_2px_2px_6px_rgb(0_0_0_/_85%)] md:[text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
          Search, register, publish and evangelize with ease.
        </p>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for your Church or Denomination"
                className="pl-10 h-12 text-base bg-white/99 md:bg-white/98 backdrop-blur-sm border-white/40 md:border-white/30 text-[#5D3C64] placeholder:text-[#9F6496] focus:border-[#BA6E8F] focus:ring-[#BA6E8F] shadow-2xl md:shadow-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button
              size="lg"
              onClick={handleSearch}
              className="h-12 px-8 bg-white text-[#5D3C64] hover:bg-white/95 hover:text-[#5D3C64] font-semibold border border-white/30 md:border-white/20 shadow-2xl md:shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Search
            </Button>
          </div>
        </div>

        <SearchRegistrationDialog isOpen={showRegistration} onClose={() => setShowRegistration(false)} />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}

// Feature Cards
function FeatureCards() {
  const features = [
    {
      icon: Megaphone,
      title: "Publish Your Events for Free",
      description: "Create beautiful event flyers and reach your community",
      action: "Create Event",
    },
    {
      icon: Church,
      title: "Register Your Church for Free",
      description: "Join our growing network of faith communities",
      action: "Register Church",
    },
    {
      icon: Send,
      title: "Evangelize with Bulk Messages for Free",
      description: "Reach hearts with personalized outreach campaigns",
      action: "Start Outreach",
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/50 relative z-10">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Ministry</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover powerful tools designed to help your church grow, connect, and make a lasting impact in your
            community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-border hover:border-primary/50 hover:bg-card/80 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 w-fit shadow-lg">
                  <feature.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-center">
                <Button
                  variant="outline"
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border-primary/50 hover:border-primary shadow-md bg-transparent"
                >
                  {feature.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Feedback Section
function FeedbackSection() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: "1",
      text: "Add prayer request sharing feature",
      author: "John D.",
      votes: 15,
      timestamp: new Date(Date.now() - 86400000),
      contributions: 3,
    },
    {
      id: "2",
      text: "Integration with popular calendar apps",
      author: "Sarah M.",
      votes: 12,
      timestamp: new Date(Date.now() - 172800000),
      contributions: 7,
    },
    {
      id: "3",
      text: "Mobile app for better accessibility",
      author: "Pastor Mike",
      votes: 23,
      timestamp: new Date(Date.now() - 259200000),
      contributions: 12,
    },
  ])

  const [newSuggestion, setNewSuggestion] = useState("")
  const [sortBy, setSortBy] = useState<"popularity" | "recent">("popularity")
  const [showAll, setShowAll] = useState(false)

  const handleSubmit = () => {
    if (newSuggestion.trim()) {
      const suggestion: Suggestion = {
        id: Date.now().toString(),
        text: newSuggestion,
        author: "Anonymous",
        votes: 0,
        timestamp: new Date(),
        contributions: 1,
      }
      setSuggestions([suggestion, ...suggestions])
      setNewSuggestion("")
    }
  }

  const handleVote = (id: string) => {
    setSuggestions(suggestions.map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s)))
  }

  const sortedSuggestions = [...suggestions].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.votes - a.votes
    }
    return b.timestamp.getTime() - a.timestamp.getTime()
  })

  const displayedSuggestions = showAll ? sortedSuggestions : sortedSuggestions.slice(0, 3)

  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Help Shape Our Platform</h2>
          <p className="text-muted-foreground">Share your ideas and vote on features that matter to your community</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Suggestion Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Share Your Ideas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What feature would help your church community?"
                value={newSuggestion}
                onChange={(e) => setNewSuggestion(e.target.value)}
                className="min-h-[100px]"
              />
              <Button onClick={handleSubmit} className="w-full">
                Submit Suggestion
              </Button>
            </CardContent>
          </Card>

          {/* Suggestions Display */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Community Ideas
                </CardTitle>
                <Select value={sortBy} onValueChange={(value: "popularity" | "recent") => setSortBy(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popular</SelectItem>
                    <SelectItem value="recent">Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {displayedSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-4 border rounded-lg space-y-2">
                  <p className="text-sm">{suggestion.text}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {suggestion.author}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.contributions} contributions
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(suggestion.id)}
                      className="flex items-center gap-1 h-6 px-2"
                    >
                      <ThumbsUp className="h-3 w-3" />
                      {suggestion.votes}
                    </Button>
                  </div>
                </div>
              ))}

              {suggestions.length > 3 && (
                <Button variant="outline" onClick={() => setShowAll(!showAll)} className="w-full">
                  {showAll ? "Show Less" : `View ${suggestions.length - 3} More Ideas`}
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <Church className="h-6 w-6 text-primary" />
            <span className="font-semibold">34th Region</span>
          </div>

          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">© 2025 34th Region. All rights reserved.</div>
      </div>
    </footer>
  )
}

// Main Homepage Component
export default function Homepage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeatureCards />
          <FeedbackSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
