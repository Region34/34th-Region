"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface SmallGroupManagementProps {
  tool: Tool
  department: Department
}

export default function SmallGroupManagement({ tool, department }: SmallGroupManagementProps) {
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
          <CardTitle>Small Group Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Organize and manage small groups, Bible studies, and fellowship groups.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
