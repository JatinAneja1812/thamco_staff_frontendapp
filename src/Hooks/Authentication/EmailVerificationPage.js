import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const EmailVerificationPage = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    if (isAuthenticated && user) {
      setIsEmailVerified(user.email_verified);
    }
  }, [isAuthenticated, user]);


  useEffect(() => {
    // Check if email is verified and user is authenticated
    if (isEmailVerified && isAuthenticated) {
      // Navigate to the home page
      navigate("/home");
    }
  }, [isEmailVerified, isAuthenticated, navigate]);

  return (
    <div style={styles.container}>
      <h1>Email Verification</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          {isEmailVerified ? (
            <p>Your email address has been verified. You can proceed.</p>
          ) : (
            <div>
              <p>
                Your email address is not verified. Please check your email
                and follow the verification link.
              </p>
              {/* Add your email verification link or instructions here */}
              <p>
                Once you've verified your email, click the button below to
                refresh the page.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
};

export default EmailVerificationPage;