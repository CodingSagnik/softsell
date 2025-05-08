'use client';

import { motion } from 'framer-motion';
import { FiUpload, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

export default function HowItWorks() {
  const steps = [
    {
      icon: <FiUpload className="h-10 w-10" />,
      title: 'Upload License',
      description: 'Securely upload your software license details through our simple form.'
    },
    {
      icon: <FiDollarSign className="h-10 w-10" />,
      title: 'Get Valuation',
      description: 'Receive a competitive market valuation within 24 hours.'
    },
    {
      icon: <FiCheckCircle className="h-10 w-10" />,
      title: 'Get Paid',
      description: 'Accept our offer and get paid via your preferred payment method.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    },
    hover: { 
      y: -10, 
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        duration: 0.3 
      }
    }
  };
  
  const iconContainerVariants = {
    hidden: { scale: 0, rotate: -15 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 200, 
        damping: 15,
        delay: 0.2
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.9, duration: 0.5 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-30" />
      
      <motion.div 
        className="absolute -top-32 -left-32 w-64 h-64 bg-primary-100 dark:bg-primary-900/10 rounded-full opacity-50 blur-3xl"
        animate={{ 
          x: [0, 20, 0], 
          y: [0, 20, 0] 
        }}
        transition={{ 
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut" 
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
            Simple 3-Step Process
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
          >
            How It Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Our streamlined process makes selling software licenses quick and hassle-free.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center relative"
              variants={stepVariants}
              whileHover="hover"
            >
              {/* Step number */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + (index * 0.2), duration: 0.5, type: "spring" }}
                className="absolute -top-3 -right-3 bg-primary-600 dark:bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
              >
                {index + 1}
              </motion.div>
              
              {/* Icon */}
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6 mx-auto"
                variants={iconContainerVariants}
                whileHover="hover"
              >
                {step.icon}
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold mb-3 text-gray-900 dark:text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (index * 0.1) }}
              >
                {step.title}
              </motion.h3>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                {step.description}
              </motion.p>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-6 w-12 h-1 bg-primary-200 dark:bg-primary-800 z-0">
                  <motion.div 
                    className="h-full bg-primary-500 dark:bg-primary-400" 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + (index * 0.2), duration: 0.7 }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <motion.a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover="hover"
            whileTap="tap"
          >
            Start Now
          </motion.a>
        </div>
      </div>
    </section>
  );
} 