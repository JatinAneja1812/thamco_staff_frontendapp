import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <img
          style={{
            backgroundRepeat: "no-repeat",
            height: "99vh",
            width: "211vh",
          }}
          src="https://www.soondy.com/wp-content/uploads/2020/03/image1-1920x1016.jpg"
          alt="404Error"
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
