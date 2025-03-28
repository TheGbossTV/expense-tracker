import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Account = async () => {
  // authentication check
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login");
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">Account</h1>

      <p className="text-white mt-2">
        Logged in with email: <span className="font-bold">email</span>
      </p>
    </div>
  );
};

export default Account;
