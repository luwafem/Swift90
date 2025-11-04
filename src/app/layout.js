"use client";
import React, {useEffect} from "react";
import "./globals.css";


export default function RootLayout({ children }) {

  // Function to disable right-click across the site
  


  return (
    <html lang="en">
      <body style={{ overflowX: 'hidden', fontFamily: 'Avenir, AvenirBold', backgroundColor: "white", color:"black", }}>
          
      
     
          {children}
           
      
      </body>
    </html>
  );
}






