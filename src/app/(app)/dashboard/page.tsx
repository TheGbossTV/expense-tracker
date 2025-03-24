import React from "react";
import { prisma } from "@/lib/db";

import ExpensesForm from "./components/ExpensesForm";
import ExpenseList from "./components/ExpensesList";

const Dashboard = async () => {
  const expenses = await prisma.expense.findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>

      <div className="w-full max-w-[600px] mx-auto">
        <ExpenseList data={expenses} />

        <ExpensesForm />
      </div>
    </div>
  );
};

export default Dashboard;
