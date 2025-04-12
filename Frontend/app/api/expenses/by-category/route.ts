import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Connect to your backend API
    const response = await fetch(`${process.env.BACKEND_URL}/expenses/by-category`)

    if (!response.ok) {
      throw new Error("Failed to fetch expenses by category")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in GET /api/expenses/by-category:", error)
    return NextResponse.json({ error: "Failed to fetch expenses by category" }, { status: 500 })
  }
}

