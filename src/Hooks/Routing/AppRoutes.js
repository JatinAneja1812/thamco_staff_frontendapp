import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Spin } from "antd";
import HomePage from "../../Containers/Pages/Home/HomePage";
import HomePageWithoutLogin from "../../Containers/Pages/Home/HomePageWithoutLogin";
import ErrorBoundary from "../../ErrorBoundary";

const AppRoutes = () => {
  const { isLoading, error } = useAuth0();

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Flex align="center" gap="middle">
            <Spin
              spinning={isLoading}
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
        {error && <p>Authentication Error</p>}
        {!error && !isLoading && (
          <Routes>
            <Route exact path="/" element={<HomePageWithoutLogin />} />
            <Route
              path="/home"
              element={<HomePage />}
            />
          </Routes>
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
