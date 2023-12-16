import React, { useEffect, useState } from 'react';
import Orders from '../../../Components/Pages/Orders/Orders';
import { openErrorNotification } from '../../../Hooks/Notification/GlobalNotification';

export default function OrdersContainer() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [historicOrders, setHistoricOrders] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [activeOrdersCount, setActiveOrdersCount] = useState(null);
  const REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL = process.env.REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL;   // Production Base API

  const getAllOrders = () => {
    setIsLoading(true);
    // Orders API: "https://localhost:7262/api/Order/GetAllOrders" 
    // BFF (Local): https://localhost:7259/api/OrderManager/GetAllOrders

    fetch(`${REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL}/api/OrderManager/GetAllOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
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
          var res = JSON.parse(result);
          setData(res);
          setActiveOrdersCount(res.length);
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  const getAllHistoricOrders = () => {

    setIsLoading(true);
    
    // Orders API: "https://localhost:7262/api/Order/GetAllHistoricOrders"
    // BFF (Local): https://localhost:7259/api/OrderManager/GetAllHistoricOrders
    
    fetch(`${REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL}/api/OrderManager/GetAllHistoricOrders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         Authorization: "Bearer " + sessionStorage.getItem("access_token"),
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
          setHistoricOrders(JSON.parse(result));
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  const deleteOrder = (orderID) => {
    setIsLoading(true);

      // Orders API:  "https://localhost:7262/api/Order/CancelOrder"
      // BFF (Local): https://localhost:7259/api/OrderManager/CancelOrder

    fetch(`${REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL}/api/OrderManager/CancelOrder`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        OrderId: orderID.toString()
      },
    })
      .then(async (httpResponse) => {
        if (httpResponse.status === 500) {
          throw new Error(await httpResponse.text());
        }

        if (httpResponse.status === 400) {
          throw new Error(await httpResponse.text());
        }
  
        if (!httpResponse.ok) {
          throw new Error("Failed to get data.");
        }
  
        return httpResponse.text();
      })
      .then(
        () => {
          getAllOrders();
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  const UpdateOrderStatus = (orderID, status) => {

    const orderStatusDTO = {
      OrderId: orderID,
      OrderStatus: status
    };

    setIsLoading(true);
    
    // Orders API: "https://localhost:7262/api/Order/UpdateOrderStatus"
    // BFF (Local): https://localhost:7259/api/OrderManager/UpdateOrderStatus

    fetch(`${REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL}/api/OrderManager/UpdateOrderStatus`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
      body: JSON.stringify(orderStatusDTO)
    })
      .then(async (httpResponse) => {
        if (httpResponse.status === 500) {
          throw new Error(await httpResponse.text());
        }

        if (httpResponse.status === 400) {
          throw new Error(await httpResponse.text());
        }
  
        if (!httpResponse.ok) {
          throw new Error("Failed to get data.");
        }
  
        return httpResponse.text();
      })
      .then(
        () => {
          getAllOrders();
          getAllHistoricOrders();
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      ).finally(() => {
        setIsLoading(false);
      });
  }

  const UpdateOrderDeliveryDate = (orderID, deliveryDate) => {

    const scheduledOrderDTO = {
      OrderId: orderID,
      DeliveryDate: deliveryDate
    };

    setIsLoading(true);
      
    //Orders API: "https://localhost:7262/api/Order/UpdateOrderDeliveryDate"
    // BFF (Local): https://localhost:7259/api/OrderManager/UpdateOrderDeliveryDate

    fetch(`${REACT_APP_STAFFPORTAL_BFF_WEBAPI_BASE_URL}/api/OrderManager/UpdateOrderDeliveryDate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"), 
      },
      body: JSON.stringify(scheduledOrderDTO)
    })
      .then(async (httpResponse) => {
        if (httpResponse.status === 500) {
          throw new Error(await httpResponse.text());
        }

        if (httpResponse.status === 400) {
          throw new Error(await httpResponse.text());
        }
  
        if (!httpResponse.ok) {
          throw new Error("Failed to get data.");
        }
  
        return httpResponse.text();
      })
      .then(
        () => {
          getAllOrders();
          getAllHistoricOrders();
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAllOrders();
    getAllHistoricOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Orders
        ordersData={data}
        setOrderData={setData}
        isLoading={isLoading}
        historicOrdersData={historicOrders}
        setHistoricOrdersData={setHistoricOrders}
        setServerError={setServerError}
        serverError={serverError}
        activeOrdersCount={activeOrdersCount}
        deleteOrder={deleteOrder}
        UpdateOrderStatus={UpdateOrderStatus}
        UpdateOrderDeliveryDate={UpdateOrderDeliveryDate}
      />
    </>
  )
}
