import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  category: string
}

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">{post.date}</span>
          <span className="text-sm font-medium text-blue-600">{post.category}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <a href={`/blog/${post.id}`}>
          <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </Card>
  )
}

