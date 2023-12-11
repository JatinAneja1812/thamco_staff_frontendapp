import React, {useEffect, useState} from 'react'
import { openErrorNotification } from '../../../Hooks/Notification/GlobalNotification';
import Orders from '../../../Components/Pages/Orders/Orders';

export default function OrdersContainer() {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [historicOrders, setHistoricOrders] = useState([]);
  const [serverError, setServerError] = useState(null);
  const [activeOrdersCount, setActiveOrdersCount] = useState(null);

  const getAllOrders = () => {
    setIsLoading(true);
       //CHANGE HERE
    fetch("https://localhost:7262/api/Order/GetAllOrders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
          //Authorization: "Bearer " + sessionStorage.getItem("access_token"),
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
          console.log(JSON.parse(result))
          setData(JSON.parse(result));
          getAllActiveOrdersCount();
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      );

      setIsLoading(false);
  }

  const getAllHistoricOrders = () => {
    setIsLoading(true);
       //CHANGE HERE
    fetch("https://localhost:7262/api/Order/GetAllHistoricOrders", {
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
      );

      setIsLoading(false);
  }

  const getAllActiveOrdersCount = () => {
    setIsLoading(true);
       //CHANGE HERE
    fetch("https://localhost:7262/api/Order/GetAllOrdersCount", {
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
          console.log(JSON.parse(result));
          setActiveOrdersCount(JSON.parse(result));
          
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
          setServerError(error);
        }
      );

      setIsLoading(false);
  }

  useEffect(() => {
    getAllOrders();
    getAllHistoricOrders();
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
      />
    </>
  )
}
