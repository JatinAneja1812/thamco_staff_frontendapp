import {
  HomeOutlined,
  UpOutlined,
} from "@ant-design/icons";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const { Sider } = Layout;

// This function will add Go_back feature on the Navbar
function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  // Go_back to the top Button Handler
  const handleClick = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true,
    });
  };
  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 20, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

// This function will show a Elevation effect on the Navbar when scrolling
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Template = (props) => {
  const { isAuthenticated } = useAuth0();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {" "}
      <ElevationScroll {...props}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            width={220}
            collapsedWidth={80} // Set a value larger than 0 to keep a collapsed sidebar visible
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              position: "fixed",
              height: "100vh",
              zIndex: 1,
              background:
                "linear-gradient(180deg, rgb(7, 59, 38) 40%, rgb(67, 94, 56) 100%)",
            }}
          >
            {/* Your Logo or Branding can be placed here */}
            <div
              style={{
                height: "100px",
                background: "rgb(7, 59, 38)",
                textAlign: "center",
              }}
            >
              {/* Your Logo or Branding content */}
            </div>

            {!isAuthenticated ? (
              <Menu
                mode="vertical"
                style={{
                  background: "rgb(7, 59, 38)",
                }}
                defaultSelectedKeys={["1"]}
                inlineCollapsed={collapsed}
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
                {/* Add more Menu items as needed */}
              </Menu>
            ) : (
              <Menu
                mode="vertical"
                style={{
                  background: "rgb(7, 59, 38)",
                }}
                defaultSelectedKeys={["1"]}
                inlineCollapsed={collapsed}
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
                  icon={<PeopleIcon/>}
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
                {/* Add more Menu items as needed */}
              </Menu>
            )}
             {/* Version text at the bottom */}
            <div style={{ position: "absolute", bottom: 0, width: "100%", textAlign: "center", color: "#fff", padding: "8px", fontSize: "17px" }}>
              Version 1.0.0
            </div>
          </Sider>

          <Layout
            className="site-layout"
            style={{ marginLeft: collapsed ? 80 : 220 }}
          >
            <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            <Content>{props.children}</Content>
          </Layout>

          {/* Fixed Footer with Stylish Design */}
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
    </>
  );
};

export default Template;
