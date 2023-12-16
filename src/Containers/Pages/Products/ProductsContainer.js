import React, { useEffect, useState } from 'react';
import { openErrorNotification } from '../../../Hooks/Notification/GlobalNotification';
import { useParams } from 'react-router-dom';
import CategoricalProducts from '../../../Components/Pages/Products/CategoricalProducts';
import AllProducts from '../../../Components/Pages/Products/AllProducts';
import AllProductsAndCategoriesMock from './ProductsMockData';

export default function ProductsContainer({categoryProducts}) {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();


  const getAllProducts = () => {
    
    setIsLoading(true);

    const allProducts = AllProductsAndCategoriesMock.flatMap(category => category.Items);
    
    setProducts(allProducts);
    // Simulate an asynchronous operation with a setTimeout
    setTimeout(() => {
      if (allProducts != null) {
        setProducts(allProducts);
      } else {
        // Handle the case when the category is not found
        openErrorNotification("Category Not Found", `An error occurred while getting all available products.`);
      }
      setIsLoading(false);
    }, 2000); // Simulating a delay of 2 second
  };

  // Note: In a real-world scenario, you would fetch data from an API instead of using mockData.
  // fetch("https://localhost:7259/api/Products/GetAllProducts", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //      Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  //     // Username: user.username,
  //   },
  // })
  //   .then(async (httpResponse) => {
  //     if (httpResponse.status === 500) {
  //       var errorMessage = await httpResponse.text();
  //       throw new Error(errorMessage);
  //     }

  //     if (!httpResponse.ok) {
  //       throw new Error("Failed to get data.");
  //     }

  //     return httpResponse.text();
  //   })
  //   .then(
  //     (result) => {
  //       setProducts(JSON.parse(result));
  //     },
  //     (error) => {
  //       openErrorNotification("Server Error", error.message);
  //     }
  //   ) 
  //   .finally(() => {
  //     setIsLoading(false);
  //   });
 

  const getAllCategoryProducts = () => {

    setIsLoading(true);

    const mockData = AllProductsAndCategoriesMock;  // List of products and categories.
    // Filter mock data based on the provided category name
    const categoryProducts = mockData.find(
      (category) => category.CategoryName.toLowerCase() === categoryName.toLowerCase()
    );

    // Simulate an asynchronous operation with a setTimeout
    setTimeout(() => {
      if (categoryProducts) {
        setProducts(categoryProducts.Items);
      } else {
        // Handle the case when the category is not found
        openErrorNotification("Category Not Found", `Products for category '${categoryName}' not found.`);
      }
      setIsLoading(false);
    }, 2000); // Simulating a delay of 2 second

  };

  // Note: In a real-world scenario, we would fetch data from an API instead of using mockData.
  // Below is the examplefetch method that calls product from producst microservice

  // fetch("https://localhost:7259/api/Products/GetAllCategoryProducts", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(categoryName)
  // })
  // .then(async (httpResponse) => {
  //   if (httpResponse.status === 500) {
  //     var errorMessage = await httpResponse.text();
  //     throw new Error(errorMessage);
  //   }

  //   if (!httpResponse.ok) {
  //     throw new Error("Failed to get data.");
  //   }

  //   return httpResponse.text();
  // })
  // .then(
  //   (result) => {
  //     setProducts(JSON.parse(result));
  //   },
  //   (error) => {
  //     openErrorNotification("Server Error", error.message);
  //   }
  // )
  // .finally(() => {
  //   setIsLoading(false);
  // });

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
