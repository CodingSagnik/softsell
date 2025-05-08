'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="home" className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-20 right-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full opacity-50 blur-3xl"
        animate={{ 
          x: [0, 10, 0], 
          y: [0, -15, 0] 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-32 h-32 bg-secondary-100 dark:bg-secondary-900/20 rounded-full opacity-40 blur-2xl"
        animate={{ 
          x: [0, -10, 0], 
          y: [0, 15, 0] 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="inline-block px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-4"
            >
              Maximize Your Software Investment
            </motion.span>
            
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            >
              <span className="block">Unlock the Value of</span>
              <span className="block text-primary-600 dark:text-primary-400">Your Unused Software</span>
            </motion.h1>
            
            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl"
            >
              SoftSell helps businesses monetize unused software licenses quickly and at the best market rates. Turn your idle assets into cash with just a few clicks.
            </motion.p>
            
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  href="#contact"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  aria-label="Sell your software licenses now"
                >
                  Sell My Licenses
                </Link>
              </motion.div>
              
              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
              >
                <Link 
                  href="#how-it-works"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-base font-medium rounded-md text-primary-600 bg-white border border-primary-200 hover:bg-primary-50 transition-colors dark:bg-gray-800 dark:text-primary-400 dark:border-gray-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  aria-label="Learn about our process"
                >
                  Learn How It Works
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            className="hidden lg:block relative"
            aria-hidden="true"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl opacity-20 blur-xl"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 1, 0],
                opacity: [0.2, 0.25, 0.2]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut" 
              }}
            />
            
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100 
              }}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-6">
                <motion.div 
                  className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"
                  whileHover={{ rotate: 15, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
                
                <div>
                  <motion.div 
                    className="h-2.5 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"
                    animate={{ width: [0, 24*4] }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.div 
                    className="mt-2 h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"
                    animate={{ width: [0, 32*4] }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
                
                <motion.div 
                  className="h-14 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="h-12 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  />
                  <motion.div 
                    className="h-12 bg-primary-500 rounded-lg"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 