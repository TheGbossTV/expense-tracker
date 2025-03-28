"use client";

import { createCheckoutSession } from "@/actions/actions";
import React from "react";

const PaymentButton = () => {
  return (
    <button
      onClick={async () => {
        await createCheckoutSession();
      }}
      className="bg-black text-white py-2 px-4 rounded-lg font-medium hover:cursor-pointer"
    >
      Purchase
    </button>
  );
};

export default PaymentButton;
