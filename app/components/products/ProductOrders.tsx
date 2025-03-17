"use client";

import { useState } from "react";
import OrderTable from "../orders/OrderTable";

const ProductOrders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const getOrderStatus = (tab: string | undefined): string => {
    switch (tab) {
      case "NewOrders":
        return "new";
      case "PendingOrders":
        return "pending";
      case "SentOut":
        return "sent";
      case "Completed":
        return "completed";
      default:
        return "new";
    }
  };
  return (
    <div className="mt-9 w-full">
      <OrderTable
        activeTab={
          activeTab as
            | "all"
            | "NewOrders"
            | "PendingOrders"
            | "SentOut"
            | "Completed"
        }
        orderStatus={getOrderStatus(activeTab)}
        handleTabChange={handleTabChange}
      />
    </div>
  );
};

export default ProductOrders;
