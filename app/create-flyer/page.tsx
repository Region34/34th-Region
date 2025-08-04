"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar, Footer } from "@/app/page"
import {
  Upload,
  Wand2,
  Calendar,
  MapPin,
  ImageIcon,
  Palette,
  Download,
  Share2,
  Eye,
  Edit,
  Clock,
  Trash2,
  ArrowLeft,
  Facebook,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react"
import Link from "next/link"

// Types
interface FlyerData {
  id: string
  type: "custom" | "generated"
  title: string
  date?: string
  time?: string
  venue?: string
  guestMinisters?: string
  hosts?: string
  personalName?: string
  personalMessage?: string
  backgroundImage?: string
  backgroundColor?: string
  backgroundGradient?: string
  layout?: string
  customImage?: string
  customName?: string
  customSlogan?: string
  createdAt: Date
  lastModified: Date
}

// Share Dialog Component
function ShareDialog({ isOpen, onClose, flyer }: { isOpen: boolean; onClose: () => void; flyer?: FlyerData }) {
  const shareOptions = [
    { name: "Facebook", icon: Facebook, color: "text-blue-600" },
    { name: "Twitter", icon: Twitter, color: "text-sky-500" },
    { name: "Instagram", icon: Instagram, color: "text-pink-600" },
    { name: "Email", icon: Mail, color: "text-gray-600" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Flyer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {shareOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <Button
                  key={option.name}
                  variant="outline"
                  className="flex items-center gap-2 h-12 bg-transparent"
                  onClick={() => {
                    // Handle share logic here
                    console.log(`Sharing to ${option.name}`)
                    onClose()
                  }}
                >
                  <IconComponent className={`h-5 w-5 ${option.color}`} />
                  {option.name}
                </Button>
              )
            })}
          </div>
          <Separator />
          <div>
            <Label htmlFor="share-link">Share Link</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="share-link"
                value={`https://34thregion.com/flyer/${flyer?.id || "demo"}`}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(`https://34thregion.com/flyer/${flyer?.id || "demo"}`)
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Initial Selection Component
function InitialSelection({ onSelect }: { onSelect: (type: "upload" | "generate") => void }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <Card
        className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
        onClick={() => onSelect("upload")}
      >
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-4 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300 w-fit">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-xl mb-2">Upload Your Own Design</CardTitle>
          <CardDescription>Have a custom design? Upload it and add your event details</CardDescription>
        </CardHeader>
      </Card>

      <Card
        className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
        onClick={() => onSelect("generate")}
      >
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-4 rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-all duration-300 w-fit">
            <Wand2 className="h-8 w-8 text-secondary" />
          </div>
          <CardTitle className="text-xl mb-2">Auto-Generate a Flyer</CardTitle>
          <CardDescription>Use our smart builder to create professional flyers automatically</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

// Custom Upload Component
function CustomUploadSection({
  onUpload,
  onBack,
}: { onUpload: (data: Partial<FlyerData>) => void; onBack: () => void }) {
  const [customImage, setCustomImage] = useState<string>("")
  const [customName, setCustomName] = useState("")
  const [customSlogan, setCustomSlogan] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCustomImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    const flyerData: Partial<FlyerData> = {
      id: Date.now().toString(),
      type: "custom",
      title: customName || "Custom Flyer",
      customImage,
      customName,
      customSlogan,
      createdAt: new Date(),
      lastModified: new Date(),
    }
    onUpload(flyerData)
    setCustomImage("")
    setCustomName("")
    setCustomSlogan("")
    setShowPreview(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
        <h2 className="text-2xl font-bold">Upload Your Own Design</h2>
      </div>

      <Card className="w-full">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="custom-image">Upload Image</Label>
            <div className="mt-2">
              <input
                ref={fileInputRef}
                type="file"
                id="custom-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-dashed border-2 hover:border-primary/50 bg-transparent"
              >
                {customImage ? (
                  <img
                    src={customImage || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-28 max-w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Click to upload image</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="custom-name">Event Name</Label>
            <Input
              id="custom-name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Enter event name"
              className="font-serif text-lg"
            />
          </div>

          <div>
            <Label htmlFor="custom-slogan">Event Slogan/Description</Label>
            <Textarea
              id="custom-slogan"
              value={customSlogan}
              onChange={(e) => setCustomSlogan(e.target.value)}
              placeholder="Enter event slogan or description"
              className="min-h-[80px]"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowPreview(true)} variant="outline" className="flex-1 bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} disabled={!customImage || !customName} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Save & Download
            </Button>
            <Button
              variant="outline"
              disabled={!customImage || !customName}
              onClick={() => setShowShare(true)}
              className="bg-transparent"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Preview Dialog */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Flyer Preview</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {customImage && (
                  <div className="relative">
                    <img src={customImage || "/placeholder.svg"} alt="Flyer preview" className="w-full rounded-lg" />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded">
                      <h3 className="font-serif text-lg font-bold">{customName}</h3>
                      {customSlogan && <p className="text-sm mt-1">{customSlogan}</p>}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Share Dialog */}
          <ShareDialog
            isOpen={showShare}
            onClose={() => setShowShare(false)}
            flyer={{ id: "demo", customName, customSlogan } as FlyerData}
          />
        </CardContent>
      </Card>
    </div>
  )
}

// Auto-Generate Flyer Component
function AutoGenerateSection({
  onGenerate,
  onBack,
}: { onGenerate: (data: Partial<FlyerData>) => void; onBack: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    guestMinisters: "",
    hosts: "",
    personalName: "",
    personalMessage: "",
    backgroundColor: "#9f6496",
    backgroundGradient: "linear-gradient(135deg, #9f6496 0%, #d391b0 100%)",
    layout: "modern",
  })
  const [backgroundImage, setBackgroundImage] = useState<string>("")
  const [showPreview, setShowPreview] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBackgroundImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      backgroundColor: color,
      backgroundGradient: `linear-gradient(135deg, ${color} 0%, ${adjustColorBrightness(color, 20)} 100%)`,
    }))
  }

  const adjustColorBrightness = (hex: string, percent: number) => {
    const num = Number.parseInt(hex.replace("#", ""), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  const handleSave = () => {
    const flyerData: Partial<FlyerData> = {
      id: Date.now().toString(),
      type: "generated",
      ...formData,
      backgroundImage,
      createdAt: new Date(),
      lastModified: new Date(),
    }
    onGenerate(flyerData)
    setShowPreview(false)
  }

  const gradientOptions = [
    { name: "Purple Elegance", value: "linear-gradient(135deg, #9f6496 0%, #d391b0 100%)" },
    { name: "Divine Light", value: "linear-gradient(135deg, #ba6e8f 0%, #ffeaf2 100%)" },
    { name: "Spiritual Depth", value: "linear-gradient(135deg, #0c0420 0%, #5d3c64 100%)" },
    { name: "Heavenly Glow", value: "linear-gradient(135deg, #d391b0 0%, #ffffff 100%)" },
    { name: "Royal Purple", value: "linear-gradient(135deg, #5d3c64 0%, #7b466a 100%)" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="bg-transparent">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
        <h2 className="text-2xl font-bold">Auto-Generate a Flyer</h2>
      </div>

      <Card className="w-full">
        <CardContent className="pt-6 space-y-6">
          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event-title">Event Title *</Label>
              <Input
                id="event-title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Sunday Service"
                className="font-serif text-lg"
              />
            </div>
            <div>
              <Label htmlFor="venue">Venue *</Label>
              <Input
                id="venue"
                value={formData.venue}
                onChange={(e) => handleInputChange("venue", e.target.value)}
                placeholder="Main Sanctuary"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event-date">Event Date</Label>
              <Input
                id="event-date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="event-time">Event Time</Label>
              <Input
                id="event-time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="guest-ministers">Guest Minister(s)</Label>
              <Input
                id="guest-ministers"
                value={formData.guestMinisters}
                onChange={(e) => handleInputChange("guestMinisters", e.target.value)}
                placeholder="Pastor John Smith"
              />
            </div>
            <div>
              <Label htmlFor="hosts">Host(s)</Label>
              <Input
                id="hosts"
                value={formData.hosts}
                onChange={(e) => handleInputChange("hosts", e.target.value)}
                placeholder="34th Region Church"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="personal-name">Your Name (Optional)</Label>
              <Input
                id="personal-name"
                value={formData.personalName}
                onChange={(e) => handleInputChange("personalName", e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="layout">Flyer Layout</Label>
              <Select value={formData.layout} onValueChange={(value) => handleInputChange("layout", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="elegant">Elegant</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="personal-message">Personal Message/Quote (Optional)</Label>
            <Textarea
              id="personal-message"
              value={formData.personalMessage}
              onChange={(e) => handleInputChange("personalMessage", e.target.value)}
              placeholder="Come and worship with us..."
              className="min-h-[80px]"
            />
          </div>

          {/* Design Options */}
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Design Options
            </h3>

            <div>
              <Label>Background Image (Optional)</Label>
              <div className="mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-24 border-dashed border-2 hover:border-primary/50 bg-transparent"
                >
                  {backgroundImage ? (
                    <img
                      src={backgroundImage || "/placeholder.svg"}
                      alt="Background preview"
                      className="max-h-20 max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Upload background image</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>

            <div>
              <Label>Background Color</Label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  value={formData.backgroundColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-12 h-10 rounded border border-border"
                />
                <Input
                  value={formData.backgroundColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  placeholder="#9f6496"
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label>Background Gradient</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {gradientOptions.map((gradient) => (
                  <button
                    key={gradient.name}
                    onClick={() => handleInputChange("backgroundGradient", gradient.value)}
                    className={`h-12 rounded-lg border-2 transition-all ${
                      formData.backgroundGradient === gradient.value
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                    style={{ background: gradient.value }}
                    title={gradient.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => setShowPreview(true)}
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={!formData.title}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Design
            </Button>
            <Button onClick={handleSave} disabled={!formData.title} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Flyer
            </Button>
            <Button
              variant="outline"
              disabled={!formData.title}
              onClick={() => setShowShare(true)}
              className="bg-transparent"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Flyer
            </Button>
          </div>

          {/* Preview Dialog */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Flyer Preview</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div
                  className="relative w-full h-96 rounded-lg overflow-hidden"
                  style={{
                    background: backgroundImage ? `url(${backgroundImage}) center/cover` : formData.backgroundGradient,
                  }}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <div className="text-center">
                      <h1 className="font-serif text-2xl font-bold mb-2">{formData.title}</h1>
                      {formData.guestMinisters && <p className="text-lg mb-1">with {formData.guestMinisters}</p>}
                    </div>

                    <div className="text-center space-y-2">
                      {formData.date && (
                        <p className="flex items-center justify-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(formData.date).toLocaleDateString()}
                          {formData.time && ` at ${formData.time}`}
                        </p>
                      )}
                      {formData.venue && (
                        <p className="flex items-center justify-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {formData.venue}
                        </p>
                      )}
                      {formData.hosts && <p className="text-sm">Hosted by {formData.hosts}</p>}
                      {formData.personalMessage && <p className="text-sm italic mt-4">"{formData.personalMessage}"</p>}
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Share Dialog */}
          <ShareDialog
            isOpen={showShare}
            onClose={() => setShowShare(false)}
            flyer={{ id: "demo", title: formData.title } as FlyerData}
          />
        </CardContent>
      </Card>
    </div>
  )
}

// Saved Designs Component
function SavedDesigns({
  flyers,
  onEdit,
  onDelete,
}: {
  flyers: FlyerData[]
  onEdit: (flyer: FlyerData) => void
  onDelete: (id: string) => void
}) {
  if (flyers.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No saved flyers yet</h3>
          <p className="text-muted-foreground">Create your first flyer using the tools above</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Saved Designs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flyers.map((flyer) => (
          <TooltipProvider key={flyer.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-4">
                    <div
                      className="w-full h-32 rounded-lg mb-3 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: flyer.backgroundImage
                          ? `url(${flyer.backgroundImage}) center/cover`
                          : flyer.backgroundGradient || flyer.backgroundColor,
                      }}
                    >
                      {flyer.customImage && (
                        <img
                          src={flyer.customImage || "/placeholder.svg"}
                          alt="Flyer"
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 p-2 flex flex-col justify-center items-center text-white text-center">
                        <h3 className="font-serif text-sm font-bold truncate w-full">{flyer.title}</h3>
                        {flyer.date && <p className="text-xs mt-1">{new Date(flyer.date).toLocaleDateString()}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold truncate">{flyer.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Modified {flyer.lastModified.toLocaleDateString()}</span>
                        <Badge variant="secondary" className="text-xs">
                          {flyer.type}
                        </Badge>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(flyer)}
                          className="flex-1 bg-transparent"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDelete(flyer.id)}
                          className="text-destructive hover:text-destructive bg-transparent"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs">
                  <p className="font-semibold">{flyer.title}</p>
                  {flyer.venue && <p className="text-sm">Venue: {flyer.venue}</p>}
                  {flyer.guestMinisters && <p className="text-sm">Guest: {flyer.guestMinisters}</p>}
                  <p className="text-xs text-muted-foreground mt-1">Created: {flyer.createdAt.toLocaleDateString()}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
}

// Main Flyer Creation Page
export default function CreateFlyerPage() {
  const [currentView, setCurrentView] = useState<"initial" | "upload" | "generate">("initial")
  const [savedFlyers, setSavedFlyers] = useState<FlyerData[]>([])
  const [editingFlyer, setEditingFlyer] = useState<FlyerData | null>(null)

  // Load saved flyers from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("34th-region-flyers")
    if (saved) {
      try {
        const parsed = JSON.parse(saved).map((flyer: any) => ({
          ...flyer,
          createdAt: new Date(flyer.createdAt),
          lastModified: new Date(flyer.lastModified),
        }))
        setSavedFlyers(parsed)
      } catch (error) {
        console.error("Error loading saved flyers:", error)
      }
    }
  }, [])

  // Save flyers to localStorage whenever savedFlyers changes
  useEffect(() => {
    localStorage.setItem("34th-region-flyers", JSON.stringify(savedFlyers))
  }, [savedFlyers])

  const handleSaveFlyer = (flyerData: Partial<FlyerData>) => {
    const newFlyer = flyerData as FlyerData
    setSavedFlyers((prev) => [newFlyer, ...prev])
    setCurrentView("initial")
  }

  const handleEditFlyer = (flyer: FlyerData) => {
    setEditingFlyer(flyer)
    setCurrentView(flyer.type === "custom" ? "upload" : "generate")
  }

  const handleDeleteFlyer = (id: string) => {
    setSavedFlyers((prev) => prev.filter((flyer) => flyer.id !== id))
  }

  const handleBackToInitial = () => {
    setCurrentView("initial")
    setEditingFlyer(null)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container max-w-6xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Create and Share Your Event Flyers</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Design beautiful, professional flyers for your church events in minutes. Choose from our templates or
              upload your own design.
            </p>
          </div>

          {/* Dynamic Content Based on Current View */}
          {currentView === "initial" && (
            <>
              <InitialSelection onSelect={setCurrentView} />
              <SavedDesigns flyers={savedFlyers} onEdit={handleEditFlyer} onDelete={handleDeleteFlyer} />
            </>
          )}

          {currentView === "upload" && <CustomUploadSection onUpload={handleSaveFlyer} onBack={handleBackToInitial} />}

          {currentView === "generate" && (
            <AutoGenerateSection onGenerate={handleSaveFlyer} onBack={handleBackToInitial} />
          )}
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}
