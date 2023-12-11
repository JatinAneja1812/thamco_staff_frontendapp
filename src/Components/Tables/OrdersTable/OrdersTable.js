import React, {useState} from "react";
import OrdersTableWrapper from "./OrdersTable.styles";
import {
  SearchOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusOutlined
} from "@ant-design/icons";
import SearchInputDropdown from "../../Dropdowns/SearchInputDropdown/SearchInputDropdown";
import {
  TransformIntoDateTimeString,
  compareDates,
} from "../../../Utility/LibraryFunctions/DatesUtility";
import { Button, Popconfirm, Select  } from "antd";
import { OrderStatusEnum } from "../../../Enums/OrderStatusEnum";
import OrderDetailsTab from "./InnerTables/OrderDetailsTab";

const { Option } = Select;

export default function OrdersTable(props) {

  const Loader = {
    indicator: (
      <LoadingOutlined
        style={{
          fontSize: 24,
        }}
        spin
      />
    ),
    alt: "",
    size: "large",
  };

  const handRecordToDelete = (record) => {
    props.deletCustomer(record);
  };
  
  const handleStatusChange = (record, value) => {
    // Handle the status change here and update your data accordingly
    console.log(`Order ${record.orderId} status changed to ${value}`);
    // Update your data or make an API call to update the status
  };

  const columns = [
    {
      title: "Order ID",
      width: "10vw",
      dataIndex: "orderId",
      sorter: {
        compare: (a, b) => {
          return a.orderId === null ? null : a.orderId.localeCompare(b.orderId);
        },
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.orderId == null
          ? false
          : record.orderId.toLowerCase();
      },
    },
    {
      title: "Order Creation Date",
      width: "10vw",
      dataIndex: "orderCreationDate",
      sorter: {
        compare: (a, b) => {
            return a.orderCreationDate == null || b.orderCreationDate == null
              ? null
              : compareDates(a.orderCreationDate, b.orderCreationDate);
        },
      },
      render: (text, record, index) => (
        <span>{TransformIntoDateTimeString(record.orderCreationDate, false)}</span>
      ),
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.orderCreationDate == null
          ? false
          : record.orderCreationDate.toLowerCase();
      },
    },
    {
      title: "Order Created By",
      width: "10vw",
      dataIndex: "createdBy",
      sorter: {
        compare: (a, b) => {
          return a.createdBy === null
            ? null
            : a.createdBy.localeCompare(b.createdBy);
        },
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.createdBy == null
          ? false
          : record.createdBy.toLowerCase();
      },
    },
    {
      title: 'Customer Id',
      width: '10vw',
      dataIndex: 'customer',
      key: 'customerId', // This is important for sorting and filtering
      render: (customer) => (
        <span>{customer ? customer.customerId : 'N/A'}</span>
      ),
      sorter: {
        compare: (a, b) =>
          a.customer && b.customer
            ? a.customer.customerId.localeCompare(b.customer.customerId)
            : 0,
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        return (
          record.customer &&
          record.customer.customerId &&
          record.customer.customerId.toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: 'Customer Name',
      width: '10vw',
      dataIndex: 'customer',
      key: 'customerName', // This is important for sorting and filtering
      render: (customer) => (
        <span>{customer ? customer.customerName : 'N/A'}</span>
      ),
      sorter: {
        compare: (a, b) =>
          a.customer && b.customer
            ? a.customer.customerName.localeCompare(b.customerName.customerId)
            : 0,
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        return (
          record.customer &&
          record.customer.customerName &&
          record.customer.customerName.toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
        title: "Order Subtotal Price",
        width: "10vw",
        dataIndex: "subtotal",
        sorter: {
          compare: (a, b) => {
            return a.subtotal === null
              ? null
              : a.subtotal - b.subtotal;
          },
        },
        render: (text, record) => `£ ${text}`, 
        filterDropdown: SearchInputDropdown,
        filterIcon: <SearchOutlined />,
        onFilter: (value, record) => {
          // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
          return value.length === 0
            ? true
            : record.subtotal == null
            ? false
            : record.subtotal.toString().toLowerCase();
        },
    },
    {
        title: "Delivery Charges",
        width: "10vw",
        dataIndex: "deliveryCharge",
        sorter: {
            compare: (a, b) => {
            return a.deliveryCharge === null
                ? null
                : a.deliveryCharge - b.deliveryCharge;
            },
        },
        render: (text, record) => `£ ${text}`, 
        filterDropdown: SearchInputDropdown,
        filterIcon: <SearchOutlined />,
        onFilter: (value, record) => {
            // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
            return value.length === 0
            ? true
            : record.deliveryCharge == null
            ? false
            : record.deliveryCharge.toString().toLowerCase();
        },
    },
    {
        title: "Order Total Price",
        width: "10vw",
        dataIndex: "totalPrice",
        render: (text, record) => `£ ${text}`, 
        sorter: {
            compare: (a, b) => {
            return a.totalPrice === null
                ? null
                : a.totalPrice - b.totalPrice;
            },
        },
        filterDropdown: SearchInputDropdown,
        filterIcon: <SearchOutlined />,
        onFilter: (value, record) => {
            // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
            return value.length === 0
            ? true
            : record.totalPrice == null
            ? false
            : record.totalPrice.toString().toLowerCase();
        },
    },
    {
        title: "Order Status",
        dataIndex: "status",
        render: (text, record) => (
          <Select
            value={text !== undefined ? text : OrderStatusEnum.Created.VALUE} // Set initial value to Created if no status is provided
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(record, value)}
          >
            {Object.values(OrderStatusEnum).map(status => (
              <Option key={status.VALUE} value={status.VALUE}>
                {status.STRING}
              </Option>
            ))}
          </Select>
        ),
      },

  ];

  const operationColumns = [
    {
      title: "",
      dataIndex: "operation",
      align: "right",
      width: 50,
      render: (_, record) => {
        if (!record.isDummy) {
          return (
            <>
              <Popconfirm
                title="Are you sure?"
                okText={"Yes"}
                cancelText={"No"}
                onConfirm={() => handRecordToDelete(record)}
              >
                <Button
                  type="link"
                  icon={
                    <DeleteOutlined
                      style={{
                        fontSize: "large",
                        color: "#F01704",
                      }}
                    />
                  }
                />
              </Popconfirm>
            </>
          );
        } else {
          return null;
        }
      },
    },
  ];

  const tableColumns = columns.concat(operationColumns);

  return (
    <>
      <OrdersTableWrapper
        rowKey="orderId"
        columns={tableColumns}
        bordered={true}
        dataSource={props.dataSource}
        loading={props.isLoading ? Loader : false}
        expandable={{
          expandRowByClick: false,
          expandedRowRender: OrderDetailsTab       
        }}
        pagination={{
          position: ["bottomCenter"],
        }}
        locale={
          props.isLoading
            ? { emptyText: <h1 style={{ fontSize: "14px" }}>Loading...</h1> } // if props.isLoading is true, render this
            : props.serverError !== null
            ? {
                emptyText: (
                  <h1 style={{ fontSize: "14px", color: "black" }}>
                    {props.serverError}
                  </h1>
                ),
              } // if props.isLoading is false and props.serverError is not null, render this
            : {
                emptyText: (
                  <h1 style={{ fontSize: "14px" }}>
                    There's no data to display.
                  </h1>
                ),
              } // if props.isLoading is false and props.serverError is null, render this
        }
        // rowSelection={rowSelection}
      />
    </>
  );
}
