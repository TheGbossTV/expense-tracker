import React from "react";

interface ExpensesListProps {
  data: { id: number; description: string; amount: number; createdAt: Date }[];
}

const ExpensesList = async ({ data }: ExpensesListProps) => {
  return (
    <ul className="h-[300px] bg-white rounded mt-4 shadow-md">
      {data.map((expense) => (
        <li
          key={expense.id}
          className="flex items-center px-4 py-2 border-b border-gray-200"
        >
          <p>{expense.description}</p>
          <p className="ml-auto font-bold mr-[15px]">€{expense.amount}</p>
          <button className="text-[10px] h-[20px] w-[20px] bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer">
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
