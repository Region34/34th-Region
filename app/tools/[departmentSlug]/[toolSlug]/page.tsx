"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar, Footer } from "@/app/page"
import { ToolRenderer } from "@/components/tool-renderer"
import { departments } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ToolPageProps {
  params: {
    departmentSlug: string
    toolSlug: string
  }
}

export default function ToolPage({ params }: ToolPageProps) {
  const department = departments.find((d) => d.slug === params.departmentSlug)
  const tool = department?.tools.find((t) => t.slug === params.toolSlug)

  if (!department || !tool) {
    notFound()
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href={`/tools/${department.slug}`}>
            <Button variant="outline" className="mb-6 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {department.name}
            </Button>
          </Link>

          {/* Tool Content */}
          <ToolRenderer tool={tool} department={department} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
