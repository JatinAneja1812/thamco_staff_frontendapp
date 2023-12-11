import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Fab from "@mui/material/Fab";
import Toolbar from "@mui/material/Toolbar";
import { Layout, Menu } from "antd";
import React, { createContext, useState } from "react";
import { Link } from "react-router-dom";
import handleSessionStorage from "../Utility/LibraryFunctions/HandleSessionStorage";
import {
  ElevationScroll,
  ScrollTop,
} from "../Utility/LibraryFunctions/ScrollToTopUtility";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const { Sider } = Layout;

export const groceryContext = createContext();

const Template = (props) => {
  const { isAuthenticated } = useAuth0();

  const [isCollapsed, setCollapsed] = useState(false);
  const [cartItems, setCartItems] = useState(cartItemsFromSessionStorage);

  const toggleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <>
      <groceryContext.Provider
        value={{
          cartItemsState: [cartItems, setCartItems],
        }}
      >
        <ElevationScroll {...props}>
          <Layout>
            {/* Fixed side menu */}
            <Sider
              width={220}
              collapsedWidth={100} // Set a value larger than 0 to keep a collapsed sidebar visible
              trigger={null}
              collapsible
              collapsed={isCollapsed}
              style={{
                position: "fixed",
                transition: "width 0.3s ease-in-out",
                width: isCollapsed ? "100px" : "220px",
                height: "100vh",
                zIndex: 1,
                background:
                  "linear-gradient(180deg, rgb(7, 59, 38) 40%, rgb(67, 94, 56) 100%)",
              }}
            >
              <div onClick={() => toggleCollapsed()}>
                {isCollapsed ? (
                  <MenuUnfoldOutlined
                    style={{
                      color: "#fff",
                      fontSize: "24px",
                      marginTop: "86px",
                      marginLeft: "67px",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <MenuFoldOutlined
                    style={{
                      color: "#fff",
                      fontSize: "24px",
                      marginTop: "86px",
                      marginLeft: "187px",
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>

              {!isAuthenticated ? (
                <Menu
                  mode="vertical"
                  style={{
                    position: "relative",
                    background: "rgb(7, 59, 38)",
                  }}
                  defaultSelectedKeys={["1"]}
                  // collapsed={isCollapsed}
                >
                  <Menu.Item
                    key="1"
                    icon={<HomeOutlined />}
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      background: "rgb(163 255 96 / 41%)",
                    }}
                  >
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<CategoryIcon />}
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      background: "rgb(163 255 96 / 41%)",
                    }}
                  >
                    <Link to="/products">Products</Link>
                  </Menu.Item>
                </Menu>
              ) : (
                <Menu
                  mode="vertical"
                  style={{
                    position: "relative",
                    background: "rgb(7, 59, 38)",
                  }}
                  defaultSelectedKeys={["1"]}
                  // collapsed={isCollapsed}
                >
                  <Menu.Item
                    key="1"
                    icon={<HomeOutlined />}
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      background: "rgb(163 255 96 / 41%)",
                    }}
                  >
                    <Link to="/home">Home</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="2"
                    icon={<CategoryIcon />}
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      background: "rgb(163 255 96 / 41%)",
                    }}
                  >
                    <Link to="/products">Products</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<PeopleIcon />}
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      background: "rgb(163 255 96 / 41%)",
                    }}
                  >
                    <Link to="/customers">Customers</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    icon={<ShoppingCartCheckoutIcon />}
                    style={{
                      color: "#fff",
                      fontWeight: "700",
                      background: "rgb(163 255 96 / 41%)",
                    }}
                  >
                    <Link to="/orders">Orders</Link>
                  </Menu.Item>
                </Menu>
              )}

              {/* Version text at the bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  textAlign: "center",
                  color: "#fff",
                  padding: "8px",
                  fontSize: "17px",
                }}
              >
                Version 1.0.0
              </div>
            </Sider>

            {/* Header and Content */}
            <Layout
              className="site-layout"
              style={{ marginLeft: isCollapsed ? 100 : 220, display: "flex" }}
            >
              <Header collapsed={isCollapsed} />
              <Content>{props.children}</Content>
            </Layout>

            {/* Fixed Footer  */}
            <Footer />
          </Layout>
        </ElevationScroll>

        <Toolbar id="back-to-top-anchor" />

        {/* Go_Back on the top btn */}
        <ScrollTop {...props}>
          <Fab color="warning" size="small" aria-label="scroll back to top">
            <UpOutlined />
          </Fab>
        </ScrollTop>
      </groceryContext.Provider>
    </>
  );
};

const cartItemsFromSessionStorage =
  handleSessionStorage("get", "cartItems") || [];

export default Template;
