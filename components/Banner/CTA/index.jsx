import React, { useState, useEffect, useRef } from 'react';

// Intro Animation Component
function IntroAnimation({ onAnimationEnd }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const animationEndTimer = setTimeout(() => {
      onAnimationEnd();
    }, 2500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(animationEndTimer);
    };
  }, [onAnimationEnd]);

  return (
    <div className={`fixed inset-0 bg-white dark:bg-[#1F1A2A] flex items-center justify-center z-[9999] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <h1 className="text-2xl md:text-6xl font-extrabold text-[#1F1A2A] dark:text-[#CAC4D0] animate-slide-in-left-intro">
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

// Custom Message Box Component (Replaces alert())
const MessageBox = ({ message, type, onClose }) => {
  let bgColor = '';
  let textColor = '';
  let icon = '';

  switch (type) {
    case 'success':
      bgColor = 'bg-green-100 dark:bg-green-900';
      textColor = 'text-green-800 dark:text-green-200';
      icon = (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      );
      break;
    case 'error':
      bgColor = 'bg-red-100 dark:bg-red-900';
      textColor = 'text-red-800 dark:text-red-200';
      icon = (
        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 12a9 9 0 0118 0z"></path>
        </svg>
      );
      break;
    case 'info':
    default:
      bgColor = 'bg-blue-100 dark:bg-blue-900';
      textColor = 'text-blue-800 dark:text-blue-200';
      icon = (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      );
      break;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]">
      <div className={`p-6 rounded-lg shadow-xl max-w-sm w-full text-center ${bgColor} ${textColor}`}>
        <div className="flex justify-center mb-4">{icon}</div>
        <p className="text-lg font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};


// Main App Component
function App() {
  // Global States
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Controls the hamburger menu overlay
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  // 'home', 'purchase', 'payment', 'checkout', 'blog', 'blogPost'
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
    paymentStatus: 'pending', // 'pending', 'successful', 'failed', 'requested'
  });
  const [selectedBlogPost, setSelectedBlogPost] = useState(null); // State to hold data for the currently viewed blog post
  const [showIntro, setShowIntro] = useState(true);
  // State to control intro animation

  // Hero Section Image Carousel States
  const heroImages = [
    "https://images.pexels.com/photos/9436715/pexels-photo-9436715.jpeg", // Original image
    "https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg",
    "https://images.pexels.com/photos/776655/pexels-photo-776655.jpeg",
    "https://images.pexels.com/photos/2792258/pexels-photo-2792258.jpeg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // isFadingOut controls the opacity of the current image layer (fades out)
  // The next image layer's opacity will be the inverse (fades in)
  const [isFadingOut, setIsFadingOut] = useState(false);
  // Effect for Hero Section Image Carousel
  useEffect(() => {
    // Set an interval to change the image every 30 seconds
    const interval = setInterval(() => {
      setIsFadingOut(true); // Start fading out the current image

      // After the fade-out transition duration (1 second), update the image index
      // and reset the fading state to prepare for the next fade-in
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setIsFadingOut(false); // New image becomes current, reset fade state
      }, 1000); // This duration should match the CSS transition duration for opacity
    }, 30000); // Total time per image (29 seconds static display + 1 second fade)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [heroImages.length]);
  // Re-run effect if the number of hero images changes


  // Dummy pricing data - Added currencyCode for Paystack
  const pricingData = {
    "USA": {
      currency: '$',
      currencyCode: 'USD', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 29, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 79, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 199, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Nigeria": {
      currency: '₦',
      currencyCode: 'NGN', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 5000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 40000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 100000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "UK": {
      currency: '£',
      currencyCode: 'GBP', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 25, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 65, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 170, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Canada": {
      currency: 'C$',
      currencyCode: 'CAD', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 35, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 89, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 220, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Australia": {
      currency: 'A$',
      currencyCode: 'AUD', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 39, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 99, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 250, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Germany": {
      currency: '€',
      currencyCode: 'EUR', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 27, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 75, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 180, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "France": {
      currency: '€',
      currencyCode: 'EUR', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 27, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 75, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 180, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "India": {
      currency: '₹',
      currencyCode: 'INR', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 2000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 5500, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 15000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Brazil": {
      currency: 'R$',
      currencyCode: 'BRL', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 120, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 350, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 900, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "South Africa": {
      currency: 'R',
      currencyCode: 'ZAR', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 450, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 1200, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 3000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Japan": {
      currency: '¥',
      currencyCode: 'JPY', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 3500, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 9500, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 25000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Mexico": {
      currency: 'MX$',
      currencyCode: 'MXN', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 500, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'] },
        pro: { name: 'Pro', price: 1500, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'] },
        enterprise: { name: 'Enterprise', price: 4000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'] },
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
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
  }, [showIntro]);
  // Depend on showIntro

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
      answer: "We know your time is precious. Our streamlined process gets your basic website live within 3-5 business days, so you can start connecting with customers and generating leads faster."
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
      title: 'Unlock Your Future: Why WaaS is the Smart Choice for Your Business',
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
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
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
          <header className="bg-white dark:bg-[#1F1A2A] shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-50 transition-colors duration-500"> {/* Increased z-index to 50 */}
            <nav className="container mx-auto flex justify-between items-center">
              {/* Mobile Menu Button (Hamburger Icon) - Always visible */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#1F1A2A] dark:text-[#CAC4D0] focus:outline-none hover:text-orange-500 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
              <div className="text-2xl font-bold text-[#1F1A2A] dark:text-[#CAC4D0] rounded-lg p-2 transition-colors duration-500">
                Swift90
              </div>
              <div className="flex items-center space-x-4">
                {/* Desktop Menu - visible on medium screens and up */}
                <div className="hidden md:flex items-center space-x-6">
                  {/* Removed navigation links */}
                </div>
                <button onClick={toggleDarkMode} className="text-[#1F1A2A] dark:text-[#CAC4D0] focus:outline-none hover:text-orange-500 transition-colors duration-300">
                  {darkMode ?
                    (
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
              <div className="fixed inset-0 bg-white dark:bg-[#1F1A2A] bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
                <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-gray-700 dark:text-[#CAC4D0] focus:outline-none hover:text-orange-500 transition-colors duration-300">
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
            className="relative pt-24 pb-16 md:pt-36 md:pb-28 md:mt-20 text-gray-900 dark:text-[#CAC4D0] overflow-hidden"
          >
            {/* Background Image Layer 1 (Current Image - fades out) */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-0`}
              style={{
                backgroundImage: `url('${heroImages[currentImageIndex]}')`,
                opacity: isFadingOut ? 0 : 1, // Current image fades out when isFadingOut is true
              }}
            ></div>
            {/* Background Image Layer 2 (Next Image - fades in) */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 z-0`}
              style={{
                backgroundImage: `url('${heroImages[(currentImageIndex + 1) % heroImages.length]}')`,
                opacity: isFadingOut ? 1 : 0, // Next image fades in when isFadingOut is true
              }}
            ></div>

            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>


            {/* Additional subtle graphic elements (now on top of the overlay) */}
            <div className="absolute w-48 h-48 bg-orange-500 bg-opacity-5 rounded-full -top-10 left-1/4 animate-pulse-slow filter blur-sm shadow-orange-glow transform rotate-12 z-20"></div>
            <div className="absolute w-32 h-32 bg-orange-400 bg-opacity-5 rounded-lg -bottom-10 right-1/3 animate-pulse-slow delay-300 filter blur-sm shadow-orange-glow transform skew-x-6 z-20"></div>
            <div className="absolute w-24 h-24 bg-orange-600 bg-opacity-5 rounded-full top-1/3 -right-10 animate-pulse-slow delay-600 filter blur-sm shadow-orange-glow z-20"></div>
            <div className="absolute w-40 h-40 bg-orange-300 bg-opacity-5 rounded-full bottom-1/4 -left-10 animate-pulse-slow delay-900 filter blur-sm shadow-orange-glow transform rotate-45 z-20"></div>

            <div className="container mx-auto text-center px-6 animate-fade-in-up relative z-30"> {/* Increased z-index for text */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 animate-slide-in-left tracking-tight text-[#CAC4D0]">
                Tired of Website Headaches? <br className="hidden sm:inline" /> We Build Your Online Success, So You Don't Have To.
              </h1>
              <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto text-gray-200 animate-fade-in leading-relaxed">
                We transform your digital dreams into thriving online realities, handling every technical detail so you can focus on what truly matters: your business growth.
              </p>
              <a href="#pricing" className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105 animate-bounce-once">
                Start Your Transformation
              </a>

              {/* Four Selling Points Squares */}
              <div className="mt-16 flex flex-wrap md:flex-nowrap justify-center gap-6 md:gap-8 relative z-30">
                {/* Selling Point 1: Speed */}
                <div className="w-full sm:w-1/2 md:w-1/4 p-4 bg-white dark:bg-[#2B253B] rounded-lg shadow-lg flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-100 border border-gray-200 dark:border-gray-800">
                  <svg className="w-12 h-12 text-[#1F1A2A] dark:text-[#CAC4D0] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <p className="text-lg font-semibold text-gray-900 dark:text-[#CAC4D0]">Launch in Days, Not Months</p>
                </div>
                {/* Selling Point 2: Simplicity */}
                <div className="w-full sm:w-1/2 md:w-1/4 p-4 bg-white dark:bg-[#2B253B] rounded-lg shadow-lg flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-200 border border-gray-200 dark:border-gray-800">
                  <svg className="w-12 h-12 text-[#1F1A2A] dark:text-[#CAC4D0] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  <p className="text-lg font-semibold text-gray-900 dark:text-[#CAC4D0]">Hassle-Free Management</p>
                </div>
                {/* Selling Point 3: Security */}
                <div className="w-full sm:w-1/2 md:w-1/4 p-4 bg-white dark:bg-[#2B253B] rounded-lg shadow-lg flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-300 border border-gray-200 dark:border-gray-800">
                  <svg className="w-12 h-12 text-[#1F1A2A] dark:text-[#CAC4D0] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002 12c0 2.757 1.25 5.232 3.248 7.072A11.955 11.955 0 0112 21.056c2.757 0 5.232-1.25 7.072-3.248A11.955 11.955 0 0022 12c0-2.757-1.25-5.232-3.248-7.072z"></path>
                  </svg>
                  <p className="text-lg font-semibold text-gray-900 dark:text-[#CAC4D0]">Ironclad Protection</p>
                </div>
                {/* Selling Point 4: Support */}
                <div className="w-full sm:w-1/2 md:w-1/4 p-4 bg-white dark:bg-[#2B253B] rounded-lg shadow-lg flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-400 border border-gray-200 dark:border-gray-800">
                  <svg className="w-12 h-12 text-[#1F1A2A] dark:text-[#CAC4D0] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <p className="text-lg font-semibold text-gray-900 dark:text-[#CAC4D0]">24/7 Expert Guidance</p>
                </div>
              </div>
            </div>
            {/* Subtle abstract shapes for visual appeal - enhanced with blur and glow (now on top of the overlay) */}
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <div className="absolute w-64 h-64 bg-orange-500 bg-opacity-5 rounded-full -top-16 -left-16 animate-pulse-slow filter blur-sm shadow-orange-glow"></div>
              <div className="absolute w-96 h-96 bg-orange-500 bg-opacity-5 rounded-full -bottom-32 -right-32 animate-pulse-slow delay-500 filter blur-sm shadow-orange-glow"></div>
            </div>
          </section>

          {/* Why Choose Swift90 Section */}
          <section id="why-terraace" className="relative py-16 md:py-24 bg-gray-50 dark:bg-[#1F1A2A] border-b border-gray-100 dark:border-gray-900 transition-colors duration-500 overflow-hidden">
            {/* Subtle background graphics */}
            <div className="absolute w-40 h-40 bg-orange-200 bg-opacity-5 rounded-full -top-20 -right-20 animate-pulse-slow filter blur-sm"></div>
            <div className="absolute w-60 h-60 bg-orange-300 bg-opacity-5 rounded-lg -bottom-30 -left-30 animate-pulse-slow delay-400 filter blur-sm transform rotate-45"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1F1A2A] dark:text-[#CAC4D0] animate-fade-in-up">Your Business Deserves More Than Just a Website. It Deserves Online Success.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="text-left animate-slide-in-left">
                  <h3 className="text-2xl font-semibold mb-4 text-[#1F1A2A]gray-900 dark:text-[#CAC4D0] leading-tight">Reclaim Your Time: We Build and Manage Your Online Presence, So You Can Build Your Empire.</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    Imagine a world where your website just *works*. No late-night updates, no security scares, no performance worries. That's the peace of mind Swift90 delivers, giving you back precious hours to innovate, connect with customers, and drive your business forward.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Experience the freedom of a fully managed website that's always up-to-date, secure, and performing at its peak, giving you a distinct advantage and peace of mind.
                  </p>
                </div>
                <div className="flex justify-center animate-fade-in-right">
                  <img
                    src={"https://plus.unsplash.com/premium_photo-1720908579765-3cf1dd7999f7?q=80&w=1678&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt="Simplified Online Presence Illustration"
                    className="rounded-lg shadow-sm w-full max-w-md h-auto object-cover border border-gray-200 dark:border-gray-700"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Load+Error'; }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="relative py-16 md:py-24 bg-white dark:bg-[#1F1A2A]  transition-colors duration-500 overflow-hidden">
            {/* Subtle background graphics */}
            <div className="absolute w-32 h-32 bg-orange-100 bg-opacity-5 rounded-full top-1/4 -left-10 animate-pulse-slow delay-200 filter blur-sm"></div>
            <div className="absolute w-48 h-48 bg-orange-200 bg-opacity-5 rounded-lg bottom-1/3 -right-20 animate-pulse-slow delay-500 filter blur-sm transform skew-y-6"></div>

            <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1F1A2A] dark:text-[#CAC4D0] animate-fade-in-up">From Idea to Impact: Your Simple Journey with Swift90</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Step 1 */}
                <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-100 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="w-16 h-16 bg-[#1F1A2A] dark:bg-[#CAC4D0] text-[#CAC4D0] dark:text-[#1F1A2A] rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">1</div>
                  <h3 className="text-xl font-semibold mb-4 text-[#1F1A2A] dark:text-[#CAC4D0]">Your Vision, Your Plan</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Choose the foundation for your digital future. Our flexible tiers are designed to scale with your ambition.</p>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-200 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="w-16 h-16 bg-[#1F1A2A] dark:bg-[#CAC4D0] text-[#CAC4D0] dark:text-[#1F1A2A] rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">2</div>
                  <h3 className="text-xl font-semibold mb-4 text[#1F1A2A] dark:text-[#CAC4D0]">Tell Us Your Story</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">We'll listen, learn, and translate your unique vision into a stunning digital experience, pixel by pixel.</p>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center p-8 bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-300 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="w-16 h-16 bg-[#1F1A2A] dark:bg-[#CAC4D0] text-[#CAC4D0] dark:text-[#1F1A2A] rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-sm">3</div>
                  <h3 className="text-xl font-semibold mb-4 text-[#1F1A2A] dark:text-[#CAC4D0]">Go Live, Grow Limitlessly</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your expertly crafted website launches, ready to attract, convert, and empower your business for unstoppable growth.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 md:py-24 bg-gray-50 dark:bg-[#1F1A2A] border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1F1A2A] dark:text-[#CAC4D0] animate-fade-in-up">Built for Your Triumph: Essential Features That Drive Growth</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <div className="flex items-start p-6 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-100 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1F1A2A] dark:bg-[#CAC4D0] text-[#CAC4D0] dark:text-[#1F1A2A] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h4l-1-1v-3.25m-1.25 0h-3.5m4.75 0h3.5m-3.5 0v-4.5m-3.5 0v-4.5m4.75 0h3.5m-3.5 0v-4.5m-3.5 0v-4.5m4.75 0h3.5m-3.5 0v-4.5M12 12h.01M12 16h.01M12 8h.01M12 4h.01M12 20h.01M12 24h.01M12 0h.01"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#1F1A2A] dark:text-[#CAC4D0] text-left">Reach Every Customer, Everywhere</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Your website beautifully adapts to any screen, ensuring a perfect experience whether they're on a phone, tablet, or desktop.</p>
                  </div>
                </div>
                {/* Feature 2 */}
                <div className="flex items-start p-6 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-200 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1F1A2A] dark:bg-[#CAC4D0] text-[#CAC4D0] dark:text-[#1F1A2A] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#1F1A2A] dark:text-[#CAC4D0] text-left">Capture Every Click</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Blazing-fast load times keep visitors engaged, reducing bounce rates and boosting conversions for your business.</p>
                  </div>
                </div>
                {/* Feature 3 */}
                <div className="flex items-start p-6 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-300 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1F1A2A] dark:bg-[#CAC4D0] text-[#CAC4D0] dark:text-[#1F1A2A] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-2-6V4m2 11h2m-2 4h2m-6-4h6m-6 0H6a2 2 0 00-2 2v2a2 2 0 002 2h2m0-4h.01M17 12h.01M17 16h.01M17 8h.01M17 4h.01M17 20h.01M17 24h.01M17 0h.01"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#1F1A2A] dark:text-[#CAC4D0] text-left">Be Discovered</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Our websites are built from the ground up with SEO in mind, ensuring your business ranks higher and attracts more qualified leads.</p>
                  </div>
                </div>
                {/* Feature 4 */}
                <div className="flex items-start p-6 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-400 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1F1A2A] dark:bg-[#CAC4D0] text-[#CAC4D0] dark:text-[#1F1A2A] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM12 14c-1.657 0-3 .895-3 2v2h6v-2c0-1.105-1.343-2-3-2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#1F1A2A] dark:text-[#CAC4D0] text-left">Sleep Soundly</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">We protect your online investment with ironclad security, global hosting, and automatic backups, so you never have to worry.</p>
                  </div>
                </div>
                {/* Feature 5 */}
                <div className="flex items-start p-6 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-500 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1F1A2A] dark:bg-[#CAC4D0] text-[#CAC4D0] dark:text-[#1F1A2A] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2h14zM4 9h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#1F1A2A] dark:text-[#CAC4D0] text-left">Your Partner in Success</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Never feel alone. Our 24/7 expert support means we're always here to guide you, troubleshoot, and ensure your online journey is seamless.</p>
                  </div>
                </div>
                {/* Feature 6 */}
                <div className="flex items-start p-6 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-600 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1F1A2A] dark:bg-[#CAC4D0] text-[#CAC4D0] dark:text-[#1F1A2A] rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-[#1F1A2A] dark:text-[#CAC4D0] text-left">Grow Without Limits</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">Your website evolves with your ambition. Seamlessly upgrade your plan as your business expands, ensuring your digital presence always keeps pace.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="py-16 md:py-24 bg-white dark:bg-[#1F1A2A]  transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1F1A2A] dark:text-[#CAC4D0] animate-fade-in-up">Real Stories, Real Results: See How We've Transformed Businesses Like Yours</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
                These aren't just websites; they're thriving online presences that have helped our clients achieve their dreams. Imagine what we can build for you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm overflow-hidden transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-100 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <img
                    src={"https://placehold.co/600x400/E0E0E0/333333?text=Global+E-commerce"}
                    alt="Global E-commerce Website Example"
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Load+Error'; }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">How [Client Name] Expanded Globally</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">We built a high-converting e-commerce hub that connected them with customers across continents, boosting their sales by X%.</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm overflow-hidden transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-200 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <img
                    src={"https://placehold.co/600x400/E0E0E0/333333?text=Corporate+Portfolio"}
                    alt="Corporate Portfolio Website Example"
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Load+Error'; }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Elevating [Client Name]'s Brand</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Their new corporate site now commands respect, attracting high-value clients and solidifying their industry leadership.</p>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm overflow-hidden transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-300 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
                  <img
                    src={"https://placehold.co/600x400/E0E0E0/333333?text=Creative+Agency"}
                    alt="Creative Agency Website Example"
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/333333?text=Image+Load+Error'; }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Unleashing [Client Name]'s Creativity</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Their new interactive platform showcases their unique vision, drawing in exciting new projects and collaborations.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-16 md:py-24 bg-white dark:bg-[#1F1A2A] border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1F1A2A] dark:text-[#CAC4D0] animate-fade-in-up">Hear From Businesses Like Yours: Real Transformations, Real Results</h2>
              <div className="relative overflow-hidden group">
                <div className="flex space-x-8 animate-scroll-testimonials">
                  {/* Duplicate testimonials to create a seamless loop */}
                  {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <div key={index} className="flex-shrink-0 w-[320px] bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-800">
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
          <section id="pricing" className="py-16 md:py-24 bg-gray-50 dark:bg-[#1F1A2A] border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-[#1F1A2A] dark:text-[#CAC4D0] animate-fade-in-up">Invest in Your Growth: Simple, Transparent Plans for Every Stage of Your Business Journey</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
                No hidden fees, just clear paths to online success. Choose the plan that empowers your vision, scaled for your region.
              </p>

              {/* Conditional rendering for pricing cards based on selectedCountry */}
              {selectedCountry && pricingData[selectedCountry] ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"> {/* Adjusted grid for 4 columns */}
                  {Object.keys(pricingData[selectedCountry].plans).map((planKey, index) => {
                    const plan = pricingData[selectedCountry].plans[planKey];
                    const currency = pricingData[selectedCountry].currency;
                    return (
                      <div key={planKey} className="bg-white dark:bg-[#2B253B] rounded-lg shadow-sm p-8 flex flex-col items-center border border-gray-200 dark:border-gray-800 transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <h3 className="text-2xl font-bold text-orange-500 mb-4">{plan.name}</h3>
                        <p className="text-5xl font-extrabold text-[#1F1A2A] dark:text-[#CAC4D0] mb-6">
                          {plan.name === 'Custom' ? 'Quote' : `${currency}${plan.price}`}<span className="text-lg font-medium text-gray-600 dark:text-gray-400">{plan.name === 'Custom' ? '' : '/month'}</span>
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
                          {plan.name === 'Basic' && 'Start Your Basic Journey'}
                          {plan.name === 'Pro' && 'Accelerate with Pro'}
                          {plan.name === 'Enterprise' && 'Dominate with Enterprise'}
                          {plan.name === 'Custom' && 'Get a Custom Quote'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-10 bg-white dark:bg-[#1F1A2A] rounded-lg shadow-sm animate-fade-in border border-gray-200 dark:border-gray-800">
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
          <section id="impact" className="py-16 md:py-24 bg-white dark:bg-[#1F1A2A]  transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1F1A2A] dark:text-[#CAC4D0] animate-fade-in-up">The Story of Our Success, Measured by Yours</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-800 transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-100">
                  <p className="text-5xl font-extrabold text-orange-500 mb-4">500+</p>
                  <h3 className="text-xl font-semibold text-[#1F1A2A] dark:text-[#CAC4D0]">Dreams Launched</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">Each website represents a business now thriving online.</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-800 transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-200">
                  <p className="text-5xl font-extrabold text-orange-500 mb-4">98%</p>
                  <h3 className="text-xl font-semibold text-[#1F1A2A] dark:text-[#CAC4D0]">Peace of Mind</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">Our clients trust us to deliver, and we consistently exceed expectations.</p>
                </div>
                <div className="bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm p-8 border border-gray-200 dark:border-gray-800 transform hover:scale-[1.02] hover:shadow-md transition duration-300 animate-fade-in-up delay-300">
                  <p className="text-5xl font-extrabold text-orange-500 mb-4">24/7</p>
                  <h3 className="text-xl font-semibold text-[#1F1A2A] dark:text-[#CAC4D0]">Your Partner, Around the Clock</h3>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">Our dedicated support ensures your online presence never sleeps, just like your ambition.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Technology Stack Section */}
          <section id="tech-stack" className="py-16 md:py-24 bg-gray-50 dark:bg-[#1F1A2A] border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1F1A2A] dark:text-gray-100 animate-fade-in-up">The Engine of Your Success: Powerful Tech, Seamlessly Delivered</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
                Behind every thriving Swift90 website is a foundation of cutting-edge technology, ensuring your online presence is not just beautiful, but future-proof, fast, and secure.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
                <div className="flex flex-col items-center p-4 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transform hover:scale-[1.05] transition duration-300 animate-fade-in-up delay-100">
                  <img
                    src={"https://icon.icepanel.io/Technology/svg/React.svg"} alt="React Logo" className="h-16 mb-2" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/E0E0E0/333333?text=React'; }} />
                  <p className="text-lg font-semibold text-[#1F1A2A] dark:text-[#CAC4D0]">React</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transform hover:scale-[1.05] transition duration-300 animate-fade-in-up delay-200">
                  <img
                    src={"https://icon.icepanel.io/Technology/svg/Node.js.svg"} alt="Node.js Logo" className="h-16 mb-2" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/E0E0E0/333333?text=Node'; }} />
                  <p className="text-lg font-semibold text-[#1F1A2A] dark:text-[#CAC4D0]">Node.js</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transform hover:scale-[1.05] transition duration-300 animate-fade-in-up delay-300">
                  <img
                    src={"https://icon.icepanel.io/Technology/svg/Google-Cloud.svg"} alt="Cloud Hosting Logo" className="h-16 mb-2" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/E0E0E0/333333?text=Cloud'; }} />
                  <p className="text-lg font-semibold text-[#1F1A2A] dark:text-[#CAC4D0]">Cloud Hosting</p>
                </div>
                <div className="flex flex-col items-center p-4 bg-white dark:bg-[#2B253B] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 transform hover:scale-[1.05] transition duration-300 animate-fade-in-up delay-400">
                  <img
                    src={"https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg"} alt="Tailwind CSS Logo" className="h-16 mb-2" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/E0E0E0/333333?text=Tailwind'; }} />
                  <p className="text-lg font-semibold text-[#1F1A2A] dark:text-[#CAC4D0]">Tailwind CSS</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-16 md:py-24 bg-gray-50 dark:bg-[#1F1A2A] transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1F1A2A] dark:text-[#CAC4D0] animate-fade-in-up">Your Questions, Answered: Clearing the Path to Your Online Success</h2>
              <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700 py-4 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <button
                      className="flex justify-between items-center w-full text-left focus:outline-none"
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className="text-lg font-semibold text-[#1F1A2A] dark:text-[#CAC4D0]">{faq.question}</span>
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
          <section id="contact-us" className="py-16 md:py-24 bg-white dark:bg-[#1F1A2A] border-b border-gray-100 dark:border-gray-800 transition-colors duration-500">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-[#1F1A2A] dark:text-[#CAC4D0] animate-fade-in-up">Ready to Start Your Online Journey? Let's Connect.</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
                Your vision is unique, and so is our approach. Reach out to our expert guides, and let's craft the perfect online story for your business.
              </p>
              <div className="max-w-xl mx-auto bg-gray-50 dark:bg-[#2B253B] p-8 rounded-lg shadow-sm animate-fade-in-up border border-gray-200 dark:border-gray-800">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-left text-sm font-medium text-[#1F1A2A] dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-left text-sm font-medium text-[#1F1A2A] dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                      placeholder="your@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-left text-sm font-medium text-[#1F1A2A] dark:text-gray-300 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows="4"
                      value={purchaseDetails.requirements} // Pre-fill from purchase details
                      onChange={(e) => setPurchaseDetails(prev => ({ ...prev, requirements: e.target.value }))}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                      placeholder="Tell us about your unique vision, specific needs, or any challenges you've faced with previous websites. We're listening!"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105"
                  >
                    Start Your Online Story
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-16 md:py-24 bg-orange-600 text-white text-center transition-colors duration-500">
            <div className="container mx-auto px-6 animate-fade-in-up">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Stop Worrying About Your Website and Start Growing Your Business?</h2>
              <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto opacity-90">
                Join the ranks of confident business owners who trust Swift90 to manage their digital success. Your transformation begins now.
              </p>
              <a href="#pricing" className="bg-white text-orange-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-md transform hover:scale-105">
                Begin Your Success Story
              </a>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="bg-white dark:bg-[#1F1A2A]  text-gray-300 dark:text-gray-400 py-10 px-6 md:px-12 transition-colors duration-500">
            <div className="container mx-auto text-center">
              <div className="text-2xl font-bold text-[#1F1A2A] dark:text-gray-300 mb-4 transition-colors duration-500">Swift90</div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">&copy; {new Date().getFullYear()} Swift90. All rights reserved.</p>
              <div className="flex justify-center space-x-6 flex-wrap">
                <a href="#" className="hover:text-orange-300 dark:hover:text-orange-300 text-[#1F1A2A] dark:text-gray-300 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="hover:text-orange-300 dark:hover:text-orange-300 text-[#1F1A2A] dark:text-gray-300 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="hover:text-orange-300 dark:hover:text-orange-300 text-[#1F1A2A] dark:text-gray-300 transition-colors duration-300">Support</a>
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

  const isCustomPlan = purchaseDetails.plan?.name === 'Custom';

  // Calculate dynamic price (only for non-custom plans)
  const baseAmount = isCustomPlan ? 0 : (purchaseDetails.plan ? purchaseDetails.plan.price : 0);
  const addOnCostPerItem = baseAmount * 0.20; // 20% of base plan price per add-on
  const totalAddOnCost = isCustomPlan ? 0 : (additionalFeatures.length * addOnCostPerItem);
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
      paymentStatus: isCustomPlan ? 'requested' : 'pending', // Set status to 'requested' for custom plans
    }));
    setCurrentPage('payment');
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-[#1F1A2A] font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
      <header className="bg-white dark:bg-[#1F1A2A] shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-50 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Hamburger Icon */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="text-2xl font-bold text-[#CAC4D0] rounded-lg p-2 transition-colors duration-500">
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
          <div className="fixed inset-0 bg-white dark:bg-[#1F1A2A] bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
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
          </div>
        )}
      </header>

      <div className="container mx-auto mt-24 max-w-2xl bg-white dark:bg-[#2B253B] p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Your Journey Continues: Customize Your {purchaseDetails.plan?.name} Plan
        </h2>

        {/* Dynamic Price Display */}
        <div className="bg-gray-100 dark:bg-[#2B253B] p-4 rounded-lg mb-6 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {isCustomPlan ? "Your Custom Quote Request" : "Base Monthly Price:"}
          </p>
          <p className="text-3xl font-extrabold text-orange-500 mb-2">
            {isCustomPlan ? 'To be quoted' : `${currency}${baseAmount.toFixed(2)}`}
          </p>
          {!isCustomPlan && additionalFeatures.length > 0 && (
            <>
              <p className="text-md text-gray-600 dark:text-gray-400">
                Add-ons ({additionalFeatures.length} selected): +{currency}{addOnCostPerItem.toFixed(2)}
              </p>
            </>
          )}
          {!isCustomPlan && (
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">
              Your Investment in Unstoppable Online Growth: {currency}{totalAmount.toFixed(2)}/month
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isCustomPlan && (
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                What Story Will Your Website Tell? Choose Your Digital Foundation
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
          )}

          {/* Conditional Fields based on Website Type (only for non-custom plans) */}
          {!isCustomPlan && websiteType === 'E-commerce' && (
            <>
              <div>
                <label htmlFor="numProducts" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Number of Products (to power your sales potential)
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
                  Preferred Payment Gateways (for seamless transactions)
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

          {!isCustomPlan && websiteType === 'Blog' && (
            <>
              <div>
                <label htmlFor="numBlogPosts" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Number of Blog Posts (to share your insights)
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
                  Comment System (to foster community engagement)
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

          {!isCustomPlan && (websiteType === 'Corporate' || websiteType === 'Service') && (
            <>
              <div>
                <label htmlFor="numPages" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Number of Pages (to showcase your professional presence)
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
                  Key Service Categories (comma-separated, to define your expertise)
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

          {!isCustomPlan && websiteType === 'Portfolio' && (
            <div>
              <label htmlFor="numProjects" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estimated Number of Projects/Items (to effectively showcase your work)
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
            {!isCustomPlan && (
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website Assets You'll Provide (the raw material for your story)
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
            )}

            {/* Service Add-ons & Enhancements (only for non-custom plans) */}
            {!isCustomPlan && (
              <div>
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Add-ons & Enhancements (each adds {currency}{addOnCostPerItem.toFixed(2)}/month, to enhance your journey)
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
            )}

            <div>
              <label htmlFor="requirements" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Specific Requirements / Notes (your opportunity to shape your unique story)
              </label>
              <textarea
                id="requirements"
                rows="5"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-colors duration-500"
                placeholder="Tell us about your unique vision, specific needs, or any challenges you've faced with previous websites. We're listening!"
              ></textarea>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                type="button"
                onClick={() => setCurrentPage('home')}
                className="px-6 py-2 rounded-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
              >
                Review Your Plan
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105"
              >
                {isCustomPlan ? 'Submit Custom Request' : 'Confirm & Begin Your Online Journey'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Payment Page Component
  function PaymentPage({ purchaseDetails, setPurchaseDetails, setCurrentPage, darkMode, toggleDarkMode, selectedCountry, pricingData, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const { plan, additionalFeatures } = purchaseDetails; // Destructure additionalFeatures here
    const isCustomPlan = plan?.name === 'Custom';

    const currency = pricingData[selectedCountry]?.currency || '$';
    const currencyCode = pricingData[selectedCountry]?.currencyCode || 'USD'; // Get currency code
    const baseAmount = isCustomPlan ? 0 : (plan ? plan.price : 0);
    const addOnCostPerItem = baseAmount * 0.20; // 20% of base plan price per add-on
    const totalAddOnCost = isCustomPlan ? 0 : (additionalFeatures.length * addOnCostPerItem);
    const totalAmount = baseAmount + totalAddOnCost;

    const [loadingPayment, setLoadingPayment] = useState(false);
    const [messageBox, setMessageBox] = useState(null); // State for custom message box
    const [exchangeNotice, setExchangeNotice] = useState(''); // New state for exchange rate notice
    const [showPaymentGateway, setShowPaymentGateway] = useState(false); // New state to control gateway display

    // Simulated exchange rates for demonstration purposes (as of a recent hour)
    // In a real application, you would fetch these from a reliable currency exchange API.
    const simulatedExchangeRates = {
      'USD_NGN': 1500, // 1 USD = 1500 NGN (example rate)
      'GBP_NGN': 1850, // 1 GBP = 1850 NGN (example rate)
      'CAD_NGN': 1100, // 1 CAD = 1100 NGN (example rate)
      'AUD_NGN': 1000, // 1 AUD = 1000 NGN (example rate)
      'EUR_NGN': 1600, // 1 EUR = 1600 NGN (example rate)
      'INR_NGN': 18,   // 1 INR = 18 NGN (example rate)
      'BRL_NGN': 300,  // 1 BRL = 300 NGN (example rate)
      'ZAR_NGN': 80,   // 1 ZAR = 80 NGN (example rate)
      'JPY_NGN': 10,   // 1 JPY = 10 NGN (adjusted for 100 JPY for easier calculation, so 1 JPY = 0.1 NGN)
      'MXN_NGN': 90,   // 1 MXN = 90 NGN (example rate)
    };

    // Load Paystack script dynamically (only if not a custom plan)
    useEffect(() => {
      if (!isCustomPlan) {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }
    }, [isCustomPlan]);

    useEffect(() => {
      if (showPaymentGateway && window.PaystackPop) {
        const PAYSTACK_PUBLIC_KEY = 'pk_live_2ba1413aaaf5091188571ea6f87cca34945d943c'; // Live Public Key
        let amountForPaystack = totalAmount * 100; // Default conversion (to kobo)
        let paystackCurrency = currencyCode; // Default to selected country's currency

        // Check if conversion to NGN is needed
        if (currencyCode !== 'NGN') {
          const exchangeRateKey = `${currencyCode}_NGN`;
          const rate = simulatedExchangeRates[exchangeRateKey];

          if (rate) {
            amountForPaystack = (totalAmount * rate) * 100; // Convert to NGN, then to kobo
            paystackCurrency = 'NGN';
          } else {
            paystackCurrency = 'NGN'; // Still force NGN for Paystack demo
            amountForPaystack = 15000 * 100; // Fallback to a basic NGN price for demo
          }
        }

        const handler = window.PaystackPop.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: 'customer@example.com', // Replace with actual customer email or dynamic value
          amount: Math.round(amountForPaystack), // Ensure amount is an integer (kobo)
          currency: paystackCurrency, // Use the adjusted currency (NGN)
          ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a unique reference
          onClose: function () {
            setMessageBox({ message: 'Payment window closed.', type: 'info' });
            setPurchaseDetails(prev => ({ ...prev, paymentStatus: 'failed' }));
            setLoadingPayment(false);
            setExchangeNotice(''); // Clear notice on close
            setShowPaymentGateway(false); // Reset gateway display
          },
          callback: function (response) {
            setMessageBox({ message: 'Payment successful! Reference: ' + response.reference, type: 'success' });
            setPurchaseDetails(prev => ({ ...prev, paymentStatus: 'successful' }));
            setLoadingPayment(false);
            setCurrentPage('checkout');
            setExchangeNotice(''); // Clear notice on success
            setShowPaymentGateway(false); // Reset gateway display
            console.log('Paystack Response:', response);

            // Example: Call your backend to verify the transaction
            // fetch('/api/verify-paystack-payment', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ reference: response.reference })
            // })
            // .then(res => res.json())
            // .then(data => {
            //   if (data.status === 'success') {
            //     console.log('Transaction verified by backend:', data);
            //     // Update UI or grant access based on successful verification
            //   } else {
            //     console.error('Backend verification failed:', data);
            //     setMessageBox({ message: 'Payment could not be verified. Please contact support.', type: 'error' });
            //   }
            // })
            // .catch(error => {
            //   console.error('Error during backend verification:', error);
            //   setMessageBox({ message: 'An error occurred during payment verification.', type: 'error' });
            // });
          },
        });
        handler.openIframe();
      } else if (showPaymentGateway && !window.PaystackPop) {
        setMessageBox({ message: 'Paystack script not loaded. Please ensure the inline.js script is included in your HTML.', type: 'error' });
        setLoadingPayment(false);
        setExchangeNotice(''); // Clear notice on script load error
        setShowPaymentGateway(false); // Reset gateway display
      }
    }, [showPaymentGateway, totalAmount, currencyCode, simulatedExchangeRates, setMessageBox, setPurchaseDetails, setLoadingPayment, setCurrentPage]);


    const handleInitiatePayment = () => {
      setLoadingPayment(true);
      let currentExchangeNotice = '';

      // Determine exchange rate notice
      if (currencyCode !== 'NGN') {
        const exchangeRateKey = `${currencyCode}_NGN`;
        const rate = simulatedExchangeRates[exchangeRateKey];
        if (rate) {
          currentExchangeNotice = `Note: Your payment of ${currency}${totalAmount.toFixed(2)} is being processed in NGN (Nigerian Naira) at a simulated exchange rate of 1 ${currencyCode} = ₦${rate.toFixed(2)}. Total NGN: ₦${(totalAmount * rate).toFixed(2)}.`;
        } else {
          currentExchangeNotice = `Note: For demonstration purposes, your payment will be processed in NGN (Nigerian Naira) at a fallback rate due to missing exchange rate data. In a real application, live exchange rates would be used.`;
        }
      }
      setExchangeNotice(currentExchangeNotice);

      // Start the 10-second timer to show the payment gateway
      setTimeout(() => {
        setShowPaymentGateway(true);
      }, 10000); // 10 seconds delay
    };

    const handleCustomRequestConfirmation = () => {
      setPurchaseDetails(prev => ({ ...prev, paymentStatus: 'requested' }));
      setCurrentPage('checkout');
    };

    return (
      <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-[#1F1A2A] font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
        <header className="bg-white dark:bg-[#1F1A2A] shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-50 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
          <nav className="container mx-auto flex justify-between items-center">
            {/* Hamburger Icon */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div className="text-2xl font-bold text-[#CAC4D0] rounded-lg p-2 transition-colors duration-500">
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
            <div className="fixed inset-0 bg-white dark:bg-[#1F1A2A] bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
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
            </div>
          )}
        </header>

        <div className="container mx-auto mt-24 max-w-2xl bg-white dark:bg-[#2B253B] p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            One Step Closer: Confirm Your Investment in Online Success
          </h2>
          <div className="space-y-4 mb-8">
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Plan:</span> {plan?.name}
            </p>
            {!isCustomPlan && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Base Price:</span> {currency}{baseAmount.toFixed(2)}/month
              </p>
            )}
            {purchaseDetails.websiteType && !isCustomPlan && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Website Type:</span> {purchaseDetails.websiteType}
              </p>
            )}
            {purchaseDetails.websiteType === 'E-commerce' && !isCustomPlan && (
              <>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Est. Products:</span> {purchaseDetails.numProducts || 'N/A'}
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Payment Gateways:</span> {purchaseDetails.paymentGateways.length > 0 ? purchaseDetails.paymentGateways.join(', ') : 'N/A'}
                </p>
              </>
            )}
            {purchaseDetails.websiteType === 'Blog' && !isCustomPlan && (
              <>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Est. Blog Posts:</span> {purchaseDetails.numBlogPosts || 'N/A'}
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Comment System:</span> {purchaseDetails.commentSystem || 'N/A'}
                </p>
              </>
            )}
            {(!isCustomPlan && (purchaseDetails.websiteType === 'Corporate' || purchaseDetails.websiteType === 'Service')) && (
              <>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Est. Pages:</span> {purchaseDetails.numPages || 'N/A'}
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Service Categories:</span> {purchaseDetails.serviceCategories || 'N/A'}
                </p>
              </>
            )}
            {purchaseDetails.websiteType === 'Portfolio' && !isCustomPlan && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Est. Projects/Items:</span> {purchaseDetails.numProjects || 'N/A'}
              </p>
            )}
            {purchaseDetails.assets.length > 0 && !isCustomPlan && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Assets Provided:</span> {purchaseDetails.assets.join(', ')}
              </p>
            )}
            {purchaseDetails.requirements && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Requirements:</span> {purchaseDetails.requirements}
              </p>
            )}

            {!isCustomPlan && additionalFeatures.length > 0 && (
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

            {!isCustomPlan && (
              <p className="2xl font-bold text-gray-900 dark:text-gray-100 mt-6">
                Total Investment in Your Digital Future: {totalAmount.toFixed(2)}/month
              </p>
            )}
          </div>

          {exchangeNotice && (
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg mb-6 text-center text-sm font-medium border border-yellow-200 dark:border-yellow-700">
              {exchangeNotice}
            </div>
          )}

          <div className="flex flex-col items-center space-y-4">
            {isCustomPlan ? (
              <button
                onClick={handleCustomRequestConfirmation}
                className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105 w-full md:w-auto"
              >
                Confirm Custom Request
              </button>
            ) : (
              <button
                onClick={handleInitiatePayment} // Call the new initiation function
                className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                disabled={loadingPayment}
              >
                {loadingPayment ? 'Loading Payment Gateway...' : 'Activate Your Online Presence'}
              </button>
            )}
            {loadingPayment && !isCustomPlan && (
              <p className="text-gray-700 dark:text-gray-300">Please wait, do not close this page...</p>
            )}
            <button
              type="button"
              onClick={() => setCurrentPage('purchase')}
              className="px-6 py-2 rounded-full text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 w-full md:w-auto"
              disabled={loadingPayment}
            >
              Review Your Choices
            </button>
          </div>
        </div>
        {messageBox && (
          <MessageBox
            message={messageBox.message}
            type={messageBox.type}
            onClose={() => setMessageBox(null)}
          />
        )}
      </div>
    );
  }

  // Checkout Page Component
  function CheckoutPage({ purchaseDetails, setCurrentPage, darkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen }) {
    const { plan, websiteType, assets, requirements, numProducts, paymentGateways, numBlogPosts, commentSystem, numPages, serviceCategories, numProjects, additionalFeatures, paymentStatus } = purchaseDetails;
    const isCustomPlan = plan?.name === 'Custom';

    // Recalculate total for display consistency
    const baseAmount = isCustomPlan ? 0 : (plan ? plan.price : 0);
    const addOnCostPerItem = baseAmount * 0.20;
    const totalAddOnCost = isCustomPlan ? 0 : (additionalFeatures.length * addOnCostPerItem);
    const totalAmount = baseAmount + totalAddOnCost;

    return (
      <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-[#1F1A2A] font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
        <header className="bg-white dark:bg-[#1F1A2A] shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-50 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
          <nav className="container mx-auto flex justify-between items-center">
            {/* Hamburger Icon */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div className="text-2xl font-bold text-[#CAC4D0] rounded-lg p-2 transition-colors duration-500">
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
            <div className="fixed inset-0 bg-white dark:bg-[#1F1A2A] bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
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
            </div>
          )}
        </header>

        <div className="container mx-auto mt-24 max-w-2xl bg-white dark:bg-[#2B253B] p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Your Digital Journey Has Begun!
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
                Congratulations! Your journey to a powerful online presence has officially begun. We're thrilled to partner with you and will reach out within 24 hours to kickstart the creation of your stunning new website.
              </p>
            </>
          ) : paymentStatus === 'requested' ? (
            <>
              <div className="text-blue-500 text-6xl mb-4">
                &#x2139; {/* Information icon */}
              </div>
              <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                Custom Quote Request Submitted!
              </p>
              <p className="text-lg text-gray-900 dark:text-gray-200 mb-8">
                Thank you for your custom request! Our team of experts will review your specific needs and get back to you with a personalized quote within 1-2 business days. We're excited to bring your unique vision to life!
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
                A Small Detour: It looks like there was an issue with your payment. Please try again, or reach out to our support team – we're here to help you get back on track!
              </p>
            </>
          )}

          <div className="text-left space-y-3 mb-8 bg-gray-50 dark:bg-[#2B253B] p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <p className="text-lg text-gray-900 dark:text-gray-200">
              <span className="font-semibold">Plan:</span> {plan?.name}
            </p>
            {!isCustomPlan && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Base Price:</span> {baseAmount.toFixed(2)}/month
              </p>
            )}
            {websiteType && !isCustomPlan && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Website Type:</span> {websiteType}
              </p>
            )}
            {websiteType === 'E-commerce' && !isCustomPlan && (
              <>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Est. Products:</span> {numProducts || 'N/A'}
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Payment Gateways:</span> {paymentGateways.length > 0 ? paymentGateways.join(', ') : 'N/A'}
                </p>
              </>
            )}
            {websiteType === 'Blog' && !isCustomPlan && (
              <>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Est. Blog Posts:</span> {numBlogPosts || 'N/A'}
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Comment System:</span> {commentSystem || 'N/A'}
                </p>
              </>
            )}
            {(!isCustomPlan && (websiteType === 'Corporate' || websiteType === 'Service')) && (
              <>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Est. Pages:</span> {numPages || 'N/A'}
                </p>
                <p className="text-lg text-gray-900 dark:text-gray-200">
                  <span className="font-semibold">Service Categories:</span> {serviceCategories || 'N/A'}
                </p>
              </>
            )}
            {websiteType === 'Portfolio' && !isCustomPlan && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Est. Projects/Items:</span> {numProjects || 'N/A'}
              </p>
            )}
            {assets.length > 0 && !isCustomPlan && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Assets Provided:</span> {assets.join(', ')}
              </p>
            )}
            {requirements && (
              <p className="text-lg text-gray-900 dark:text-gray-200">
                <span className="font-semibold">Requirements:</span> {requirements}
              </p>
            )}

            {!isCustomPlan && additionalFeatures.length > 0 && (
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

            {!isCustomPlan && (
              <p className="2xl font-bold text-gray-900 dark:text-gray-100 mt-6">
                Final Total: {totalAmount.toFixed(2)}/month
              </p>
            )}
          </div>

          <button
            onClick={() => setCurrentPage('home')}
            className="bg-orange-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md transform hover:scale-105"
          >
            Explore More Success Stories
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
      <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-[#1F1A2A] font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
        <header className="bg-white dark:bg-[#1F1A2A] shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-50 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
          <nav className="container mx-auto flex justify-between items-center">
            {/* Hamburger Icon */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div className="text-2xl font-bold text-[#CAC4D0] rounded-lg p-2 transition-colors duration-500">
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
            <div className="fixed inset-0 bg-white dark:bg-[#1F1A2A] bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
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
            </div>
          )}
        </header>

        <div className="container mx-auto mt-24 max-w-4xl bg-white dark:bg-[#1F1A2A] p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Your Guide to Digital Success: Insights from the Swift90 Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-gray-50 dark:bg-[#2B253B] rounded-lg shadow-sm p-6 transform hover:scale-[1.02] hover:shadow-md transition duration-300 border border-gray-200 dark:border-gray-800 hover:border-orange-500">
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
        <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-[#2B253B] font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6 flex items-center justify-center`}>
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
      <div className={`${darkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-[#1F1A2A] font-inter text-gray-900 dark:text-gray-100 transition-colors duration-500 py-16 md:py-24 px-6`}>
        <header className="bg-white dark:bg-[#1F1A2A] shadow-md py-4 px-6 md:px-12 fixed top-0 w-full z-50 border-b border-gray-100 dark:border-gray-900 transition-colors duration-500">
          <nav className="container mx-auto flex justify-between items-center">
            {/* Hamburger Icon */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none hover:text-orange-500 transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div className="text-2xl font-bold text-[#CAC4D0] rounded-lg p-2 transition-colors duration-500">
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
            <div className="fixed inset-0 bg-white dark:bg-[#1F1A2A] bg-opacity-95 dark:bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 transition-colors duration-500">
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
            </div>
          )}
        </header>

        <div className="container mx-auto mt-24 max-w-4xl bg-white dark:bg-[#2B253B] p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 animate-fade-in-up transition-colors duration-500">
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
