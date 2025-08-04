"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface ReportingAnalyticsProps {
  tool: Tool
  department: Department
}

export default function ReportingAnalytics({ tool, department }: ReportingAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BarChart className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reporting & Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Generate comprehensive reports and analytics for church operations and growth.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
