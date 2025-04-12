"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchExpenseTrends } from "@/lib/api"
import { cn } from "@/lib/utils"

interface TrendData {
  name: string
  amount: number
}

interface ExpenseTrendsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExpenseTrends({ className, ...props }: ExpenseTrendsProps) {
  const [data, setData] = useState<TrendData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const trendData = await fetchExpenseTrends()
        setData(trendData)
      } catch (error) {
        console.error("Failed to load expense trends data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Expense Trends</CardTitle>
        <CardDescription>Your expense trends over the past 12 months.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] w-full animate-pulse rounded-md bg-muted"></div>
        ) : data.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">No trend data available.</p>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                <Legend />
                <Line type="monotone" dataKey="amount" name="Expenses" stroke="#ef4444" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

