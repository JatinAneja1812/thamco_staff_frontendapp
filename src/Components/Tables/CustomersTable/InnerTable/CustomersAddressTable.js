import React from "react";
import InnerTableWrapper from "./CustomersAddressTable.styles";

const expandedInnerAddressTable = (record) => {

    const records = Array.isArray(record) ? record : [record];
    console.log(record)
    const childrenColumns = [
        {
            title: "Shop No. & Street",
            render: (text, record, index) => (
                <span>{record.locationNumber + " " + record.street}</span>
            ),
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
            render: (text, record, index) => record.city ?? "Undefined",
        },
        {
            title: "State",
            dataIndex: "state",
            key: "state",
            render: (text, record, index) => record.state ?? "Undefined",

        },
        {
            title: "PostalCode",
            dataIndex: "postalCode",
            key: "postalCode",
            render: (text, record, index) => record.postalCode ?? "Undefined",
        },
    ]

    return (
        <InnerTableWrapper 
                userId="userId"
                columns={childrenColumns} 
                dataSource={records} 
                pagination={false} 
                bordered={true} 
        />
    )
};

export default expandedInnerAddressTable;