import React, { useState, useEffect, useRef } from 'react';

// Intro Animation Component
function IntroAnimation({ onAnimationEnd }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds (adjust as needed)
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000); // Duration before fade out starts

    // End animation and call callback after fade out completes
    const animationEndTimer = setTimeout(() => {
      onAnimationEnd();
    }, 2500); // Total duration (2s for slide-in + 0.5s for fade-out)

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(animationEndTimer);
    };
  }, [onAnimationEnd]);

  return (
    <div className={`fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-[9999] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <h1 className="text-2xl md:text-6xl font-extrabold text-gray-700 animate-slide-in-left-intro">
        Swift90
      </h1>
      {/* Ensure dark mode transition is smooth even during intro */}
      <style>{`
        @keyframes slideInLeftIntro {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left-intro {
          animation: slideInLeftIntro 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}


// Main App Component
function App() {
  // Global States
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Controls the hamburger menu overlay
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'purchase', 'payment', 'checkout', 'blog', 'blogPost'
  const [purchaseDetails, setPurchaseDetails] = useState({
    plan: null,
    websiteType: '',
    assets: [],
    requirements: '',
    numProducts: '',
    paymentGateways: [],
    numBlogPosts: '',
    commentSystem: '',
    numPages: '',
    serviceCategories: '',
    numProjects: '',
    additionalFeatures: [], // Now explicitly for add-ons
    paymentStatus: 'pending', // 'pending', 'successful', 'failed'
  });
  const [selectedBlogPost, setSelectedBlogPost] = useState(null); // State to hold data for the currently viewed blog post
  const [showIntro, setShowIntro] = useState(true); // State to control intro animation

  // Dummy pricing data
  const pricingData = {
    "USA": {
      currency: '$',
      plans: {
        basic: { name: 'Basic', price: 29, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 79, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 199, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "Nigeria": {
      currency: '₦',
      plans: {
        basic: { name: 'Basic', price: 15000, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 40000, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 100000, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "UK": {
      currency: '£',
      plans: {
        basic: { name: 'Basic', price: 25, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 65, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 170, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "Canada": {
      currency: 'C$',
      plans: {
        basic: { name: 'Basic', price: 35, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 89, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 220, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "Australia": {
      currency: 'A$',
      plans: {
        basic: { name: 'Basic', price: 39, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 99, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 250, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "Germany": {
      currency: '€',
      plans: {
        basic: { name: 'Basic', price: 27, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 75, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 180, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "France": {
      currency: '€',
      plans: {
        basic: { name: 'Basic', price: 27, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 75, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 180, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "India": {
      currency: '₹',
      plans: {
        basic: { name: 'Basic', price: 2000, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 5500, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 15000, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "Brazil": {
      currency: 'R$',
      plans: {
        basic: { name: 'Basic', price: 120, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 350, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 900, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "South Africa": {
      currency: 'R',
      plans: {
        basic: { name: 'Basic', price: 450, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 1200, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 3000, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "Japan": {
      currency: '¥',
      plans: {
        basic: { name: 'Basic', price: 3500, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 9500, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 25000, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
    "Mexico": {
      currency: 'MX$',
      plans: {
        basic: { name: 'Basic', price: 500, features: ['1 Website', 'Standard Templates', 'Basic Support', '10GB Storage'] },
        pro: { name: 'Pro', price: 1500, features: ['5 Websites', 'Premium Templates', 'Priority Support', '50GB Storage', 'Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 4000, features: ['Unlimited Websites', 'Custom Development', '24/7 Dedicated Support', 'Unlimited Storage', 'Advanced Analytics', 'Managed SEO'] },
      },
    },
  };

  // State for FAQ accordion
  const [openFAQ, setOpenFAQ] = useState(null);

  // Effect to check for stored country and theme on component mount
  useEffect(() => {
    // Only check for stored country and theme AFTER the intro animation
    if (!showIntro) {
      const storedCountry = localStorage.getItem('terraace_country_selection');
      if (storedCountry && pricingData[storedCountry]) {
        setSelectedCountry(storedCountry);
      } else {
        setShowLocationModal(true);
      }

      const storedTheme = localStorage.getItem('terraace_theme');
      if (storedTheme === 'dark') {
        setDarkMode(true);
      } else {
        setDarkMode(false); // Default to light mode
      }
    }
  }, [showIntro]); // Depend on showIntro

  // Handler for country selection in the modal
  const handleCountrySelect = (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    localStorage.setItem('terraace_country_selection', country);
    setShowLocationModal(false);
  };

  // Handler to open the location modal again (e.g., from footer)
  const openLocationModal = () => {
    setShowLocationModal(true);
  };

  // Toggle FAQ accordion
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('terraace_theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Function to initiate purchase flow from pricing card
  const startPurchase = (planKey) => {
    const plan = pricingData[selectedCountry].plans[planKey];
    setPurchaseDetails(prev => ({ ...prev, plan: plan }));
    setCurrentPage('purchase');
  };

  // Dummy testimonials data
  const testimonials = [
    {
      quote: "Swift90 transformed our online presence! The process was seamless, and our new website looks fantastic on all devices. Highly recommend!",
      name: "Aisha M.",
      title: "CEO, Global Innovations",
      country: "Nigeria",
      avatar: "https://placehold.co/100x100/E0E0E0/333333?text=AM"
    },
    {
      quote: "We needed a professional website fast, and Swift90 delivered beyond our expectations. Their support is incredible, and the site performance is top-notch.",
      name: "John D.",
      title: "Founder, Tech Solutions Inc.",
      country: "USA",
      avatar: "https://placehold.co/100x100/E0E0E0/333333?text=JD"
    },
    {
      quote: "The country-based pricing was a game-changer for us. Swift90 understood our local market needs perfectly and provided an excellent service.",
      name: "Maria S.",
      title: "Owner, Boutique Designs",
      country: "Brazil",
      avatar: "https://placehold.co/100x100/E0E0E0/333333?text=MS"
    },
    {
      quote: "Exceptional service and a beautiful website! Swift90 made everything so easy, and we've seen a significant increase in client engagement since launch.",
      name: "David K.",
      title: "Marketing Director, Innovate Corp.",
      country: "UK",
      avatar: "https://placehold.co/100x100/E0E0E0/333333?text=DK"
    },
    {
      quote: "Our new e-commerce site is fantastic. The team at Swift90 was very responsive and delivered a high-quality product on time and within budget.",
      name: "Priya R.",
      title: "E-commerce Manager, Fashion Hub",
      country: "India",
      avatar: "https://placehold.co/100x100/E0E0E0/333333?text=PR"
    },
    {
      quote: "Swift90 provided a seamless transition for our corporate website. The design is modern, and the performance is excellent. Highly recommend their WaaS model.",
      name: "Chen L.",
      title: "Operations Lead, Global Tech",
      country: "Japan",
      avatar: "https://placehold.co/100x100/E0E0E0/333333?text=CL"
    },
  ];

  // Dummy FAQ data
  const faqs = [
    {
      question: "What is Website as a Service (WaaS)?",
      answer: "WaaS is a subscription-based model where we provide, host, maintain, and update your website for a recurring fee. It's like renting a fully managed online presence, saving you time and technical headaches."
    },
    {
      question: "How long does it take to get my website live?",
      answer: "Once you choose your plan and provide your content, our team typically gets your basic website live within 3-5 business days. More complex sites may take a bit longer, but we prioritize speed."
    },
    {
      question: "Can I use my own custom domain name?",
      answer: "Yes, absolutely! Our Pro and Enterprise plans include custom domain integration. We'll help you connect your existing domain or assist you in registering a new one."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We offer 24/7 expert support across all our plans. Priority and dedicated support options are available with our higher-tier plans to ensure you always get the help you need, fast."
    },
    {
      question: "Is Swift90 suitable for e-commerce businesses?",
      answer: "Yes, our platform is fully capable of supporting e-commerce functionalities. Our Pro and Enterprise plans are ideal for online stores, offering features like product listings, shopping carts, and secure payment integrations."
    }
  ];

  // Dummy Blog Posts Data
  const blogPosts = [
    {
      id: 'waas-future',
      title: 'Website as a Service: The Future of Online Presence',
      date: 'July 15, 2024',
      excerpt: 'Discover why WaaS is becoming the preferred choice for businesses looking for hassle-free, high-performance websites.',
      content: `
        <p class="mb-4">In today's dynamic digital landscape, maintaining a robust online presence is crucial for business success. However, the complexities of website development, hosting, security, and ongoing maintenance can be overwhelming for many businesses, especially small to medium-sized enterprises (SMEs).</p>
        <p class="mb-4">This is where Website as a Service (WaaS) steps in as a game-changer. WaaS offers a comprehensive, subscription-based solution that takes care of all technical aspects of your website, allowing you to focus on your core business activities.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">What is WaaS?</h3>
        <p class="mb-4">Think of WaaS like a software-as-a-service (SaaS) model, but for your entire website. Instead of owning and managing all the intricate components of a website (servers, software licenses, security updates, design, development, etc.), you subscribe to a service that provides all of this for a recurring fee. This includes everything from initial design and development to hosting, ongoing maintenance, security, and updates.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Key Benefits of WaaS:</h3>
        <ul class="list-disc list-inside mb-4 space-y-2">
          <li><strong>Cost-Effective:</strong> Eliminates large upfront development costs, converting them into predictable monthly expenses.</li>
          <li><strong>Hassle-Free Management:</strong> All technical aspects are handled by the service provider, freeing up your time and resources.</li>
          <li><strong>Always Up-to-Date:</strong> Your website is continuously updated with the latest features, security patches, and performance optimizations.</li>
          <li><strong>Scalability:</strong> Easily scale your website's capabilities as your business grows without worrying about infrastructure.</li>
          <li><strong>Dedicated Support:</strong> Access to expert support for any issues or questions you might have.</li>
        </ul>
        <p class="mb-4">WaaS is not just a trend; it's the evolution of how businesses manage their digital footprint. It provides a streamlined, efficient, and cost-effective way to ensure your online presence is always professional, secure, and performing at its best.</p>
        <p>Embrace the future of web management with Swift90 WaaS and experience unparalleled peace of mind.</p>
      `
    },
    {
      id: 'seo-tips',
      title: '5 Essential SEO Tips for Small Businesses',
      date: 'June 28, 2024',
      excerpt: 'Boost your online visibility and attract more customers with these actionable SEO strategies tailored for small businesses.',
      content: `
        <p class="mb-4">For small businesses, appearing high in search engine results is crucial for attracting new customers and growing your brand. While SEO can seem complex, there are fundamental steps you can take to significantly improve your online visibility.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">1. Keyword Research is King</h3>
        <p class="mb-4">Identify the terms and phrases your target audience uses when searching for products or services like yours. Use tools (even free ones like Google Keyword Planner) to find relevant, low-competition keywords. Integrate these naturally into your website content, headings, and meta descriptions.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">3. Create High-Quality, Relevant Content</h3>
        <p class="mb-4">Regularly publish valuable content that addresses your audience's questions and needs. This could be blog posts, FAQs, or service descriptions. High-quality content not only helps with SEO but also establishes your authority and engages visitors.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">4. Ensure Mobile-Friendliness</h3>
        <p class="mb-4">Google prioritizes mobile-first indexing, meaning your website's mobile version is the primary one used for ranking. Ensure your site is responsive and provides a seamless experience on all devices. Swift90 websites are inherently mobile-friendly!</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">5. Build Quality Backlinks</h3>
        <p class="mb-4">Backlinks (links from other reputable websites to yours) are a strong signal of authority to search engines. Focus on earning natural backlinks through valuable content, local partnerships, and industry collaborations.</p>
        <p>By implementing these essential SEO tips, small businesses can significantly improve their search engine rankings, drive more organic traffic, and ultimately achieve greater online success.</p>
      `
    },
    {
      id: 'design-trends',
      title: 'Top Web Design Trends for 2024',
      date: 'May 20, 2024',
      excerpt: 'Stay ahead of the curve with the latest web design trends that are shaping the digital experience this year.',
      content: `
        <p class="mb-4">Web design is constantly evolving, with new trends emerging that influence user experience, aesthetics, and functionality. Staying updated with these trends is crucial for maintaining a modern and effective online presence.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">1. Minimalism and Clean Layouts</h3>
        <p class="mb-4">Less is more. Designers are increasingly focusing on clean, uncluttered layouts with ample white space. This approach enhances readability, improves user focus, and creates a sophisticated, modern look. It also contributes to faster loading times.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">2. Dark Mode Options</h3>
        <p class="mb-4">As seen on our Swift90 site, dark mode continues to gain popularity. It reduces eye strain in low-light conditions, saves battery life on OLED screens, and offers a sleek, premium aesthetic. Providing users with the choice between light and dark modes is becoming a standard.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">3. Interactive Elements and Micro-animations</h3>
        <p class="mb-4">Subtle animations, hover effects, and interactive elements (like the card hovers on Swift90) add life and engagement to a website without being distracting. They guide user attention, provide feedback, and make the browsing experience more enjoyable.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">4. Bold Typography and Unique Fonts</h3>
        <p class="mb-4">Typography is being used as a primary design element. Expect to see more large, bold headlines and unique font pairings that capture attention and convey brand personality. Readability remains key, but creativity in font choice is on the rise.</p>
        <h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">5. AI-Powered Personalization</h3>
        <p class="mb-4">Websites are becoming smarter. AI is being used to personalize content, product recommendations, and user journeys based on browsing behavior and preferences. This creates highly relevant and engaging experiences for individual users.</p>
        <p>By embracing these trends, businesses can ensure their websites are not only visually appealing but also highly functional and user-centric, meeting the evolving expectations of their audience.</p>
      `
    },
  ];


  // Render different pages based on currentPage state
  switch (currentPage) {
    case 'purchase':
      return (
        <PurchasePage
          purchaseDetails={purchaseDetails}
          setPurchaseDetails={setPurchaseDetails}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          selectedCountry={selectedCountry} // Pass selectedCountry
          pricingData={pricingData} // Pass pricingData
        />
      );
    case 'payment':
      return (
        <PaymentPage
          purchaseDetails={purchaseDetails}
          setPurchaseDetails={setPurchaseDetails}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          selectedCountry={selectedCountry}
          pricingData={pricingData}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      );
    case 'checkout':
      return (
        <CheckoutPage
          purchaseDetails={purchaseDetails}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      );
    case 'blog':
      return (
        <BlogPage
          blogPosts={blogPosts}
          setSelectedBlogPost={setSelectedBlogPost}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      );
    case 'blogPost':
      return (
        <BlogPostPage
          post={selectedBlogPost}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      );
    default: // 'home' page
      return (
        <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-black font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500`}>
          {showIntro && <IntroAnimation onAnimationEnd={() => setShowIntro(false)} />}

          {/* Location Selection Modal */}
          {showLocationModal && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-950 rounded-xl shadow-md p-8 max-w-md w-full text-center transform scale-105 animate-fade-in-up transition-colors duration-500 border border-gray-200 dark:border-gray-800">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Select Your Region</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  To show you the most accurate pricing, please tell us where you are located.
                </p>
                <div className="relative mb-6">
                  <select
                    className="block appearance-none w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 py-3 px-6 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-500 shadow-sm"
                    onChange={handleCountrySelect}
                    defaultValue="" // Set a default empty value for prompt
                  >
                    <option value="" disabled>Choose your country...</option>
                    {Object.keys(pricingData).map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-200">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (selectedCountry) {
                      setShowLocationModal(false);
                    } else {
                      console.log("Please select a country to continue.");
                    }
                  }}
                  className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105"
                  disabled={!selectedCountry} // Disable if no country is selected
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {/* Header Section */}
          <header className="bg-white dark:bg-black shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-30 transition-colors duration-500">
            <nav className="container mx-auto flex justify-between items-center">
              {/* Mobile Menu Button (Hamburger Icon) - Always visible */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300 rounded-lg p-2 transition-colors duration-500">
                Swift902
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
                  {darkMode ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.996 5.996 0 01-5.65-5.65c-.44-.06-.9-.1-1.36-.1z"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 18.894a.75.75 0 10-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.59-1.59zm-10.606 0a.75.75 0 10-1.06 1.06l-1.59 1.59a.75.75 0 001.06 1.06l1.59-1.59zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM4.343 5.757a.75.75 0 011.06-1.06l1.59 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59z"></path>
                </svg>
              )}
            </button>
          </div>
        </nav>
            {/* Mobile Menu Overlay - now the primary navigation overlay */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
                <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <a href="#why-terraace" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Why Swift90?</a>
                <a href="#how-it-works" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">How it Works</a>
                <a href="#features" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Features</a>
                <a href="#portfolio" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Portfolio</a>
                <a href="#testimonials" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Testimonials</a>
                <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Pricing</a>
                <a href="#faq" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">FAQ</a>
                <a href="#contact-us" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Contact</a>
                <button onClick={() => { setCurrentPage('blog'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300 bg-transparent border-none p-0 cursor-pointer">Blog</button>
                <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="bg-orange-500 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
                  Get Started
                </a>
              </div>
            )}
          </header>

          {/* Hero Section */}
          <section
            className="relative pt-24 pb-16 md:pt-40 md:pb-48 md:mt-20 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-500 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg')` }}
          >
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>


            {/* Additional subtle graphic elements (now on top of the overlay) */}
            <div className="absolute w-48 h-48 bg-orange-500 bg-opacity-5 rounded-full -top-10 left-1/4 animate-pulse-slow filter blur-sm shadow-orange-glow transform rotate-12 z-20"></div>
            <div className="absolute w-32 h-32 bg-orange-400 bg-opacity-5 rounded-lg -bottom-10 right-1/3 animate-pulse-slow delay-300 filter blur-sm shadow-orange-glow transform skew-x-6 z-20"></div>
            <div className="absolute w-24 h-24 bg-orange-600 bg-opacity-5 rounded-full top-1/3 -right-10 animate-pulse-slow delay-600 filter blur-sm shadow-orange-glow z-20"></div>
            <div className="absolute w-40 h-40 bg-orange-300 bg-opacity-5 rounded-full bottom-1/4 -left-10 animate-pulse-slow delay-900 filter blur-sm shadow-orange-glow transform rotate-45 z-20"></div>

            <div className="container mx-auto text-center px-6 animate-fade-in-up relative z-30"> {/* Increased z-index for text */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-slide-in-left tracking-tight text-white">
                Your Global Online Presence, <br className="hidden sm:inline"/> Effortlessly Refined.
              </h1>
              <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto text-gray-200 animate-fade-in leading-relaxed">
                Swift90 delivers professional, high-performance websites as a service, crafted to elevate your business worldwide.
              </p>
              <a href="#pricing" className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105 animate-bounce-once">
                Explore Plans
              </a>
            </div>
            {/* Subtle abstract shapes for visual appeal - enhanced with blur and glow (now on top of the overlay) */}
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <div className="absolute w-64 h-64 bg-orange-500 bg-opacity-5 rounded-full -top-16 -left-16 animate-pulse-slow filter blur-sm shadow-orange-glow"></div>
              <div className="absolute w-96 h-96 bg-orange-500 bg-opacity-5 rounded-full -bottom-32 -right-32 animate-pulse-slow delay-500 filter blur-sm shadow-orange-glow"></div>
            </div>
          </section>

          {/* Why Choose Swift90 Section */}
          <section id="why-terraace" className="relative py-16 md:py-24 bg-gray-50 dark:bg-black border-b border-gray-100 dark:border-gray-900 transition-colors duration-500 overflow-hidden">
            {/* Subtle background graphics */}
            <div className="absolute w-40 h-40 bg-orange-200 bg-opacity-5 rounded-full -top-20 -right-20 animate-pulse-slow filter blur-sm"></div>
            <div className="absolute w-60 h-60 bg-orange-300 bg-opacity-5 rounded-lg -bottom-30 -left-30 animate-pulse-slow delay-400 filter blur-sm transform rotate-45"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up">Why Choose Swift90?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="text-left animate-slide-in-left">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 leading-tight">Focus on Your Vision, We Handle the Digital Foundation.</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    In today's fast-paced global market, your online presence is paramount. Swift90 removes the complexities of website management, allowing you to dedicate your invaluable time and resources to core business growth. From design to deployment, security to scaling, we manage every technical detail.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Experience the freedom of a fully managed website that's always up-to-date, secure, and performing at its peak, giving you a distinct advantage and peace of mind.
                  </p>
                </div>
                <div className="flex justify-center animate-fade-in-right">
                  <img
                    src={"https://placehold.co/600x400/E0E0E0/333333?text=Simplified+Online+Presence"}
                    alt="Simplified Online Presence Illustration"
                    className="rounded-lg shadow-sm w-full max-w-md h-auto object-cover border border-gray-200 dark:border-gray-700"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Load+Error'; }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="relative py-16 md:py-24 bg-white dark:bg-black  transition-colors duration-500 overflow-hidden">
            {/* Subtle background graphics */}
            <div className="absolute w-32 h-32 bg-orange-100 bg-opacity-5 rounded-full top-1/4 -left-10 animate-pulse-slow delay-200 filter blur-sm"></div>
            <div className="absolute w-48 h-48 bg-orange-200 bg-opacity-5 rounded-lg bottom-1/3 -right-20 animate-pulse-slow delay-500 filter blur-sm transform skew-y-6"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up">The Swift90 Journey</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-100 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">1</div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Select Your Tier</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Choose the WaaS plan that aligns with your business objectives and budget. Our tiers are designed for growth.</p>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-200 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">2</div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Define Your Vision</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Share your brand identity, content, and specific requirements. Our experts will craft your bespoke online presence.</p>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-300 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">3</div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Launch & Expand</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your meticulously built website goes live, fully optimized and supported, allowing you to focus purely on business expansion.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 md:py-24 bg-gray-50 dark:bg-black border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up">Core Capabilities for Global Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="flex items-start p-6 bg-white dark:bg-black rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-100 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h4l-1-1v-3.25m-1.25 0h-3.5m4.75 0h3.5m-3.5 0v-4.5m-3.5 0v-4.5m4.75 0h3.5m-3.5 0v-4.5m-3.5 0v-4.5m4.75 0h3.5m-3.5 0v-4.5M12 12h.01M12 16h.01M12 8h.01M12 4h.01M12 20h.01M12 24h.01M12 0h.01"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 text-left">Adaptive Design</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Flawless presentation and functionality across all devices, from mobile to desktop, ensuring universal accessibility.</p>
                  </div>
                </div>
                {/* Feature 2 */}
                <div className="flex items-start p-6 bg-white dark:bg-black rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-200 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 text-left">Optimized Performance</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Engineered for exceptional speed and efficiency, delivering rapid loading times and a superior user experience globally.</p>
                  </div>
                </div>
                {/* Feature 3 */}
                <div className="flex items-start p-6 bg-white dark:bg-black rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-300 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-2-6V4m2 11h2m-2 4h2m-6-4h6m-6 0H6a2 2 0 00-2 2v2a2 2 0 002 2h2m0-4h.01M17 12h.01M17 16h.01M17 8h.01M17 4h.01M17 20h.01M17 24h.01M17 0h.01"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 text-left">Integrated SEO</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Built with foundational SEO principles to enhance your visibility and ensure your business is easily discovered online.</p>
                  </div>
                </div>
                {/* Feature 4 */}
                <div className="flex items-start p-6 bg-white dark:bg-black rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-400 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM12 14c-1.657 0-3 .895-3 2v2h6v-2c0-1.105-1.343-2-3-2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 text-left">Robust Security</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Your digital presence is safeguarded with secure, global hosting, automatic backups, and essential SSL encryption.</p>
                  </div>
                </div>
                {/* Feature 5 */}
                <div className="flex items-start p-6 bg-white dark:bg-black rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-500 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2h14zM4 9h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 text-left">Dedicated Support</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Our expert support team is available 24/7 to provide assistance, ensuring your operations run smoothly, worldwide.</p>
                  </div>
                </div>
                {/* Feature 6 */}
                <div className="flex items-start p-6 bg-white dark:bg-black rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-600 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 text-left">Scalable Solutions</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Effortlessly upgrade your plan as your business expands, guaranteeing your website continually meets evolving demands.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="py-16 md:py-24 bg-white dark:bg-black  transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up">Our Showcase</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
                Discover a selection of professional, high-impact websites meticulously crafted by Swift90 for diverse businesses.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-100 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <img
                    src={"https://placehold.co/600x400/E0E0E0/333333?text=Global+E-commerce"}
                    alt="Global E-commerce Website Example"
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Load+Error'; }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Global E-commerce Hub</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">A sophisticated online store designed for seamless international transactions and customer engagement.</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-200 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <img
                    src={"https://placehold.co/600x400/E0E0E0/333333?text=Corporate+Portfolio"}
                    alt="Corporate Portfolio Website Example"
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Load+Error'; }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Professional Corporate Portfolio</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">An elegant showcase for services and achievements, built for credibility and client acquisition.</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-300 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <img
                    src={"https://placehold.co/600x400/E0E0E0/333333?text=Creative+Agency"}
                    alt="Creative Agency Website Example"
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Load+Error'; }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Dynamic Creative Agency Site</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">A vibrant and interactive platform designed to highlight creative work and attract new collaborations.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up">Client Success Stories</h2>
              <div className="relative overflow-hidden group">
                <div className="flex space-x-8 animate-scroll-testimonials">
                  {/* Duplicate testimonials to create a seamless loop */}
                  {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <div key={index} className="flex-shrink-0 w-[320px] bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-800">
                      <p className="text-lg italic text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                      <div className="flex items-center justify-center">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover mr-4 shadow-sm border border-gray-200 dark:border-gray-700"
                          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/CCCCCC/666666?text=${testimonial.name.split(' ').map(n => n[0]).join('')}`; }}
                        />
                        <div className="text-left">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{testimonial.title}, {testimonial.country}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-16 md:py-24 bg-gray-50 dark:bg-black border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100 animate-fade-in-up">Tailored Plans for Every Ambition</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
                Select the ideal plan designed to empower your business, with transparent pricing adjusted for your region.
              </p>

              {/* Conditional rendering for pricing cards based on selectedCountry */}
              {selectedCountry && pricingData[selectedCountry] ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {Object.keys(pricingData[selectedCountry].plans).map((planKey, index) => {
                    const plan = pricingData[selectedCountry].plans[planKey];
                    const currency = pricingData[selectedCountry].currency;
                    return (
                      <div key={planKey} className="bg-white dark:bg-black rounded-lg shadow-sm p-8 flex flex-col items-center border border-gray-200 dark:border-gray-800 transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <h3 className="text-2xl font-bold text-orange-500 mb-4">{plan.name}</h3>
                        <p className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
                          {currency}{plan.price}<span className="text-lg font-medium text-gray-600 dark:text-gray-400">/month</span>
                        </p>
                        <ul className="text-gray-700 dark:text-gray-300 text-left space-y-3 mb-8 w-full max-w-xs">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => startPurchase(planKey)}
                          className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105"
                        >
                          Choose {plan.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-10 bg-white dark:bg-black rounded-lg shadow-sm animate-fade-in border border-gray-200 dark:border-gray-800">
                  <p className="text-xl text-gray-700 dark:text-gray-200 mb-4">Please select your region to view pricing plans.</p>
                  <button
                    onClick={openLocationModal}
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300 shadow-md"
                  >
                    Select Region
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Our Impact in Numbers Section */}
          <section id="impact" className="py-16 md:py-24 bg-white dark:bg-black  transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up">Our Impact in Numbers</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-800 transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-100">
                  <p className="text-5xl font-extrabold text-orange-500 mb-4">500+</p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Websites Launched</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">Empowering businesses globally.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-800 transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-200">
                  <p className="text-5xl font-extrabold text-orange-500 mb-4">98%</p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Client Satisfaction</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">Our commitment to excellence.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-800 transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-300">
                  <p className="text-5xl font-extrabold text-orange-500 mb-4">24/7</p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Dedicated Support</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">Always here to assist you.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Technology Stack Section */}
          <section id="tech-stack" className="py-16 md:py-24 bg-gray-50 dark:bg-black border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up">Built with Modern Technologies</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
                We leverage cutting-edge tools and frameworks to ensure your website is fast, secure, and scalable.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
                <div className="flex flex-col items-center p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transform hover:scale-[1.05] transition duration-300 animate-fade-in-up delay-100">
                  <img
                    src={"https://placehold.co/80x80/E0E0E0/333333?text=React"} alt="React Logo" className="h-16 mb-2" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/E0E0E0/333333?text=React'; }}/>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">React</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transform hover:scale-[1.05] transition duration-300 animate-fade-in-up delay-200">
                  <img
                    src={"https://placehold.co/80x80/E0E0E0/333333?text=Node.js"} alt="Node.js Logo" className="h-16 mb-2" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/E0E0E0/333333?text=Node'; }}/>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Node.js</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transform hover:scale-[1.05] transition duration-300 animate-fade-in-up delay-300">
                  <img
                    src={"https://placehold.co/80x80/E0E0E0/333333?text=Cloud+Hosting"} alt="Cloud Hosting Logo" className="h-16 mb-2" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/E0E0E0/333333?text=Cloud'; }}/>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Cloud Hosting</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white dark:bg-black rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transform hover:scale-[1.05] transition duration-300 animate-fade-in-up delay-400">
                  <img
                    src={"https://placehold.co/80x80/E0E0E0/333333?text=Tailwind+CSS"} alt="Tailwind CSS Logo" className="h-16 mb-2" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/E0E0E0/333333?text=Tailwind'; }}/>
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tailwind CSS</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-16 md:py-24 bg-gray-50 dark:bg-black transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 py-4 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <button
                      className="flex justify-between items-center w-full text-left focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">{faq.question}</span>
                      <svg
                        className={`w-6 h-6 text-orange-500 transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {openFAQ === index && (
                      <p className="mt-4 text-gray-700 dark:text-gray-300 text-left animate-fade-in">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Us Section */}
          <section id="contact-us" className="py-16 md:py-24 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-900 dark:text-gray-100 animate-fade-in-up">Get in Touch</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
                Have questions or ready to embark on your Swift90 journey? Our team is here to provide personalized assistance.
              </p>
              <div className="max-w-xl mx-auto bg-gray-50 dark:bg-gray-950 p-8 rounded-lg shadow-sm animate-fade-in-up border border-gray-200 dark:border-gray-800">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                      placeholder="your@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                      placeholder="Tell us about your needs..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-16 md:py-24 bg-orange-600 text-white text-center transition-colors duration-500">
            <div className="container mx-auto px-6 animate-fade-in-up">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Elevate Your Online Presence?</h2>
              <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto opacity-90">
                Join thousands of businesses worldwide thriving with Swift90. Get started today and experience the difference.
              </p>
              <a href="#pricing" className="bg-white text-orange-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-md transform hover:scale-105">
                Get Your Swift90 Website
              </a>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="bg-white dark:bg-black  text-gray-300 dark:text-gray-400 py-10 px-6 md:px-12 transition-colors duration-500">
            <div className="container mx-auto text-center">
              <div className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-500">Swift90</div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">&copy; {new Date().getFullYear()} Swift90. All rights reserved.</p>
              <div className="flex justify-center space-x-6 flex-wrap">
                <a href="#" className="hover:text-orange-300 dark:hover:text-orange-300 text-gray-700 dark:text-gray-300 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-orange-300 dark:hover:text-orange-300 text-gray-700 dark:text-gray-300 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-orange-300 dark:hover:text-orange-300 text-gray-700 dark:text-gray-300 transition-colors duration-300">Support</a>
                <button onClick={openLocationModal} className="text-orange-400 dark:text-orange-500 hover:text-white dark:hover:text-orange-300 transition-colors duration-300 ml-0 md:ml-6 mt-2 md:mt-0">Change Region</button>
              </div>
            </div>
          </footer>

          {/* Tailwind CSS Custom Animations (added for this immersive) */}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes slideInLeft {
              from { opacity: 0; transform: translateX(-20px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes pulseSlow {
              0%, 100% { transform: scale(1); opacity: 0.05; } /* Reduced opacity for subtlety */
              50% { transform: scale(1.05); opacity: 0.08; } /* Reduced opacity for subtlety */
            }
            @keyframes bounceOnce {
              0%, 100% { transform: translateY(0); }
              20% { transform: translateY(-10px); }
              40% { transform: translateY(0); }
            }
            @keyframes moveGradient {
              0% { background-position: 0% 0%; }
              100% { background-position: 100% 100%; }
            }
            @keyframes scrollTestimonials {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); } /* Scrolls half the duplicated content */
            }

            .animate-fade-in {
              animation: fadeIn 0.6s ease-out forwards;
            }
            .animate-fade-in-up {
              animation: fadeInUp 0.7s ease-out forwards;
            }
            .animate-slide-in-left {
              animation: slideInLeft 0.8s ease-out forwards;
            }
            .animate-pulse-slow {
              animation: pulseSlow 4s infinite ease-in-out;
            }
            .animate-bounce-once {
              animation: bounceOnce 1s ease-out 1; /* Runs only once */
            }
            .animate-scroll-testimonials {
              animation: scrollTestimonials 60s linear infinite; /* Adjust time for speed */
            }
            .group:hover .animate-scroll-testimonials {
              animation-play-state: paused;
            }

            /* Custom glow for orange shapes */
            .shadow-orange-glow {
              box-shadow: 0 0 15px rgba(255, 165, 0, 0.5), 0 0 30px rgba(255, 165, 0, 0.3); /* Orange glow */
            }
            /* Delay utility classes */
            .delay-100 { animation-delay: 0.1s; }
            .delay-200 { animation-delay: 0.2s; }
            .delay-300 { animation-delay: 0.3s; }
            .delay-400 { animation-delay: 0.4s; }
            .delay-500 { animation-delay: 0.5s; }
            .delay-600 { animation-delay: 0.6s; }
          `}</style>
        </div>
      );
  }
}

// Purchase Page Component
function PurchasePage({ purchaseDetails, setPurchaseDetails, setCurrentPage, darkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen, selectedCountry, pricingData }) {
  const [websiteType, setWebsiteType] = useState(purchaseDetails.websiteType);
  const [assets, setAssets] = useState(purchaseDetails.assets);
  const [requirements, setRequirements] = useState(purchaseDetails.requirements);
  const [numProducts, setNumProducts] = useState(purchaseDetails.numProducts);
  const [paymentGateways, setPaymentGateways] = useState(purchaseDetails.paymentGateways);
  const [numBlogPosts, setNumBlogPosts] = useState(purchaseDetails.numBlogPosts);
  const [commentSystem, setCommentSystem] = useState(purchaseDetails.commentSystem);
  const [numPages, setNumPages] = useState(purchaseDetails.numPages);
  const [serviceCategories, setServiceCategories] = useState(purchaseDetails.serviceCategories);
  const [numProjects, setNumProjects] = useState(purchaseDetails.numProjects);
  const [additionalFeatures, setAdditionalFeatures] = useState(purchaseDetails.additionalFeatures);

  // Calculate dynamic price
  const baseAmount = purchaseDetails.plan ? purchaseDetails.plan.price : 0;
  const addOnCostPerItem = baseAmount * 0.20; // 20% of base plan price per add-on
  const totalAddOnCost = additionalFeatures.length * addOnCostPerItem;
  const totalAmount = baseAmount + totalAddOnCost;
  const currency = pricingData[selectedCountry]?.currency || '$';

  const handleAssetChange = (e) => {
    const { value, checked } = e.target;
    setAssets(prev =>
      checked ? [...prev, value] : prev.filter(asset => asset !== value)
    );
  };

  const handlePaymentGatewayChange = (e) => {
    const { value, checked } = e.target;
    setPaymentGateways(prev =>
      checked ? [...prev, value] : prev.filter(gateway => gateway !== value)
    );
  };

  const handleAdditionalFeatureChange = (e) => {
    const { value, checked } = e.target;
    setAdditionalFeatures(prev =>
      checked ? [...prev, value] : prev.filter(feature => feature !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPurchaseDetails(prev => ({
      ...prev,
      websiteType,
      assets,
      requirements,
      numProducts,
      paymentGateways,
      numBlogPosts,
      commentSystem,
      numPages,
      serviceCategories,
      numProjects,
      additionalFeatures,
    }));
    setCurrentPage('payment');
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-black font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
      <header className="bg-white dark:bg-black shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-30 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Hamburger Icon */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="text-2xl font-bold text-orange-500 rounded-lg p-2 transition-colors duration-500">
            Swift90
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              {darkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.996 5.996 0 01-5.65-5.65c-.44-.06-.9-.1-1.36-.1z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 18.894a.75.75 0 10-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.59-1.59zm-10.606 0a.75.75 0 10-1.06 1.06l-1.59 1.59a.75.75 0 001.06 1.06l1.59-1.59zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM4.343 5.757a.75.75 0 011.06-1.06l1.59 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59z"></path>
                </svg>
              )}
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <a href="#why-terraace" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Why Swift90?</a>
            <a href="#how-it-works" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">How it Works</a>
            <a href="#features" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Features</a>
            <a href="#portfolio" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Portfolio</a>
            <a href="#testimonials" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Testimonials</a>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Pricing</a>
            <a href="#faq" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">FAQ</a>
            <a href="#contact-us" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Contact</a>
            <button onClick={() => { setCurrentPage('blog'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300 bg-transparent border-none p-0 cursor-pointer">Blog</button>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="bg-orange-500 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
              Get Started
            </a>
          </div>
        )}
      </header>

      <div className="container mx-auto mt-24 max-w-2xl bg-white dark:bg-black p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Purchase Details for {purchaseDetails.plan?.name} Plan
        </h2>

        {/* Dynamic Price Display */}
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-6 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-lg text-gray-700 dark:text-gray-300">Base Monthly Price:</p>
          <p className="text-3xl font-extrabold text-orange-500 mb-2">
            {currency}{baseAmount.toFixed(2)}
          </p>
          {additionalFeatures.length > 0 && (
            <>
              <p className="text-md text-gray-600 dark:text-gray-400">
                Add-ons ({additionalFeatures.length} selected): +{currency}{totalAddOnCost.toFixed(2)}
              </p>
            </>
          )}
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">
            Total Estimated Monthly Cost: {currency}{totalAmount.toFixed(2)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type of Website
            </label>
            <div className="flex flex-wrap gap-4">
              {['E-commerce', 'Portfolio', 'Corporate', 'Blog', 'Service'].map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="websiteType"
                    value={type}
                    checked={websiteType === type}
                    onChange={(e) => setWebsiteType(e.target.value)}
                    className="form-radio h-5 w-5 text-orange-500 transition-colors duration-300"
                  />
                  <span className="text-gray-900 dark:text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Fields based on Website Type */}
          {websiteType === 'E-commerce' && (
            <>
              <div>
                <label htmlFor="numProducts" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Number of Products
                </label>
                <input
                  type="number"
                  id="numProducts"
                  value={numProducts}
                  onChange={(e) => setNumProducts(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                  placeholder="e.g., 100"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Payment Gateways
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Stripe', 'PayPal', 'Paystack', 'Flutterwave', 'Other'].map(gateway => (
                    <label key={gateway} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        value={gateway}
                        checked={paymentGateways.includes(gateway)}
                        onChange={handlePaymentGatewayChange}
                        className="form-checkbox h-5 w-5 text-orange-500 rounded transition-colors duration-300"
                      />
                      <span className="text-gray-900 dark:text-gray-300">{gateway}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {websiteType === 'Blog' && (
            <>
              <div>
                <label htmlFor="numBlogPosts" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Number of Blog Posts (initial)
                </label>
                <input
                  type="number"
                  id="numBlogPosts"
                  value={numBlogPosts}
                  onChange={(e) => setNumBlogPosts(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                  placeholder="e.g., 20"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Comment System
                </label>
                <div className="flex flex-wrap gap-4">
                  {['Native (Built-in)', 'Disqus', 'Facebook Comments', 'None'].map(system => (
                    <label key={system} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="commentSystem"
                        value={system}
                        checked={commentSystem === system}
                        onChange={(e) => setCommentSystem(e.target.value)}
                        className="form-radio h-5 w-5 text-orange-500 transition-colors duration-300"
                      />
                      <span className="text-gray-900 dark:text-gray-300">{system}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {(websiteType === 'Corporate' || websiteType === 'Service') && (
            <>
              <div>
                <label htmlFor="numPages" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Number of Pages
                </label>
                <input
                  type="number"
                  id="numPages"
                  value={numPages}
                  onChange={(e) => setNumPages(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                  placeholder="e.g., 5-10"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="serviceCategories" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Key Service Categories (comma-separated)
                </label>
                <input
                  type="text"
                  id="serviceCategories"
                  value={serviceCategories}
                  onChange={(e) => setServiceCategories(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                  placeholder="e.g., Marketing, Consulting, IT Support"
                />
              </div>
            </>
          )}

          {websiteType === 'Portfolio' && (
            <div>
              <label htmlFor="numProjects" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estimated Number of Projects/Items
              </label>
              <input
                type="number"
                id="numProjects"
                value={numProjects}
                onChange={(e) => setNumProjects(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                placeholder="e.g., 15"
                min="0"
              />
            </div>
          )}

          {/* General Assets */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Website Assets You'll Provide
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Logo', 'Images', 'Text Content', 'Videos', 'Product Data', 'Branding Guidelines'].map(asset => (
                <label key={asset} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={asset}
                    checked={assets.includes(asset)}
                    onChange={handleAssetChange}
                    className="form-checkbox h-5 w-5 text-orange-500 rounded transition-colors duration-300"
                  />
                  <span className="text-gray-900 dark:text-gray-300">{asset}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Service Add-ons & Enhancements */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Service Add-ons & Enhancements (each adds {currency}{addOnCostPerItem.toFixed(2)}/month)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Advanced SEO Package', 'Content Writing Service', 'Premium Theme Customization', 'Monthly Maintenance Plan', 'Booking System Integration', 'Multilingual Support'].map(feature => (
                <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={feature}
                    checked={additionalFeatures.includes(feature)}
                    onChange={handleAdditionalFeatureChange}
                    className="form-checkbox h-5 w-5 text-orange-500 rounded transition-colors duration-300"
                  />
                  <span className="text-gray-900 dark:text-gray-300">{feature}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="requirements" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Specific Requirements / Notes
            </label>
            <textarea
              id="requirements"
              rows="5"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
              placeholder="e.g., specific color scheme, integration needs, desired functionalities..."
            ></textarea>
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="px-6 py-2 rounded-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Payment Page Component
function PaymentPage({ purchaseDetails, setPurchaseDetails, setCurrentPage, darkMode, toggleDarkMode, selectedCountry, pricingData, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const plan = purchaseDetails.plan;
  const currency = pricingData[selectedCountry]?.currency || '$';
  const baseAmount = plan ? plan.price : 0;
  const addOnCostPerItem = baseAmount * 0.20; // 20% of base plan price per add-on
  const totalAddOnCost = purchaseDetails.additionalFeatures.length * addOnCostPerItem;
  const totalAmount = baseAmount + totalAddOnCost;

  const [loadingPayment, setLoadingPayment] = useState(false);

  // Load Paystack script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePaystackPayment = () => {
    setLoadingPayment(true);
    // Simulate Paystack payment
    // In a real app, you would initialize PaystackPop here with your public key
    // and handle success/failure callbacks.
    // Example:
    // const handler = PaystackPop.setup({
    //   key: 'YOUR_PAYSTACK_PUBLIC_KEY', // Replace with your actual public key
    //   email: 'customer@example.com', // Replace with actual customer email
    //   amount: totalAmount * 100, // Amount in kobo/cents
    //   currency: currency === '₦' ? 'NGN' : (currency === '$' ? 'USD' : 'GBP'), // Map currency to Paystack codes
    //   ref: '' + Math.floor((Math.random() * 1000000000) + 1), // unique ref for each transaction
    //   callback: function(response){
    //     // Payment successful! Verify on your backend.
    //     setPurchaseDetails(prev => ({ ...prev, paymentStatus: 'successful' }));
    //     setCurrentPage('checkout');
    //   },
    //   onClose: function(){
    //     // User closed the modal
    //     setPurchaseDetails(prev => ({ ...prev, paymentStatus: 'failed' }));
    //     setLoadingPayment(false);
    //     alert('Payment cancelled.'); // Replace with custom message box
    //   }
    // });
    // handler.openIframe();

    // Simulating successful payment after 2 seconds
    setTimeout(() => {
      setPurchaseDetails(prev => ({ ...prev, paymentStatus: 'successful' }));
      setLoadingPayment(false);
      setCurrentPage('checkout');
    }, 2000);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-black font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
      <header className="bg-white dark:bg-black shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-30 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Hamburger Icon */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="text-2xl font-bold text-orange-500 rounded-lg p-2 transition-colors duration-500">
            Swift90
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              {darkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.996 5.996 0 01-5.65-5.65c-.44-.06-.9-.1-1.36-.1z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 18.894a.75.75 0 10-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.59-1.59zm-10.606 0a.75.75 0 10-1.06 1.06l-1.59 1.59a.75.75 0 001.06 1.06l1.59-1.59zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM4.343 5.757a.75.75 0 011.06-1.06l1.59 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59z"></path>
                </svg>
              )}
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <a href="#why-terraace" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Why Swift90?</a>
            <a href="#how-it-works" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">How it Works</a>
            <a href="#features" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Features</a>
            <a href="#portfolio" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Portfolio</a>
            <a href="#testimonials" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Testimonials</a>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Pricing</a>
            <a href="#faq" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">FAQ</a>
            <a href="#contact-us" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Contact</a>
            <button onClick={() => { setCurrentPage('blog'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300 bg-transparent border-none p-0 cursor-pointer">Blog</button>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="bg-orange-500 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
              Get Started
            </a>
          </div>
        )}
      </header>

      <div className="container mx-auto mt-24 max-w-2xl bg-white dark:bg-black p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Confirm Your Order & Pay
        </h2>
        <div className="space-y-4 mb-8">
          <p className="text-lg text-gray-900 dark:text-gray-200">
            <span className="font-semibold">Plan:</span> {plan?.name}
          </p>
          <p className="text-lg text-gray-900 dark:text-gray-200">
            <span className="font-semibold">Base Price:</span> {currency}{baseAmount.toFixed(2)}/month
          </p>
          {purchaseDetails.websiteType && (
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Website Type:</span> {purchaseDetails.websiteType}
            </p>
          )}
          {purchaseDetails.websiteType === 'E-commerce' && (
            <>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Est. Products:</span> {purchaseDetails.numProducts || 'N/A'}
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Payment Gateways:</span> {purchaseDetails.paymentGateways.length > 0 ? purchaseDetails.paymentGateways.join(', ') : 'N/A'}
              </p>
            </>
          )}
          {purchaseDetails.websiteType === 'Blog' && (
            <>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Est. Blog Posts:</span> {purchaseDetails.numBlogPosts || 'N/A'}
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Comment System:</span> {purchaseDetails.commentSystem || 'N/A'}
              </p>
            </>
          )}
          {(purchaseDetails.websiteType === 'Corporate' || purchaseDetails.websiteType === 'Service') && (
            <>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Est. Pages:</span> {purchaseDetails.numPages || 'N/A'}
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Service Categories:</span> {purchaseDetails.serviceCategories || 'N/A'}
              </p>
            </>
          )}
          {purchaseDetails.websiteType === 'Portfolio' && (
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Est. Projects/Items:</span> {purchaseDetails.numProjects || 'N/A'}
            </p>
          )}
          {purchaseDetails.assets.length > 0 && (
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Assets Provided:</span> {purchaseDetails.assets.join(', ')}
            </p>
          )}
          {purchaseDetails.requirements && (
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Requirements:</span> {purchaseDetails.requirements}
            </p>
          )}

          {purchaseDetails.additionalFeatures.length > 0 && (
            <>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Selected Add-ons:</span>
              </p>
              <ul className="list-disc list-inside ml-4 text-gray-900 dark:text-gray-200">
                {purchaseDetails.additionalFeatures.map((feature, index) => (
                  <li key={index}>{feature} (+{currency}{addOnCostPerItem.toFixed(2)})</li>
                ))}
              </ul>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Total Add-on Cost:</span> {totalAddOnCost.toFixed(2)}
              </p>
            </>
          )}

          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6">
            Total: {currency}{totalAmount.toFixed(2)}/month
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handlePaystackPayment}
            className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
            disabled={loadingPayment}
          >
            {loadingPayment ? 'Processing Payment...' : 'Pay with Paystack'}
          </button>
          {loadingPayment && (
            <p className="text-gray-700 dark:text-gray-300">Please wait, do not close this page...</p>
          )}
          <button
            type="button"
            onClick={() => setCurrentPage('purchase')}
            className="px-6 py-2 rounded-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 w-full md:w-auto"
            disabled={loadingPayment}
          >
            Back to Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Checkout Page Component
function CheckoutPage({ purchaseDetails, setCurrentPage, darkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { plan, websiteType, assets, requirements, numProducts, paymentGateways, numBlogPosts, commentSystem, numPages, serviceCategories, numProjects, additionalFeatures, paymentStatus } = purchaseDetails;

  // Recalculate total for display consistency
  const baseAmount = plan ? plan.price : 0;
  const addOnCostPerItem = baseAmount * 0.20;
  const totalAddOnCost = additionalFeatures.length * addOnCostPerItem;
  const totalAmount = baseAmount + totalAddOnCost;

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-black font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
      <header className="bg-white dark:bg-black shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-30 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Hamburger Icon */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="text-2xl font-bold text-orange-500 rounded-lg p-2 transition-colors duration-500">
            Swift90
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              {darkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.996 5.996 0 01-5.65-5.65c-.44-.06-.9-.1-1.36-.1z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 18.894a.75.75 0 10-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.59-1.59zm-10.606 0a.75.75 0 10-1.06 1.06l-1.59 1.59a.75.75 0 001.06 1.06l1.59-1.59zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM4.343 5.757a.75.75 0 011.06-1.06l1.59 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59z"></path>
                </svg>
              )}
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <a href="#why-terraace" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Why Swift90?</a>
            <a href="#how-it-works" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">How it Works</a>
            <a href="#features" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Features</a>
            <a href="#portfolio" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Portfolio</a>
            <a href="#testimonials" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Testimonials</a>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Pricing</a>
            <a href="#faq" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">FAQ</a>
            <a href="#contact-us" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Contact</a>
            <button onClick={() => { setCurrentPage('blog'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300 bg-transparent border-none p-0 cursor-pointer">Blog</button>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="bg-orange-500 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
              Get Started
            </a>
          </div>
        )}
      </header>

      <div className="container mx-auto mt-24 max-w-2xl bg-white dark:bg-black p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Order Confirmation
        </h2>
        {paymentStatus === 'successful' ? (
          <>
            <div className="text-green-500 text-6xl mb-4">
              &#10003; {/* Checkmark icon */}
            </div>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
              Payment Successful!
            </p>
            <p className="text-lg text-gray-900 dark:text-gray-200 mb-8">
              Thank you for choosing Swift90. Your order has been confirmed.
              We will be in touch shortly to begin crafting your website.
            </p>
          </>
        ) : (
          <>
            <div className="text-red-500 text-6xl mb-4">
              &#x2717; {/* X icon */}
            </div>
            <p className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-4">
              Payment Failed
            </p>
            <p className="text-lg text-gray-900 dark:text-gray-200 mb-8">
              There was an issue processing your payment. Please try again or contact support.
            </p>
          </>
        )}

        <div className="text-left space-y-3 mb-8 bg-gray-50 dark:bg-gray-950 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-900 dark:text-gray-200">
            <span className="font-semibold">Plan:</span> {plan?.name}
          </p>
          <p className="text-lg text-gray-900 dark:text-gray-200">
            <span className="font-semibold">Base Price:</span> {baseAmount.toFixed(2)}/month
          </p>
          {websiteType && (
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Website Type:</span> {websiteType}
            </p>
          )}
          {websiteType === 'E-commerce' && (
            <>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Est. Products:</span> {numProducts || 'N/A'}
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Payment Gateways:</span> {paymentGateways.length > 0 ? paymentGateways.join(', ') : 'N/A'}
              </p>
            </>
          )}
          {websiteType === 'Blog' && (
            <>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Est. Blog Posts:</span> {numBlogPosts || 'N/A'}
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Comment System:</span> {commentSystem || 'N/A'}
              </p>
            </>
          )}
          {(websiteType === 'Corporate' || websiteType === 'Service') && (
            <>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Est. Pages:</span> {numPages || 'N/A'}
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Service Categories:</span> {serviceCategories || 'N/A'}
              </p>
            </>
          )}
          {websiteType === 'Portfolio' && (
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Est. Projects/Items:</span> {numProjects || 'N/A'}
            </p>
          )}
          {assets.length > 0 && (
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Assets Provided:</span> {assets.join(', ')}
            </p>
          )}
          {requirements && (
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Requirements:</span> {requirements}
            </p>
          )}

          {additionalFeatures.length > 0 && (
            <>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Selected Add-ons:</span>
              </p>
              <ul className="list-disc list-inside ml-4 text-gray-900 dark:text-gray-200">
                {additionalFeatures.map((feature, index) => (
                  <li key={index}>{feature} (+{addOnCostPerItem.toFixed(2)})</li>
                ))}
              </ul>
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Total Add-on Cost:</span> {totalAddOnCost.toFixed(2)}
              </p>
            </>
          )}

          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-6">
            Final Total: {totalAmount.toFixed(2)}/month
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('home')}
          className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

// Blog Page Component
function BlogPage({ blogPosts, setSelectedBlogPost, setCurrentPage, darkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const handleReadMore = (post) => {
    setSelectedBlogPost(post);
    setCurrentPage('blogPost');
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-black font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
      <header className="bg-white dark:bg-black shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-30 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Hamburger Icon */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="text-2xl font-bold text-orange-500 rounded-lg p-2 transition-colors duration-500">
            Swift90
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              {darkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.996 5.996 0 01-5.65-5.65c-.44-.06-.9-.1-1.36-.1z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 18.894a.75.75 0 10-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.59-1.59zm-10.606 0a.75.75 0 10-1.06 1.06l-1.59 1.59a.75.75 0 001.06 1.06l1.59-1.59zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM4.343 5.757a.75.75 0 011.06-1.06l1.59 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59z"></path>
                </svg>
              )}
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <a href="#why-terraace" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Why Swift90?</a>
            <a href="#how-it-works" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">How it Works</a>
            <a href="#features" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Features</a>
            <a href="#portfolio" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Portfolio</a>
            <a href="#testimonials" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Testimonials</a>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Pricing</a>
            <a href="#faq" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">FAQ</a>
            <a href="#contact-us" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Contact</a>
            <button onClick={() => { setCurrentPage('blog'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300 bg-transparent border-none p-0 cursor-pointer">Blog</button>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="bg-orange-500 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
              Get Started
            </a>
          </div>
        )}
      </header>

      <div className="container mx-auto mt-24 max-w-4xl bg-white dark:bg-black p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Our Blog & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-gray-50 dark:bg-gray-950 rounded-lg shadow-sm p-6 transform hover:scale-[1.02] hover:shadow-md transition duration-300 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{post.date}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
              <button
                onClick={() => handleReadMore(post)}
                className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300"
              >
                Read More &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Blog Post Page Component
function BlogPostPage({ post, setCurrentPage, darkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen }) {
  if (!post) {
    return (
      <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-black font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6 flex items-center justify-center`}>
        <p className="text-xl">Blog post not found.</p>
        <button
          onClick={() => setCurrentPage('blog')}
          className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300 shadow-md ml-4"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-black font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
      <header className="bg-white dark:bg-black shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-30 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Hamburger Icon */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="text-2xl font-bold text-orange-500 rounded-lg p-2 transition-colors duration-500">
            Swift90
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              {darkMode ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.996 5.996 0 01-5.65-5.65c-.44-.06-.9-.1-1.36-.1z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 18.894a.75.75 0 10-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.59-1.59zm-10.606 0a.75.75 0 10-1.06 1.06l-1.59 1.59a.75.75 0 001.06 1.06l1.59-1.59zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM4.343 5.757a.75.75 0 011.06-1.06l1.59 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59z"></path>
                </svg>
              )}
            </button>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white dark:bg-black bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <a href="#why-terraace" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Why Swift90?</a>
            <a href="#how-it-works" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">How it Works</a>
            <a href="#features" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Features</a>
            <a href="#portfolio" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Portfolio</a>
            <a href="#testimonials" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Testimonials</a>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Pricing</a>
            <a href="#faq" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">FAQ</a>
            <a href="#contact-us" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300">Contact</a>
            <button onClick={() => { setCurrentPage('blog'); setIsMobileMenuOpen(false); }} className="text-gray-900 dark:text-gray-100 text-2xl font-semibold hover:text-orange-500 transition-colors duration-300 bg-transparent border-none p-0 cursor-pointer">Blog</button>
            <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="bg-orange-500 text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
              Get Started
            </a>
          </div>
        )}
      </header>

      <div className="container mx-auto mt-24 max-w-4xl bg-white dark:bg-black p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500">
        <button
          onClick={() => setCurrentPage('blog')}
          className="mb-6 inline-flex items-center text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300"
        >
          &larr; Back to Blog
        </button>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{post.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{post.date}</p>
        <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}

export default App;
