import React from "react";
import CustomersTableWrapper from "./CustomersTable.styles";
import { SearchOutlined } from "@ant-design/icons";
import SearchInputDropdown from "../../Dropdowns/SearchInputDropdown/SearchInputDropdown";

export default function CustomersTable(props) {

    const columns = [
        {
            title: "Customer Name",
            width: "10vw",
            render: (text, record, index) => <span>{record.firstName + " " + record.lastName}</span>,
            sorter: {
                compare: (a, b) => {
                    return a.firstName == null ? null : a.firstName.localeCompare(b.firstName);
                },
            },
            filterDropdown: SearchInputDropdown,
            filterIcon: <SearchOutlined />,
            onFilter: (value, record) => {  // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
                return value.length === 0
                    ? true
                    : record.firstName == null
                        ? false
                        : record.firstName.toLowerCase().concat(' ', record.lastName.toLowerCase()).includes(value[0].toLowerCase());
            },
        },
        {
            title: "Customer Email",
            width: "10vw",
            dataIndex: "email",
            sorter: {
                compare: (a, b) => {
                    return a.email === null
                        ? null
                        : a.email.localeCompare(b.email);
                },
            },
            filterDropdown: SearchInputDropdown,
            filterIcon: <SearchOutlined />,
            onFilter: (value, record) => {  // record -> record to be rendered (object); value -> search string, where the search input is always at index 0 of the array (array of strings)
                return value.length === 0
                    ? true
                    : record.email == null
                        ? false
                        : record.email.toLowerCase();
            },
        },
    ]

  return (
    <>
      <CustomersTableWrapper
        rowKey="UserId"
        columns={columns}
        dataSource={props.dataSource}
        loading={props.isLoading ? true : false}
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
                    There's no logs to display.
                  </h1>
                ),
              } // if props.isLoadig is false and props.serverError is null, render this
        }
        // rowSelection={rowSelection}
      />
    </>
  );
}
