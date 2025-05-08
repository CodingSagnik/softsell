'use client';

import { motion } from 'framer-motion';
import { FiShield, FiDollarSign, FiClock, FiUsers } from 'react-icons/fi';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <FiDollarSign className="h-6 w-6" />,
      title: 'Best Market Rates',
      description: 'We offer competitive prices for your unused software licenses, ensuring maximum return on your investment.'
    },
    {
      icon: <FiClock className="h-6 w-6" />,
      title: 'Fast Process',
      description: 'Our streamlined process means you can get a valuation quickly and receive payment within days, not weeks.'
    },
    {
      icon: <FiShield className="h-6 w-6" />,
      title: 'Secure Transactions',
      description: 'Your license details and financial information are protected with enterprise-grade security.'
    },
    {
      icon: <FiUsers className="h-6 w-6" />,
      title: 'Expert Support',
      description: 'Our team of licensing experts is available to help you navigate the resale process.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    },
    hover: { 
      y: -10, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconContainerVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 200,
        delay: 0.2
      }
    },
    hover: { 
      scale: 1.15,
      rotate: [0, -10, 10, -5, 0],
      transition: { 
        duration: 0.6
      }
    }
  };

  return (
    <section id="why-choose-us" className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-primary-500 to-transparent opacity-30" />
      
      <motion.div 
        className="absolute top-20 right-20 w-80 h-80 bg-primary-100 dark:bg-primary-900/10 rounded-full opacity-40 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute -bottom-40 -left-20 w-80 h-80 bg-secondary-100 dark:bg-secondary-900/10 rounded-full opacity-30 blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 text-xs font-medium text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/30 rounded-full mb-3"
          >
            Why SoftSell
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
          >
            Why Choose Us
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Our specialized expertise in software license reselling provides you with significant advantages.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 relative group"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="relative z-10">
                <motion.div 
                  className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                  variants={iconContainerVariants}
                  whileHover="hover"
                >
                  {reason.icon}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{reason.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{reason.description}</p>
                </motion.div>
              </div>
              
              {/* Background decoration */}
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.05, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + (index * 0.1), duration: 1 }}
              >
                {index === 0 && <FiDollarSign className="w-full h-full" />}
                {index === 1 && <FiClock className="w-full h-full" />}
                {index === 2 && <FiShield className="w-full h-full" />}
                {index === 3 && <FiUsers className="w-full h-full" />}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <span>Contact us to learn more</span>
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 