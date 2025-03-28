import React from "react";
import { prisma } from "@/lib/db";

import ExpensesForm from "./components/ExpensesForm";
import ExpenseList from "./components/ExpensesList";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  // Authentication check
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  // Authorization check
  const user = await getUser();
  const membership = await prisma.membership.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!membership || membership.status !== "active") {
    return redirect("/");
  }

  const expenses = await prisma.expense.findMany({
    where: { creatorId: user.id },
  });

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
