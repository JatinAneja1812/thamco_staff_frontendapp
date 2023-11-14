import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Spin } from "antd";

import ErrorBoundary from "../../ErrorBoundary";
import Template from "../../AppTemplate/Template";
import HomePageContainer from "../../Containers/Pages/Home/HomePageContainer";
import LandingPage from "../../Components/Pages/Home/LandingPage";
import HomePage from "../../Components/Pages/Home/HomePage";

const AppRoutes = () => {
  const { isLoading, error } = useAuth0();

  return (
    <Template>
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
                <Route exact path="/" element={<HomePageContainer />} />
                <Route
                  path="/"
                  element={<LandingPage />}
                />
                <Route
                  path="/home"
                  element={<HomePage />}
                />
              </Routes>
            )}
        
        </Suspense>
      </ErrorBoundary>
    </Template>
  );
};

export default AppRoutes;
