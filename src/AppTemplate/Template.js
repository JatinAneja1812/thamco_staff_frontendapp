import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

export default function Template(props) {
  return (
    <div className="app-container">
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </div>
  );
}
