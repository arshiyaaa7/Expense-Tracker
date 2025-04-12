const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080/api";

// Fetch total balance (Mock Data)
export async function fetchTotalBalance() {
  try {
    return 10647; // Mock data in rupees
  } catch (error) {
    console.error("Error fetching balance:", error);
    return 10647; // Mock data for demo
  }
}

// Fetch total income (Mock Data)
export async function fetchTotalIncome() {
  try {
    return 20145; // Mock data in rupees
  } catch (error) {
    console.error("Error fetching income:", error);
    return 20145; // Mock data for demo
  }
}

// Fetch total expenses (Mock Data)
export async function fetchTotalExpenses() {
  try {
    return 9498; // Mock data in rupees
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return 9498; // Mock data for demo
  }
}

// Fetch recent expenses from backend
export async function fetchRecentExpenses() {
  try {
    const response = await fetch(`${BASE_URL}/expenses`);
    if (!response.ok) throw new Error("Failed to fetch recent expenses");
    const data = await response.json();
    return data.map((expense: any) => ({
      ...expense,
      category: expense.categoryName || "Unknown", // Use categoryName instead of category
    })); // Return the expenses data from backend
  } catch (error) {
    console.error("Error fetching recent expenses:", error);
    return []; // Return an empty array in case of failure
  }
}

// Fetch expenses by category from backend
export async function fetchExpensesByCategory() {
  try {
    const response = await fetch(`${BASE_URL}/expenses/by-category`);
    if (!response.ok) throw new Error("Failed to fetch expenses by category");
    const data = await response.json();
    return data; // Return the data from the backend
  } catch (error) {
    console.error("Error fetching expenses by category:", error);
    return {}; // Return empty object on failure
  }
}

// Fetch income vs expenses (Mock Data)
export async function fetchIncomeVsExpenses() {
  try {
    return [
      { name: "Jan", income: 5000, expenses: 4200 },
      { name: "Feb", income: 5200, expenses: 4300 },
      { name: "Mar", income: 5100, expenses: 4000 },
      { name: "Apr", income: 5300, expenses: 4500 },
      { name: "May", income: 5400, expenses: 4100 },
      { name: "Jun", income: 5500, expenses: 4200 },
    ]; // Mock data in rupees
  } catch (error) {
    console.error("Error fetching income vs expenses:", error);
    return []; // Return empty array on failure
  }
}

// Fetch expense trends (Mock Data)
export async function fetchExpenseTrends() {
  try {
    return [
      { name: "Jan", amount: 4200 },
      { name: "Feb", amount: 4300 },
      { name: "Mar", amount: 4000 },
      { name: "Apr", amount: 4500 },
      { name: "May", amount: 4100 },
      { name: "Jun", amount: 4200 },
      { name: "Jul", amount: 4400 },
      { name: "Aug", amount: 4300 },
      { name: "Sep", amount: 4100 },
      { name: "Oct", amount: 4200 },
      { name: "Nov", amount: 4000 },
      { name: "Dec", amount: 4500 },
    ]; // Mock data in rupees
  } catch (error) {
    console.error("Error fetching expense trends:", error);
    return []; // Return empty array on failure
  }
}

// Create a new expense
export async function createExpense(expenseData: { amount: number; category: string; description: string; date: Date }) {
  try {
    const response = await fetch(`${BASE_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    });

    if (!response.ok) throw new Error("Failed to create expense");
    return await response.json();
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
}
