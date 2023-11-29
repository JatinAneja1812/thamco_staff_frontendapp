import React from "react";
import CustomersTable from "../../Tables/CustomersTable/CustomersTable";

export default function CustomersPage(props) {
  return (
    <>
      <CustomersTable
        dataSource={props.customers}
        isLoading={props.isLoading}
        serverError={props.serverError}
        deletCustomer={props.deletCustomer}
        editCustomerFunds={props.editCustomerFunds}
      />
    </>
  );
}
