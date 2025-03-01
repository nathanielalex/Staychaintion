import { useState } from "react"

interface Category {
  id: string
  name: string
  icon: string
}

const categories: Category[] = [
  { id: "amazing-views", name: "Amazing views", icon: "🏔️" },
  { id: "beachfront", name: "Beachfront", icon: "🏖️" },
  { id: "mansions", name: "Mansions", icon: "🏰" },
  { id: "tiny-homes", name: "Tiny homes", icon: "🏡" },
]

export default function CategoryFilter() {

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="flex gap-8 px-4 py-4 overflow-x-auto hide-scrollbar">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`flex flex-col items-center gap-2 min-w-[56px] transition-opacity text-white ${
            selectedCategory && selectedCategory !== category.id ? "opacity-60" : ""
          }`}
        >
          <span className="text-2xl">{category.icon}</span>
          <span className="text-xs whitespace-nowrap">{category.name}</span>
          {selectedCategory === category.id && <div className="h-0.5 w-full bg-black rounded-full" />}
        </button>
      ))}
    </div>
  )
}

