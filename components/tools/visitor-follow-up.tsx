"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Phone, Mail, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface VisitorFollowUpProps {
  tool: Tool
  department: Department
}

interface Visitor {
  id: string
  name: string
  email: string
  phone: string
  visitDate: string
  source: string
  interests: string[]
  status: "new" | "contacted" | "following-up" | "member" | "inactive"
  notes: string
  assignedTo: string
  lastContact?: string
  nextFollowUp?: string
}

export default function VisitorFollowUp({ tool, department }: VisitorFollowUpProps) {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1234567890",
      visitDate: "2024-01-20",
      source: "Walk-in",
      interests: ["Bible Study", "Youth Ministry"],
      status: "new",
      notes: "First time visitor, interested in joining small groups",
      assignedTo: "Pastor Mike",
      nextFollowUp: "2024-01-22",
    },
    {
      id: "2",
      name: "Robert Chen",
      email: "robert@example.com",
      phone: "+1234567891",
      visitDate: "2024-01-19",
      source: "Friend Invitation",
      interests: ["Worship", "Community Service"],
      status: "contacted",
      notes: "Called and left voicemail, very interested in volunteering",
      assignedTo: "Deacon Lisa",
      lastContact: "2024-01-21",
      nextFollowUp: "2024-01-24",
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      email: "maria@example.com",
      phone: "+1234567892",
      visitDate: "2024-01-18",
      source: "Online",
      interests: ["Children's Ministry", "Women's Group"],
      status: "following-up",
      notes: "Met for coffee, considering membership",
      assignedTo: "Pastor Mike",
      lastContact: "2024-01-20",
      nextFollowUp: "2024-01-25",
    },
  ])

  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newVisitor, setNewVisitor] = useState({
    name: "",
    email: "",
    phone: "",
    visitDate: "",
    source: "",
    interests: "",
    notes: "",
    assignedTo: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "following-up":
        return "bg-orange-100 text-orange-800"
      case "member":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <UserPlus className="h-4 w-4" />
      case "contacted":
        return <Phone className="h-4 w-4" />
      case "following-up":
        return <Clock className="h-4 w-4" />
      case "member":
        return <CheckCircle className="h-4 w-4" />
      case "inactive":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <UserPlus className="h-4 w-4" />
    }
  }

  const handleAddVisitor = () => {
    if (newVisitor.name && newVisitor.email) {
      const visitor: Visitor = {
        id: Date.now().toString(),
        name: newVisitor.name,
        email: newVisitor.email,
        phone: newVisitor.phone,
        visitDate: newVisitor.visitDate,
        source: newVisitor.source,
        interests: newVisitor.interests
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
        status: "new",
        notes: newVisitor.notes,
        assignedTo: newVisitor.assignedTo,
        nextFollowUp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      }

      setVisitors([visitor, ...visitors])
      setNewVisitor({
        name: "",
        email: "",
        phone: "",
        visitDate: "",
        source: "",
        interests: "",
        notes: "",
        assignedTo: "",
      })
      setShowAddForm(false)
    }
  }

  const handleStatusUpdate = (visitorId: string, newStatus: Visitor["status"]) => {
    setVisitors(
      visitors.map((visitor) =>
        visitor.id === visitorId
          ? { ...visitor, status: newStatus, lastContact: new Date().toISOString().split("T")[0] }
          : visitor,
      ),
    )
  }

  const getVisitorsByStatus = (status: Visitor["status"]) => {
    return visitors.filter((visitor) => visitor.status === status)
  }

  const getPriorityVisitors = () => {
    const today = new Date().toISOString().split("T")[0]
    return visitors.filter(
      (visitor) => visitor.nextFollowUp && visitor.nextFollowUp <= today && visitor.status !== "member",
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <UserPlus className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="visitors">All Visitors</TabsTrigger>
          <TabsTrigger value="follow-up">Follow-up Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New Visitors</p>
                    <p className="text-2xl font-bold">{getVisitorsByStatus("new").length}</p>
                  </div>
                  <UserPlus className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contacted</p>
                    <p className="text-2xl font-bold">{getVisitorsByStatus("contacted").length}</p>
                  </div>
                  <Phone className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Following Up</p>
                    <p className="text-2xl font-bold">{getVisitorsByStatus("following-up").length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">New Members</p>
                    <p className="text-2xl font-bold">{getVisitorsByStatus("member").length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Priority Follow-ups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Priority Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getPriorityVisitors().length > 0 ? (
                <div className="space-y-3">
                  {getPriorityVisitors().map((visitor) => (
                    <Card key={visitor.id} className="border-orange-200">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{visitor.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Due: {visitor.nextFollowUp} | Assigned to: {visitor.assignedTo}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {visitor.interests.map((interest, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="h-4 w-4 mr-1" />
                              Email
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No priority follow-ups at this time.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                All Visitors
                <Button onClick={() => setShowAddForm(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Visitor
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Visitor Form */}
              {showAddForm && (
                <Card className="border-dashed">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="visitor-name">Name</Label>
                        <Input
                          id="visitor-name"
                          value={newVisitor.name}
                          onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
                          placeholder="Enter visitor name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="visitor-email">Email</Label>
                        <Input
                          id="visitor-email"
                          type="email"
                          value={newVisitor.email}
                          onChange={(e) => setNewVisitor({ ...newVisitor, email: e.target.value })}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="visitor-phone">Phone</Label>
                        <Input
                          id="visitor-phone"
                          value={newVisitor.phone}
                          onChange={(e) => setNewVisitor({ ...newVisitor, phone: e.target.value })}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="visitor-date">Visit Date</Label>
                        <Input
                          id="visitor-date"
                          type="date"
                          value={newVisitor.visitDate}
                          onChange={(e) => setNewVisitor({ ...newVisitor, visitDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="visitor-source">Source</Label>
                        <Input
                          id="visitor-source"
                          value={newVisitor.source}
                          onChange={(e) => setNewVisitor({ ...newVisitor, source: e.target.value })}
                          placeholder="How did they find us?"
                        />
                      </div>
                      <div>
                        <Label htmlFor="visitor-assigned">Assigned To</Label>
                        <Input
                          id="visitor-assigned"
                          value={newVisitor.assignedTo}
                          onChange={(e) => setNewVisitor({ ...newVisitor, assignedTo: e.target.value })}
                          placeholder="Who will follow up?"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="visitor-interests">Interests (comma-separated)</Label>
                        <Input
                          id="visitor-interests"
                          value={newVisitor.interests}
                          onChange={(e) => setNewVisitor({ ...newVisitor, interests: e.target.value })}
                          placeholder="Bible Study, Youth Ministry, etc."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="visitor-notes">Notes</Label>
                        <Textarea
                          id="visitor-notes"
                          value={newVisitor.notes}
                          onChange={(e) => setNewVisitor({ ...newVisitor, notes: e.target.value })}
                          placeholder="Additional notes about the visitor..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleAddVisitor}>Add Visitor</Button>
                      <Button variant="outline" onClick={() => setShowAddForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Visitors List */}
              <div className="space-y-3">
                {visitors.map((visitor) => (
                  <Card key={visitor.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{visitor.name}</h3>
                            <Badge className={`text-xs ${getStatusColor(visitor.status)}`}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(visitor.status)}
                                {visitor.status}
                              </div>
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {visitor.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {visitor.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Visited: {visitor.visitDate}
                            </div>
                            <div className="flex items-center gap-2">
                              <UserPlus className="h-4 w-4" />
                              Assigned to: {visitor.assignedTo}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {visitor.interests.map((interest, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                          {visitor.notes && (
                            <p className="text-sm text-muted-foreground line-clamp-2">{visitor.notes}</p>
                          )}
                          {visitor.nextFollowUp && (
                            <p className="text-xs text-orange-600 mt-2">Next follow-up: {visitor.nextFollowUp}</p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <select
                            value={visitor.status}
                            onChange={(e) => handleStatusUpdate(visitor.id, e.target.value as Visitor["status"])}
                            className="text-xs px-2 py-1 border border-input bg-background rounded"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="following-up">Following Up</option>
                            <option value="member">Member</option>
                            <option value="inactive">Inactive</option>
                          </select>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="follow-up" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Follow-up Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visitors
                  .filter((visitor) => visitor.status !== "member" && visitor.status !== "inactive")
                  .map((visitor) => (
                    <Card key={visitor.id}>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{visitor.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              Status: {visitor.status} | Assigned to: {visitor.assignedTo}
                            </p>
                            {visitor.lastContact && (
                              <p className="text-xs text-muted-foreground">Last contact: {visitor.lastContact}</p>
                            )}
                            {visitor.nextFollowUp && (
                              <p className="text-xs text-orange-600">Next follow-up: {visitor.nextFollowUp}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Phone className="h-4 w-4 mr-1" />
                              Call
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="h-4 w-4 mr-1" />
                              Email
                            </Button>
                            <Button size="sm">Mark Complete</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
