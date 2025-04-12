import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardShell } from "@/components/dashboard/shell"
import { Overview } from "@/components/dashboard/overview"
import { RecentExpenses } from "@/components/dashboard/recent-expenses"
import { ExpenseCategories } from "@/components/dashboard/expense-categories"
import { ExpenseTrends } from "@/components/dashboard/expense-trends"
import { IncomeVsExpenses } from "@/components/dashboard/income-vs-expenses"
import { ExpenseForm } from "@/components/dashboard/expense-form"
import { getCurrentUser } from "@/lib/session"

export default async function DashboardPage() {
  // Get the current user, but don't redirect if not found
  const user = await getCurrentUser()

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Expense Dashboard"
        text={user ? `Welcome back, ${user.name}` : "Track and manage your expenses in one place."}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Overview />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ExpenseForm className="lg:col-span-3" />
        <RecentExpenses className="lg:col-span-4" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ExpenseCategories className="lg:col-span-3" />
        <IncomeVsExpenses className="lg:col-span-4" />
      </div>
      <div className="grid gap-4">
        <ExpenseTrends />
      </div>
    </DashboardShell>
  )
}

