"use server"

import { prisma } from "@/lib/db"

export async function addExpense(formData: FormData) {
    await prisma.expense.create({
        data: {
            description: formData.get("expense") as string,
            amount: Number(formData.get("amount"))
        },
    })
}