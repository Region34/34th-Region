"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface VolunteerManagementYouthProps {
  tool: Tool
  department: Department
}

export default function VolunteerManagementYouth({ tool, department }: VolunteerManagementYouthProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Youth Volunteer Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage volunteers for youth ministry programs and events.</p>
        </CardContent>
      </Card>
    </div>
  )
}
