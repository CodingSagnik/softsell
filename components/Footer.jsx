import Link from 'next/link';
import { FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="mr-2 text-2xl font-bold text-primary-600 dark:text-primary-400">S</div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">SoftSell</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-400 max-w-xs">
              Transforming the way businesses monetize unused software licenses since 2022.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">
                <FiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">License Valuation</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">Software Resale</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">License Transfer</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">Compliance Check</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 SoftSell. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-700 hover:text-primary-600 dark:hover:text-white transition-colors">Privacy Policy</a>
              <span className="mx-2">·</span>
              <a href="#" className="text-gray-700 hover:text-primary-600 dark:hover:text-white transition-colors">Terms of Service</a>
              <span className="mx-2">·</span>
              <a href="#" className="text-gray-700 hover:text-primary-600 dark:hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 