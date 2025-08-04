"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Department } from "@/lib/data"

interface DepartmentToolsListProps {
  department: Department
}

export function DepartmentToolsList({ department }: DepartmentToolsListProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {department.tools.map((tool) => {
          const IconComponent = tool.icon

          return (
            <Card key={tool.slug} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{tool.name}</CardTitle>
                      <CardDescription className="text-base max-w-2xl">{tool.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tool.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {tool.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {tool.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tool.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <Link href={`/tools/${department.slug}/${tool.slug}`}>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
