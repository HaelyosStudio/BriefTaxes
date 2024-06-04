"use client";
import React from 'react';
import Link from 'next/link';

const App = () => {
  return (
    <div className="authButtonsContainer">
        <Link className='signInButton outerShadow' href="/authentication/login">Login</Link>
        <Link className='signInButton outerShadow' href="/authentication/register">Register</Link>
    </div>
  );
};

export default App;