import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Connect to your backend API
    const response = await fetch(`${process.env.BACKEND_URL}/expenses/recent`)

    if (!response.ok) {
      throw new Error("Failed to fetch recent expenses")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET /api/expenses/recent:", error)
    return NextResponse.json({ error: "Failed to fetch recent expenses" }, { status: 500 })
  }
}

