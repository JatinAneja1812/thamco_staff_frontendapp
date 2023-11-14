import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Template.Styles.css";
import { CSSTransition } from "react-transition-group";

const Header = () => {
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
    </div>
  );
};

export default Header;