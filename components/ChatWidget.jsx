'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCalendar, FiHelpCircle, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

// Wrapper component to properly position the chat widget
const ChatWidgetContainer = ({ children }) => {
  return (
    <div className="relative z-10">
      {children}
    </div>
  );
};

export default function ChatWidget() {
  // Retrieve chat history from localStorage if available
  const getSavedMessages = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('softSellChatHistory');
      return saved ? JSON.parse(saved) : [
        { sender: 'bot', text: 'Hi there! 👋 How can I help you with software license reselling today?' }
      ];
    }
    return [{ sender: 'bot', text: 'Hi there! 👋 How can I help you with software license reselling today?' }];
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(getSavedMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
  });
  const [conversationContext, setConversationContext] = useState({
    licenseType: null,
    userIntent: null,
    stage: 'initial' // initial, inquiry, valuation, contact
  });
  const messagesEndRef = useRef(null);

  const softwareLicenses = {
    enterprise: ['Microsoft 365', 'Windows Server', 'SQL Server', 'Oracle Database', 'SAP ERP'],
    design: ['Adobe Creative Cloud', 'AutoCAD', 'Maya', '3ds Max', 'Solidworks'],
    development: ['Visual Studio', 'IntelliJ IDEA', 'JetBrains Suite', 'Unity Pro', 'Unreal Engine'],
    security: ['Norton', 'McAfee', 'Kaspersky', 'Bitdefender', 'Symantec'],
    cloud: ['AWS', 'Microsoft Azure', 'Google Cloud', 'IBM Cloud', 'Oracle Cloud']
  };

  const exampleQuestions = [
    'How do I sell my software license?',
    'What licenses do you accept?',
    'How much is my license worth?',
    'How long does the process take?',
    'Do you buy Adobe licenses?',
    'Can I schedule a consultation?'
  ];

  // Save messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      localStorage.setItem('softSellChatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateConversationContext = (text) => {
    const lowerText = text.toLowerCase();
    
    // Detect license type
    for (const [category, licenses] of Object.entries(softwareLicenses)) {
      for (const license of licenses) {
        if (lowerText.includes(license.toLowerCase())) {
          setConversationContext(prev => ({ ...prev, licenseType: license }));
          break;
        }
      }
    }
    
    // Detect user intent
    if (lowerText.includes('sell') || lowerText.includes('offer')) {
      setConversationContext(prev => ({ ...prev, userIntent: 'sell', stage: 'inquiry' }));
    } else if (lowerText.includes('worth') || lowerText.includes('value') || lowerText.includes('price')) {
      setConversationContext(prev => ({ ...prev, userIntent: 'valuation', stage: 'valuation' }));
    } else if (lowerText.includes('contact') || lowerText.includes('speak') || lowerText.includes('talk')) {
      setConversationContext(prev => ({ ...prev, userIntent: 'contact', stage: 'contact' }));
    } else if (lowerText.includes('book') || lowerText.includes('schedule') || lowerText.includes('appoint')) {
      setConversationContext(prev => ({ ...prev, userIntent: 'schedule', stage: 'contact' }));
    }
  };

  const getContextualResponse = () => {
    // Provide a contextual response based on the conversation context
    if (conversationContext.licenseType) {
      if (conversationContext.userIntent === 'valuation') {
        return `Based on current market trends, ${conversationContext.licenseType} licenses can fetch a good price. To get an accurate valuation for your specific license, please provide more details about version, purchase date, and subscription type.`;
      } 
      if (conversationContext.userIntent === 'sell') {
        return `Great! We have high demand for ${conversationContext.licenseType} licenses. Would you like to get a valuation or proceed directly to selling your license?`;
      }
    }
    return null; // No contextual response available
  };

  const handleLeadFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    if (!leadFormData.name || !leadFormData.email || !leadFormData.company) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Please fill out all required fields.' }]);
      return;
    }
    
    // Add confirmation message
    setMessages(prev => [
      ...prev, 
      { sender: 'user', text: `Contact Request: ${leadFormData.name} from ${leadFormData.company}` },
      { 
        sender: 'bot', 
        text: `Thanks, ${leadFormData.name}! Our team will contact you at ${leadFormData.email} within one business day to discuss your ${leadFormData.licenseType || 'software license'} needs.` 
      }
    ]);
    
    // Reset form and hide it
    setShowLeadForm(false);
    setLeadFormData({
      name: '',
      email: '',
      company: '',
      licenseType: '',
    });
    
    setConversationContext(prev => ({ ...prev, stage: 'follow-up' }));
  };

  const handleLeadFormChange = (e) => {
    const { name, value } = e.target;
    setLeadFormData(prev => ({ ...prev, [name]: value }));
  };

  const showContactForm = () => {
    setShowLeadForm(true);
    setMessages(prev => [...prev, { sender: 'bot', text: 'Please fill out the contact form below and our team will reach out to you shortly.' }]);
  };

  const scheduleConsultation = () => {
    setMessages(prev => [
      ...prev, 
      { sender: 'user', text: 'I want to schedule a consultation.' },
      { 
        sender: 'bot', 
        text: 'I\'d be happy to help you schedule a consultation with one of our licensing experts. Please provide your contact information and preferred time.' 
      }
    ]);
    showContactForm();
  };

  const requestValuation = () => {
    setMessages(prev => [
      ...prev, 
      { sender: 'user', text: 'I want a license valuation.' },
      { 
        sender: 'bot', 
        text: 'To provide an accurate valuation of your software license, we\'ll need some details. Please fill out the form below, and our team will get back to you with a valuation within 24 hours.' 
      }
    ]);
    showContactForm();
  };

  const clearChat = () => {
    setMessages([{ sender: 'bot', text: 'Hi there! 👋 How can I help you with software license reselling today?' }]);
    localStorage.removeItem('softSellChatHistory');
    setConversationContext({
      licenseType: null,
      userIntent: null,
      stage: 'initial'
    });
  };

  const generateTypingDelay = (text) => {
    // Generate a realistic typing delay based on message length
    const baseDelay = 500;
    const charsPerSecond = 20;
    return Math.min(baseDelay + (text.length / charsPerSecond) * 1000, 3000);
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputValue('');
    setIsTyping(true);

    // Update conversation context
    updateConversationContext(text);

    // Simulate bot response after delay
    setTimeout(() => {
      let botResponse = '';
      
      // Check for contextual response first
      const contextResponse = getContextualResponse();
      
      if (contextResponse) {
        botResponse = contextResponse;
      } else {
        // Basic response logic based on keywords
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
          botResponse = 'Hello! How can I assist you with software license reselling today?';
        } else if (lowerText.includes('sell') || lowerText.includes('how') && lowerText.includes('work')) {
          botResponse = 'To sell your software license, we follow a simple 3-step process:\n\n1. Submit your license details through our contact form\n2. Receive a competitive offer within 24 hours\n3. Accept the offer and get paid within 3-5 business days\n\nWould you like me to help you get started?';
        } else if (lowerText.includes('license') && (lowerText.includes('accept') || lowerText.includes('type'))) {
          botResponse = 'We accept most major software licenses including:\n\n• Enterprise: Microsoft 365, Windows Server, Oracle, SAP\n• Design: Adobe Creative Cloud, AutoCAD, Maya\n• Development: Visual Studio, JetBrains, Unity Pro\n• Security: Norton, McAfee, Symantec\n• Cloud: AWS, Azure, Google Cloud\n\nDo you have a specific license you\'re looking to sell?';
        } else if (lowerText.includes('worth') || lowerText.includes('value') || lowerText.includes('price')) {
          botResponse = 'The value of your license depends on several factors:\n\n• Software type and version\n• Remaining subscription time\n• Market demand\n• License transferability\n\nFor an accurate valuation, please let me know what software license you have, or fill out our valuation form.';
        } else if (lowerText.includes('time') || lowerText.includes('long') || lowerText.includes('process')) {
          botResponse = 'Our process is quick and efficient:\n\n• Valuation: Within 24 hours of submission\n• Offer acceptance: Immediate\n• Payment processing: 3-5 business days\n\nThe entire process typically takes less than a week from start to finish.';
        } else if (lowerText.includes('contact') || lowerText.includes('speak') || lowerText.includes('talk')) {
          botResponse = 'I\'d be happy to connect you with our team. Would you like to fill out a contact form, or would you prefer to schedule a call with one of our licensing experts?';
          setTimeout(() => showContactForm(), 1000);
        } else if (lowerText.includes('book') || lowerText.includes('schedule') || lowerText.includes('appoint')) {
          botResponse = 'I can help you schedule a free consultation with one of our licensing experts. Please provide your contact information and preferred time.';
          setTimeout(() => showContactForm(), 1000);
        } else if (lowerText.includes('thank')) {
          botResponse = 'You\'re welcome! Is there anything else I can help you with regarding software license reselling?';
        } else if (lowerText.includes('adobe')) {
          botResponse = 'Yes, we frequently buy and sell Adobe licenses, particularly Creative Cloud subscriptions. These tend to have good resale value. Would you like a valuation for your Adobe license?';
        } else if (lowerText.includes('microsoft') || lowerText.includes('windows') || lowerText.includes('office')) {
          botResponse = 'Microsoft licenses are in high demand. We accept Microsoft 365, Windows Server, SQL Server, and other Microsoft products. Would you like to know how much your Microsoft license is worth?';
        } else if (lowerText.includes('payment') || lowerText.includes('pay') || lowerText.includes('money')) {
          botResponse = 'We offer multiple payment options including bank transfer, PayPal, and check. Once your license transfer is verified, payment is sent within 3-5 business days.';
        } else if (lowerText.includes('safe') || lowerText.includes('secure') || lowerText.includes('trust')) {
          botResponse = 'Security is our top priority. We use industry-standard encryption for all transactions, and your information is never shared with third parties. We\'ve facilitated thousands of secure license transfers since 2022.';
        } else if (lowerText.includes('clear') || lowerText.includes('reset') || lowerText.includes('restart')) {
          botResponse = 'I\'ve reset our conversation. How can I help you with software license reselling today?';
          setTimeout(() => clearChat(), 500);
          return;
        } else {
          botResponse = 'Thank you for your message. For specific questions about your license, I can connect you with our team who can provide expert guidance tailored to your situation. Would you like to speak with a licensing specialist?';
        }
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, generateTypingDelay(text));
  };

  return (
    <ChatWidgetContainer>
      {/* Chat toggle button */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleToggleChat}
        className="fixed z-20 bottom-6 right-6 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        aria-label="Toggle chat"
      >
        {isOpen ? <FiX className="h-6 w-6" /> : <FiMessageSquare className="h-6 w-6" />}
      </motion.button>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-10 bottom-24 right-6 w-full sm:w-96 md:w-[450px] lg:w-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
            style={{ maxHeight: 'min(calc(100vh - 200px), 600px)' }}
          >
            {/* Chat header */}
            <div className="p-4 bg-primary-600 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">SoftSell Assistant</h3>
                  <p className="text-sm text-primary-100">Ask us anything about license reselling</p>
                </div>
                <button 
                  onClick={clearChat} 
                  className="text-xs bg-primary-700 hover:bg-primary-800 text-white px-2 py-1 rounded"
                  title="Clear conversation"
                >
                  Clear Chat
                </button>
              </div>
            </div>
            
            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-sm p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    {message.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < message.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              
              {showLeadForm && (
                <div className="mb-4 flex justify-start">
                  <div className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                    <form onSubmit={handleLeadFormSubmit} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium">Name *</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={leadFormData.name} 
                          onChange={handleLeadFormChange} 
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Email *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={leadFormData.email} 
                          onChange={handleLeadFormChange} 
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Company *</label>
                        <input 
                          type="text" 
                          name="company" 
                          value={leadFormData.company} 
                          onChange={handleLeadFormChange} 
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">License Type</label>
                        <select 
                          name="licenseType" 
                          value={leadFormData.licenseType} 
                          onChange={handleLeadFormChange} 
                          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm shadow-sm"
                        >
                          <option value="">Select a license type</option>
                          <option value="Microsoft">Microsoft Products</option>
                          <option value="Adobe">Adobe Products</option>
                          <option value="Development">Development Tools</option>
                          <option value="Enterprise">Enterprise Software</option>
                          <option value="Cloud">Cloud Services</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button 
                          type="button" 
                          onClick={() => setShowLeadForm(false)} 
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="px-3 py-2 bg-primary-600 text-white text-sm font-medium rounded-md"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="max-w-xs sm:max-w-sm p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick Actions */}
            <div className="p-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 grid grid-cols-4 gap-1">
              <button 
                onClick={requestValuation}
                className="flex flex-col items-center justify-center p-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <FiDollarSign className="h-4 w-4 mb-1" />
                Valuation
              </button>
              <button 
                onClick={scheduleConsultation}
                className="flex flex-col items-center justify-center p-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <FiCalendar className="h-4 w-4 mb-1" />
                Schedule
              </button>
              <button 
                onClick={() => handleSendMessage("What licenses do you accept?")}
                className="flex flex-col items-center justify-center p-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <FiCheckCircle className="h-4 w-4 mb-1" />
                Licenses
              </button>
              <button 
                onClick={() => handleSendMessage("How does the process work?")}
                className="flex flex-col items-center justify-center p-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <FiHelpCircle className="h-4 w-4 mb-1" />
                Help
              </button>
            </div>
            
            {/* Example questions - show only initially */}
            {messages.length < 3 && !showLeadForm && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Chat input */}
            {!showLeadForm && (
              <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className={`p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                      !inputValue.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <FiSend className="h-5 w-5" />
                  </button>
                </form>
              </div>
            )}
            
            {/* Chat footer */}
            <div className="px-3 py-2 text-xs text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex justify-center space-x-3">
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</a>
                <span>·</span>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</a>
                <span>·</span>
                <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400">Contact</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ChatWidgetContainer>
  );
} 