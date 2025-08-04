"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface IncidentReportingProps {
  tool: Tool
  department: Department
}

export default function IncidentReporting({ tool, department }: IncidentReportingProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incident Reporting</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Report and track safety incidents and security concerns.</p>
        </CardContent>
      </Card>
    </div>
  )
}
