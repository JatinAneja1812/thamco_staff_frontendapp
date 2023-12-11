import React from 'react';
import { Tabs } from 'antd';
import OrdersTable from '../../Tables/OrdersTable/OrdersTable';
import HistoricOrdersTable from '../../Tables/OrdersTable/HistoricOrdersTable'; // Replace with the actual path

const { TabPane } = Tabs;

const Orders = (props) => {
  const tabItems = [
    {
      label: `Active Orders (${props.activeOrdersCount}) `,
      key: 'currentOrders',
      content: (
        <OrdersTable
          dataSource={props.ordersData}
          isLoading={props.isLoading}
          serverError={props.serverError}
        />
      ),
    },
    {
      label: 'Historic Orders',
      key: 'historicOrders',
      content: (
        <HistoricOrdersTable
          dataSource={props.historicOrdersData}
          isLoading={props.isLoading}
          serverError={props.serverError}
        />
      ),
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
};

export default Orders;