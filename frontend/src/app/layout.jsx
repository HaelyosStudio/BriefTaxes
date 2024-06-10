import React from 'react';
import Navbar from '../components/navbar';
import './globals.css';
import '../app/fontawesome.js';

export const metadata = {
  title: 'Billy\'s Bills',
  description: 'Bills payment website',
};

const Layout = ({ children }) => {
  return (
    <html lang="fr">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Navbar />
        <div className="mainContentContainer">
        {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
