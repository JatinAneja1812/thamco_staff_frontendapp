// import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import StyledAvatar from "../Components/Avatar/Avatar";
import CartIconButton from "../Components/Buttons/CartButton/CartButton";
import { useAuth } from "../Hooks/Authentication/AuthProvider";
import "./Template.Styles.css";

const Header = ({collapsed}) => {
  const { login, isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };

  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [staffData, setStaffData] = useState([]);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const fetchData = React.useMemo(() => {
    return () => {
      fetch("https://localhost:7259/api/Users/GetStaffUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          Email: sessionStorage.getItem("email"),
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
            setStaffData(JSON.parse(result));
          }
        );
    };
  }, []); // Add dependencies as needed

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);
  

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
    <div
      className="header"
      style={{ position: "fixed", top: 0, width: collapsed ?"107%" : "100%", zIndex: 1 }}
    >
      <div className="header-flex">
        <div className="brand" style={{ marginLeft: collapsed ? "-95px": "-212px"}}>
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
              <button className="btn btn-primary" onClick={handleLogin}>
                {isAuthenticated ? "Logout" : "Login"}
              </button>
            </nav>
          ) : (
            <nav className="Nav">
              <CartIconButton />
              <button className="btn btn-primary" onClick={handleLogin}>
                {isAuthenticated ? "Logout" : "Login"}
              </button>
              <StyledAvatar details={staffData} />
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
  );
};

export default Header;
