import {
  DeleteOutlined,
  LoadingOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Button, DatePicker, Popconfirm, Select } from "antd";
import React from "react";
import { OrderStatusEnum, OrderStatusStringEnum } from "../../../Enums/OrderStatusEnum";
import {
  TransformIntoDateTimeString,
  compareDates,
} from "../../../Utility/LibraryFunctions/DatesUtility";
import SearchInputDropdown from "../../Dropdowns/SearchInputDropdown/SearchInputDropdown";
import OrderDetailsTab from "./InnerTables/OrderDetailsTab";
import OrdersTableWrapper from "./OrdersTable.styles";

const { Option } = Select;

export default function OrdersTable(props) {

  const handRecordToDelete = (record) => {
    props.deleteOrder(record.orderId);
  };
  
  const handleStatusChange = (record, value) => {
    props.UpdateOrderStatus(record.orderId, value);
  };
  
  const handleDeliveryDateChange = (record, date) => {
    props.UpdateOrderDeliveryDate(record.orderId, date);
  };

  const getOrderStatusOptions = (record) => {
    const { status, deliveryDate } = record;
  
    if (status === OrderStatusEnum.Created.VALUE) {
      return [
        OrderStatusEnum.Processing.VALUE,
        OrderStatusEnum.Waiting.VALUE,
      ];
    } else if ((status === OrderStatusEnum.Processing.VALUE || status === OrderStatusEnum.Waiting.VALUE) && !deliveryDate) {
      return [
        OrderStatusEnum.Processing.VALUE,
        OrderStatusEnum.Waiting.VALUE,
      ];
    } else if ((status === OrderStatusEnum.Processing.VALUE || status === OrderStatusEnum.Waiting.VALUE) && deliveryDate) {
      return [
        OrderStatusEnum.Processing.VALUE,
        OrderStatusEnum.Waiting.VALUE,
        OrderStatusEnum.Dispatched.VALUE,
      ];
    } else if (status === OrderStatusEnum.Dispatched.VALUE && deliveryDate) {
      return [
        OrderStatusEnum.Dispatched.VALUE,
        OrderStatusEnum.Delivered.VALUE,
      ];
    }
  
    return [];
  };
  
  const isDeliveryDateEnabled = (record) => {
    const { status } = record;
    return (
      (status === OrderStatusEnum.Processing.VALUE || status === OrderStatusEnum.Waiting.VALUE) ||
      (status === OrderStatusEnum.Dispatched.VALUE && record.deliveryDate)
    );
  };
  
  const columns = [
    {
      title: "Order ID",
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
      title: 'Order Notes',
      dataIndex: 'orderNotes',
      key: 'orderNotes', // This is important for sorting and filtering
      render: (text) => {
        return text || 'N/A'; // Display 'N/A' if text is falsy (null, undefined, empty string)
      },
      sorter: {
        compare: (a, b) => {
          return a.orderNotes === null
            ? null
            : a.orderNotes.localeCompare(b.orderNotes);
        },
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.orderNotes == null
          ? false
          : record.orderNotes.toLowerCase();
      },
    },
    {
      title: "Order Status",
      dataIndex: "status",
      render: (text, record) => (
        <Select
          value={text !== undefined ? OrderStatusStringEnum[text] : OrderStatusEnum.Created.VALUE}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record, value)}
        >
          {getOrderStatusOptions(record).map(statusValue => (
            <Option key={statusValue} value={statusValue}>
              {OrderStatusStringEnum[statusValue]}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Schedule Delivery",
      dataIndex: "deliveryDate",
      width: 350,
      render: (text, record) => (
        <DatePicker
          disabled={!isDeliveryDateEnabled(record) || record.status === 105 }
          onChange={(date) => handleDeliveryDateChange(record, date)}
          defaultValue={record.deliveryDate === undefined ? undefined : TransformIntoDateTimeString(record.deliveryDate)} 
        />
      ),
    }

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
                  disabled={record.status >= 102 ? true : false }
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
        scroll={{
          x: 1300,
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
