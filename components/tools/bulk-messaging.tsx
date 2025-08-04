"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Users, Mail, Phone, Calendar } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface BulkMessagingProps {
  tool: Tool
  department: Department
}

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  groups: string[]
}

interface Message {
  id: string
  title: string
  content: string
  type: "email" | "sms"
  recipients: number
  status: "draft" | "sent" | "scheduled"
  sentDate?: string
  scheduledDate?: string
}

export default function BulkMessaging({ tool, department }: BulkMessagingProps) {
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1234567890",
      groups: ["Members", "Volunteers"],
    },
    {
      id: "2",
      name: "Mary Johnson",
      email: "mary@example.com",
      phone: "+1234567891",
      groups: ["Members", "Youth"],
    },
    {
      id: "3",
      name: "David Wilson",
      email: "david@example.com",
      phone: "+1234567892",
      groups: ["Visitors", "New Members"],
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      title: "Sunday Service Reminder",
      content: "Don't forget about our Sunday service at 10 AM. We look forward to seeing you!",
      type: "email",
      recipients: 150,
      status: "sent",
      sentDate: "2024-01-20",
    },
    {
      id: "2",
      title: "Youth Event Announcement",
      content: "Join us for our youth event this Friday at 7 PM. Pizza and games included!",
      type: "sms",
      recipients: 45,
      status: "scheduled",
      scheduledDate: "2024-01-25",
    },
  ])

  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [messageForm, setMessageForm] = useState({
    title: "",
    content: "",
    type: "email" as "email" | "sms",
    scheduledDate: "",
  })

  const allGroups = Array.from(new Set(contacts.flatMap((contact) => contact.groups)))

  const getSelectedContacts = () => {
    if (selectedGroups.length === 0) return contacts
    return contacts.filter((contact) => contact.groups.some((group) => selectedGroups.includes(group)))
  }

  const handleGroupToggle = (group: string) => {
    setSelectedGroups((prev) => (prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]))
  }

  const handleSendMessage = () => {
    if (messageForm.title && messageForm.content) {
      const newMessage: Message = {
        id: Date.now().toString(),
        title: messageForm.title,
        content: messageForm.content,
        type: messageForm.type,
        recipients: getSelectedContacts().length,
        status: messageForm.scheduledDate ? "scheduled" : "sent",
        sentDate: messageForm.scheduledDate ? undefined : new Date().toISOString().split("T")[0],
        scheduledDate: messageForm.scheduledDate || undefined,
      }

      setMessages([newMessage, ...messages])
      setMessageForm({ title: "", content: "", type: "email", scheduledDate: "" })
      setSelectedGroups([])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
          <TabsTrigger value="contacts">Manage Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recipient Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Recipients</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Groups</Label>
                  {allGroups.map((group) => (
                    <div key={group} className="flex items-center space-x-2">
                      <Checkbox
                        id={group}
                        checked={selectedGroups.includes(group)}
                        onCheckedChange={() => handleGroupToggle(group)}
                      />
                      <Label htmlFor={group} className="text-sm">
                        {group} ({contacts.filter((c) => c.groups.includes(group)).length})
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {getSelectedContacts().length} recipients selected
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Message Composition */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Compose Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="message-title">Message Title</Label>
                      <Input
                        id="message-title"
                        value={messageForm.title}
                        onChange={(e) => setMessageForm({ ...messageForm, title: e.target.value })}
                        placeholder="Enter message title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="message-type">Message Type</Label>
                      <select
                        id="message-type"
                        value={messageForm.type}
                        onChange={(e) => setMessageForm({ ...messageForm, type: e.target.value as "email" | "sms" })}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message-content">Message Content</Label>
                    <Textarea
                      id="message-content"
                      value={messageForm.content}
                      onChange={(e) => setMessageForm({ ...messageForm, content: e.target.value })}
                      placeholder="Enter your message..."
                      rows={6}
                      maxLength={messageForm.type === "sms" ? 160 : undefined}
                    />
                    {messageForm.type === "sms" && (
                      <p className="text-xs text-muted-foreground mt-1">{messageForm.content.length}/160 characters</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="scheduled-date">Schedule for Later (Optional)</Label>
                    <Input
                      id="scheduled-date"
                      type="datetime-local"
                      value={messageForm.scheduledDate}
                      onChange={(e) => setMessageForm({ ...messageForm, scheduledDate: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSendMessage} disabled={!messageForm.title || !messageForm.content}>
                      <Send className="h-4 w-4 mr-2" />
                      {messageForm.scheduledDate ? "Schedule Message" : "Send Now"}
                    </Button>
                    <Button variant="outline">Save as Draft</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <Card key={message.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{message.title}</h3>
                            <Badge className={`text-xs ${getStatusColor(message.status)}`}>{message.status}</Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              {message.type === "email" ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                              {message.type.toUpperCase()}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{message.content}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {message.recipients} recipients
                            </div>
                            {message.sentDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Sent: {message.sentDate}
                              </div>
                            )}
                            {message.scheduledDate && (
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Scheduled: {message.scheduledDate}
                              </div>
                            )}
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

        <TabsContent value="contacts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <Card key={contact.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium mb-2">{contact.name}</h3>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" />
                              {contact.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              {contact.phone}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {contact.groups.map((group, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
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
