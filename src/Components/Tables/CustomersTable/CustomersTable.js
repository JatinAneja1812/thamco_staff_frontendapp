import React, {useState} from "react";
import CustomersTableWrapper from "./CustomersTable.styles";
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
import { Button, Popconfirm } from "antd";
import expandedInnerAddressTable from "./InnerTable/CustomersAddressTable";
import AddFundsModal from "../../Modals/Customers/AddFundsModal";

export default function CustomersTable(props) {
  const [isAddFundsModalOpen, setAddFundsModalOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null);

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

  function handleAddFunds(record) {
    setAddFundsModalOpen(true);
    setRecordToEdit(record);
  };

  function handleAddFundsClose(record) {
    setAddFundsModalOpen(!isAddFundsModalOpen);
    setRecordToEdit(null);
  };

  const columns = [
    {
      title: "Customer ID",
      width: "10vw",
      dataIndex: "userId",
      sorter: {
        compare: (a, b) => {
          return a.userId === null ? null : a.userId.localeCompare(b.userId);
        },
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.userId == null
          ? false
          : record.userId.toLowerCase();
      },
    },
    {
      title: "Customer Name",
      width: "10vw",
      render: (text, record, index) => (
        <span>{record.firstName + " " + record.lastName}</span>
      ),
      sorter: {
        compare: (a, b) => {
          return a.firstName == null
            ? null
            : a.firstName.localeCompare(b.firstName);
        },
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.firstName == null
          ? false
          : record.firstName
              .toLowerCase()
              .concat(" ", record.lastName.toLowerCase())
              .includes(value[0].toLowerCase());
      },
    },
    {
      title: "Customer Email",
      width: "10vw",
      dataIndex: "email",
      sorter: {
        compare: (a, b) => {
          return a.email === null ? null : a.email.localeCompare(b.email);
        },
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.email == null
          ? false
          : record.email.toLowerCase();
      },
    },
    {
      title: "Customer Contact Number",
      width: "10vw",
      dataIndex: "phoneNumber",
      sorter: {
        compare: (a, b) => {
          return a.phoneNumber === null
            ? null
            : a.phoneNumber.localeCompare(b.phoneNumber);
        },
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.phoneNumber == null
          ? false
          : record.phoneNumber.toLowerCase();
      },
    },
    {
      title: "AddedOn Date",
      width: "10vw",
      dataIndex: "userAddedOnDate",  // Corrected typo here
      render: (text, record, index) => (
        <span>{TransformIntoDateTimeString(record.userAddedOnDate, false)}</span>
      ),
      sorter: {
        compare: (a, b) => {
          return a.userAddedOnDate == null || b.userAddedOnDate == null
            ? null
            : compareDates(a.userAddedOnDate, b.userAddedOnDate);
        },
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.userAddedOnDate == null
          ? false
          : record.userAddedOnDate.toLowerCase();
      },
    },
    {
      title: "Funds Available",
      width: "10vw",
      dataIndex: "availableFunds",
      render: (text, record, index) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ marginRight: '8px' }}>
            £ {record.availableFunds}
          </span>
          <Button
            type="primary"
            style={{
              background: "#329461"
            }}
            icon={<PlusOutlined />}
            onClick={() => handleAddFunds(record)}
          >
            Add Funds
          </Button>
      </div>
      ),
      sorter: {
        compare: (a, b) => {
          return a.availableFunds === null || b.availableFunds === null
            ? null
            : a.availableFunds - b.availableFunds;
        },
      },
      filterDropdown: SearchInputDropdown,
      filterIcon: <SearchOutlined />,
      onFilter: (value, record) => {
        // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
        return value.length === 0
          ? true
          : record.availableFunds == null
          ? false
          : record.availableFunds.toString().toLowerCase().includes(value[0].toLowerCase());
      },
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
      <AddFundsModal 
        open={isAddFundsModalOpen}
        recordToEdit={recordToEdit}
        handleAddFundsClose={handleAddFundsClose}
        editCustomerFunds={props.editCustomerFunds}
      />
      <CustomersTableWrapper
        rowKey="userId"
        columns={tableColumns}
        bordered={true}
        dataSource={props.dataSource}
        loading={props.isLoading ? Loader : false}
        expandable={{
          expandRowByClick: false,
          expandedRowRender: expandedInnerAddressTable       
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
