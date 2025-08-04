"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Save, Share2, Eye, Plus, Search } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface SermonBuilderProps {
  tool: Tool
  department: Department
}

interface SermonData {
  title: string
  date: string
  series: string
  scripture: string
  theme: string
  outline: string[]
  notes: string
  applications: string[]
}

export default function SermonBuilder({ tool, department }: SermonBuilderProps) {
  const [sermon, setSermon] = useState<SermonData>({
    title: "",
    date: "",
    series: "",
    scripture: "",
    theme: "",
    outline: [""],
    notes: "",
    applications: [""],
  })

  const [savedSermons] = useState([
    { id: 1, title: "The Power of Faith", date: "2024-01-07", series: "New Year, New Faith" },
    { id: 2, title: "Walking in Love", date: "2024-01-14", series: "New Year, New Faith" },
    { id: 3, title: "Hope in Trials", date: "2024-01-21", series: "New Year, New Faith" },
  ])

  const IconComponent = tool.icon

  const addOutlinePoint = () => {
    setSermon((prev) => ({ ...prev, outline: [...prev.outline, ""] }))
  }

  const updateOutlinePoint = (index: number, value: string) => {
    setSermon((prev) => ({
      ...prev,
      outline: prev.outline.map((point, i) => (i === index ? value : point)),
    }))
  }

  const addApplication = () => {
    setSermon((prev) => ({ ...prev, applications: [...prev.applications, ""] }))
  }

  const updateApplication = (index: number, value: string) => {
    setSermon((prev) => ({
      ...prev,
      applications: prev.applications.map((app, i) => (i === index ? value : app)),
    }))
  }

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 rounded-full bg-primary/20">
            <IconComponent className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 font-serif">{tool.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">{tool.description}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {tool.features.map((feature, index) => (
            <Badge key={index} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {/* Main Content */}
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Sermon</TabsTrigger>
          <TabsTrigger value="library">Sermon Library</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sermon Details */}
            <Card>
              <CardHeader>
                <CardTitle>Sermon Details</CardTitle>
                <CardDescription>Basic information about your sermon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Sermon Title</Label>
                  <Input
                    id="title"
                    value={sermon.title}
                    onChange={(e) => setSermon((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter sermon title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={sermon.date}
                      onChange={(e) => setSermon((prev) => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="series">Series</Label>
                    <Select
                      value={sermon.series}
                      onValueChange={(value) => setSermon((prev) => ({ ...prev, series: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select series" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-year-new-faith">New Year, New Faith</SelectItem>
                        <SelectItem value="walking-with-jesus">Walking with Jesus</SelectItem>
                        <SelectItem value="psalms-study">Psalms Study</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="scripture">Scripture Reference</Label>
                  <Input
                    id="scripture"
                    value={sermon.scripture}
                    onChange={(e) => setSermon((prev) => ({ ...prev, scripture: e.target.value }))}
                    placeholder="e.g., John 3:16-17"
                  />
                </div>
                <div>
                  <Label htmlFor="theme">Main Theme</Label>
                  <Input
                    id="theme"
                    value={sermon.theme}
                    onChange={(e) => setSermon((prev) => ({ ...prev, theme: e.target.value }))}
                    placeholder="Central theme of the sermon"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sermon Structure */}
            <Card>
              <CardHeader>
                <CardTitle>Sermon Structure</CardTitle>
                <CardDescription>Organize your sermon outline and key points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Outline Points</Label>
                    <Button size="sm" variant="outline" onClick={addOutlinePoint}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Point
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {sermon.outline.map((point, index) => (
                      <Input
                        key={index}
                        value={point}
                        onChange={(e) => updateOutlinePoint(index, e.target.value)}
                        placeholder={`Point ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Applications</Label>
                    <Button size="sm" variant="outline" onClick={addApplication}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Application
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {sermon.applications.map((app, index) => (
                      <Input
                        key={index}
                        value={app}
                        onChange={(e) => updateApplication(index, e.target.value)}
                        placeholder={`Application ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sermon Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Sermon Notes</CardTitle>
              <CardDescription>Detailed notes and content for your sermon</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={sermon.notes}
                onChange={(e) => setSermon((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Write your detailed sermon notes here..."
                className="min-h-[200px]"
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Sermon
            </Button>
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sermon Library</CardTitle>
              <CardDescription>Browse and manage your saved sermons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search sermons..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Series</SelectItem>
                    <SelectItem value="new-year-new-faith">New Year, New Faith</SelectItem>
                    <SelectItem value="walking-with-jesus">Walking with Jesus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {savedSermons.map((sermon) => (
                  <div key={sermon.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{sermon.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sermon.series} • {new Date(sermon.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Duplicate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Scripture Resources</CardTitle>
                <CardDescription>Quick access to biblical references and commentaries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Search scripture..." />
                  <Button>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="p-3 border rounded">
                    <div className="font-semibold">John 3:16</div>
                    <div className="text-sm text-muted-foreground">
                      "For God so loved the world that he gave his one and only Son..."
                    </div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="font-semibold">Romans 8:28</div>
                    <div className="text-sm text-muted-foreground">
                      "And we know that in all things God works for the good..."
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sermon Templates</CardTitle>
                <CardDescription>Pre-built templates to jumpstart your sermon preparation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Expository Sermon Template
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Topical Sermon Template
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Narrative Sermon Template
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Evangelistic Sermon Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
