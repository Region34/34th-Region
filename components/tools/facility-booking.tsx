"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface FacilityBookingProps {
  tool: Tool
  department: Department
}

export default function FacilityBooking({ tool, department }: FacilityBookingProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Building className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Facility Booking System</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Manage church facility bookings, room reservations, and event scheduling.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
