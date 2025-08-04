import {
  Music,
  Mic,
  ImageIcon,
  Calendar,
  MessageSquare,
  UserPlus,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  MapPin,
  Baby,
  GraduationCap,
  Shield,
  AlertTriangle,
  Lock,
  BookOpen,
  UserCheck,
  Heart,
  type LucideIcon,
} from "lucide-react"

export interface Tool {
  slug: string
  name: string
  description: string
  category: string
  features: string[]
  icon: LucideIcon
  componentName: string
  path: string
}

export interface Department {
  slug: string
  name: string
  description: string
  icon: LucideIcon
  tools: Tool[]
}

export const departments: Department[] = [
  {
    slug: "worship-creative",
    name: "Worship & Creative",
    description: "Tools for worship planning, music management, and creative content creation",
    icon: Music,
    tools: [
      {
        slug: "sermon-builder",
        name: "Sermon Builder",
        description:
          "Create, organize, and deliver powerful sermons with integrated scripture references, notes, and multimedia support.",
        category: "Content Creation",
        features: [
          "Scripture Integration",
          "Note Organization",
          "Multimedia Support",
          "Sermon Archive",
          "Sharing Tools",
        ],
        icon: Mic,
        componentName: "SermonBuilder",
        path: "/tools/worship-creative/sermon-builder",
      },
      {
        slug: "song-management",
        name: "Song Management",
        description:
          "Organize your church's music library, create setlists, and manage chord charts and lyrics for worship teams.",
        category: "Music",
        features: ["Song Database", "Chord Charts", "Setlist Creation", "Key Transposition", "Team Collaboration"],
        icon: Music,
        componentName: "SongManagement",
        path: "/tools/worship-creative/song-management",
      },
      {
        slug: "media-library",
        name: "Media Library",
        description:
          "Store, organize, and manage all your church's digital assets including images, videos, and audio files.",
        category: "Media",
        features: ["Cloud Storage", "Asset Organization", "Search & Filter", "Version Control", "Access Permissions"],
        icon: ImageIcon,
        componentName: "MediaLibrary",
        path: "/tools/worship-creative/media-library",
      },
      {
        slug: "service-planner",
        name: "Service Planner",
        description:
          "Plan and coordinate worship services with timeline management, team assignments, and resource allocation.",
        category: "Planning",
        features: ["Service Timeline", "Team Scheduling", "Resource Management", "Template Library", "Live Updates"],
        icon: Calendar,
        componentName: "ServicePlanner",
        path: "/tools/worship-creative/service-planner",
      },
    ],
  },
  {
    slug: "outreach-evangelism",
    name: "Outreach & Evangelism",
    description: "Engage your community and spread the Gospel through targeted outreach campaigns",
    icon: MessageSquare,
    tools: [
      {
        slug: "bulk-messaging",
        name: "Bulk Messaging",
        description:
          "Send targeted messages to your congregation via SMS, email, and push notifications with advanced segmentation.",
        category: "Communication",
        features: [
          "Multi-Channel Messaging",
          "Audience Segmentation",
          "Message Templates",
          "Delivery Analytics",
          "Automated Campaigns",
        ],
        icon: MessageSquare,
        componentName: "BulkMessaging",
        path: "/tools/outreach-evangelism/bulk-messaging",
      },
      {
        slug: "visitor-follow-up",
        name: "Visitor Follow-up",
        description:
          "Automatically track and follow up with church visitors through personalized communication workflows.",
        category: "Engagement",
        features: ["Visitor Tracking", "Automated Follow-up", "Personal Notes", "Visit History", "Integration Tools"],
        icon: UserPlus,
        componentName: "VisitorFollowUp",
        path: "/tools/outreach-evangelism/visitor-follow-up",
      },
      {
        slug: "evangelism-tracking",
        name: "Evangelism Tracking",
        description:
          "Track evangelism efforts, prayer requests, and spiritual conversations with comprehensive reporting.",
        category: "Tracking",
        features: [
          "Contact Management",
          "Prayer Requests",
          "Conversation Logs",
          "Progress Tracking",
          "Team Coordination",
        ],
        icon: TrendingUp,
        componentName: "EvangelismTracking",
        path: "/tools/outreach-evangelism/evangelism-tracking",
      },
      {
        slug: "online-giving-campaigns",
        name: "Online Giving Campaigns",
        description:
          "Create and manage fundraising campaigns with goal tracking, donor management, and automated receipts.",
        category: "Fundraising",
        features: [
          "Campaign Creation",
          "Goal Tracking",
          "Donor Management",
          "Automated Receipts",
          "Payment Processing",
        ],
        icon: DollarSign,
        componentName: "OnlineGivingCampaigns",
        path: "/tools/outreach-evangelism/online-giving-campaigns",
      },
    ],
  },
  {
    slug: "administration-finance",
    name: "Administration & Finance",
    description: "Streamline church operations with member management, financial tracking, and reporting tools",
    icon: BarChart3,
    tools: [
      {
        slug: "member-management",
        name: "Member Management",
        description:
          "Comprehensive member database with contact information, attendance tracking, and engagement analytics.",
        category: "Management",
        features: ["Member Database", "Attendance Tracking", "Contact Management", "Family Grouping", "Custom Fields"],
        icon: Users,
        componentName: "MemberManagement",
        path: "/tools/administration-finance/member-management",
      },
      {
        slug: "financial-tracking",
        name: "Financial Tracking",
        description: "Track donations, expenses, and generate financial reports with built-in accounting features.",
        category: "Finance",
        features: ["Donation Tracking", "Expense Management", "Financial Reports", "Budget Planning", "Tax Reporting"],
        icon: DollarSign,
        componentName: "FinancialTracking",
        path: "/tools/administration-finance/financial-tracking",
      },
      {
        slug: "facility-booking",
        name: "Facility Booking",
        description:
          "Manage church facility reservations, room scheduling, and resource allocation with conflict prevention.",
        category: "Operations",
        features: [
          "Room Scheduling",
          "Resource Management",
          "Conflict Prevention",
          "Booking Calendar",
          "Approval Workflow",
        ],
        icon: MapPin,
        componentName: "FacilityBooking",
        path: "/tools/administration-finance/facility-booking",
      },
      {
        slug: "reporting-analytics",
        name: "Reporting & Analytics",
        description: "Generate comprehensive reports on attendance, giving, engagement, and church growth metrics.",
        category: "Analytics",
        features: ["Custom Reports", "Growth Analytics", "Attendance Trends", "Giving Analysis", "Export Options"],
        icon: BarChart3,
        componentName: "ReportingAnalytics",
        path: "/tools/administration-finance/reporting-analytics",
      },
    ],
  },
  {
    slug: "youth-children",
    name: "Youth & Children",
    description: "Specialized tools for managing youth programs, children's ministry, and family engagement",
    icon: Baby,
    tools: [
      {
        slug: "youth-event-planner",
        name: "Youth Event Planner",
        description:
          "Plan and manage youth events, camps, and activities with registration, permission slips, and communication tools.",
        category: "Events",
        features: [
          "Event Planning",
          "Registration Forms",
          "Permission Slips",
          "Parent Communication",
          "Activity Tracking",
        ],
        icon: Calendar,
        componentName: "YouthEventPlanner",
        path: "/tools/youth-children/youth-event-planner",
      },
      {
        slug: "curriculum-sharing",
        name: "Curriculum Sharing",
        description: "Share and collaborate on Sunday school curricula, lesson plans, and educational resources.",
        category: "Education",
        features: [
          "Lesson Plans",
          "Resource Library",
          "Curriculum Templates",
          "Collaboration Tools",
          "Progress Tracking",
        ],
        icon: GraduationCap,
        componentName: "CurriculumSharing",
        path: "/tools/youth-children/curriculum-sharing",
      },
      {
        slug: "parent-communication",
        name: "Parent Communication",
        description:
          "Keep parents informed about their children's activities, events, and spiritual growth through targeted messaging.",
        category: "Communication",
        features: ["Parent Messaging", "Activity Updates", "Photo Sharing", "Event Notifications", "Progress Reports"],
        icon: MessageSquare,
        componentName: "ParentCommunication",
        path: "/tools/youth-children/parent-communication",
      },
      {
        slug: "volunteer-management-youth",
        name: "Volunteer Management",
        description:
          "Recruit, schedule, and manage volunteers for youth and children's programs with background check integration.",
        category: "Management",
        features: [
          "Volunteer Database",
          "Scheduling Tools",
          "Background Checks",
          "Training Tracking",
          "Communication Hub",
        ],
        icon: UserCheck,
        componentName: "VolunteerManagementYouth",
        path: "/tools/youth-children/volunteer-management-youth",
      },
    ],
  },
  {
    slug: "safety-compliance",
    name: "Safety & Compliance",
    description:
      "Ensure church safety and legal compliance with background checks, incident reporting, and policy management",
    icon: Shield,
    tools: [
      {
        slug: "background-checks",
        name: "Background Checks",
        description:
          "Streamline background check processes for volunteers and staff with automated tracking and compliance reporting.",
        category: "Compliance",
        features: [
          "Automated Screening",
          "Compliance Tracking",
          "Document Storage",
          "Renewal Alerts",
          "Reporting Tools",
        ],
        icon: Shield,
        componentName: "BackgroundChecks",
        path: "/tools/safety-compliance/background-checks",
      },
      {
        slug: "incident-reporting",
        name: "Incident Reporting",
        description:
          "Document and track safety incidents, accidents, and security concerns with proper reporting workflows.",
        category: "Safety",
        features: ["Incident Forms", "Photo Documentation", "Follow-up Tracking", "Report Generation", "Alert System"],
        icon: AlertTriangle,
        componentName: "IncidentReporting",
        path: "/tools/safety-compliance/incident-reporting",
      },
      {
        slug: "data-privacy-management",
        name: "Data Privacy Management",
        description:
          "Manage member data privacy, consent tracking, and GDPR compliance with automated privacy controls.",
        category: "Privacy",
        features: [
          "Consent Management",
          "Data Auditing",
          "Privacy Controls",
          "Compliance Reports",
          "Automated Deletion",
        ],
        icon: Lock,
        componentName: "DataPrivacyManagement",
        path: "/tools/safety-compliance/data-privacy-management",
      },
    ],
  },
  {
    slug: "discipleship-education",
    name: "Discipleship & Education",
    description: "Foster spiritual growth through small groups, courses, and discipleship programs",
    icon: BookOpen,
    tools: [
      {
        slug: "small-group-management",
        name: "Small Group Management",
        description:
          "Organize and manage small groups, Bible studies, and fellowship groups with member tracking and resources.",
        category: "Groups",
        features: [
          "Group Organization",
          "Member Tracking",
          "Resource Sharing",
          "Meeting Scheduling",
          "Progress Reports",
        ],
        icon: Users,
        componentName: "SmallGroupManagement",
        path: "/tools/discipleship-education/small-group-management",
      },
      {
        slug: "course-enrollment",
        name: "Course Enrollment",
        description:
          "Manage church courses, classes, and educational programs with enrollment tracking and progress monitoring.",
        category: "Education",
        features: [
          "Course Catalog",
          "Enrollment Management",
          "Progress Tracking",
          "Certificate Generation",
          "Resource Access",
        ],
        icon: GraduationCap,
        componentName: "CourseEnrollment",
        path: "/tools/discipleship-education/course-enrollment",
      },
      {
        slug: "spiritual-assessment",
        name: "Spiritual Assessment",
        description:
          "Help members assess their spiritual growth and identify areas for development with guided assessments.",
        category: "Assessment",
        features: [
          "Growth Assessments",
          "Personalized Plans",
          "Progress Tracking",
          "Mentor Matching",
          "Resource Recommendations",
        ],
        icon: Heart,
        componentName: "SpiritualAssessment",
        path: "/tools/discipleship-education/spiritual-assessment",
      },
    ],
  },
]
