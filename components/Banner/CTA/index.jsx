import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { HiOutlineLightningBolt, HiOutlineCog, HiOutlinePlus, HiOutlineMinus, HiOutlinePaperAirplane, HiOutlineShieldCheck, HiOutlineChatAlt2, HiOutlineSupport, HiOutlineTrendingUp, HiOutlineDeviceMobile, HiOutlineSearch, HiArrowLeft, HiArrowRight, HiCheckCircle, HiOutlineRocketLaunch, HiOutlineClock, HiLockClosed, HiInformationCircle, HiExclamationCircle, HiOutlineDocumentText} from 'react-icons/hi';

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
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [activePortfolioTab, setActivePortfolioTab] = useState('ecommerce');
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
    customerName: '', // Added for contact form
    customerEmail: '', // Added for contact form
  });
  // State to hold data for the currently viewed blog post
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

  

  // Dummy pricing data - Added currencyCode and paystackPlanCode for Paystack
  const pricingData = {
    "USA": {
      currency: '$',
      currencyCode: 'USD', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 45000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_pi46n98lssw3p90' }, // Updated price and plan code
        pro: { name: 'Pro', price: 118500, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_x6o01vr72wd6157' }, // Updated price and plan code
        enterprise: { name: 'Enterprise', price: 298500, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_eaops7fc8vchc8v' }, // Updated price and plan code
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Nigeria": {
      currency: '₦',
      currencyCode: 'NGN', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 20000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_ptb1hb41va33pe0' }, // Updated price and plan code
        pro: { name: 'Pro', price: 60000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_po6k9pskjr6c6y4' }, // Updated price and plan code
        enterprise: { name: 'Enterprise', price: 100000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_hb5osqdsmf09ypk' }, // Updated price and plan code
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "UK": {
      currency: '£',
      currencyCode: 'GBP', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 46250, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_oiw7p5snz7evuo4' }, // Updated price and plan code
        pro: { name: 'Pro', price: 120250, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_mj1lgmnupqyoynr' }, // Updated price and plan code
        enterprise: { name: 'Enterprise', price: 314500, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_0eu82fwzb13j5zn' }, // Updated price and plan code
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Canada": {
      currency: 'C$',
      currencyCode: 'CAD', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 38500, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_o3p55fz00z4wvkv' }, // Updated price and plan code
        pro: { name: 'Pro', price: 97900, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_v9kvtwmp8v85aeh' }, // Updated price and plan code
        enterprise: { name: 'Enterprise', price: 242000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_0uv0gk0epv5p1nb' }, // Updated price and plan code
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Australia": {
      currency: 'A$',
      currencyCode: 'AUD', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 39000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_AU_BASIC_MONTHLY' }, // Price remains same, plan code updated
        pro: { name: 'Pro', price: 99000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_AU_PRO_MONTHLY' }, // Price remains same, plan code updated
        enterprise: { name: 'Enterprise', price: 250000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_AU_ENTERPRISE_MONTHLY' }, // Price remains same, plan code updated
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Germany": {
      currency: '€',
      currencyCode: 'EUR', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 43200, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_jlc97ah1shc7uhw' }, // Updated price and plan code
        pro: { name: 'Pro', price: 120000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_jb58o2q6sux01sw' }, // Updated price and plan code
        enterprise: { name: 'Enterprise', price: 288000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_626mkoymysxt87w' }, // Updated price and plan code
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "France": {
      currency: '€',
      currencyCode: 'EUR', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 43200, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_jlc97ah1shc7uhw' }, // Updated price and plan code (same as Germany for EUR, as per user's list)
        pro: { name: 'Pro', price: 120000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_jb58o2q6sux01sw' }, // Updated price and plan code (same as Germany for EUR, as per user's list)
        enterprise: { name: 'Enterprise', price: 288000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_626mkoymysxt87w' }, // Updated price and plan code (same as Germany for EUR, as per user's list)
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "India": {
      currency: '₹',
      currencyCode: 'INR', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 36000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_IN_BASIC_MONTHLY' }, // Price remains same, plan code updated
        pro: { name: 'Pro', price: 99000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_IN_PRO_MONTHLY' }, // Price remains same, plan code updated
        enterprise: { name: 'Enterprise', price: 270000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_IN_ENTERPRISE_MONTHLY' }, // Price remains same, plan code updated
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Brazil": {
      currency: 'R$',
      currencyCode: 'BRL', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 36000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_BR_BASIC_MONTHLY' }, // Price remains same, plan code updated
        pro: { name: 'Pro', price: 105000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_BR_PRO_MONTHLY' }, // Price remains same, plan code updated
        enterprise: { name: 'Enterprise', price: 270000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_BR_ENTERPRISE_MONTHLY' }, // Price remains same, plan code updated
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "South Africa": {
      currency: 'R',
      currencyCode: 'ZAR', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 36000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_v09dez7ldkuk5yo' }, // Updated price and plan code
        pro: { name: 'Pro', price: 96000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_l794gtpminaki2w' }, // Updated price and plan code
        enterprise: { name: 'Enterprise', price: 250000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_8ef8l1nsob1oa0m' }, // Updated price and plan code
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Japan": {
      currency: '¥',
      currencyCode: 'JPY', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 35000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_JP_BASIC_MONTHLY' }, // Price remains same, plan code updated
        pro: { name: 'Pro', price: 95000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_JP_PRO_MONTHLY' }, // Price remains same, plan code updated
        enterprise: { name: 'Enterprise', price: 250000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_JP_ENTERPRISE_MONTHLY' }, // Price remains same, plan code updated
        custom: { name: 'Custom', price: 0, features: ['Tailored Solutions for Unique Needs', 'Personalized Consultation', 'Scalable Features', 'Dedicated Project Manager', 'Custom Quote'] },
      },
    },
    "Mexico": {
      currency: 'MX$',
      currencyCode: 'MXN', // Added for Paystack
      plans: {
        basic: { name: 'Basic', price: 45000, features: ['Your Dedicated Online Home (1 Website)', 'Stunning, Ready-to-Launch Designs', 'Peace of Mind Support', '10GB Secure Storage'], paystackPlanCode: 'PLN_MX_BASIC_MONTHLY' }, // Price remains same, plan code updated
        pro: { name: 'Pro', price: 135000, features: ['Expand Your Reach (5 Websites)', 'Premium, Customizable Templates', 'Priority Expert Support', '50GB Secure Storage', 'Your Custom Domain'], paystackPlanCode: 'PLN_MX_PRO_MONTHLY' }, // Price remains same, plan code updated
        enterprise: { name: 'Enterprise', price: 360000, features: ['Unleash Unlimited Potential (Unlimited Websites)', 'Tailored Custom Development', '24/7 Dedicated Strategic Support', 'Unlimited Secure Storage', 'Advanced Growth Analytics', 'Managed SEO for Dominance'], paystackPlanCode: 'PLN_MX_ENTERPRISE_MONTHLY' }, // Price remains same, plan code updated
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

    
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000); // Change testimonial every 7 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [currentTestimonialIndex, testimonials.length]);

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
          <header className="bg-tech-bg border-b border-tech-cyan/20 fixed top-0 w-full z-50 transition-colors duration-500"> {/* MODIFIED: Matched footer style */}
  <nav className="container mx-auto flex justify-between items-center px-6 py-4"> {/* MODIFIED: Adjusted padding */}
    
    {/* Mobile Menu Button (Hamburger Icon) */}
    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none hover:text-tech-cyan transition-colors duration-300"> {/* MODIFIED: Colors */}
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
    
    <a href="#" onClick={() => setCurrentPage('home')} className="text-2xl font-bold text-white font-mono"> {/* MODIFIED: Colors & Font */}
      Swift<span className="text-tech-cyan">90</span>
    </a>
    
    <div className="flex items-center space-x-4">
      <button onClick={toggleDarkMode} className="text-white focus:outline-none hover:text-tech-cyan transition-colors duration-300"> {/* MODIFIED: Colors */}
        {darkMode ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 18.894a.75.75 0 10-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.59-1.59zm-10.606 0a.75.75 0 10-1.06 1.06l-1.59 1.59a.75.75 0 001.06 1.06l1.59-1.59zM2.25 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM4.343 5.757a.75.75 0 011.06-1.06l1.59 1.59a.75.75 0 01-1.06 1.06l-1.59-1.59z"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.996 5.996 0 01-5.65-5.65c-.44-.06-.9-.1-1.36-.1z"></path></svg>
        )}
      </button>
    </div>
  </nav>

  {/* Mobile Menu Overlay - now the primary navigation overlay */}
  {isMobileMenuOpen && (
    // MODIFIED: Restyled with "glass" effect and new theme colors
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8 font-mono">
      <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white focus:outline-none hover:text-tech-cyan transition-colors duration-300">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <a href="#why-terraace" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-200 text-2xl font-semibold hover:text-tech-cyan transition-colors duration-300">Why Swift90?</a>
      <a href="#how-it-works" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-200 text-2xl font-semibold hover:text-tech-cyan transition-colors duration-300">How it Works</a>
      <a href="#features" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-200 text-2xl font-semibold hover:text-tech-cyan transition-colors duration-300">Features</a>
      <a href="#portfolio" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-200 text-2xl font-semibold hover:text-tech-cyan transition-colors duration-300">Portfolio</a>
      <a href="#testimonials" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-200 text-2xl font-semibold hover:text-tech-cyan transition-colors duration-300">Testimonials</a>
      <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-200 text-2xl font-semibold hover:text-tech-cyan transition-colors duration-300">Pricing</a>
      <a href="#faq" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-200 text-2xl font-semibold hover:text-tech-cyan transition-colors duration-300">FAQ</a>
      <a href="#contact-us" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="text-gray-200 text-2xl font-semibold hover:text-tech-cyan transition-colors duration-300">Contact</a>
     
      <a href="#pricing" onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }} className="bg-tech-cyan text-tech-bg px-8 py-3 rounded-md text-xl font-semibold hover:bg-white hover:text-tech-cyan transition duration-300 shadow-md">
        Get Started
      </a>
    </div>
  )}
</header>

          {/* Hero Section */}
          <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0D0D10] text-white p-6">
            {/* Background Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,191,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,191,255,0.1)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
            
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-1/2 h-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,191,255,0.2)_0%,_transparent_70%)]"></div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl">
              
              {/* HUD Element Wrapper */}
              <div className="relative p-8 w-full">
                {/* HUD Corner Brackets - Created with simple divs */}
                <div className="absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-tech-cyan/70 animate-pulse"></div>
                <div className="absolute top-0 right-0 h-8 w-8 border-t-2 border-r-2 border-tech-cyan/70 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-tech-cyan/70 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-tech-cyan/70 animate-pulse"></div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight bg-gradient-to-r from-white via-gray-300 to-tech-cyan text-transparent bg-clip-text animate-fade-in-up">
                  Tired of Website Headaches? <br className="hidden sm:inline" /> We Build Your Online Success.
                </h1>
                <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto text-gray-300 leading-relaxed animate-fade-in-up animation-delay-300">
                  We transform your digital dreams into thriving online realities, handling every technical detail so you can focus on what truly matters: your business growth.
                </p>
                <a href="#pricing" className="bg-tech-cyan text-tech-bg px-8 py-3 rounded-md text-lg font-bold hover:bg-white hover:text-tech-cyan transition-all duration-300 shadow-[0_0_20px_rgba(0,191,255,0.5)] animate-fade-in-up animation-delay-500">
                  Start Your Transformation
                </a>
              </div>

              {/* Selling Points "Glass" Cards */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
                {/* Card 1: Speed */}
                <div className="bg-slate-800/40 backdrop-blur-sm border border-tech-cyan/30 rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-tech-cyan hover:bg-slate-800/60">
                  <HiOutlineLightningBolt className="w-10 h-10 text-tech-cyan mb-3" />
                  <p className="text-base font-semibold">Launch in Days</p>
                </div>
                {/* Card 2: Simplicity */}
                <div className="bg-slate-800/40 backdrop-blur-sm border border-tech-cyan/30 rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-tech-cyan hover:bg-slate-800/60">
                  <HiOutlineCog className="w-10 h-10 text-tech-cyan mb-3" />
                  <p className="text-base font-semibold">Hassle-Free</p>
                </div>
                {/* Card 3: Security */}
                <div className="bg-slate-800/40 backdrop-blur-sm border border-tech-cyan/30 rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-tech-cyan hover:bg-slate-800/60">
                  <HiOutlineShieldCheck className="w-10 h-10 text-tech-cyan mb-3" />
                  <p className="text-base font-semibold">Ironclad Security</p>
                </div>
                {/* Card 4: Support */}
                <div className="bg-slate-800/40 backdrop-blur-sm border border-tech-cyan/30 rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-tech-cyan hover:bg-slate-800/60">
                  <HiOutlineChatAlt2 className="w-10 h-10 text-tech-cyan mb-3" />
                  <p className="text-base font-semibold">24/7 Expert Support</p>
                </div>
              </div>
            </div>
          </section>

                    {/* Why Choose Swift90 Section */}
                    <section id="why-terraace" className="relative py-16 md:py-24 px-6 font-mono">
            <div className="container mx-auto max-w-6xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-16 bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
                Your Business Deserves a Digital Command Center
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* LEFT COLUMN: HUD-Framed Image */}
                <div className="lg:col-span-5">
                  <div className="relative hud-element p-4">
                    <img
                      // SUGGESTION: Replace this with a more abstract/techy image.
                      // Search for "plexus," "wireframe globe," or "data visualization."
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726a?q=80&w=1740&auto=format&fit=crop"
                      alt="Abstract technology visualization"
                      className="rounded-lg w-full h-auto object-cover border border-tech-cyan/20"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: "Glass" Text Panel */}
                <div className="lg:col-span-7">
                  <div className="glass-card p-8 text-left">
                    <h3 className="text-2xl font-bold mb-4 text-white leading-tight">
                      Reclaim Your Time: We Manage Your Digital Presence, So You Can Build Your Empire.
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      Imagine a world where your website just *works*. No late-night updates, no security scares, no performance worries. That's the peace of mind Swift90 delivers, giving you back precious hours to innovate and drive your business forward[cite: 161, 162].
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Experience the freedom of a fully managed website that's always secure and performing at its peak, giving you a distinct advantage in the digital landscape[cite: 163, 164].
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="relative py-16 md:py-24 px-6 font-mono">
            <div className="container mx-auto max-w-6xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-16 bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
                From Idea to Impact: A Streamlined Protocol
              </h2>

              {/* Process Timeline Container */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                {/* STEP 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-tech-cyan bg-tech-cyan/10 flex items-center justify-center text-2xl font-bold text-tech-cyan shadow-[0_0_15px_rgba(0,191,255,0.5)] mb-6">
                    1
                  </div>
                  <div className="glass-card p-6 max-w-xs">
                    <h3 className="text-xl font-bold mb-3 text-white">Your Vision, Your Plan</h3>
                    <p className="text-gray-300 leading-relaxed">Choose the foundation for your digital future. Our flexible tiers are designed to scale with your ambition.</p>
                  </div>
                </div>

                {/* Connector Line 1 -> 2 */}
                <div className="flex-grow h-1 w-24 border-t-2 border-dashed border-tech-cyan/30 md:rotate-0 rotate-90"></div>

                {/* STEP 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-tech-cyan bg-tech-cyan/10 flex items-center justify-center text-2xl font-bold text-tech-cyan shadow-[0_0_15px_rgba(0,191,255,0.5)] mb-6">
                    2
                  </div>
                  <div className="glass-card p-6 max-w-xs">
                    <h3 className="text-xl font-bold mb-3 text-white">Tell Us Your Story</h3>
                    <p className="text-gray-300 leading-relaxed">We'll listen, learn, and translate your unique vision into a stunning digital experience, pixel by pixel.</p>
                  </div>
                </div>

                {/* Connector Line 2 -> 3 */}
                <div className="flex-grow h-1 w-24 border-t-2 border-dashed border-tech-cyan/30 md:rotate-0 rotate-90"></div>

                {/* STEP 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-tech-cyan bg-tech-cyan/10 flex items-center justify-center text-2xl font-bold text-tech-cyan shadow-[0_0_15px_rgba(0,191,255,0.5)] mb-6">
                    3
                  </div>
                  <div className="glass-card p-6 max-w-xs">
                    <h3 className="text-xl font-bold mb-3 text-white">Go Live & Grow</h3>
                    <p className="text-gray-300 leading-relaxed">Your expertly crafted website launches, ready to attract, convert, and empower your business for unstoppable growth.</p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="relative py-16 md:py-24 px-6 font-mono">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-16 bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
              Core System Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Feature 1: Responsive Design */}
              <div className="glass-card p-6 text-left">
                <HiOutlineDeviceMobile className="w-10 h-10 text-tech-cyan mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Fully Responsive</h3>
                <p className="text-gray-300 leading-relaxed">Your website beautifully adapts to any screen, ensuring a perfect user experience on phones, tablets, and desktops.</p>
              </div>
              
              {/* Feature 2: Performance */}
              <div className="glass-card p-6 text-left">
                <HiOutlineLightningBolt className="w-10 h-10 text-tech-cyan mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Blazing-Fast Speed</h3>
                <p className="text-gray-300 leading-relaxed">Blazing-fast load times keep visitors engaged, reducing bounce rates and boosting conversions for your business.</p>
              </div>

              {/* Feature 3: SEO */}
              <div className="glass-card p-6 text-left">
                <HiOutlineSearch className="w-10 h-10 text-tech-cyan mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">SEO Optimized</h3>
                <p className="text-gray-300 leading-relaxed">Built from the ground up with SEO in mind, ensuring your business ranks higher and attracts more qualified leads.</p>
              </div>

              {/* Feature 4: Security */}
              <div className="glass-card p-6 text-left">
                <HiOutlineShieldCheck className="w-10 h-10 text-tech-cyan mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Ironclad Security</h3>
                <p className="text-gray-300 leading-relaxed">We protect your online investment with robust security, global hosting, and automatic backups, so you never have to worry.</p>
              </div>

              {/* Feature 5: Support */}
              <div className="glass-card p-6 text-left">
                <HiOutlineSupport className="w-10 h-10 text-tech-cyan mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">24/7 Expert Support</h3>
                <p className="text-gray-300 leading-relaxed">Never feel alone. Our expert support means we're always here to guide you, troubleshoot, and ensure your online journey is seamless.</p>
              </div>

              {/* Feature 6: Scalability */}
              <div className="glass-card p-6 text-left">
                <HiOutlineTrendingUp className="w-10 h-10 text-tech-cyan mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Limitless Scalability</h3>
                <p className="text-gray-300 leading-relaxed">Your website evolves with your ambition. Seamlessly upgrade your plan as your business expands, ensuring your digital presence always keeps pace.</p>
              </div>

            </div>
          </div>
        </section>

          {/* Portfolio Section */}
         <section id="portfolio" className="relative py-16 md:py-24 px-6 font-mono">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
              Case Study Archive
            </h2>
            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
              These aren't just websites; they're thriving digital presences. Imagine what we can build for you.
            </p>

            {/* Tab Navigation */}
            <div className="flex justify-center space-x-4 mb-12">
              <button
                onClick={() => setActivePortfolioTab('ecommerce')}
                className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-300 ${activePortfolioTab === 'ecommerce' ? 'bg-tech-cyan text-tech-bg' : 'bg-slate-800/40 text-gray-300 hover:bg-slate-800/80'}`}
              >
                E-COMMERCE
              </button>
              <button
                onClick={() => setActivePortfolioTab('corporate')}
                className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-300 ${activePortfolioTab === 'corporate' ? 'bg-tech-cyan text-tech-bg' : 'bg-slate-800/40 text-gray-300 hover:bg-slate-800/80'}`}
              >
                CORPORATE
              </button>
              <button
                onClick={() => setActivePortfolioTab('creative')}
                className={`px-6 py-2 rounded-md text-sm font-bold transition-all duration-300 ${activePortfolioTab === 'creative' ? 'bg-tech-cyan text-tech-bg' : 'bg-slate-800/40 text-gray-300 hover:bg-slate-800/80'}`}
              >
                CREATIVE
              </button>
            </div>

            {/* Tab Content */}
            <div className="relative">
              {/* E-commerce Content */}
              {activePortfolioTab === 'ecommerce' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                  <div className="lg:col-span-7">
                    <div className="relative hud-element p-4">
                      <img src="https://placehold.co/600x400/0D0D10/00BFFF?text=Global+E-commerce" alt="Global E-commerce Website Example" className="rounded-lg w-full h-auto object-cover"/>
                    </div>
                  </div>
                  <div className="lg:col-span-5 glass-card p-8 text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">Global E-commerce Expansion</h3>
                    <p className="text-gray-300 mb-6">We built a high-converting e-commerce hub that connected our client with customers across continents.</p>
                    <h4 className="font-bold text-tech-cyan mb-2">Key Metrics:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Conversion Rate Uplift: +35%</li>
                      <li>Average Load Time: &lt;0.8s</li>
                      <li>Global Sales Increase: +50% YoY</li>
                    </ul>
                  </div>
                </div>
              )}
              {/* Corporate Content */}
              {activePortfolioTab === 'corporate' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                  <div className="lg:col-span-7">
                    <div className="relative hud-element p-4">
                      <img src="https://placehold.co/600x400/0D0D10/00BFFF?text=Corporate+Portfolio" alt="Corporate Website Example" className="rounded-lg w-full h-auto object-cover"/>
                    </div>
                  </div>
                  <div className="lg:col-span-5 glass-card p-8 text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">Elevating a Corporate Brand</h3>
                    <p className="text-gray-300 mb-6">Their new corporate site now commands respect, attracting high-value clients and solidifying their industry leadership.</p>
                    <h4 className="font-bold text-tech-cyan mb-2">Key Metrics:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Lead Generation: +60%</li>
                      <li>User Engagement: +40%</li>
                      <li>Brand Trust Score: 9.2/10</li>
                    </ul>
                  </div>
                </div>
              )}
              {/* Creative Content */}
              {activePortfolioTab === 'creative' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                  <div className="lg:col-span-7">
                    <div className="relative hud-element p-4">
                      <img src="https://placehold.co/600x400/0D0D10/00BFFF?text=Creative+Agency" alt="Creative Agency Website Example" className="rounded-lg w-full h-auto object-cover"/>
                    </div>
                  </div>
                  <div className="lg:col-span-5 glass-card p-8 text-left">
                    <h3 className="text-2xl font-bold text-white mb-4">Unleashing Creativity</h3>
                    <p className="text-gray-300 mb-6">Their new interactive platform showcases their unique vision, drawing in exciting new projects and collaborations.</p>
                    <h4 className="font-bold text-tech-cyan mb-2">Key Metrics:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Project Inquiries: +75%</li>
                      <li>Session Duration: +90s</li>
                      <li>Industry Awards: 3</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="relative py-16 md:py-24 px-6 font-mono">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-16 bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
              Transmissions from the Field
            </h2>

            <div className="relative glass-card rounded-xl p-8 md:p-12 w-full max-w-4xl mx-auto">
              {/* Large Decorative Quote Mark */}
              <span className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 text-9xl text-tech-cyan/10">
                “
              </span>

              {/* Testimonial Content */}
              <div key={currentTestimonialIndex} className="animate-fade-in">
                <p className="text-xl md:text-2xl italic text-gray-200 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonialIndex].quote}"
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonialIndex].avatar}
                    alt={testimonials[currentTestimonialIndex].name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-tech-cyan/50 shadow-[0_0_15px_rgba(0,191,255,0.5)]"
                  />
                  <div className="text-left">
                    <p className="font-bold text-white text-lg">{testimonials[currentTestimonialIndex].name}</p>
                    <p className="text-sm text-gray-400">{testimonials[currentTestimonialIndex].title}, {testimonials[currentTestimonialIndex].country}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full left-0 px-4 md:-px-4">
                <button
                  onClick={() => setCurrentTestimonialIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                  className="bg-slate-800/50 p-3 rounded-full text-white hover:bg-tech-cyan hover:text-tech-bg transition-all duration-300"
                >
                  <HiArrowLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentTestimonialIndex(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                  className="bg-slate-800/50 p-3 rounded-full text-white hover:bg-tech-cyan hover:text-tech-bg transition-all duration-300"
                >
                  <HiArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

          {/* Pricing Section */}
          <section id="pricing" className="relative py-16 md:py-24 px-6 font-mono">
            <div className="container mx-auto max-w-6xl text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
                Select Your Service Plan
              </h2>
              <p className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto">
                Simple, transparent plans for every stage of your business journey. No hidden fees, just clear paths to online success.
              </p>

              {/* Conditional rendering for pricing cards */}
              {selectedCountry && pricingData[selectedCountry] ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch"> {/* Changed to items-stretch */}
                  {Object.keys(pricingData[selectedCountry].plans).map((planKey) => {
                    const plan = pricingData[selectedCountry].plans[planKey];
                    const currency = pricingData[selectedCountry].currency;
                    const isProPlan = plan.name === 'Pro';

                    return (
                      <div
                        key={planKey}
                        // --- THIS IS THE MODIFIED LINE ---
                        // Removed the scale-105 and conditional border for a uniform look
                        className={`relative glass-card p-8 flex flex-col transition-all duration-300 ${isProPlan ? 'border-tech-cyan' : 'border-transparent'}`}
                      >
                        {isProPlan && (
                          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-tech-cyan to-tech-magenta text-white px-4 py-1 rounded-full text-sm font-bold">
                            MOST POPULAR
                          </div>
                        )}
                        
                        <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                        <p className="text-5xl font-extrabold text-white mb-6">
                          {plan.name === 'Custom' ? 'Quote' : `${currency}${plan.price}`}
                          <span className="text-lg font-medium text-gray-400">
                            {plan.name === 'Custom' ? '' : '/mon'}
                          </span>
                        </p>
                        <ul className="text-gray-300 text-left space-y-3 mb-8 w-full">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <HiCheckCircle className="w-5 h-5 text-tech-cyan mr-3 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => startPurchase(planKey)}
                          className={`mt-auto w-full py-3 rounded-md font-bold transition-all duration-300 ${isProPlan ? 'bg-tech-cyan text-tech-bg hover:bg-white hover:text-tech-cyan' : 'bg-slate-800/60 text-tech-cyan hover:bg-tech-cyan hover:text-tech-bg'}`}
                        >
                          {plan.name === 'Basic' && 'Select Basic'}
                          {plan.name === 'Pro' && 'Select Pro'}
                          {plan.name === 'Enterprise' && 'Select Enterprise'}
                          {plan.name === 'Custom' && 'Request Quote'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // "No Country Selected" State
                <div className="glass-card max-w-md mx-auto p-10 text-center">
                  <p className="text-xl text-gray-200 mb-6">Please select your region to view localized service plans.</p>
                  <button
                    onClick={openLocationModal}
                    className="bg-tech-cyan text-tech-bg px-6 py-2 rounded-md font-bold hover:bg-white hover:text-tech-cyan transition duration-300"
                  >
                    Select Region
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Our Impact in Numbers Section */}
          <section id="impact" className="relative py-16 md:py-24 px-6 font-mono">
              <div className="container mx-auto max-w-6xl text-center">
                <div className="flex items-center justify-center gap-4 mb-16">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
                    Live System Metrics
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Metric 1: Dreams Launched */}
                  <ImpactCard 
                    end={500} 
                    suffix="+" 
                    title="Dreams Launched" 
                    description="Each project represents a business now thriving online." 
                  />

                  {/* Metric 2: Peace of Mind */}
                  <ImpactCard 
                    end={98} 
                    suffix="%" 
                    title="Peace of Mind" 
                    description="Our clients trust us to deliver, and we consistently exceed expectations." 
                  />

                  {/* Metric 3: Uptime */}
                  <ImpactCard 
                    end={24} 
                    suffix="/7" 
                    title="Always On" 
                    description="Our dedicated support ensures your online presence never sleeps, just like your ambition." 
                  />
                </div>
              </div>
            </section>

          {/* Our Technology Stack Section */}
          <section id="tech-stack" className="relative py-16 md:py-24 px-6 font-mono">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,191,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,191,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>
          
          <div className="relative z-10 container mx-auto max-w-6xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
              Core Architecture
            </h2>
            <p className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto">
              Our platform is built on a foundation of cutting-edge technology, ensuring your online presence is future-proof, fast, and secure.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Tech 1: React */}
              <div className="group relative glass-card p-6 h-48 flex flex-col items-center justify-center text-center">
                <div className="transition-opacity duration-300 group-hover:opacity-0">
                  <img src={"https://icon.icepanel.io/Technology/svg/React.svg"} alt="React Logo" className="h-20" />
                  <p className="text-lg font-bold text-white mt-4">React</p>
                </div>
                <div className="absolute inset-0 p-6 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-gray-300">Blazing-fast user interfaces for a seamless user experience.</p>
                </div>
              </div>

              {/* Tech 2: Node.js */}
              <div className="group relative glass-card p-6 h-48 flex flex-col items-center justify-center text-center">
                <div className="transition-opacity duration-300 group-hover:opacity-0">
                  <img src={"https://icon.icepanel.io/Technology/svg/Node.js.svg"} alt="Node.js Logo" className="h-20" />
                  <p className="text-lg font-bold text-white mt-4">Node.js</p>
                </div>
                <div className="absolute inset-0 p-6 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-gray-300">Powering our robust and scalable server-side architecture.</p>
                </div>
              </div>

              {/* Tech 3: Cloud Hosting */}
              <div className="group relative glass-card p-6 h-48 flex flex-col items-center justify-center text-center">
                <div className="transition-opacity duration-300 group-hover:opacity-0">
                  <img src={"https://icon.icepanel.io/Technology/svg/Google-Cloud.svg"} alt="Cloud Hosting Logo" className="h-20" />
                  <p className="text-lg font-bold text-white mt-4">Cloud Hosting</p>
                </div>
                <div className="absolute inset-0 p-6 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-gray-300">Reliable, secure, and globally distributed for maximum uptime and speed.</p>
                </div>
              </div>

              {/* Tech 4: Tailwind CSS */}
              <div className="group relative glass-card p-6 h-48 flex flex-col items-center justify-center text-center">
                <div className="transition-opacity duration-300 group-hover:opacity-0">
                  <img src={"https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg"} alt="Tailwind CSS Logo" className="h-20" />
                  <p className="text-lg font-bold text-white mt-4">Tailwind CSS</p>
                </div>
                <div className="absolute inset-0 p-6 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-gray-300">Modern, utility-first CSS for rapid and consistent UI development.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

          {/* FAQ Section */}
          <section id="faq" className="relative py-16 md:py-24 px-6 font-mono">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-16 bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
              Knowledge Base
            </h2>

            {/* Glass panel container for the entire FAQ list */}
            <div className="glass-card p-4 md:p-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-tech-cyan/20 last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full py-4 text-left"
                  >
                    <span className="text-lg font-bold text-white">{faq.question}</span>
                    <span className="text-tech-cyan">
                      {openFAQ === index ? <HiOutlineMinus size={24} /> : <HiOutlinePlus size={24} />}
                    </span>
                  </button>
                  {/* Answer container with smooth transition */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openFAQ === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p className="pt-2 pb-4 text-gray-300 text-left">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

          {/* Contact Us Section */}
          <section id="contact-us" className="relative py-16 md:py-24 px-6 font-mono">
            <div className="container mx-auto max-w-6xl">
              {/* We'll use a 2-column grid for the layout */}
              <div className="glass-card grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-12">

                {/* LEFT COLUMN: Title and Description */}
                <div className="text-center md:text-left">
                  <p className="text-tech-cyan mb-2">// ESTABLISH COMMS LINK</p>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
                    Ready to Start Your Journey?
                  </h2>
                  <p className="text-lg text-gray-300">
                    Your vision is unique, and so is our approach. Reach out to our expert guides, and let's craft the perfect online story for your business.
                  </p>
                </div>

                {/* RIGHT COLUMN: The Form */}
                <div>
                  <form className="space-y-6">
                    {/* Name Input */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-400 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-slate-900/50 p-3 rounded-md text-white border-2 border-slate-700 focus:border-tech-cyan focus:outline-none focus:ring-0 transition-colors duration-300"
                        placeholder="Your Name"
                      />
                    </div>
                    {/* Email Input */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-400 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-slate-900/50 p-3 rounded-md text-white border-2 border-slate-700 focus:border-tech-cyan focus:outline-none focus:ring-0 transition-colors duration-300"
                        placeholder="your@example.com"
                      />
                    </div>
                    {/* Message Input */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-400 mb-1">Message</label>
                      <textarea
                        id="message"
                        rows="4"
                        className="w-full bg-slate-900/50 p-3 rounded-md text-white border-2 border-slate-700 focus:border-tech-cyan focus:outline-none focus:ring-0 transition-colors duration-300"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-tech-cyan to-tech-magenta text-white px-6 py-3 rounded-md text-lg font-bold hover:opacity-80 transition-opacity duration-300"
                    >
                      
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="relative py-16 md:py-24 px-6 font-mono bg-gradient-to-r from-[#0d1a2f] to-[#0d0d10]">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="relative hud-element p-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
                Ready to Launch Your Digital Success?
              </h2>
              <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto text-gray-300">
                Join the ranks of confident business owners who trust Swift90 to manage their digital presence. Your transformation begins now.
              </p>
              <a 
                href="#pricing" 
                className="bg-tech-cyan text-tech-bg px-8 py-3 rounded-md text-lg font-bold hover:bg-white hover:text-tech-cyan transition-all duration-300 shadow-[0_0_25px_rgba(0,191,255,0.6)] animate-pulse"
              >
                Engage Thrusters
              </a>
            </div>
          </div>
        </section>

          {/* Footer Section */}
          <footer className="bg-tech-bg text-gray-400 py-10 px-6 md:px-12 font-mono border-t border-tech-cyan/20">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <p className="font-bold text-lg text-white">Swift<span className="text-tech-cyan">90</span></p>
              <p className="text-sm">&copy; {new Date().getFullYear()} Swift90. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <p className="text-sm text-green-400">System Status: Online</p>
            </div>

            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="hover:text-tech-cyan transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-tech-cyan transition-colors duration-300">Terms of Service</a>
              <button onClick={openLocationModal} className="hover:text-tech-cyan transition-colors duration-300">
                Change Region
              </button>
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


    // Place this component outside and below your main App component, or in a separate file.
    const ImpactCard = ({ icon, end, suffix, title, description }) => {
      const { ref, inView } = useInView({
        threshold: 0.5, // Trigger animation when 50% of the card is visible
        triggerOnce: true, // Only trigger once
      });

      return (
        <div ref={ref} className="glass-card p-8 text-center animate-pulse-once">
          <div className="flex justify-center text-tech-cyan mb-4">{icon}</div>
          <p className="text-5xl font-extrabold bg-gradient-to-r from-tech-cyan to-white text-transparent bg-clip-text mb-4">
            {inView ? <CountUp start={0} end={end} duration={2.5} /> : '0'}
            {suffix}
          </p>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      );
    };

// Purchase Page Component
function PurchasePage({ purchaseDetails, setPurchaseDetails, setCurrentPage, darkMode, toggleDarkMode, selectedCountry, pricingData }) {
  // Local state for form inputs for better performance
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
  const baseAmount = isCustomPlan ? 0 : (purchaseDetails.plan ? purchaseDetails.plan.price : 0);
  const addOnCostPerItem = baseAmount * 0.20;
  const totalAddOnCost = isCustomPlan ? 0 : (additionalFeatures.length * addOnCostPerItem);
  const totalAmount = baseAmount + totalAddOnCost;
  const currency = pricingData[selectedCountry]?.currency || '$';

  const handleCheckboxChange = (e, setState) => {
    const { value, checked } = e.target;
    setState(prev => checked ? [...prev, value] : prev.filter(item => item !== value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPurchaseDetails(prev => ({
      ...prev, websiteType, assets, requirements, numProducts, paymentGateways,
      numBlogPosts, commentSystem, numPages, serviceCategories, numProjects,
      additionalFeatures, paymentStatus: isCustomPlan ? 'requested' : 'pending',
    }));
    setCurrentPage('payment');
  };

  return (
    <div className={`min-h-screen font-mono text-white bg-tech-bg ${darkMode ? 'dark' : ''}`}>
      {/* --- Simplified Header for Purchase Flow --- */}
      <header className="bg-tech-bg border-b border-tech-cyan/20 fixed top-0 w-full z-50">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-gray-300 hover:text-tech-cyan transition-colors">
            <HiArrowLeft size={20} />
            <span>Back to Homepage</span>
          </button>
          <div className="flex items-center gap-4">
            <a href="#" onClick={() => setCurrentPage('home')} className="text-xl font-bold">Swift<span className="text-tech-cyan">90</span></a>
            <button onClick={toggleDarkMode} className="hover:text-tech-cyan transition-colors">
              {darkMode ? <BsSunFill size={20} /> : <BsMoonStarsFill size={20} />}
            </button>
          </div>
        </nav>
      </header>
      
      {/* --- Main Content --- */}
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
            Project Configuration
          </h2>
          <p className="text-center text-gray-400 mb-8">Customize your <span className="text-tech-cyan">{purchaseDetails.plan?.name}</span> plan.</p>

          {/* --- Live Order Summary --- */}
          <div className="glass-card p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-tech-cyan">// CONFIGURATION SUMMARY</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-400">Base Plan</p>
                <p className="text-xl font-bold">{isCustomPlan ? 'Custom' : `${currency}${baseAmount.toFixed(2)}`}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Add-ons</p>
                <p className="text-xl font-bold">{additionalFeatures.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Add-on Cost</p>
                <p className="text-xl font-bold">{currency}{totalAddOnCost.toFixed(2)}</p>
              </div>
              <div className="bg-tech-cyan/10 p-2 rounded-md">
                <p className="text-sm text-tech-cyan">Total Monthly</p>
                <p className="text-xl font-bold text-tech-cyan">{isCustomPlan ? 'Quote' : `${currency}${totalAmount.toFixed(2)}`}</p>
              </div>
            </div>
          </div>

          {/* --- Configuration Form --- */}
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-8">
            {/* Website Type Section */}
            {!isCustomPlan && (
              <fieldset className="border-b border-tech-cyan/20 pb-8">
                <legend className="text-xl font-bold mb-4 text-white">1. Select Foundation</legend>
                <div className="flex flex-wrap gap-4">
                  {['E-commerce', 'Portfolio', 'Corporate', 'Blog', 'Service'].map(type => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input type="radio" name="websiteType" value={type} checked={websiteType === type} onChange={(e) => setWebsiteType(e.target.value)} className="hidden peer"/>
                      <span className="px-4 py-2 rounded-md text-gray-300 bg-slate-800/60 border border-slate-700 peer-checked:bg-tech-cyan peer-checked:text-tech-bg peer-checked:border-tech-cyan transition-all duration-300">{type}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Conditional Fields would go here, styled similarly */}

            {/* Assets Section */}
            {!isCustomPlan && (
              <fieldset className="border-b border-tech-cyan/20 pb-8">
                <legend className="text-xl font-bold mb-4 text-white">2. Provide Assets</legend>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Logo', 'Images', 'Text Content', 'Videos', 'Branding Guidelines'].map(asset => (
                     <label key={asset} className="flex items-center space-x-3 cursor-pointer">
                      <input type="checkbox" value={asset} checked={assets.includes(asset)} onChange={(e) => handleCheckboxChange(e, setAssets)} className="hidden peer"/>
                      <span className="w-5 h-5 rounded border-2 border-slate-600 flex items-center justify-center peer-checked:border-tech-cyan peer-checked:bg-tech-cyan transition-all duration-300">
                        <svg className="w-3 h-3 text-tech-bg fill-current opacity-0 peer-checked:opacity-100" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                      </span>
                      <span className="text-gray-300">{asset}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {/* Requirements Section */}
            <fieldset>
              <label htmlFor="requirements" className="block text-xl font-bold mb-4 text-white">
                {isCustomPlan ? 'Describe Your Vision' : '3. Additional Requirements'}
              </label>
              <textarea id="requirements" rows="5" value={requirements} onChange={(e) => setRequirements(e.target.value)}
                className="w-full bg-slate-900/50 p-3 rounded-md text-white border-2 border-slate-700 focus:border-tech-cyan focus:outline-none focus:ring-0 transition-colors duration-300"
                placeholder="Tell us about your unique vision, specific needs, or any challenges..."
              ></textarea>
            </fieldset>

            {/* --- Form Actions --- */}
            <div className="flex justify-between items-center pt-8 border-t border-tech-cyan/20">
              <button type="button" onClick={() => setCurrentPage('home')} className="text-gray-300 hover:text-tech-cyan transition-colors">
                Cancel
              </button>
              <button type="submit" className="bg-gradient-to-r from-tech-cyan to-tech-magenta text-white px-6 py-3 rounded-md font-bold hover:opacity-80 transition-opacity duration-300">
                {isCustomPlan ? 'Submit Custom Request' : 'Confirm & Proceed to Payment'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

  // Payment Page Component
  function PaymentPage({ purchaseDetails, setPurchaseDetails, setCurrentPage, darkMode, toggleDarkMode, selectedCountry, pricingData, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { plan, additionalFeatures } = purchaseDetails;
  const isCustomPlan = plan?.name === 'Custom';

  const currency = pricingData[selectedCountry]?.currency || '$';
  const currencyCode = pricingData[selectedCountry]?.currencyCode || 'USD';
  const [exchangeNotice, setExchangeNotice] = useState('');
  const baseAmount = isCustomPlan ? 0 : (plan ? plan.price : 0);
  const addOnCostPerItem = baseAmount * 0.20;
  const totalAddOnCost = isCustomPlan ? 0 : (additionalFeatures.length * addOnCostPerItem);
  const totalAmount = baseAmount + totalAddOnCost;

  const [customerName, setCustomerName] = useState(purchaseDetails.customerName);
  const [customerEmail, setCustomerEmail] = useState(purchaseDetails.customerEmail);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [messageBox, setMessageBox] = useState(null);

  // Your existing useEffect to load the Paystack script can remain the same
  useEffect(() => {
    if (!isCustomPlan) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      document.body.appendChild(script);
      return () => { document.body.removeChild(script); };
    }
  }, [isCustomPlan]);

    const sendPurchaseDetailsToFormspree = async (status, paystackRef = null) => {
      setFormspreeLoading(true);
      const formspreeEndpoint = 'https://formspree.io/f/xyzpewbr'; // Your Formspree endpoint

      const detailsToSend = {
        planName: plan?.name,
        country: selectedCountry,
        basePrice: plan?.price,
        totalAmount: totalAmount,
        customerName: customerName,
        customerEmail: customerEmail,
        websiteType: purchaseDetails.websiteType,
        assetsProvided: purchaseDetails.assets.join(', '),
        requirements: purchaseDetails.requirements,
        numProducts: purchaseDetails.numProducts,
        paymentGateways: purchaseDetails.paymentGateways.length > 0 ? purchaseDetails.paymentGateways.join(', ') : 'N/A',
        numBlogPosts: purchaseDetails.numBlogPosts,
        commentSystem: purchaseDetails.commentSystem,
        numPages: purchaseDetails.numPages,
        serviceCategories: purchaseDetails.serviceCategories,
        numProjects: purchaseDetails.numProjects,
        additionalFeatures: purchaseDetails.additionalFeatures.length > 0 ? purchaseDetails.additionalFeatures.join(', ') : 'N/A',
        paymentStatus: status, // 'successful' or 'requested'
        paystackReference: paystackRef,
        timestamp: new Date().toISOString(),
      };

      try {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(detailsToSend),
        });

        if (response.ok) {
          console.log('Purchase details sent to Formspree successfully!');
        } else {
          console.error('Failed to send purchase details to Formspree:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending purchase details to Formspree:', error);
      } finally {
        setFormspreeLoading(false);
      }
    };

    const handleInitiatePayment = () => {
      if (!customerName || !customerEmail) {
        setMessageBox({ message: 'Please provide your name and email to proceed.', type: 'error' });
        return;
      }

      // Update purchaseDetails with customer info before proceeding
      setPurchaseDetails(prev => ({ ...prev, customerName, customerEmail }));

      setLoadingPayment(true);
      let currentExchangeNotice = '';

      if (currencyCode !== 'NGN') {
        currentExchangeNotice = `Note: Your payment for this plan will be processed in NGN (Nigerian Naira). The displayed price of ${currency}${totalAmount.toFixed(2)} is the equivalent of ₦${totalAmount.toFixed(2)} at the time of purchase.`;
      } else {
        currentExchangeNotice = `Note: Your payment for this plan will be processed in NGN (Nigerian Naira) for ₦${totalAmount.toFixed(2)}.`;
      }
      setExchangeNotice(currentExchangeNotice);

      if (window.PaystackPop) {
        const PAYSTACK_PUBLIC_KEY = 'pk_live_2ba1413aaaf5091188571ea6f87cca34945d943c'; // Live Public Key
        let amountForPaystack = totalAmount * 100; // Total amount is already in NGN, convert to kobo
        let paystackCurrency = 'NGN'; // Force Paystack currency to NGN as per user's setup

        const handler = window.PaystackPop.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: customerEmail, // Use customer's email
          amount: Math.round(amountForPaystack), // Ensure amount is an integer (kobo)
          currency: paystackCurrency, // Use the adjusted currency (NGN)
          ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a unique reference
          plan: purchaseDetails.plan.paystackPlanCode, // <-- ADDED FOR RECURRING PAYMENTS
          onClose: function () {
            setMessageBox({ message: 'Payment window closed. You can try again or contact support.', type: 'info' });
            setPurchaseDetails(prev => ({ ...prev, paymentStatus: 'failed' }));
            setLoadingPayment(false);
            setExchangeNotice(''); // Clear notice on close
            // Do NOT send to Formspree on close/failure as per user's request
          },
          callback: function (response) {
            setMessageBox({ message: 'Payment successful! Reference: ' + response.reference, type: 'success' });
            setPurchaseDetails(prev => ({ ...prev, paymentStatus: 'successful' }));
            setLoadingPayment(false);
            setCurrentPage('checkout');
            setExchangeNotice(''); // Clear notice on success
            console.log('Paystack Response:', response);
            sendPurchaseDetailsToFormspree('successful', response.reference); // Send successful status to Formspree
          },
        });
        handler.openIframe();
      } else {
        setMessageBox({ message: 'Paystack script not loaded. Please ensure the inline.js script is included in your HTML.', type: 'error' });
        setLoadingPayment(false);
        setExchangeNotice(''); // Clear notice on script load error
      }
    };

    const handleCustomRequestConfirmation = () => {
      if (!customerName || !customerEmail) {
        setMessageBox({ message: 'Please provide your name and email to submit your custom request.', type: 'error' });
        return;
      }
      // Update purchaseDetails with customer info before proceeding
      setPurchaseDetails(prev => ({ ...prev, customerName, customerEmail, paymentStatus: 'requested' }));
      sendPurchaseDetailsToFormspree('requested'); // Send custom request status to Formspree
      setCurrentPage('checkout');
    };

     return (
    <div className={`min-h-screen font-mono text-white bg-tech-bg ${darkMode ? 'dark' : ''}`}>
      {/* --- Simplified Header --- */}
      <header className="bg-tech-bg border-b border-tech-cyan/20 fixed top-0 w-full z-50">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <button onClick={() => setCurrentPage('purchase')} className="flex items-center gap-2 text-gray-300 hover:text-tech-cyan transition-colors">
            <HiArrowLeft size={20} />
            <span>Back to Configuration</span>
          </button>
          <div className="flex items-center gap-4">
            <a href="#" onClick={() => setCurrentPage('home')} className="text-xl font-bold">Swift<span className="text-tech-cyan">90</span></a>
            <button onClick={toggleDarkMode} className="hover:text-tech-cyan transition-colors">
              {darkMode ? <BsSunFill size={20} /> : <BsMoonStarsFill size={20} />}
            </button>
          </div>
        </nav>
      </header>
      
      {/* --- Main Content --- */}
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-tech-cyan text-transparent bg-clip-text">
            Secure Checkout
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* --- LEFT COLUMN: Order Summary --- */}
            <div className="glass-card p-8">
              <h3 className="font-bold text-lg mb-6 text-tech-cyan">// ORDER SUMMARY</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-300">
                  <span>{plan?.name} Plan (Base)</span>
                  <span className="font-bold text-white">{isCustomPlan ? 'N/A' : `${currency}${baseAmount.toFixed(2)}`}</span>
                </div>
                {additionalFeatures.length > 0 && (
                  <div className="flex justify-between items-center text-gray-300">
                    <span>{additionalFeatures.length} Add-on(s)</span>
                    <span className="font-bold text-white">{currency}{totalAddOnCost.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-tech-cyan/20 my-4"></div>
                <div className="flex justify-between items-center text-xl">
                  <span className="text-tech-cyan">Total Monthly</span>
                  <span className="font-bold text-tech-cyan">{isCustomPlan ? 'To be quoted' : `${currency}${totalAmount.toFixed(2)}`}</span>
                </div>
              </div>
            </div>

            {/* --- RIGHT COLUMN: Payment Authorization --- */}
            <div className="glass-card p-8">
              <h3 className="font-bold text-lg mb-6 text-tech-cyan">// PAYMENT AUTHORIZATION</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-bold text-gray-400 mb-1">Full Name</label>
                  <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required
                    className="w-full bg-slate-900/50 p-3 rounded-md text-white border-2 border-slate-700 focus:border-tech-cyan focus:outline-none focus:ring-0 transition-colors duration-300" />
                </div>
                <div>
                  <label htmlFor="customerEmail" className="block text-sm font-bold text-gray-400 mb-1">Email Address</label>
                  <input type="email" id="customerEmail" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required
                    className="w-full bg-slate-900/50 p-3 rounded-md text-white border-2 border-slate-700 focus:border-tech-cyan focus:outline-none focus:ring-0 transition-colors duration-300" />
                </div>
                <button
                  onClick={isCustomPlan ? handleCustomRequestConfirmation : handleInitiatePayment}
                  disabled={loadingPayment}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-tech-cyan to-tech-magenta text-white px-6 py-3 rounded-md text-lg font-bold hover:opacity-80 transition-opacity duration-300 disabled:opacity-50"
                >
                  <HiLockClosed className="w-6 h-6" />
                  <span>{isCustomPlan ? 'Submit Secure Request' : 'Authorize Payment'}</span>
                </button>
                <p className="text-xs text-center text-gray-500">
                  {isCustomPlan ? 'Your request will be sent to our team for a custom quote.' : 'You will be redirected to our secure payment processor.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {messageBox && <MessageBox message={messageBox.message} type={messageBox.message} onClose={() => setMessageBox(null)} />}
    </div>
  );
}

  // Checkout Page Component
  function CheckoutPage({ purchaseDetails, setCurrentPage, darkMode, toggleDarkMode, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const { plan, paymentStatus, customerEmail, ...details } = purchaseDetails;
  const isCustomPlan = plan?.name === 'Custom';

  const StatusDisplay = () => {
    switch (paymentStatus) {
      case 'successful':
        return {
          icon: <HiCheckCircle className="w-24 h-24 text-green-400" />,
          title: "Transmission Complete",
          message: `Congratulations! Your journey has begun. A confirmation has been sent to ${customerEmail}, and we will reach out within 1 hour to kickstart your project.`
        };
      case 'requested':
        return {
          icon: <HiInformationCircle className="w-24 h-24 text-blue-400" />,
          title: "Request Logged & Awaiting Review",
          message: `Thank you for your custom request. Our team will review your needs and send a personalized quote to ${customerEmail} within 1-2 business days.`
        };
      default: // 'failed'
        return {
          icon: <HiExclamationCircle className="w-24 h-24 text-red-400" />,
          title: "Transmission Failed",
          message: "It looks like there was an issue with your payment. Please try again, or reach out to support – we're here to help you get back on track."
        };
    }
  };

  const { icon, title, message } = StatusDisplay();

  return (
    <div className={`min-h-screen font-mono text-white bg-tech-bg ${darkMode ? 'dark' : ''}`}>
      {/* --- Simplified Header --- */}
      <header className="bg-tech-bg border-b border-tech-cyan/20 fixed top-0 w-full z-50">
        <nav className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
             <a href="#" onClick={() => setCurrentPage('home')} className="text-xl font-bold">Swift<span className="text-tech-cyan">90</span></a>
          </div>
          <div className="flex-1 flex justify-end">
            <button onClick={toggleDarkMode} className="hover:text-tech-cyan transition-colors">
              {darkMode ? <BsSunFill size={20} /> : <BsMoonStarsFill size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* --- Main Content --- */}
      <main className="pt-24 pb-12 px-6 flex items-center justify-center min-h-screen">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="glass-card p-8 md:p-12">
            <div className="flex justify-center mb-6">{icon}</div>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">{message}</p>
            
            {/* Final Summary */}
            <div className="bg-slate-900/50 rounded-lg p-4 text-left text-sm mb-8">
              <div className="flex items-center gap-2 text-tech-cyan font-bold mb-3">
                <HiOutlineDocumentText size={20} />
                <span>Final Configuration</span>
              </div>
              <div className="border-t border-tech-cyan/20 pt-3 space-y-1">
                <div className="flex justify-between"><span className="text-gray-400">Plan:</span> <span>{plan?.name}</span></div>
                {details.websiteType && !isCustomPlan && <div className="flex justify-between"><span className="text-gray-400">Type:</span> <span>{details.websiteType}</span></div>}
                {details.additionalFeatures.length > 0 && <div className="flex justify-between"><span className="text-gray-400">Add-ons:</span> <span>{details.additionalFeatures.length}</span></div>}
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('home')}
              className="bg-tech-cyan text-tech-bg px-8 py-3 rounded-md font-bold hover:bg-white hover:text-tech-cyan transition-all duration-300 shadow-[0_0_20px_rgba(0,191,255,0.5)]"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

  

export default App;
