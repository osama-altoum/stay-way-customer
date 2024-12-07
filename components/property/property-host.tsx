"use client";

import { Button } from "@/components/ui/button";
import {
  Star,
  Calendar,
  MessageSquare,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Dribbble,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PropertyHost() {
  return (
    <div className="p-8 bg-card rounded-xl border shadow-sm text-center">
      {/* Host Avatar */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-600"></div>
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
          alt="Savannah Nguyen"
          className="w-full h-full rounded-full object-cover p-1"
        />
        <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-2">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Host Name */}
      <h3 className="text-2xl font-semibold mb-4">Savannah Nguyen</h3>

      {/* Host Stats */}
      <div className="flex items-center justify-center gap-3 text-sm mb-6">
        <span className="text-gray-600">ID: </span>
        <span className="text-indigo-600">235</span>
        <span className="text-gray-400">•</span>
        <span className="text-gray-600">Property: 24</span>
        <span className="text-gray-400">•</span>
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span>4.8</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-3 mb-8">
        {[Facebook, Twitter, Instagram, Linkedin, Dribbble].map(
          (Icon, index) => (
            <button
              key={index}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                "bg-gray-50 hover:bg-indigo-600 transition-colors duration-200",
                "group"
              )}
            >
              <Icon className="w-5 h-5 text-gray-600 group-hover:text-white" />
            </button>
          )
        )}
      </div>

      {/* Host Info */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 text-gray-600">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <span>Joined in June 2018</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <span>Response rate - 100%</span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <Clock className="w-5 h-5 text-yellow-600" />
          <span>Fast response</span>
        </div>
      </div>

      {/* Profile Button */}
      <Button
        className="w-full bg-white hover:bg-gray-50 text-indigo-600 border-2 border-indigo-600"
        variant="outline"
      >
        See Host Profile
      </Button>
    </div>
  );
}
