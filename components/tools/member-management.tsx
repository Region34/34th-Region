"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface MemberManagementProps {
  tool: Tool
  department: Department
}

export default function MemberManagement({ tool, department }: MemberManagementProps) {
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
          <CardTitle>Member Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This tool helps you manage church membership, track attendance, and maintain member records.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
