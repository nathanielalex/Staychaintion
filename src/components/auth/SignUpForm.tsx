import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function SignUpForm() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Staychaintion</h1>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Doe" required />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="johndoe123" required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="john@example.com" required />
      </div>
      <div>
        <Label>Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!dateOfBirth && "text-gray-500"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-md border border-gray-200">
            <Calendar
              mode="single"
              selected={dateOfBirth}
              onSelect={setDateOfBirth}
              initialFocus
              className="bg-white text-gray-900"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label>Role</Label>
        <RadioGroup defaultValue="renter" className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="owner" id="owner" className="bg-white border-gray-300 text-blue-600" />
            <Label htmlFor="owner" className="text-gray-700">Owner</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="renter" id="renter" className="bg-white border-gray-300 text-blue-600" />
            <Label htmlFor="renter" className="text-gray-700">Renter</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <Label htmlFor="profile-picture">Profile Picture</Label>
        <div className="mt-2 flex items-center space-x-4">
          {profilePicture ? (
            <img
              src={profilePicture || "/placeholder.svg"}
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
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      >
        Sign Up
      </Button>
    </form>
  );
}
