import React from "react";
import InnerTablesWrapper from "./InnerTables.styles";

export default function ShippingAddressTable(props) {

    const records = Array.isArray(props.record) ? props.record : [props.record];

    const childrenColumns = [
        {
            title: "Shop No. & Street",
            render: (text, record, index) => (
                <span>{record.houseNumber + " " + record.street}</span>
            ),
        },
        {
            title: "City",
            dataIndex: "city",
            key: "city",
            render: (text, record, index) => record.city ?? "Undefined",
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country",
            render: (text, record, index) => record.country ?? "Undefined",

        },
        {
            title: "PostalCode",
            dataIndex: "postalCode",
            key: "postalCode",
            render: (text, record, index) => record.postalCode ?? "Undefined",
        },
    ]

    return (
        <InnerTablesWrapper 
                key="index"
                columns={childrenColumns} 
                dataSource={records} 
                pagination={false} 
                bordered={true} 
        />
    )
};
