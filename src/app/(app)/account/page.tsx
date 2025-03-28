import { prisma } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Account = async () => {
  // authentication check
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

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">Account</h1>

      <p className="text-white mt-2">
        Welcome <span className="font-bold">{user.given_name}</span>
      </p>
    </div>
  );
};

export default Account;
