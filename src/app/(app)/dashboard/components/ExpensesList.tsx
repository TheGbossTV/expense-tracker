"use client";

import React, { useState } from "react";
import { deleteExpense, updateExpense } from "@/actions/actions";

interface Expense {
  id: number;
  description: string;
  amount: number;
  createdAt: Date;
}

interface ExpensesListProps {
  data: Expense[];
}

const ExpensesList = ({ data }: ExpensesListProps) => {
  const [isEditingID, setIsEditingID] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    [key: number]: { description: string; amount: number };
  }>({});

  const handleEdit = (id: number, description: string, amount: number) => {
    setIsEditingID(id);
    setEditValues((prev) => ({ ...prev, [id]: { description, amount } }));
  };

  const handleUpdate = (id: number) => {
    if (!editValues[id]) return;

    const { description, amount } = editValues[id];
    updateExpense(id, description, amount);

    // Exit edit mode
    setIsEditingID(null);
  };

  return (
    <ul className="h-[300px] bg-white rounded mt-4 shadow-md">
      {data.map((expense) => (
        <li
          key={expense.id}
          className="flex items-center px-4 py-2 border-b border-gray-200"
        >
          {/* Description Field */}
          {isEditingID === expense.id ? (
            <input
              type="text"
              value={editValues[expense.id]?.description ?? ""}
              onChange={(e) =>
                setEditValues((prev) => ({
                  ...prev,
                  [expense.id]: {
                    ...prev[expense.id],
                    description: e.target.value,
                  },
                }))
              }
              className="border px-2 py-1 rounded"
              autoFocus
            />
          ) : (
            <p>{expense.description}</p>
          )}

          {/* Amount Field */}
          {isEditingID === expense.id ? (
            <input
              type="number"
              value={editValues[expense.id]?.amount ?? 0}
              onChange={(e) =>
                setEditValues((prev) => ({
                  ...prev,
                  [expense.id]: {
                    ...prev[expense.id],
                    amount: Number(e.target.value),
                  },
                }))
              }
              className="border px-2 py-1 rounded ml-auto font-bold mr-[15px] w-[60px]"
            />
          ) : (
            <p className="ml-auto font-bold mr-[15px]">€{expense.amount}</p>
          )}

          {isEditingID === expense.id ? (
            <button
              onClick={() => handleUpdate(expense.id)}
              className="text-xs h-[20px] w-[40px] ml-2 bg-green-500 text-white rounded hover:bg-green-600 hover:cursor-pointer"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() =>
                handleEdit(expense.id, expense.description, expense.amount)
              }
              className="text-xs h-[20px] w-[30px] ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:cursor-pointer"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => deleteExpense(expense.id)}
            className="text-[10px] h-[20px] w-[20px] bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer ml-2"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
