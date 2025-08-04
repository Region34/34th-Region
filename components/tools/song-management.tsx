"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Music, Plus, Search, Edit, Trash2 } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface SongManagementProps {
  tool: Tool
  department: Department
}

interface Song {
  id: string
  title: string
  artist: string
  key: string
  tempo: string
  lyrics: string
  tags: string[]
}

export default function SongManagement({ tool, department }: SongManagementProps) {
  const [songs, setSongs] = useState<Song[]>([
    {
      id: "1",
      title: "Amazing Grace",
      artist: "John Newton",
      key: "G",
      tempo: "80 BPM",
      lyrics: "Amazing grace, how sweet the sound...",
      tags: ["Classic", "Hymn", "Worship"],
    },
    {
      id: "2",
      title: "How Great Thou Art",
      artist: "Carl Boberg",
      key: "C",
      tempo: "75 BPM",
      lyrics: "O Lord my God, when I in awesome wonder...",
      tags: ["Classic", "Hymn", "Praise"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    key: "",
    tempo: "",
    lyrics: "",
    tags: "",
  })

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddSong = () => {
    if (newSong.title && newSong.artist) {
      const song: Song = {
        id: Date.now().toString(),
        title: newSong.title,
        artist: newSong.artist,
        key: newSong.key,
        tempo: newSong.tempo,
        lyrics: newSong.lyrics,
        tags: newSong.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }
      setSongs([...songs, song])
      setNewSong({ title: "", artist: "", key: "", tempo: "", lyrics: "", tags: "" })
      setShowAddForm(false)
    }
  }

  const handleDeleteSong = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Music className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Search and Add Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Song Library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search songs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={() => setShowAddForm(!showAddForm)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Song
              </Button>
            </div>

            {/* Add Song Form */}
            {showAddForm && (
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Song Title</Label>
                      <Input
                        id="title"
                        value={newSong.title}
                        onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                        placeholder="Enter song title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="artist">Artist</Label>
                      <Input
                        id="artist"
                        value={newSong.artist}
                        onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                        placeholder="Enter artist name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="key">Key</Label>
                      <Input
                        id="key"
                        value={newSong.key}
                        onChange={(e) => setNewSong({ ...newSong, key: e.target.value })}
                        placeholder="e.g., G, C, D"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tempo">Tempo</Label>
                      <Input
                        id="tempo"
                        value={newSong.tempo}
                        onChange={(e) => setNewSong({ ...newSong, tempo: e.target.value })}
                        placeholder="e.g., 80 BPM"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="lyrics">Lyrics</Label>
                      <Textarea
                        id="lyrics"
                        value={newSong.lyrics}
                        onChange={(e) => setNewSong({ ...newSong, lyrics: e.target.value })}
                        placeholder="Enter song lyrics..."
                        rows={4}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={newSong.tags}
                        onChange={(e) => setNewSong({ ...newSong, tags: e.target.value })}
                        placeholder="e.g., Worship, Hymn, Contemporary"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleAddSong}>Add Song</Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Songs List */}
        <div className="grid gap-4">
          {filteredSongs.map((song) => (
            <Card key={song.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold">{song.title}</h3>
                      <Badge variant="secondary">{song.key}</Badge>
                      <Badge variant="outline">{song.tempo}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-2">by {song.artist}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {song.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{song.lyrics}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteSong(song.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSongs.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No songs found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
