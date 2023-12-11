import {
    LoadingOutlined,
    SearchOutlined
} from "@ant-design/icons";
import { Select } from "antd";
import React from "react";
import { OrderStatusEnum } from "../../../Enums/OrderStatusEnum";
import {
    TransformIntoDateTimeString,
    compareDates,
} from "../../../Utility/LibraryFunctions/DatesUtility";
import SearchInputDropdown from "../../Dropdowns/SearchInputDropdown/SearchInputDropdown";
import OrdersTableWrapper from "./OrdersTable.styles";

const { Option } = Select;

export default function HistoricOrdersTable(props) {

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
        render: (text) => (
          <Select
            value={text !== undefined ? text : OrderStatusEnum.Delivered.VALUE} // Set initial value to Delivered if no status is provided
            style={{ width: 120 }}
            disabled
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

  return (
    <>
      <OrdersTableWrapper
        rowKey="orderId"
        columns={columns}
        bordered={true}
        dataSource={props.dataSource}
        loading={props.isLoading ? Loader : false}
        // expandable={{
        //   expandRowByClick: false,
        //   expandedRowRender: expandedInnerAddressTable       
        // }}
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
