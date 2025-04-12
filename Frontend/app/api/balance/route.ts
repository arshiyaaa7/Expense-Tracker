import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Connect to your backend API
    const response = await fetch(`${process.env.BACKEND_URL}/balance`)

    if (!response.ok) {
      throw new Error("Failed to fetch balance")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET /api/balance:", error)
    return NextResponse.json({ error: "Failed to fetch balance" }, { status: 500 })
  }
}

