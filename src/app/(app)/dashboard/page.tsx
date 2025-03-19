import React from "react";

import ExpensesForm from "./components/ExpensesForm";
import ExpenseList from "./components/ExpensesList";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>

      <div className="w-full max-w-[600px] mx-auto">
        <ExpenseList />

        <ExpensesForm />
      </div>
    </div>
  );
};

export default Dashboard;
