"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Target, TrendingUp, Calendar, Users, Plus } from "lucide-react"
import type { Tool, Department } from "@/lib/data"

interface OnlineGivingCampaignsProps {
  tool: Tool
  department: Department
}

interface Campaign {
  id: string
  name: string
  goal: number
  raised: number
  startDate: string
  endDate: string
  status: "active" | "completed" | "upcoming"
  donors: number
  description: string
}

export default function OnlineGivingCampaigns({ tool, department }: OnlineGivingCampaignsProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Building Fund 2024",
      goal: 50000,
      raised: 32500,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      donors: 125,
      description: "Raising funds for our new sanctuary expansion",
    },
    {
      id: "2",
      name: "Youth Mission Trip",
      goal: 15000,
      raised: 15000,
      startDate: "2023-10-01",
      endDate: "2024-01-15",
      status: "completed",
      donors: 45,
      description: "Supporting our youth mission trip to Honduras",
    },
    {
      id: "3",
      name: "Easter Outreach",
      goal: 8000,
      raised: 0,
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      status: "upcoming",
      donors: 0,
      description: "Community Easter event and outreach program",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "upcoming":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const getTotalStats = () => {
    return {
      totalRaised: campaigns.reduce((sum, campaign) => sum + campaign.raised, 0),
      totalGoal: campaigns.reduce((sum, campaign) => sum + campaign.goal, 0),
      totalDonors: campaigns.reduce((sum, campaign) => sum + campaign.donors, 0),
      activeCampaigns: campaigns.filter((c) => c.status === "active").length,
    }
  }

  const stats = getTotalStats()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{tool.name}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRaised)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Goal</p>
                <p className="text-2xl font-bold">{formatCurrency(stats.totalGoal)}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donors</p>
                <p className="text-2xl font-bold">{stats.totalDonors}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold">{stats.activeCampaigns}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Giving Campaigns
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{campaign.name}</h3>
                        <Badge className={`${getStatusColor(campaign.status)}`}>{campaign.status}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{campaign.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {campaign.startDate} - {campaign.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.donors} donors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <span>Goal: {formatCurrency(campaign.goal)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>Raised: {formatCurrency(campaign.raised)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {getProgressPercentage(campaign.raised, campaign.goal).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={getProgressPercentage(campaign.raised, campaign.goal)} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatCurrency(campaign.raised)} raised</span>
                      <span>{formatCurrency(campaign.goal - campaign.raised)} remaining</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit Campaign
                    </Button>
                    <Button variant="outline" size="sm">
                      Share Link
                    </Button>
                    {campaign.status === "active" && <Button size="sm">Donate Now</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
