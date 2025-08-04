"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Navbar, Footer } from "@/app/page"
import { DepartmentCard } from "@/components/department-card"
import { departments } from "@/lib/data"

export default function ToolsPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container max-w-6xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Church Management Tools</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover specialized tools designed for every department in your church. From worship planning to
              financial management, we've got you covered.
            </p>
          </div>

          {/* Department Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((department) => (
              <DepartmentCard key={department.slug} department={department} />
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
