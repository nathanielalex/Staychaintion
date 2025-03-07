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
import { User_backend } from "@/declarations/User_backend";
import { UserProfile } from "@/declarations/User_backend/User_backend.did";
import { useAuth } from "@/utility/use-auth-client";
export default function SignUpForm() {

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dateOfBirth: new Date('2025-01-01') as Date,
    profilePicture: "",
    role: "renter" // default role
  });

  const { principal } = useAuth();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateOfBirthChange = (date: Date | undefined) => {
    if(date) {
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: date
      }));
    }
  };

  const handleRoleChange = (role: string) => {
    console.log('radio button pressed')
    setFormData((prev) => ({
      ...prev,
      role
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(principal != null && formData.dateOfBirth != null) {
      const userData: UserProfile = {
        id: principal,
        role: formData.role,
        fullName: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth.toDateString(),
        ballance: 0,
        profilePictureUrl: formData.profilePicture,
        propertiesId: []
      }
      await User_backend.registerUser(userData);
      //maybe add context
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Staychaintion</h1>
      
      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="John Doe"
          required
        />
      </div>
      
      {/* Username */}
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="johndoe123"
          required
        />
      </div>
      
      {/* Email */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="john@example.com"
          required
        />
      </div>

      {/* Date of Birth */}
      <div>
        <Label>Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal ${!formData.dateOfBirth && "text-gray-500"}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white shadow-md rounded-md border border-gray-200">
            <Calendar
              mode="single"
              selected={formData.dateOfBirth}
              onSelect={handleDateOfBirthChange}
              initialFocus
              className="bg-white text-gray-900"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Role */}
      <div>
        <Label>Role</Label>
        <RadioGroup
          value={formData.role}
          onValueChange={handleRoleChange}
          className="flex space-x-4"
        >
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

      {/* Profile Picture */}
      <div>
        <Label htmlFor="profile-picture">Profile Picture</Label>
        <div className="mt-2 flex items-center space-x-4">
          {formData.profilePicture ? (
            <img
              src={formData.profilePicture || "/placeholder.svg"}
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
