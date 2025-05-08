'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "SoftSell helped our company recover over $15,000 from unused enterprise software licenses. The process was quick and completely hassle-free.",
      author: {
        name: "Sarah Johnson",
        role: "IT Director",
        company: "Nexus Technologies"
      }
    },
    {
      quote: "I was skeptical at first, but SoftSell offered us a fair price for our unused licenses and handled the transfer process professionally. Highly recommended!",
      author: {
        name: "Michael Chen",
        role: "CFO",
        company: "Quantum Solutions"
      }
    }
  ];

  const cardVariants = {
    offscreen: { 
      y: 50, 
      opacity: 0 
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.8
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Don't just take our word for it — hear from businesses that have successfully sold their licenses with us.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl relative border border-gray-300 dark:border-gray-700 shadow-sm transition-all duration-300"
            >
              <div className="flex mb-4" aria-label="Rating: 5 out of 5 stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="relative z-10 mb-6 py-3 px-4 border-l-4 border-primary-500 dark:border-primary-400 bg-white/50 dark:bg-gray-800/70 rounded shadow-sm">
                <div className="relative">
                  <span className="absolute top-0 left-0 text-5xl leading-none text-primary-400 dark:text-primary-300 opacity-80 -ml-3 -mt-2 font-serif" aria-hidden="true">"</span>
                  <p className="relative z-10 text-lg text-gray-800 dark:text-gray-200 pl-5 pr-2">{testimonial.quote}</p>
                  <span className="absolute bottom-0 right-0 text-5xl leading-none text-primary-400 dark:text-primary-300 opacity-80 -mr-2 -mb-5 font-serif" aria-hidden="true">"</span>
                </div>
              </blockquote>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-gray-700 dark:text-gray-300 text-lg font-semibold">
                  {testimonial.author.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author.name}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-400">{testimonial.author.role}, {testimonial.author.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Get Started Today
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 