import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Users } from "lucide-react";
import {
  format,
  differenceInDays,
  parseISO,
  isBefore,
  isAfter,
  isWithinInterval,
} from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export function PropertyBooking({ property, reservations }: any) {
  const [checkIn, setCheckIn] = useState<any>(null);
  const [checkOut, setCheckOut] = useState<any>(null);
  const [nights, setNights] = useState(0);

  // Convert reservation dates to Date objects and sort them
  const bookings = reservations
    .map((reservation: any) => ({
      checkIn: parseISO(reservation.checkIn),
      checkOut: parseISO(reservation.checkOut),
    }))
    .sort((a: any, b: any) => a.checkIn - b.checkIn);

  // Function to check if a date is disabled
  const isDateDisabled = useCallback(
    (date: any) => {
      // Prevent selecting dates in the past
      if (isBefore(date, new Date())) return true;

      // Check if the date falls within any reservation period
      return bookings.some((booking: any) =>
        isWithinInterval(date, {
          start: booking.checkIn,
          end: booking.checkOut,
        })
      );
    },
    [bookings]
  );

  // Function to check if a checkout date is valid
  const isCheckoutDateDisabled = useCallback(
    (date: any) => {
      if (!checkIn) return true;

      // Prevent selecting checkout before checkin
      if (isBefore(date, checkIn)) return true;

      // Find the next booking after selected checkin
      const nextBooking = bookings.find((booking: any) =>
        isAfter(booking.checkIn, checkIn)
      );

      // If there's a next booking, prevent selecting dates after it starts
      if (nextBooking && isAfter(date, nextBooking.checkIn)) return true;

      return isDateDisabled(date);
    },
    [checkIn, bookings, isDateDisabled]
  );

  const calculateNights = useCallback((inDate: any, outDate: any) => {
    if (inDate && outDate) {
      const nightsCount = differenceInDays(outDate, inDate);
      setNights(nightsCount > 0 ? nightsCount : 0);
    } else {
      setNights(0);
    }
  }, []);

  const handleCheckInSelect = (date: any) => {
    setCheckIn(date);
    setCheckOut(null); // Reset checkout when checkin changes
    calculateNights(date, null);
  };

  const handleCheckOutSelect = (date: any) => {
    setCheckOut(date);
    calculateNights(checkIn, date);
  };

  const totalPrice = nights * property?.priceBeforeTax;
  const finalPrice =
    totalPrice +
    (property?.newReservationDiscount || 0) +
    (property?.weekReservationDiscount || 0) +
    (property?.monthReservationDiscount || 0);

  return (
    <form className="bg-card rounded-lg border p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Price</h2>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold">{property?.priceBeforeTax}</span>
          <span className="text-sm">SAR</span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
          Booking Form
        </Button>
        <Button variant="outline" className="flex-1">
          Enquiry Form
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Check In - Check Out</label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PP") : "Check in"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={handleCheckInSelect}
                  disabled={isDateDisabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  disabled={!checkIn}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PP") : "Check out"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={handleCheckOutSelect}
                  disabled={isCheckoutDateDisabled}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Guests</label>
          <Button variant="outline" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            <span>{property?.guests} Guests</span>
          </Button>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <div className="flex justify-between">
            <span>
              {property?.priceBeforeTax} × {nights} nights
            </span>
            <span>{totalPrice} SAR</span>
          </div>
          <div className="flex justify-between">
            <span>New Reservation Discount</span>
            <span>{property?.newReservationDiscount} SAR</span>
          </div>
          <div className="flex justify-between">
            <span>Week Reservation Discount</span>
            <span>{property?.weekReservationDiscount} SAR</span>
          </div>
          <div className="flex justify-between">
            <span>Month Reservation Discount</span>
            <span>{property?.monthReservationDiscount} SAR</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{finalPrice} SAR</span>
          </div>
        </div>

        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          disabled={!checkIn || !checkOut}
        >
          Proceed Booking
        </Button>

        <div className="flex items-center justify-center gap-4 text-sm">
          <Button variant="link" className="h-auto p-0 text-indigo-600">
            Save To Wish List
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PropertyBooking;
