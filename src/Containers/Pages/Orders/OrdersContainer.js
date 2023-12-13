import React, { useEffect, useState } from 'react';
import Orders from '../../../Components/Pages/Orders/Orders';
import { openErrorNotification } from '../../../Hooks/Notification/GlobalNotification';

export default function OrdersContainer() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [historicOrders, setHistoricOrders] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [activeOrdersCount, setActiveOrdersCount] = useState(null);

  const getAllOrders = () => {
    setIsLoading(true);
       //API: "https://localhost:7262/api/Order/GetAllOrders" 
    fetch("https://localhost:7259/api/OrderManager/GetAllOrders", {
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
       //API: "https://localhost:7262/api/Order/GetAllHistoricOrders"
    fetch("https://localhost:7259/api/OrderManager/GetAllHistoricOrders", {
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

  // const getAllActiveOrdersCount = () => {
  //   setIsLoading(true);
  //      //API: "https://localhost:7262/api/Order/GetAllOrdersCount"
  //   fetch("https://localhost:7259/api/OrderManager/GetOrdersCount", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  //     },
  //   })
  //     .then(async (httpResponse) => {
  //       if (httpResponse.status === 500) {
  //         var errorMessage = await httpResponse.text();
  //         throw new Error(errorMessage);
  //       }
  
  //       if (!httpResponse.ok) {
  //         throw new Error("Failed to get data.");
  //       }
  
  //       return httpResponse.text();
  //     })
  //     .then(
  //       (result) => {
  //         setActiveOrdersCount(JSON.parse(result));
  //       },
  //       (error) => {
  //         openErrorNotification("Server Error", error.message);
  //         setServerError(error);
  //       }
  //     )
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  const deleteOrder = (orderID) => {
    setIsLoading(true);
       //API:  "https://localhost:7262/api/Order/CancelOrder"
    fetch("https://localhost:7259/api/OrderManager/CancelOrder", {
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
       //API: "https://localhost:7262/api/Order/UpdateOrderStatus"
    fetch("https://localhost:7259/api/OrderManager/UpdateOrderStatus", {
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
       //API: "https://localhost:7262/api/Order/UpdateOrderDeliveryDate"
    fetch("https://localhost:7259/api/OrderManager/UpdateOrderDeliveryDate", {
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
