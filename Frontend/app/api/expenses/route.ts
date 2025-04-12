import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const expenseData = await request.json()

    // Connect to your backend API
    const response = await fetch(`${process.env.BACKEND_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    })

    if (!response.ok) {
      throw new Error("Failed to create expense")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in POST /api/expenses:", error)
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 })
  }
}

