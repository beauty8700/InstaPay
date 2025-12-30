import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HelpSupport() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });
  const navigate = useNavigate();

  const faqs = {
    general: [
      {
        question: "How do I create an account?",
        answer: "Click on 'Sign Up' and fill in your details including name, email, and password."
      },
      {
        question: "How do I add money to my wallet?",
        answer: "Go to Dashboard → Click 'Add Money' → Enter amount → Confirm payment."
      },
      {
        question: "How do I send money to someone?",
        answer: "Go to Dashboard → Click 'Send Money' → Enter recipient's email and amount → Confirm."
      }
    ],
    payments: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept bank transfers, UPI, credit/debit cards, and wallet balance."
      },
      {
        question: "How long do transactions take?",
        answer: "Instant transfers between InstaPay users. Bank transfers take 1-3 business days."
      },
      {
        question: "Can I cancel a transaction?",
        answer: "Once initiated, transactions cannot be cancelled. Contact support for disputes."
      }
    ],
    security: [
      {
        question: "Is my money safe?",
        answer: "Yes, we use bank-grade security with encryption and secure payment gateways."
      },
      {
        question: "What is two-factor authentication?",
        answer: "2FA adds an extra security layer requiring a code from your phone/email."
      },
      {
        question: "How do I report suspicious activity?",
        answer: "Contact our support team immediately or use the in-app reporting feature."
      }
    ],
    account: [
      {
        question: "How do I change my password?",
        answer: "Go to Profile → Security → Change Password."
      },
      {
        question: "How do I update my profile information?",
        answer: "Go to Profile → Settings to update your personal information."
      },
      {
        question: "How do I delete my account?",
        answer: "Contact support with your account details to request account deletion."
      }
    ]
  };

  const handleContactSubmit = () => {
    if (contactForm.subject && contactForm.message) {
      alert('Your message has been sent! We\'ll get back to you within 24 hours.');
      setContactForm({ subject: '', message: '' });
      setShowContactForm(false);
    }
  };

  const filteredFaqs = faqs[selectedCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 px-4 max-w-md mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Help & Support</h2>
        <button
          onClick={() => navigate('/Profile')}
          className="text-pink-500 text-sm"
        >
          ← Back
        </button>
      </div>

      
      <div className="bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      
      <div className="flex space-x-2 overflow-x-auto">
        {Object.keys(faqs).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

     
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-600 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>

      
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-3">Still need help?</h3>
        <p className="text-gray-600 text-sm mb-4">
          Can't find what you're looking for? Our support team is here to help.
        </p>

        {!showContactForm ? (
          <button
            onClick={() => setShowContactForm(true)}
            className="w-full bg-pink-500 text-white py-2 rounded-lg"
          >
            Contact Support
          </button>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Subject"
              value={contactForm.subject}
              onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Describe your issue..."
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            <div className="flex gap-2">
              <button
                onClick={handleContactSubmit}
                className="flex-1 bg-pink-500 text-white py-2 rounded-lg"
              >
                Send Message
              </button>
              <button
                onClick={() => setShowContactForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">📞 Quick Contact</h3>
        <div className="space-y-2 text-blue-700 text-sm">
          <p>📧 Email: support@instapay.com</p>
          <p>📱 Phone: +91-1800-XXX-XXXX</p>
          <p>💬 Live Chat: Available 24/7</p>
          <p>📍 Address: Tech Park, Bangalore</p>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;