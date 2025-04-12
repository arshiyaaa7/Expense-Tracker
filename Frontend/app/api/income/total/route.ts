import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Connect to your backend API
    const response = await fetch(`${process.env.BACKEND_URL}/income/total`)

    if (!response.ok) {
      throw new Error("Failed to fetch total income")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET /api/income/total:", error)
    return NextResponse.json({ error: "Failed to fetch total income" }, { status: 500 })
  }
}

