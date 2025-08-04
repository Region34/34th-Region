"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface CurriculumSharingProps {
  tool: Tool
  department: Department
}

export default function CurriculumSharing({ tool, department }: CurriculumSharingProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Curriculum Sharing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Share and manage educational curriculum and teaching materials.</p>
        </CardContent>
      </Card>
    </div>
  )
}
