"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Department } from "@/lib/data"

interface DepartmentCardProps {
  department: Department
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const IconComponent = department.icon

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-border hover:border-primary/50 hover:bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 w-fit">
            <IconComponent className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {department.tools.length} tools
          </Badge>
        </div>
        <CardTitle className="text-xl mb-2">{department.name}</CardTitle>
        <CardDescription className="text-base">{department.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3 mb-4">
          <div className="text-sm font-medium text-muted-foreground">Featured Tools:</div>
          <div className="flex flex-wrap gap-2">
            {department.tools.slice(0, 3).map((tool) => (
              <Badge key={tool.slug} variant="outline" className="text-xs">
                {tool.name}
              </Badge>
            ))}
            {department.tools.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{department.tools.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        <Link href={`/tools/${department.slug}`}>
          <Button
            variant="outline"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 border-primary/50 hover:border-primary shadow-md bg-transparent"
          >
            Explore Tools
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
