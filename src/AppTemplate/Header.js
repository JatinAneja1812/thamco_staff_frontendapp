import { UpOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { CSSTransition } from "react-transition-group";
import "./Template.Styles.css";
import CartIconButton from "../Components/Buttons/CartButton/CartButton";
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

const Header = (props) => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const handleLogin = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      loginWithRedirect({ redirect_uri: "http://localhost:3000" });
    }
  };

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <div>
      <ElevationScroll {...props}>
        <div className="header">
          <div className="header-flex">
            <div className="brand">
              <h1>ThAmCo Corporation Staff</h1>
            </div>
            <button onClick={toggleNav} className="Burger">
              🍔
            </button>
            <CSSTransition
              in={!isSmallScreen || isNavVisible}
              timeout={350}
              classNames="NavAnimation"
              unmountOnExit
            >
              {!isAuthenticated ? (
                <nav className={!isAuthenticated ? "NavPublic" : "Nav"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  <button className="btn btn-primary" onClick={handleLogin}>
                    {isAuthenticated ? "Logout" : "Login"}
                  </button>
                </nav>
              ) : (
                <nav className="Nav">
                  <Link to="/home">Home</Link>
                  <Link to="/customer">Customer</Link>
                  <Link to="/pricing">Pricing</Link>
                  <Link to="/orders">Orders</Link>
                  <Link to="/products">Products</Link>
                  <CartIconButton />
                  <button className="btn btn-primary" onClick={handleLogin}>
                    {isAuthenticated ? "Logout" : "Login"}
                  </button>
                </nav>
              )}
            </CSSTransition>
          </div>
          <div>
            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shapeRendering="auto"
            >
              {/* Your existing wave animation */}
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="0"
                  fill="rgba(255,255,255,0.7)"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(255,255,255,0.5)"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="5"
                  fill="rgba(255,255,255,0.3)"
                />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>
        </div>
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />

      {/* Go_Back on the top btn */}
      <ScrollTop {...props}>
        <Fab color="warning" size="small" aria-label="scroll back to top">
          <UpOutlined />
        </Fab>
      </ScrollTop>
    </div>
  );
};

export default Header;
