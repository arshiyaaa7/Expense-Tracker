import { NextResponse } from "next/server"

export async function GET() {
  // This is a mock implementation
  // In a real application, you would check the session cookie and return the user data
  return NextResponse.json({
    user: {
      id: "1",
      name: "Demo User",
      email: "user@example.com",
    },
  })
}

