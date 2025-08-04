"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface ParentCommunicationProps {
  tool: Tool
  department: Department
}

export default function ParentCommunication({ tool, department }: ParentCommunicationProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parent Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Communicate with parents about youth activities and programs.</p>
        </CardContent>
      </Card>
    </div>
  )
}
