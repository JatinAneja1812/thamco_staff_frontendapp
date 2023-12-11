import React from "react";
import { Tabs } from "antd";
import ShippingAddressTable from "./ShippingAddressTable";
import BillingAddressTable from "./BillingAddressTable";
import OrderItemsTable from "./OrderItemsTable";

const { TabPane } = Tabs;

export default function OrderDetailsTab(record) {
  const tabItems = [
    {
        label: "Ordered Items",
        key: "orderedItems",
        content: <OrderItemsTable record={record.orderedItems} />,
    },
    {
      label: `Shipping Address `,
      key: "shippingAddress",
      content: <ShippingAddressTable record={record.shippingAddress} />,
    },
    {
      label: "Billing Address",
      key: "billingAddress",
      content: <BillingAddressTable record={record.billingAddress} />,
    },
  ];

  return (
    <Tabs defaultActiveKey={tabItems[0].key} centered>
      {tabItems.map((tab) => (
        <TabPane tab={tab.label} key={tab.key}>
          {tab.content}
        </TabPane>
      ))}
    </Tabs>
  );
}
