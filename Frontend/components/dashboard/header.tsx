"use client";

import type React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
  className?: string
}

export function DashboardHeader({ heading, text, children, className }: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <div className={cn("flex items-center justify-between px-4 py-2 bg-gray-800 text-white", className)}>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" className="text-white hover:text-gray-300">Home</Link>
        <Link href="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
        <Link href="/expenses" className="text-white hover:text-gray-300">Expenses</Link>
        <Link href="/categories" className="text-white hover:text-gray-300">Categories</Link>
        <button 
          onClick={handleLogout} 
          className="text-white hover:text-red-400 border border-red-500 px-2 py-1 rounded">
          Logout
        </button>
      </div>
      {children}
    </div>
  )
}
