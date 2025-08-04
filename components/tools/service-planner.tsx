"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Plus, Edit, Trash2, Users } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface ServicePlannerProps {
  tool: Tool
  department: Department
}

interface ServiceItem {
  id: string
  title: string
  type: "song" | "sermon" | "prayer" | "announcement" | "offering" | "other"
  duration: number
  notes: string
  assignedTo: string
}

interface Service {
  id: string
  date: string
  time: string
  title: string
  items: ServiceItem[]
  totalDuration: number
}

export default function ServicePlanner({ tool, department }: ServicePlannerProps) {
  const [services, setServices] = useState<Service[]>([
    {
      id: "1",
      date: "2024-01-21",
      time: "10:00 AM",
      title: "Sunday Morning Worship",
      totalDuration: 90,
      items: [
        {
          id: "1",
          title: "Welcome & Opening Prayer",
          type: "prayer",
          duration: 5,
          notes: "Welcome visitors, opening prayer",
          assignedTo: "Pastor John",
        },
        {
          id: "2",
          title: "Amazing Grace",
          type: "song",
          duration: 4,
          notes: "Key of G, verses 1-3",
          assignedTo: "Worship Team",
        },
        {
          id: "3",
          title: "Faith in Action",
          type: "sermon",
          duration: 30,
          notes: "James 2:14-26",
          assignedTo: "Pastor John",
        },
      ],
    },
  ])

  const [selectedService, setSelectedService] = useState<Service | null>(services[0])
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    type: "song" as ServiceItem["type"],
    duration: 5,
    notes: "",
    assignedTo: "",
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "song":
        return "bg-blue-100 text-blue-800"
      case "sermon":
        return "bg-green-100 text-green-800"
      case "prayer":
        return "bg-purple-100 text-purple-800"
      case "announcement":
        return "bg-yellow-100 text-yellow-800"
      case "offering":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddItem = () => {
    if (selectedService && newItem.title) {
      const item: ServiceItem = {
        id: Date.now().toString(),
        ...newItem,
      }

      const updatedService = {
        ...selectedService,
        items: [...selectedService.items, item],
        totalDuration: selectedService.totalDuration + newItem.duration,
      }

      setServices(services.map((s) => (s.id === selectedService.id ? updatedService : s)))
      setSelectedService(updatedService)
      setNewItem({ title: "", type: "song", duration: 5, notes: "", assignedTo: "" })
      setShowAddItem(false)
    }
  }

  const handleDeleteItem = (itemId: string) => {
    if (selectedService) {
      const itemToDelete = selectedService.items.find((item) => item.id === itemId)
      if (itemToDelete) {
        const updatedService = {
          ...selectedService,
          items: selectedService.items.filter((item) => item.id !== itemId),
          totalDuration: selectedService.totalDuration - itemToDelete.duration,
        }

        setServices(services.map((s) => (s.id === selectedService.id ? updatedService : s)))
        setSelectedService(updatedService)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Services List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Upcoming Services
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Service
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-colors ${
                  selectedService?.id === service.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedService(service)}
              >
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">{service.title}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {service.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {service.time} ({service.totalDuration} min)
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Service Details */}
        <div className="lg:col-span-2">
          {selectedService ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {selectedService.title}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {selectedService.totalDuration} minutes
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Item Form */}
                {showAddItem && (
                  <Card className="border-dashed">
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="item-title">Title</Label>
                          <Input
                            id="item-title"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            placeholder="Enter item title"
                          />
                        </div>
                        <div>
                          <Label htmlFor="item-type">Type</Label>
                          <select
                            id="item-type"
                            value={newItem.type}
                            onChange={(e) => setNewItem({ ...newItem, type: e.target.value as ServiceItem["type"] })}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          >
                            <option value="song">Song</option>
                            <option value="sermon">Sermon</option>
                            <option value="prayer">Prayer</option>
                            <option value="announcement">Announcement</option>
                            <option value="offering">Offering</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="item-duration">Duration (minutes)</Label>
                          <Input
                            id="item-duration"
                            type="number"
                            value={newItem.duration}
                            onChange={(e) => setNewItem({ ...newItem, duration: Number.parseInt(e.target.value) || 0 })}
                            min="1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="item-assigned">Assigned To</Label>
                          <Input
                            id="item-assigned"
                            value={newItem.assignedTo}
                            onChange={(e) => setNewItem({ ...newItem, assignedTo: e.target.value })}
                            placeholder="Who is responsible?"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="item-notes">Notes</Label>
                          <Textarea
                            id="item-notes"
                            value={newItem.notes}
                            onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                            placeholder="Additional notes..."
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button onClick={handleAddItem}>Add Item</Button>
                        <Button variant="outline" onClick={() => setShowAddItem(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Add Item Button */}
                {!showAddItem && (
                  <Button onClick={() => setShowAddItem(true)} className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service Item
                  </Button>
                )}

                {/* Service Items */}
                <div className="space-y-3">
                  {selectedService.items.map((item, index) => (
                    <Card key={item.id}>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-medium text-muted-foreground">{index + 1}.</span>
                              <h4 className="font-medium">{item.title}</h4>
                              <Badge className={`text-xs ${getTypeColor(item.type)}`}>{item.type}</Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {item.duration}m
                              </div>
                            </div>
                            {item.assignedTo && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <Users className="h-4 w-4" />
                                {item.assignedTo}
                              </div>
                            )}
                            {item.notes && <p className="text-sm text-muted-foreground">{item.notes}</p>}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDeleteItem(item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedService.items.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No items added to this service yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a service to view details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
