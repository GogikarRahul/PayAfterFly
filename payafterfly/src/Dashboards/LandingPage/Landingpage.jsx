import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlane, FaGlobeAmericas, FaWallet, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";
import "./LandingPage.css";

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      country: "Canada",
      text: "Thanks to Pay After Fly, I got my dream job in Germany without upfront visa costs!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      country: "Australia",
      text: "The process was seamless. I paid only after I started working in my new country.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Amina Diallo",
      country: "France",
      text: "As a student, this service was a lifesaver. No financial stress before my studies!",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];

  const features = [
    { icon: <FaPlane />, title: "Fly First", description: "Travel to your destination before paying visa fees" },
    { icon: <FaWallet />, title: "Pay Later", description: "Settle visa costs after you start earning" },
    { icon: <FaCheckCircle />, title: "Verified Providers", description: "Government-approved visa sponsors" },
    { icon: <FaGlobeAmericas />, title: "Global Network", description: "Opportunities in 50+ countries" }
  ];

  const destinations = [
    { name: "Canada", flag: "🇨🇦", visas: 124 },
    { name: "Germany", flag: "🇩🇪", visas: 89 },
    { name: "Australia", flag: "🇦🇺", visas: 76 },
    { name: "Japan", flag: "🇯🇵", visas: 65 },
    { name: "USA", flag: "🇺🇸", visas: 112 },
    { name: "UK", flag: "🇬🇧", visas: 98 }
  ];

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="animated-bg">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-plane"
            initial={{ x: -100, y: Math.random() * window.innerHeight }}
            animate={{
              x: window.innerWidth + 100,
              y: Math.random() * window.innerHeight,
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          >
            <FaPlane />
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <RiVisaFill className="logo-icon" />
          <span>PayAfterFly</span>
        </div>
      
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Your Dream Visa, <span>Pay After You Fly</span></h1>
          <p>Secure your international opportunity without upfront visa costs. Pay only after you start earning in your new country.</p>
          <div className="cta-buttons">
            <button className="primary-btn">
              Find Visa Opportunities <FaArrowRight />
            </button>
            <button className="secondary-btn">
              Browse All Visas
            </button>
          </div>
        </motion.div>
        <motion.div
          className="hero-image"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Travel" />
          <motion.div 
            className="passport-stamp"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <RiVisaFill />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Why Choose <span>PayAfterFly</span></h2>
          <p>We revolutionize the visa process to make international opportunities accessible to everyone</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              whileHover={{ y: -10, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-header">
          <h2>How <span>It Works</span></h2>
          <p>Simple steps to your international opportunity</p>
        </div>
        <div className="steps-container">
          <motion.div
            className="step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="step-number">1</div>
            <h3>Find Your Visa</h3>
            <p>Browse verified visa opportunities from employers and sponsors worldwide</p>
          </motion.div>
          <motion.div
            className="step"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="step-number">2</div>
            <h3>Apply & Get Approved</h3>
            <p>Submit your application and get pre-approved without upfront payment</p>
          </motion.div>
          <motion.div
            className="step"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="step-number">3</div>
            <h3>Fly & Start Working</h3>
            <p>Travel to your destination and begin your new job or studies</p>
          </motion.div>
          <motion.div
            className="step"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="step-number">4</div>
            <h3>Pay As You Earn</h3>
            <p>Flexible payment plan starts only after you receive your first paycheck</p>
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="destinations-section">
        <div className="section-header">
          <h2>Popular <span>Destinations</span></h2>
          <p>Explore visa opportunities in these top countries</p>
        </div>
        <div className="destinations-grid">
          {destinations.map((country, index) => (
            <motion.div
              key={index}
              className="country-card"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="country-flag">{country.flag}</div>
              <h3>{country.name}</h3>
              <p>{country.visas}+ visa opportunities</p>
              <button className="explore-btn">
                Explore <FaArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <h2>Success <span>Stories</span></h2>
          <p>Hear from people who changed their lives with PayAfterFly</p>
        </div>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`testimonial-card ${index === currentSlide ? "active" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-content">
                <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
                <div className="testimonial-text">
                  <p>"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.country}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-card"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands who've unlocked international opportunities without financial barriers</p>
          <div className="cta-buttons">
            <button className="primary-btn">
              Get Started <FaArrowRight />
            </button>
            <button className="secondary-btn">
              Learn More
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <RiVisaFill className="logo-icon" />
            <span>PayAfterFly</span>
            <p>Making global opportunities accessible to all</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#">Help Center</a>
              <a href="#">Visa Guides</a>
              <a href="#">Country Info</a>
              <a href="#">FAQ</a>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} PayAfterFly. All rights reserved.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;