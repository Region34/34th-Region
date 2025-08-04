"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface FinancialTrackingProps {
  tool: Tool
  department: Department
}

export default function FinancialTracking({ tool, department }: FinancialTrackingProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Tracking System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Track church finances, donations, expenses, and generate financial reports.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
