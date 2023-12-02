import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Template.Styles.css"; // Import your custom CSS for the footer styling

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(moment().format("YYYY"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(moment().format("YYYY"));
    }, 60000); // Update every minute, you can adjust the interval as needed

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed-footer">
      <div className="container d-flex justify-content-center">
        <span className="text-muted">
          Copyright &copy; Three Amigos Corporation {currentYear}
        </span>
      </div>
    </footer>
  );
};

export default Footer;