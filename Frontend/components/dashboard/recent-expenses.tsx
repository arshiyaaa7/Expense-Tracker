"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { fetchRecentExpenses } from "@/lib/api"
import { cn } from "@/lib/utils"

interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: string
}

interface RecentExpensesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentExpenses({ className, ...props }: RecentExpensesProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadExpenses() {
      try {
        const data = await fetchRecentExpenses()
        setExpenses(data)
      } catch (error) {
        console.error("Failed to load recent expenses:", error)
      } finally {
        setLoading(false)
      }
    }

    loadExpenses()
  }, [])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      housing: "bg-purple-500",
      transportation: "bg-orange-500",
      food: "bg-green-500",
      utilities: "bg-blue-500",
      entertainment: "bg-pink-500",
      healthcare: "bg-red-500",
      personal: "bg-indigo-500",
      other: "bg-gray-500",
    }
    return colors[category] || colors.other
  }

  return (
    <Card className={cn("w-full", className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>Your most recent expenses across all categories.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="h-12 w-full animate-pulse rounded-md bg-muted"></div>
              ))}
          </div>
        ) : expenses.length === 0 ? (
          <p className="text-center text-muted-foreground py-6">
            No expenses found. Add some expenses to see them here.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{format(new Date(expense.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(expense.category)}>
                      {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">${expense.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

