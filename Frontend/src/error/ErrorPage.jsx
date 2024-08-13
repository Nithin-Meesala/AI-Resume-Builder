// src/error/ErrorPage.jsx
import React from 'react';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Oops!</h1>
      <p>Something went wrong or the page you're looking for doesn't exist.</p>
      <p>
        Please check the URL or go back to the <a href="/" style={{color:"blue"}}>home page</a>.
      </p>
    </div>
  );
};

export default ErrorPage;
