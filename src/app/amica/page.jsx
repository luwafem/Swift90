import React from "react";
import BannerCard from "../../../components/Banner/Banner";
export const metadata = {
    title: `heelheidbusiness - amica`,
    description: `A key challenge facing qualified consultants and coaches is finding and acquiring ideal clients who pay premium investment fees for the problems they solve. Unfortunately, this often requires significant time, effort, and resources spent on marketing and self-promotion, making it hard to achieve premium pay. This deficiency can lead to inconsistent client flow, reduced revenue, and hindered business growth. As a tech product portfolio company of Heelheid Business, Amica addresses this issue, providing a dedicated hub for consultants and coaches to connect with their right-fit clients, solve specific problems, and grow their businesses with ease and efficiency.`,
  };
export default function Docpage() {
  return (
    
    <div
      className="mt-10"
    >

        <BannerCard banner={{
        title: "Amica",
        caption: `
           
            COMING SOON
        `,
        image: "/assets/images/banner/amica.svg",
        }} 
      />

    </div>
  );
}
