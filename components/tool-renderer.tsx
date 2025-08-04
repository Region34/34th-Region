"use client"

import { lazy, Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Tool, Department } from "@/lib/data"

// Lazy load all tool components
const SermonBuilder = lazy(() => import("@/components/tools/sermon-builder"))
const SongManagement = lazy(() => import("@/components/tools/song-management"))
const MediaLibrary = lazy(() => import("@/components/tools/media-library"))
const ServicePlanner = lazy(() => import("@/components/tools/service-planner"))
const BulkMessaging = lazy(() => import("@/components/tools/bulk-messaging"))
const VisitorFollowUp = lazy(() => import("@/components/tools/visitor-follow-up"))
const EvangelismTracking = lazy(() => import("@/components/tools/evangelism-tracking"))
const OnlineGivingCampaigns = lazy(() => import("@/components/tools/online-giving-campaigns"))
const MemberManagement = lazy(() => import("@/components/tools/member-management"))
const FinancialTracking = lazy(() => import("@/components/tools/financial-tracking"))
const FacilityBooking = lazy(() => import("@/components/tools/facility-booking"))
const ReportingAnalytics = lazy(() => import("@/components/tools/reporting-analytics"))
const YouthEventPlanner = lazy(() => import("@/components/tools/youth-event-planner"))
const CurriculumSharing = lazy(() => import("@/components/tools/curriculum-sharing"))
const ParentCommunication = lazy(() => import("@/components/tools/parent-communication"))
const VolunteerManagementYouth = lazy(() => import("@/components/tools/volunteer-management-youth"))
const BackgroundChecks = lazy(() => import("@/components/tools/background-checks"))
const IncidentReporting = lazy(() => import("@/components/tools/incident-reporting"))
const DataPrivacyManagement = lazy(() => import("@/components/tools/data-privacy-management"))
const SmallGroupManagement = lazy(() => import("@/components/tools/small-group-management"))
const CourseEnrollment = lazy(() => import("@/components/tools/course-enrollment"))
const SpiritualAssessment = lazy(() => import("@/components/tools/spiritual-assessment"))

const componentMap = {
  SermonBuilder,
  SongManagement,
  MediaLibrary,
  ServicePlanner,
  BulkMessaging,
  VisitorFollowUp,
  EvangelismTracking,
  OnlineGivingCampaigns,
  MemberManagement,
  FinancialTracking,
  FacilityBooking,
  ReportingAnalytics,
  YouthEventPlanner,
  CurriculumSharing,
  ParentCommunication,
  VolunteerManagementYouth,
  BackgroundChecks,
  IncidentReporting,
  DataPrivacyManagement,
  SmallGroupManagement,
  CourseEnrollment,
  SpiritualAssessment,
}

interface ToolRendererProps {
  tool: Tool
  department: Department
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function ToolRenderer({ tool, department }: ToolRendererProps) {
  const Component = componentMap[tool.componentName as keyof typeof componentMap]

  if (!Component) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Tool Not Found</h2>
        <p className="text-muted-foreground">The requested tool component could not be loaded.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Component tool={tool} department={department} />
    </Suspense>
  )
}
