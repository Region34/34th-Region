"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, MapPin, Calendar, Plus, TrendingUp } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface EvangelismTrackingProps {
  tool: Tool
  department: Department
}

interface Contact {
  id: string
  name: string
  phone: string
  email: string
  address: string
  status: "interested" | "praying" | "studying" | "decided" | "baptized"
  dateAdded: string
  lastContact: string
  notes: string
  assignedTo: string
}

interface Event {
  id: string
  name: string
  date: string
  location: string
  contacts: number
  decisions: number
  followUps: number
}

export default function EvangelismTracking({ tool, department }: EvangelismTrackingProps) {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Anderson",
      phone: "+1234567890",
      email: "john@example.com",
      address: "123 Main St, City",
      status: "studying",
      dateAdded: "2024-01-15",
      lastContact: "2024-01-20",
      notes: "Interested in Bible studies, has questions about baptism",
      assignedTo: "Elder Smith",
    },
    {
      id: "2",
      name: "Lisa Martinez",
      phone: "+1234567891",
      email: "lisa@example.com",
      address: "456 Oak Ave, City",
      status: "praying",
      dateAdded: "2024-01-10",
      lastContact: "2024-01-18",
      notes: "Considering accepting Christ, needs prayer support",
      assignedTo: "Deacon Johnson",
    },
  ])

  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      name: "Community Outreach Event",
      date: "2024-01-20",
      location: "City Park",
      contacts: 25,
      decisions: 3,
      followUps: 8,
    },
    {
      id: "2",
      name: "Door-to-Door Ministry",
      date: "2024-01-18",
      location: "Downtown Area",
      contacts: 15,
      decisions: 1,
      followUps: 5,
    },
  ])

  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    assignedTo: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "interested":
        return "bg-blue-100 text-blue-800"
      case "praying":
        return "bg-yellow-100 text-yellow-800"
      case "studying":
        return "bg-orange-100 text-orange-800"
      case "decided":
        return "bg-green-100 text-green-800"
      case "baptized":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "interested":
        return 20
      case "praying":
        return 40
      case "studying":
        return 60
      case "decided":
        return 80
      case "baptized":
        return 100
      default:
        return 0
    }
  }

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        email: newContact.email,
        address: newContact.address,
        status: "interested",
        dateAdded: new Date().toISOString().split("T")[0],
        lastContact: new Date().toISOString().split("T")[0],
        notes: newContact.notes,
        assignedTo: newContact.assignedTo,
      }

      setContacts([contact, ...contacts])
      setNewContact({ name: "", phone: "", email: "", address: "", notes: "", assignedTo: "" })
      setShowAddContact(false)
    }
  }

  const handleStatusUpdate = (contactId: string, newStatus: Contact["status"]) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, status: newStatus, lastContact: new Date().toISOString().split("T")[0] }
          : contact,
      ),
    )
  }

  const getStats = () => {
    return {
      total: contacts.length,
      interested: contacts.filter((c) => c.status === "interested").length,
      praying: contacts.filter((c) => c.status === "praying").length,
      studying: contacts.filter((c) => c.status === "studying").length,
      decided: contacts.filter((c) => c.status === "decided").length,
      baptized: contacts.filter((c) => c.status === "baptized").length,
    }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total Contacts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.interested}</p>
              <p className="text-xs text-muted-foreground">Interested</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.praying}</p>
              <p className="text-xs text-muted-foreground">Praying</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{stats.studying}</p>
              <p className="text-xs text-muted-foreground">Studying</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.decided}</p>
              <p className="text-xs text-muted-foreground">Decided</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.baptized}</p>
              <p className="text-xs text-muted-foreground">Baptized</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contacts Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Evangelism Contacts
                <Button onClick={() => setShowAddContact(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Contact Form */}
              {showAddContact && (
                <Card className="border-dashed">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-name">Name</Label>
                        <Input
                          id="contact-name"
                          value={newContact.name}
                          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                          placeholder="Enter contact name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-phone">Phone</Label>
                        <Input
                          id="contact-phone"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-email">Email</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={newContact.email}
                          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-assigned">Assigned To</Label>
                        <Input
                          id="contact-assigned"
                          value={newContact.assignedTo}
                          onChange={(e) => setNewContact({ ...newContact, assignedTo: e.target.value })}
                          placeholder="Who will follow up?"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="contact-address">Address</Label>
                        <Input
                          id="contact-address"
                          value={newContact.address}
                          onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
                          placeholder="Enter address"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="contact-notes">Notes</Label>
                        <Textarea
                          id="contact-notes"
                          value={newContact.notes}
                          onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                          placeholder="Additional notes..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleAddContact}>Add Contact</Button>
                      <Button variant="outline" onClick={() => setShowAddContact(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Contacts List */}
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <Card key={contact.id}>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{contact.name}</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <p>📞 {contact.phone}</p>
                              {contact.email && <p>✉️ {contact.email}</p>}
                              {contact.address && <p>📍 {contact.address}</p>}
                              <p>👤 Assigned to: {contact.assignedTo}</p>
                              <p>📅 Last contact: {contact.lastContact}</p>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(contact.status)}`}>{contact.status}</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span>{getStatusProgress(contact.status)}%</span>
                          </div>
                          <Progress value={getStatusProgress(contact.status)} className="h-2" />
                        </div>

                        {contact.notes && (
                          <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{contact.notes}</p>
                        )}

                        <div className="flex gap-2">
                          <select
                            value={contact.status}
                            onChange={(e) => handleStatusUpdate(contact.id, e.target.value as Contact["status"])}
                            className="text-xs px-2 py-1 border border-input bg-background rounded"
                          >
                            <option value="interested">Interested</option>
                            <option value="praying">Praying</option>
                            <option value="studying">Studying</option>
                            <option value="decided">Decided</option>
                            <option value="baptized">Baptized</option>
                          </select>
                          <Button variant="outline" size="sm">
                            Contact
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">{event.name}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-600">{event.contacts}</p>
                      <p className="text-xs text-muted-foreground">Contacts</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{event.decisions}</p>
                      <p className="text-xs text-muted-foreground">Decisions</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-orange-600">{event.followUps}</p>
                      <p className="text-xs text-muted-foreground">Follow-ups</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
