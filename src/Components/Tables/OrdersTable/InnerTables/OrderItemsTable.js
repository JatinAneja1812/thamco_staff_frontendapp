import React from "react";
import InnerTablesWrapper from "./InnerTables.styles";

export default function OrderItemsTable(props) {

    const records = Array.isArray(props.record) ? props.record : [props.record];

    const childrenColumns = [
        {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName",
            render: (text, record, index) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    {record.img && (
                        <img
                        src={record.img} // Assuming productImage is the image URL
                        alt={record.productName || "Product Image"}
                        style={{ width: "50px", height: "50px", marginRight: "8px" }} // Set the width and height as per your requirement
                        />
                    )}
                    <span style={{ fontSize: "14px" }}>{record.productName ?? "Undefined"}</span>
                </div>
            ),
        },
        {
            title: "Product Quantity",
            dataIndex: "totalQuantity",
            key: "totalQuantity",
            render: (text, record, index) => (
              <div>
                <span style={{ fontSize: "14px" }}>{record.totalQuantity ?? "Undefined"}</span>
                {record.unit && (
                  <span style={{ marginLeft: "8px", fontSize: "14px" }}>{record.unit}</span>
                )}
              </div>
            ),
        },
        {
            title: "Total Price",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (text, record, index) => (
                <div>
                  <span style={{ fontSize: "14px" }} >£</span>
                  <span  style={{ fontSize: "14px" }} >{record.totalPrice ?? "Undefined"}</span>
                </div>
            ),
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
