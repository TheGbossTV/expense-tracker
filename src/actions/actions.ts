"use server"

import { prisma } from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia",
});

export async function addExpense(formData: FormData) {
    const { isAuthenticated, getUser } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return redirect("/api/auth/login");
    }

    const userInfo = await getUser();

    await prisma.expense.create({
        data: {
            description: formData.get("expense") as string,
            amount: Number(formData.get("cost")),
            creatorId: userInfo.id
        },
    })

    revalidatePath("/dashboard") // update the component without refreshing for instant list updates
}

export async function updateExpense(id: number, newDescription: string, newAmount: number) {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return redirect("/api/auth/login");
    }

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
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return redirect("/api/auth/login");
    }

    await prisma.expense.delete({
        where: {
            id,
        },
    })

    revalidatePath("/dashboard") // update the component without refreshing for instant list updates
}

export async function createCheckoutSession() {
    const { isAuthenticated, getUser } = getKindeServerSession();
    if (!(await isAuthenticated())) {
        return redirect("/api/auth/login");
    }

    const userInfo = await getUser();

    const session = await stripe.checkout.sessions.create({
        customer_email: userInfo.email!,
        client_reference_id: userInfo.id,
        line_items: [
            {
                price: "price_1R7gmz2ZjdI0E2Q35pZNtVFl",
                quantity: 1,
            },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: "http://localhost:3000/dashboard",
        cancel_url: "http://localhost:3000",
    });

    redirect(session.url!)
}