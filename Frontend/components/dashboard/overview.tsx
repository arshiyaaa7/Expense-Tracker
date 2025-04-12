"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchTotalBalance, fetchTotalExpenses, fetchTotalIncome } from "@/lib/api"

export function Overview() {
  const [balance, setBalance] = useState(0)
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [balanceData, incomeData, expensesData] = await Promise.all([
          fetchTotalBalance(),
          fetchTotalIncome(),
          fetchTotalExpenses(),
        ])

        setBalance(balanceData)
        setIncome(incomeData)
        setExpenses(expensesData)
      } catch (error) {
        console.error("Failed to load overview data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const cards = [
    {
      title: "Available Balance",
      value: balance,
      className: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
    },
    {
      title: "Total Income",
      value: income,
      className: "bg-gradient-to-br from-green-500 to-green-600 text-white",
    },
    {
      title: "Total Expenses",
      value: expenses,
      className: "bg-gradient-to-br from-red-500 to-red-600 text-white",
    },
    {
      title: "Net Worth",
      value: balance,
      className: "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
    },
  ]

  return (
    <>
      {cards.map((card, index) => (
        <Card key={index} className={card.className}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="h-6 w-20 animate-pulse rounded bg-white/20"></div>
              ) : (
                `$${card.value.toLocaleString()}`
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

