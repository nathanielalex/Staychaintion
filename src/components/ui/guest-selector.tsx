"use client"

import * as React from "react"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface GuestSelectorProps {
  maxGuests: number
}

export function GuestSelector({ maxGuests }: GuestSelectorProps) {
  const [guestCount, setGuestCount] = React.useState(1)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start font-normal">
          <Users className="mr-2 h-4 w-4" />
          {guestCount} {guestCount === 1 ? "guest" : "guests"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="p-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Guests</p>
              <p className="text-sm text-gray-500">Maximum {maxGuests} guests allowed</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                disabled={guestCount <= 1}
              >
                -
              </Button>
              <span className="w-8 text-center">{guestCount}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setGuestCount(Math.min(maxGuests, guestCount + 1))}
                disabled={guestCount >= maxGuests}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

