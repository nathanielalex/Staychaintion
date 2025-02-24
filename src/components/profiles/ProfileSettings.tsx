import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Settings {
  theme: "light" | "dark" | "system"
  notifications: boolean
  twoFactorAuth: boolean
}

const ProfileSettings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    theme: "system",
    notifications: true,
    twoFactorAuth: false,
  })

  const handleThemeChange = (value: "light" | "dark" | "system") => {
    setSettings((prev) => ({ ...prev, theme: value }))
  }

  const handleToggleChange = (name: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSaveSettings = () => {
    // Here you would typically send the updated settings to your backend
    console.log("Updated settings:", settings)
    // Show a success message to the user
    alert("Settings updated successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="theme">Theme</Label>
        <Select value={settings.theme} onValueChange={handleThemeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Enable Notifications</Label>
        <Switch
          id="notifications"
          checked={settings.notifications}
          onCheckedChange={() => handleToggleChange("notifications")}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
        <Switch
          id="twoFactorAuth"
          checked={settings.twoFactorAuth}
          onCheckedChange={() => handleToggleChange("twoFactorAuth")}
        />
      </div>
      <Button onClick={handleSaveSettings} className="w-full">
        Save Settings
      </Button>
    </div>
  )
}

export default ProfileSettings

