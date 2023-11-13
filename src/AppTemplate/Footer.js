import React, { useEffect, useState } from "react";
import moment from "moment";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(moment().format("YYYY"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(moment().format("YYYY"));
    }, 60000); // Update every minute, you can adjust the interval as needed

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-auto py-5 bg-dark">
      <div className="container d-flex justify-content-center">
        <span className="text-muted">
          Copyright &copy; Three Amigos Corporation {currentYear}
        </span>
      </div>
    </footer>
  );
}
