import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { useAuth0 } from '@auth0/auth0-react';
import ErrorBoundary from "../../ErrorBoundary";
import { Flex, Spin } from "antd";
import HomePage from "../../Containers/Pages/Home/HomePage";
import HomePageWithoutLogin from "../../Containers/Pages/Home/HomePageWithoutLogin";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Flex align="center" gap="middle">
            <Spin
              delay={500}
              style={{
                flex: 1,
                marginTop: window.outerHeight / 2,
                marginLeft: window.innerWidth / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Flex>
        }
      >
       <Routes>
          <Route exact path="/" element={<HomePageWithoutLogin />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
