import React, { useEffect, useState } from 'react';
import { openErrorNotification } from '../../../Hooks/Notification/GlobalNotification';
import { useParams } from 'react-router-dom';
import CategoricalProducts from '../../../Components/Pages/Products/CategoricalProducts';
import AllProducts from '../../../Components/Pages/Products/AllProducts';

export default function ProductsContainer({categoryProducts}) {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();


  const getAllProducts = () => {

    setIsLoading(true);

    fetch("https://localhost:7259/api/Products/GetAllProducts", {
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
          setProducts(JSON.parse(result));
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
        }
      );

      setIsLoading(false);
  };

  const getAllCategoryProducts = () => {

    setIsLoading(true);

    fetch("https://localhost:7259/api/Products/GetAllCategoryProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(categoryName)
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
          setProducts(JSON.parse(result));
        },
        (error) => {
          openErrorNotification("Server Error", error.message);
        }
      );

      setIsLoading(false);
  };

  useEffect(() => {
    if (categoryProducts) {
      getAllCategoryProducts();
    } else {
      getAllProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryProducts]);

  return (
    <div>
      {categoryProducts ? (
        <CategoricalProducts products={products} categoryName={categoryName} isLoading={isLoading} />
      ) : (
        <AllProducts products={products} isLoading={isLoading} />
      )}
    </div>
  )
}
