"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface CourseEnrollmentProps {
  tool: Tool
  department: Department
}

export default function CourseEnrollment({ tool, department }: CourseEnrollmentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Enrollment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage course enrollment and educational program registration.</p>
        </CardContent>
      </Card>
    </div>
  )
}
