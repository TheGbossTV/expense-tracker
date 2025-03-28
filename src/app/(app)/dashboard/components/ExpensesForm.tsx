import React from "react";

import { addExpense } from "@/actions/actions";

// NOTE: We use server actions on this form, it's a way to keep it a server component but still be able to call an API

const ExpensesForm = () => {
  return (
    <form className="w-full mt-8 rounded overflow-hidden" action={addExpense}>
      <input
        type="text"
        name="expense"
        placeholder="Enter your expense"
        className="w-full px-3 py-2 outline-none bg-white"
      />
      <input
        type="number"
        name="cost"
        placeholder="Cost of your expense"
        className="w-full px-3 py-2 outline-none bg-white"
      />
      <button className="w-full bg-blue-500 text-white px-2 py-2 font-bold">
        Add Expense
      </button>
    </form>
  );
};

export default ExpensesForm;
