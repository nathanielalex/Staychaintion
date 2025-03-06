import { Suspense } from "react"
import {
  Users,
  MessageSquare,
  TrendingUp,
  Award,
  Search,
  PlusCircle,
  Filter,
  ChevronRight,
  Zap,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ForumAnimation from "@/components/community/forum-animation"
import CommunityHero from "@/components/community/community-hero"
import CategoryList from "@/components/community/category-list"
import ThreadList from "@/components/community/thread-list"
import TopContributors from "@/components/community/top-contributors"
import RecentActivity from "@/components/community/recent-activity"
import FeaturedDiscussions from "@/components/community/featured-discussions"
import CommunityStats from "@/components/community/community-stats"
import LoadingThreads from "@/components/community/loading-threads"

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <CommunityHero />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Community Stats */}
        <CommunityStats />

        {/* Forum Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Categories
              </h3>
              <CategoryList />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Award className="w-5 h-5 mr-2 text-primary" />
                Top Contributors
              </h3>
              <TopContributors />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Forum Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Threads</span>
                  <span className="font-medium">3,842</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Posts</span>
                  <span className="font-medium">27,156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Members</span>
                  <span className="font-medium">1,249</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">New Today</span>
                  <span className="font-medium">42</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Create Thread */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search discussions..." className="pl-10 bg-white border-border" />
              </div>
              <Button className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                New Thread
              </Button>
            </div>

            {/* Featured Discussions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Featured Discussions
              </h3>
              <FeaturedDiscussions />
            </div>

            {/* Thread List */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                  Recent Discussions
                </h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </div>

              <Suspense fallback={<LoadingThreads />}>
                <ThreadList />
              </Suspense>

              <div className="flex justify-center mt-6">
                <Button variant="outline" className="flex items-center gap-1">
                  Load More
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-border">
              <h3 className="text-lg font-semibold flex items-center mb-4">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Recent Activity
              </h3>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>

      {/* Forum Animation */}
      <div className="mt-16 mb-24">
        <ForumAnimation />
      </div>
    </main>
  )
}

