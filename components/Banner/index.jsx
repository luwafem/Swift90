"use client";
import BannerCard from "./Banner";



export default function Banner() {

  
  return (
    
    <main id="portfolios">



      <BannerCard banner={{
        title: "Grow Higher University",
        caption: `
            A key challenge facing startup founders, CEOs, and entrepreneurs globally is establishing a sustainable recurring revenue model that generates consistent and predictable revenue to sustain startup business growth without seeking or relying on external capital funding. This deficiency can lead to cash flow volatility and hinder business growth. As one of our portfolio companies, Grow Higher University addresses this issue for startup founders, CEOs and entrepreneurs, providing a complimentary global online community, offering knowledge, tools, and expert guidance to foster a stable revenue stream, driving scalable growth, profitability, and long-term success for startup businesses.
        `,
        image: "/assets/images/banner/growhigher.svg",
        display: "row-reverse",
        bgColor: "#ECECEC",
        link: "https://www.growhigheruniversity.com/",
        linkCaption: "Signup To Be A Member Today!",
        }} 
      />

      <BannerCard banner={{
        title: "The Startup FOUB-FS ",
        caption: `
            A key challenge facing non-venture backed startup founders, CEOs, and entrepreneurs is establishing a self-sustaining fundraising system to drive business growth without reliance on external capital funding. This deficiency can lead to funding uncertainty and hinder business advancement. As a coaching and mentorship portfolio company of Heelheid Business, FOUB-FS addresses this issue, providing coaching and mentorship with implementation support to help startup founders, CEOs, and entrepreneurs have an organic, sustainable, and unlimited fundraising system that consistently funds their business growth, without seeking and depending on external venture capital funds.
        `,
        image: "/assets/images/banner/foub-fs.svg",
        link: "https://calendly.com/heelheidbusiness-p938/fundraisingcall",
        linkCaption: "Schedule A Call To Setup Your Business Fundraising System",
        bgColor: "#ECECEC",
        }} 
      />

      <BannerCard banner={{
        title: "Amica",
        caption: `
           A key challenge facing qualified consultants and coaches is finding and acquiring ideal clients who pay premium investment fees for the problems they solve. Unfortunately, this often requires significant time, effort, and resources spent on marketing and self-promotion, making it hard to achieve premium pay. This deficiency can lead to inconsistent client flow, reduced revenue, and hindered business growth. As a tech product portfolio company of Heelheid Business, Amica addresses this issue, providing a dedicated hub for consultants and coaches to connect with their right-fit clients, solve specific problems, and grow their businesses with ease and efficiency.
        `,
        image: "/assets/images/banner/amica.svg",
        display: "row-reverse",
        link: "/amica.html",
        linkCaption: "Join Our Premium Members Waiting List For Amica",
        bgColor: "#ECECEC",
        }} 
      />

      <BannerCard banner={{
        title: "Online Professionals Coaching Agency",
        caption: `
            Online Professionals Agency addresses the challenge faced by many consultants, coaches, and entrepreneurs who offer valuable solutions to specific problems, but struggle to gain visibility and reach their ideal market, limiting their opportunities to offer their services and generate income. We overcome this hurdle by signing these professionals as "Signed Professionals" under our agency, supporting them in refining and developing their offers to ensure market fit, and promoting and marketing them to attract clients, thereby enabling them to focus on delivering exceptional services while we drive revenue growth and financial asset building through our business development and client acquisition efforts.
        `,
        image: "/assets/images/banner/4.svg",
        bgColor: "#ECECEC",
        subscribe: "mailto:team@heelheidbusiness.com",
        emailAddress: "team@heelheidbusiness.com"
        }} 
      />

      


    </main>
  );
}
