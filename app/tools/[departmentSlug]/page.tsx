"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar, Footer } from "@/app/page"
import { DepartmentToolsList } from "@/components/department-tools-list"
import { departments } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface DepartmentPageProps {
  params: {
    departmentSlug: string
  }
}

export default function DepartmentPage({ params }: DepartmentPageProps) {
  const department = departments.find((d) => d.slug === params.departmentSlug)

  if (!department) {
    notFound()
  }

  const IconComponent = department.icon

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/tools">
            <Button variant="outline" className="mb-6 bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Departments
            </Button>
          </Link>

          {/* Department Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/20">
                <IconComponent className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{department.name}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{department.description}</p>
          </div>

          {/* Tools List */}
          <DepartmentToolsList department={department} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
