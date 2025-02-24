import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Upload } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface UserProfile {
  name: string
  username: string
  email: string
  dateOfBirth: Date | undefined
  role: "owner" | "renter"
  profilePicture: string | null
}

const ProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    username: "johndoe123",
    email: "john@example.com",
    dateOfBirth: new Date(1990, 0, 1),
    role: "renter",
    profilePicture: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setProfile((prev) => ({ ...prev, dateOfBirth: date }))
  }

  const handleRoleChange = (value: "owner" | "renter") => {
    setProfile((prev) => ({ ...prev, role: value }))
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the updated profile to your backend
    console.log("Updated profile:", profile)
    // Show a success message to the user
    alert("Profile updated successfully!")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={profile.name} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" name="username" value={profile.username} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={profile.email} onChange={handleInputChange} required />
      </div>
      <div>
        <Label>Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!profile.dateOfBirth && "text-muted-foreground"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {profile.dateOfBirth ? format(profile.dateOfBirth, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={profile.dateOfBirth} onSelect={handleDateChange} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label>Role</Label>
        <RadioGroup value={profile.role} onValueChange={handleRoleChange} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="owner" id="owner" />
            <Label htmlFor="owner">Owner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="renter" id="renter" />
            <Label htmlFor="renter">Renter</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="profile-picture">Profile Picture</Label>
        <div className="mt-2 flex items-center space-x-4">
          {profile.profilePicture ? (
            <img
              src={profile.profilePicture || "/placeholder.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
          )}
          <Input
            id="profile-picture"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
          />
          <Button type="button" variant="outline" onClick={() => document.getElementById("profile-picture")?.click()}>
            Upload Picture
          </Button>
        </div>
      </div>
      <Button type="submit" className="w-full">
        Update Profile
      </Button>
    </form>
  )
}

export default ProfileForm

