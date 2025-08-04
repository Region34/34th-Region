"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Video, Music, File, Upload, Search, Download, Eye } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface MediaLibraryProps {
  tool: Tool
  department: Department
}

interface MediaItem {
  id: string
  name: string
  type: "image" | "video" | "audio" | "document"
  size: string
  uploadDate: string
  tags: string[]
  url: string
}

export default function MediaLibrary({ tool, department }: MediaLibraryProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: "1",
      name: "Sunday Service Background.jpg",
      type: "image",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      tags: ["Background", "Worship"],
      url: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      name: "Worship Song - Amazing Grace.mp3",
      type: "audio",
      size: "4.2 MB",
      uploadDate: "2024-01-14",
      tags: ["Music", "Worship", "Hymn"],
      url: "#",
    },
    {
      id: "3",
      name: "Pastor's Sermon - Faith.mp4",
      type: "video",
      size: "125 MB",
      uploadDate: "2024-01-13",
      tags: ["Sermon", "Teaching"],
      url: "#",
    },
    {
      id: "4",
      name: "Church Bulletin Template.pdf",
      type: "document",
      size: "1.1 MB",
      uploadDate: "2024-01-12",
      tags: ["Template", "Bulletin"],
      url: "#",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const getIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "audio":
        return <Music className="h-5 w-5" />
      case "document":
        return <File className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-green-100 text-green-800"
      case "video":
        return "bg-blue-100 text-blue-800"
      case "audio":
        return "bg-purple-100 text-purple-800"
      case "document":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredItems = mediaItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = activeTab === "all" || item.type === activeTab
    return matchesSearch && matchesType
  })

  const getTypeCounts = () => {
    return {
      all: mediaItems.length,
      image: mediaItems.filter((item) => item.type === "image").length,
      video: mediaItems.filter((item) => item.type === "video").length,
      audio: mediaItems.filter((item) => item.type === "audio").length,
      document: mediaItems.filter((item) => item.type === "document").length,
    }
  }

  const typeCounts = getTypeCounts()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <ImageIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Upload and Search Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Media Library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Media Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({typeCounts.all})</TabsTrigger>
            <TabsTrigger value="image">Images ({typeCounts.image})</TabsTrigger>
            <TabsTrigger value="video">Videos ({typeCounts.video})</TabsTrigger>
            <TabsTrigger value="audio">Audio ({typeCounts.audio})</TabsTrigger>
            <TabsTrigger value="document">Documents ({typeCounts.document})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {/* File Preview */}
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        {item.type === "image" ? (
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center">
                            {getIcon(item.type)}
                            <p className="text-xs text-muted-foreground mt-2">{item.type.toUpperCase()}</p>
                          </div>
                        )}
                      </div>

                      {/* File Info */}
                      <div>
                        <h3 className="font-medium text-sm line-clamp-2 mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>{item.size}</span>
                          <span>{item.uploadDate}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          <Badge className={`text-xs ${getTypeColor(item.type)}`}>{item.type}</Badge>
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No media files found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
