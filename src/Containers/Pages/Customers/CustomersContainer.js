import React, { useEffect, useState } from 'react';
import { openErrorNotification } from '../../../Hooks/Notification/GlobalNotification';
import CustomersPage from '../../../Components/Pages/Customers/CustomersPage';


export default function CustomersContainer() {

  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const getAllCustomers = () => {

    setIsLoading(true);

    fetch("https://localhost:7259/api/Users/GetAllCustomers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        // Username: user.username,
      },
    })
      .then(async (httpResponse) => {
        if (httpResponse.status === 500) {
          var errorMessage = await httpResponse.text();
          throw new Error(errorMessage);
        }

        if (!httpResponse.ok) {
          throw new Error("Failed to get data.");
        }

        return httpResponse.text();
      })
      .then(
        (result) => {
          setCustomers(JSON.parse(result));
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deletCustomer = (record) => {

    let UserId = record.userId;

    setIsLoading(true);

    fetch("https://localhost:7259/api/Users/RemoveCustomer", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
         UserId: UserId
      },
    })
      .then(async (httpResponse) => {
        if (httpResponse.status === 500) {
          var errorMessage = await httpResponse.text();
          throw new Error(errorMessage);
        }

        if (!httpResponse.ok) {
          throw new Error("Failed to get data.");
        }

        return httpResponse.text();
      })
      .then(
        () => {
          getAllCustomers();
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editCustomerFunds = (CustomerFundsDTO) => {

    console.log(CustomerFundsDTO)

    setIsLoading(true);

    fetch("https://localhost:7259/api/Users/UpdateCustomerFunds", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      body: JSON.stringify(CustomerFundsDTO)
    })
      .then(async (httpResponse) => {
        if (httpResponse.status === 500) {
          var errorMessage = await httpResponse.text();
          throw new Error(errorMessage);
        }

        if (!httpResponse.ok) {
          throw new Error("Failed to get data.");
        }

        return httpResponse.text();
      })
      .then(
        () => {
          getAllCustomers();
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllCustomers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    
     <CustomersPage
        customers={customers}
        isLoading={isLoading}
        serverError={serverError} 
        deletCustomer={deletCustomer}
        editCustomerFunds={editCustomerFunds}
     />
  )
}
