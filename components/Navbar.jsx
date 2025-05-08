'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    // Add a temporary class to disable transitions on body
    // This prevents the "flash" during theme change
    document.documentElement.classList.add('no-transition');
    
    // Toggle the theme
    setTheme(theme === 'light' ? 'dark' : 'light');
    
    // Force a reflow to ensure the class is applied
    document.documentElement.offsetHeight;
    
    // Remove the no-transition class after a short delay
    setTimeout(() => {
      document.documentElement.classList.remove('no-transition');
    }, 20);
  };

  // Variants for the theme toggle icon animation
  const sunMoonVariants = {
    light: { 
      rotate: 0,
      scale: 1,
      color: "#374151" // gray-700
    },
    dark: { 
      rotate: 180,
      scale: 1,
      color: "#9CA3AF" // gray-400
    }
  };

  const iconContainerVariants = {
    light: {
      backgroundColor: "rgba(243, 244, 246, 0.1)", // gray-100 with low opacity
      borderRadius: "50%"
    },
    dark: {
      backgroundColor: "rgba(31, 41, 55, 0.2)", // gray-800 with low opacity
      borderRadius: "50%"
    },
    hover: {
      scale: 1.1
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${scrolled ? 'shadow-md' : ''} bg-white/95 backdrop-blur dark:bg-gray-900/95 dark:border-gray-800`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/#home" className="flex items-center" aria-label="SoftSell Homepage">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="mr-2 text-2xl font-bold text-primary-600 dark:text-primary-400"
                aria-hidden="true"
              >
                S
              </motion.div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">SoftSell</span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-8" aria-label="Main Navigation">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: i * 0.1,
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  scale: 1.05,
                  color: "#4F46E5",
                  transition: { duration: 0.2 }
                }}
                className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              variants={iconContainerVariants}
              animate={theme}
              whileHover="hover"
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={sunMoonVariants}
                animate={theme}
                initial="light"
                transition={{ 
                  duration: 0.5, 
                  type: "spring",
                  stiffness: 200, 
                  damping: 10
                }}
                className="h-6 w-6 flex items-center justify-center"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'light' ? (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiMoon className="h-5 w-5" aria-hidden="true" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiSun className="h-5 w-5" aria-hidden="true" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
            
            <div className="ml-4 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? <FiX className="h-6 w-6" aria-hidden="true" /> : <FiMenu className="h-6 w-6" aria-hidden="true" />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800"
            aria-label="Mobile Navigation"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-col space-y-3">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: i * 0.1,
                      ease: "easeOut" 
                    }}
                    className="px-3 py-2 text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
} 