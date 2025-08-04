"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface SpiritualAssessmentProps {
  tool: Tool
  department: Department
}

export default function SpiritualAssessment({ tool, department }: SpiritualAssessmentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Spiritual Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Assess spiritual growth and provide guidance for discipleship programs.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
