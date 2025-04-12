"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchExpensesByCategory } from "@/lib/api"
import { cn } from "@/lib/utils"

interface CategoryData {
  name: string
  value: number
  color: string
}

interface ExpenseCategoriesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ExpenseCategories({ className, ...props }: ExpenseCategoriesProps) {
  const [data, setData] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const expenses = await fetchExpensesByCategory()

        const categoryColors: Record<string, string> = {
          housing: "#9333ea",
          transportation: "#f97316",
          food: "#22c55e",
          utilities: "#3b82f6",
          entertainment: "#ec4899",
          healthcare: "#ef4444",
          personal: "#6366f1",
          other: "#6b7280",
        }

        const formattedData = Object.entries(expenses).map(([category, amount]) => ({
          name: category.charAt(0).toUpperCase() + category.slice(1),
          value: amount as number,
          color: categoryColors[category] || categoryColors.other,
        }))

        setData(formattedData)
      } catch (error) {
        console.error("Failed to load category data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Expense Categories</CardTitle>
        <CardDescription>Breakdown of your expenses by category.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="h-40 w-40 animate-pulse rounded-full bg-muted"></div>
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">No expense data available.</p>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

