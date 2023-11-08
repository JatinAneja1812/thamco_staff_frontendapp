import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Containers/Main/App';
import reportWebVitals from './reportWebVitals';
import Auth0Provider from './Hooks/Authentication/Auth0Provider';

window.onmousedown = (e) => {
  if (e.button === 1) {
    // Prevent the default behavior of the middle mouse button click
    e.preventDefault();
    //remove user
    sessionStorage.removeItem("user");
    // Open a new tab and redirect it to the root URL
    window.open('/', '_blank');
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider>
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


