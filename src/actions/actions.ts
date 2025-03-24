"use server"

import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addExpense(formData: FormData) {
    await prisma.expense.create({
        data: {
            description: formData.get("expense") as string,
            amount: Number(formData.get("cost"))
        },
    })

    revalidatePath("/dashboard") // update the component without refreshing for instant list updates
}

export async function updateExpense(id: number, newDescription: string, newAmount: number) {
    await prisma.expense.update({
        where: {
            id,
        },        
        data: {
            description: newDescription,
            amount: newAmount
        },
    })

    revalidatePath("/dashboard") // update the component without refreshing for instant list updates
}

export async function deleteExpense(id: number) {
    await prisma.expense.delete({
        where: {
            id,
        },
    })

    revalidatePath("/dashboard") // update the component without refreshing for instant list updates
}