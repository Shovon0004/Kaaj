"use client"

import { useState, useEffect, useRef } from "react"
import { LandingHeader } from "@/components/landing-header"
import { DoodleFooter } from "@/components/doodle-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, MessageSquare, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { HomeIcon } from "lucide-react"
import { useRouter } from "next/navigation"

// Simple translations for essential UI elements
const translations = {
  en: {
    "hero.title": "Find Local Jobs and Services",
    "hero.description": "Connect with local opportunities and skilled professionals in your neighborhood",
    "hero.getStarted": "Get Started",
    "hero.browseJobs": "Browse Jobs",
    "howItWorks.title": "How It Works",
    "howItWorks.description": "Our platform makes it easy to connect with local opportunities",
    "step1.title": "Create Your Profile",
    "step1.description": "Sign up and create your profile as a job seeker or service provider",
    "step2.title": "Find Opportunities",
    "step2.description": "Browse local jobs or post your services for others to discover",
    "step3.title": "Connect & Earn",
    "step3.description": "Message, collaborate, and build your local reputation",
    "categories.title": "Popular Categories",
    "categories.description": "Explore jobs and services across various categories",
    "categories.viewAll": "View All Categories",
    "category.homeServices": "Home Services",
    "category.homeServices.description": "Cleaning, repairs, gardening, and other household services",
    "category.professional": "Professional",
    "category.professional.description": "Accounting, legal, consulting, and business services",
    "category.creative": "Creative",
    "category.creative.description": "Design, writing, photography, and artistic services",
    "category.education": "Education",
    "category.education.description": "Tutoring, coaching, training, and educational services",
    "cta.title": "Ready to Get Started?",
    "cta.description": "Join thousands of people finding local jobs and services in their community.",
    "cta.signUp": "Sign Up Now",
    "cta.learnMore": "Learn More",
    explore: "Explore",
  },
  bn: {
    "hero.title": "স্থানীয় চাকরি এবং পরিষেবা খুঁজুন",
    "hero.description": "আপনার আশেপাশের সুযোগ এবং দক্ষ পেশাদারদের সাথে সংযোগ করুন",
    "hero.getStarted": "শুরু করুন",
    "hero.browseJobs": "চাকরি দেখুন",
    "howItWorks.title": "কিভাবে কাজ করে",
    "howItWorks.description": "আমাদের প্ল্যাটফর্ম স্থানীয় সুযোগের সাথে সংযোগ করা সহজ করে",
    "step1.title": "আপনার প্রোফাইল তৈরি করুন",
    "step1.description": "চাকরি প্রার্থী বা সেবা প্রদানকারী হিসাবে সাইন আপ করুন এবং আপনার প্রোফাইল তৈরি করুন",
    "step2.title": "সুযোগ খুঁজুন",
    "step2.description": "স্থানীয় চাকরি ব্রাউজ করুন বা অন্যরা আবিষ্কার করার জন্য আপনার পরিষেবাগুলি পোস্ট করুন",
    "step3.title": "সংযোগ করুন এবং উপার্জন করুন",
    "step3.description": "বার্তা পাঠান, সহযোগিতা করুন এবং আপনার স্থানীয় খ্যাতি তৈরি করুন",
    "categories.title": "জনপ্রিয় বিভাগ",
    "categories.description": "বিভিন্ন বিভাগে চাকরি এবং পরিষেবা অন্বেষণ করুন",
    "categories.viewAll": "সমস্ত বিভাগ দেখুন",
    "category.homeServices": "গৃহ পরিষেবা",
    "category.homeServices.description": "পরিষ্কার, মেরামত, বাগান, এবং অন্যান্য গৃহস্থালী পরিষেবা",
    "category.professional": "পেশাদার",
    "category.professional.description": "অ্যাকাউন্টিং, আইনি, পরামর্শ, এবং ব্যবসায়িক পরিষেবা",
    "category.creative": "সৃজনশীল",
    "category.creative.description": "ডিজাইন, লেখা, ফটোগ্রাফি, এবং শিল্প পরিষেবা",
    "category.education": "শিক্ষা",
    "category.education.description": "টিউটরিং, কোচিং, প্রশিক্ষণ, এবং শিক্ষামূলক পরিষেবা",
    "cta.title": "শুরু করতে প্রস্তুত?",
    "cta.description": "হাজার হাজার মানুষের সাথে যোগ দিন যারা তাদের সম্প্রদায়ে স্থানীয় চাকরি এবং পরিষেবা খুঁজে পাচ্ছে।",
    "cta.signUp": "এখনই সাইন আপ করুন",
    "cta.learnMore": "আরও জানুন",
    explore: "অন্বেষণ করুন",
  },
  hi: {
    "hero.title": "स्थानीय नौकरियां और सेवाएं खोजें",
    "hero.description": "अपने आस-पास के अवसरों और कुशल पेशेवरों से जुड़ें",
    "hero.getStarted": "शुरू करें",
    "hero.browseJobs": "नौकरियां ब्राउज़ करें",
    "howItWorks.title": "यह कैसे काम करता है",
    "hero.description": "हमारा प्लेटफॉर्म स्थानीय अवसरों से जुड़ना आसान बनाता है",
    "step1.title": "अपना प्रोफ़ाइल बनाएं",
    "step1.description": "नौकरी खोजने वाले या सेवा प्रदाता के रूप में साइन अप करें और अपना प्रोफ़ाइल बनाएं",
    "step2.title": "अवसर खोजें",
    "step2.description": "स्थानीय नौकरियां ब्राउज़ करें या दूसरों के लिए अपनी सेवाएं पोस्ट करें",
    "step3.title": "जुड़ें और कमाएं",
    "step3.description": "संदेश भेजें, सहयोग करें, और अपनी स्थानीय प्रतिष्ठा बनाएं",
    "categories.title": "लोकप्रिय श्रेणियाँ",
    "categories.description": "विभिन्न श्रेणियों में नौकरियां और सेवाएं खोजें",
    "categories.viewAll": "सभी श्रेणियां देखें",
    "category.homeServices": "घरेलू सेवाएं",
    "category.homeServices.description": "सफाई, मरम्मत, बागवानी, और अन्य घरेलू सेवाएं",
    "category.professional": "पेशेवर",
    "category.professional.description": "लेखा, कानूनी, परामर्श, और व्यापारिक सेवाएं",
    "category.creative": "रचनात्मक",
    "category.creative.description": "डिज़ाइन, लेखन, फोटोग्राफी, और कलात्मक सेवाएं",
    "category.education": "शिक्षा",
    "category.education.description": "ट्यूटरिंग, कोचिंग, प्रशिक्षण, और शैक्षिक सेवाएं",
    "cta.title": "शुरू करने के लिए तैयार हैं?",
    "cta.description": "हजारों लोगों के साथ जुड़ें जो अपने समुदाय में स्थानीय नौकरियां और सेवाएं खोज रहे हैं।",
    "cta.signUp": "अभी साइन अप करें",
    "cta.learnMore": "अधिक जानें",
    explore: "खोजें",
  },
}

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Freelance Designer",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "This platform completely changed how I find local clients. The interface is intuitive and I've been able to grow my business significantly in just a few months.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Home Service Provider",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "As a plumber, finding consistent work used to be challenging. Now I have a steady stream of local jobs and my customer base has expanded tremendously.",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Tutor",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The platform made it easy to connect with students in my neighborhood. The verification process gives clients confidence, and the payment system is seamless.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Small Business Owner",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "I've hired multiple professionals through this platform for various projects. The quality of service has been consistently excellent, saving me time and money.",
    rating: 5,
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    role: "Freelance Writer",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "The platform's interface is so user-friendly! I've been able to find interesting writing projects in my community that I wouldn't have discovered otherwise.",
    rating: 5,
  },
]

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [language, setLanguage] = useState("en")
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  // Simple translation function
  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof (typeof translations)["en"]] || key
  }

  // Handle hydration mismatch by only rendering animations after mount
  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && ["en", "bn", "hi"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const handleCategoryHover = (index: number) => {
    setActiveCategory(index)
  }

  const handleCategoryLeave = () => {
    setActiveCategory(null)
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }
const testimonials = [
  {
    id: 1,
    name: "Rekha Roy",
    role: "Product Manager",
    rating: 5,
    content: "This product changed the way we work!",
    avatar: "/12.jpg", // 👈 unique image
  },
  {
    id: 2,
    name: "Kartik Roy",
    role: "Software Engineer",
    rating: 4,
    content: "Great experience, will definitely recommend.",
    avatar: "/Kartik",
  },
  {
    id: 3,
    name: "Charlie Lee",
    role: "UX Designer",
    rating: 5,
    content: "Intuitive and beautiful design.",
    avatar: "/HH.jpg",
  },
];

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 md:py-20 lg:py-28">
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-24 h-24 rounded-full border-2 border-dashed border-primary/20 rotate-12 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute bottom-40 right-10 w-16 h-16 rounded-full border-2 border-dotted border-primary/30 -rotate-12 animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute top-1/3 left-1/4 w-12 h-12 border-2 border-primary/20 transform rotate-45 animate-[bounce_6s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/4 right-1/3 w-20 h-20 rounded-full bg-primary/5 animate-[pulse_4s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-secondary/5 animate-[pulse_7s_ease-in-out_infinite]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
                <div className="inline-block mb-3 px-4 py-1 bg-primary/10 rounded-full border border-primary/20">
                  <span className="text-sm font-medium text-primary">
                    ✨ {t("hero.title").split(" ")[0]} {t("hero.title").split(" ")[1]}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="doodle-underline inline-block relative">
                    {t("hero.title")}
                    <span className="absolute -top-6 right-0 text-5xl transform rotate-12 opacity-70">🔍</span>
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-xl">{t("hero.description")}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="retro-button group relative overflow-hidden"
                    onClick={() => navigateTo("/auth/signup")}
                  >
                    <span className="relative z-10">{t("hero.getStarted")}</span>
                    <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-black dark:border-white hover:bg-primary/20 transition-colors group relative"
                    onClick={() => navigateTo("/dashboard/find-jobs")}
                  >
                    <span className="relative z-10 flex items-center">
                      {t("hero.browseJobs")}
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium"
                        >
                          {i}
                        </div>
                      ))}
                    </div>
                    <span className="ml-3 text-sm text-muted-foreground">
                      <span className="font-medium">1,000+</span> active users
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      <span className="font-medium">4.9/5</span> rating
                    </span>
                  </div>
                </div>

                {/* Language selector */}
                <div className="mt-6 flex items-center justify-center lg:justify-start gap-2">
                  <button
                    onClick={() => {
                      setLanguage("en")
                      localStorage.setItem("language", "en")
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      language === "en"
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("bn")
                      localStorage.setItem("language", "bn")
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      language === "bn"
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    বাংলা
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("hi")
                      localStorage.setItem("language", "hi")
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      language === "hi"
                        ? "bg-primary text-white"
                        : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>

                <div
                  className={`relative bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-4 max-w-md mx-auto ${
                    mounted ? "animate-[float_6s_ease-in-out_infinite]" : ""
                  }`}
                >
                  <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full border-2 border-black">
                    NEW
                  </div>
                  <img src="image.png" alt="Local Jobs" className="w-full rounded-sm" />
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-sm border border-gray-200 dark:border-gray-600">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Connect with local professionals</h3>
                        <p className="text-xs text-muted-foreground mt-1">Find trusted experts in your neighborhood</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 doodle-underline inline-block">{t("howItWorks.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("howItWorks.description")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div
                className={`relative bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 h-full transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]`}
                onClick={() => navigateTo("/auth/signup")}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{t("step1.title")}</h3>
                <p className="text-muted-foreground">{t("step1.description")}</p>
              </div>

              {/* Step 2 */}
              <div
                className={`relative bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 h-full transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]`}
                onClick={() => navigateTo("/dashboard/find-jobs")}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{t("step2.title")}</h3>
                <p className="text-muted-foreground">{t("step2.description")}</p>
              </div>

              {/* Step 3 */}
              <div
                className={`relative bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 h-full transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]`}
                onClick={() => navigateTo("/dashboard/messages")}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{t("step3.title")}</h3>
                <p className="text-muted-foreground">{t("step3.description")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 doodle-underline inline-block">{t("categories.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("categories.description")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category 1 */}
              <div
                className={`relative bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 h-full transition-all duration-300 ${
                  activeCategory === 0 ? "scale-105" : ""
                }`}
                onMouseEnter={() => handleCategoryHover(0)}
                onMouseLeave={handleCategoryLeave}
                onClick={() => navigateTo("/categories/home-services")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <HomeIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{t("category.homeServices")}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{t("category.homeServices.description")}</p>
                <div className="text-primary text-sm font-medium flex items-center">
                  {t("explore")} <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {/* Category 2 */}
              <div
                className={`relative bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 h-full transition-all duration-300 ${
                  activeCategory === 1 ? "scale-105" : ""
                }`}
                onMouseEnter={() => handleCategoryHover(1)}
                onMouseLeave={handleCategoryLeave}
                onClick={() => navigateTo("/categories/professional")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{t("category.professional")}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{t("category.professional.description")}</p>
                <div className="text-primary text-sm font-medium flex items-center">
                  {t("explore")} <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {/* Category 3 */}
              <div
                className={`relative bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 h-full transition-all duration-300 ${
                  activeCategory === 2 ? "scale-105" : ""
                }`}
                onMouseEnter={() => handleCategoryHover(2)}
                onMouseLeave={handleCategoryLeave}
                onClick={() => navigateTo("/categories/creative")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{t("category.creative")}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{t("category.creative.description")}</p>
                <div className="text-primary text-sm font-medium flex items-center">
                  {t("explore")} <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>

              {/* Category 4 */}
              <div
                className={`relative bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 h-full transition-all duration-300 ${
                  activeCategory === 3 ? "scale-105" : ""
                }`}
                onMouseEnter={() => handleCategoryHover(3)}
                onMouseLeave={handleCategoryLeave}
                onClick={() => navigateTo("/categories/education")}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{t("category.education")}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{t("category.education.description")}</p>
                <div className="text-primary text-sm font-medium flex items-center">
                  {t("explore")} <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                onClick={() => navigateTo("/categories")}
              >
                {t("categories.viewAll")}
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 doodle-underline inline-block">Featured Opportunities</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the latest jobs and services in your area
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Job Card 1 */}
              <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/10 px-3 py-1 rounded-full text-xs font-medium text-primary">Full-time</div>
                  <div className="text-sm text-muted-foreground">Posted 2 days ago</div>
                </div>
                <h3 className="text-lg font-bold mb-2">Web Developer</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Looking for an experienced web developer to join our growing team. Remote work available.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">$40-60/hr</div>
                  <Button variant="outline" size="sm" className="border-black dark:border-white">
                    Apply Now
                  </Button>
                </div>
              </div>

              {/* Job Card 2 */}
              <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/10 px-3 py-1 rounded-full text-xs font-medium text-primary">Part-time</div>
                  <div className="text-sm text-muted-foreground">Posted 1 day ago</div>
                </div>
                <h3 className="text-lg font-bold mb-2">House Cleaning Service</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Professional house cleaning service available for weekly or bi-weekly appointments.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">$25-35/hr</div>
                  <Button variant="outline" size="sm" className="border-black dark:border-white">
                    Contact
                  </Button>
                </div>
              </div>

              {/* Job Card 3 */}
              <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)]">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/10 px-3 py-1 rounded-full text-xs font-medium text-primary">Contract</div>
                  <div className="text-sm text-muted-foreground">Posted 3 days ago</div>
                </div>
                <h3 className="text-lg font-bold mb-2">Math Tutor</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Experienced math tutor available for high school and college students. In-person or online.
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">$30-45/hr</div>
                  <Button variant="outline" size="sm" className="border-black dark:border-white">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                variant="outline"
                className="border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                onClick={() => navigateTo("/dashboard/find-jobs")}
              >
                View All Opportunities
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-24 h-24 rounded-full border-2 border-dashed border-primary/20 rotate-12 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute bottom-40 right-10 w-16 h-16 rounded-full border-2 border-dotted border-primary/30 -rotate-12 animate-[spin_15s_linear_infinite_reverse]"></div>
          </div>

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 doodle-underline inline-block">What Our Users Say</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Hear from people who have found success on our platform
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto" ref={testimonialsRef}>
              {/* Testimonial slider */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.8)] p-6 md:p-8 relative">
                        <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <Quote className="h-5 w-5 text-white" />
                        </div>
                        <div className="mb-6">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-lg mb-6 italic">{testimonial.content}</p>
                        <div className="flex items-center">
                          <img
                            src={
  testimonial.avatar ||
  `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}`
}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full border-2 border-primary mr-4"
                          />
                          <div>
                            <h4 className="font-bold">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] flex items-center justify-center hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] transition-all z-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] flex items-center justify-center hover:translate-y-[2px] hover:translate-x-[-2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] transition-all z-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Dots indicator */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentTestimonial === index ? "bg-primary w-6" : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-primary text-black relative overflow-hidden">
          {/* Doodle elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full border-2 border-dashed border-black/20 rotate-12"></div>
            <div className="absolute bottom-20 left-10 w-16 h-16 rounded-full border-2 border-dotted border-black/30 -rotate-12"></div>
            <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-black/20 transform rotate-45"></div>
          </div>

          <div className="container mx-auto relative z-10">
            <div className="relative bg-white dark:bg-gray-800 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.8)] p-8 max-w-3xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("cta.title")}</h2>
                <p className="text-xl text-muted-foreground mb-8">{t("cta.description")}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-black border-2 border-black"
                    onClick={() => navigateTo("/auth/signup")}
                  >
                    {t("cta.signUp")}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-black dark:border-white hover:bg-primary/20"
                    onClick={() => navigateTo("/how-it-works")}
                  >
                    {t("cta.learnMore")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DoodleFooter />

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="bg-primary text-black w-14 h-14 rounded-full flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          onClick={() => navigateTo("/dashboard/messages")}
          aria-label="Chat with us"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
