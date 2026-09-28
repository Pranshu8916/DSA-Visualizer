import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, User, Code, FileText, 
  HelpCircle, Mail, Info, BarChart2, Menu, X, ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed w-[calc(100%-2rem)] max-w-6xl mx-auto left-0 right-0 top-4 bg-[#F8FBFF] backdrop-blur-lg rounded-2xl border border-[#9BC8FF] text-[#1A2340] z-50 transition-all duration-300 shadow-lg shadow-[#1A2340]/5">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="text-xl md:text-2xl flex items-center font-extrabold tracking-tight text-[#1A2340] hover:text-[#3B78C8] transition duration-300 gap-2.5"
        >
          {/* Custom DSA Network Logo Icon */}
          <div className="w-8 h-8 rounded-xl bg-[#1A2340] flex items-center justify-center p-1.5 shadow-sm border border-[#9BC8FF]/50 shrink-0">
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
              <path d="M32 15 L18 34 M32 15 L46 34 M18 34 L12 49 M18 34 L25 49 M46 34 L39 49 M46 34 L52 49" stroke="#9BC8FF" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="32" cy="15" r="7" fill="#3B78C8" stroke="#F8FBFF" strokeWidth="2.5"/>
              <circle cx="18" cy="34" r="5.5" fill="#3B78C8" stroke="#9BC8FF" strokeWidth="2"/>
              <circle cx="46" cy="34" r="5.5" fill="#3B78C8" stroke="#9BC8FF" strokeWidth="2"/>
              <circle cx="12" cy="49" r="4" fill="#D9ECFF"/>
              <circle cx="25" cy="49" r="4" fill="#D9ECFF"/>
              <circle cx="39" cy="49" r="4" fill="#D9ECFF"/>
              <circle cx="52" cy="49" r="4" fill="#D9ECFF"/>
            </svg>
          </div>
          <span>DSA<span className="text-[#3B78C8]">Visualizer</span></span>
          <span className="text-[11px] font-bold text-[#3B78C8] bg-[#D9ECFF] px-2.5 py-0.5 rounded-full border border-[#9BC8FF] hidden sm:inline-flex items-center">
            by Pranshu Bodara
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 lg:space-x-8 items-center">
          <li>
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-sm lg:text-base text-[#1A2340] hover:text-[#3B78C8] font-semibold transition duration-300"
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-sm lg:text-base text-[#1A2340] hover:text-[#3B78C8] font-semibold transition duration-300"
            >
              Features
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm lg:text-base text-[#1A2340] hover:text-[#3B78C8] font-semibold transition duration-300"
            >
              How It Works
            </button>
          </li>

          {/* About Dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1.5 text-sm lg:text-base font-semibold text-[#1A2340] hover:text-[#3B78C8] transition-colors duration-200 py-1">
              <span>About</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-[#3B78C8]" />
            </button>
            <div className="invisible absolute top-full left-0 z-20 w-64 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-[#9BC8FF] bg-white shadow-xl">
                <Link
                  to="/about"
                  className="flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors duration-150 hover:bg-[#D9ECFF]/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="shrink-0 rounded-lg p-1.5 bg-[#D9ECFF] text-[#3B78C8]">
                      <Info className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold text-[#1A2340]">About Us</span>
                      <span className="block text-xs text-[#3B78C8]">Platform Mission</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#3B78C8]" />
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors duration-150 hover:bg-[#D9ECFF]/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="shrink-0 rounded-lg p-1.5 bg-amber-100 text-amber-600">
                      <Mail className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold text-[#1A2340]">Contact Us</span>
                      <span className="block text-xs text-gray-500">Report a bug or suggest</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
                </Link>

                <button
                  onClick={() => scrollToSection('faq')}
                  className="w-full text-left flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors duration-150 hover:bg-[#D9ECFF]/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="shrink-0 rounded-lg p-1.5 bg-[#D9ECFF] text-[#3B78C8]">
                      <HelpCircle className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold text-[#1A2340]">FAQs</span>
                      <span className="block text-xs text-gray-500">Quick answers to questions</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
                </button>
              </div>
            </div>
          </li>

          {/* Services Dropdown */}
          <li className="relative group">
            <button className="flex items-center gap-1.5 text-sm lg:text-base font-semibold text-[#1A2340] hover:text-[#3B78C8] transition-colors duration-200 py-1">
              <span>Services</span>
              <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-[#3B78C8]" />
            </button>
            <div className="invisible absolute top-full left-0 z-20 w-72 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-xl border border-[#9BC8FF] bg-white shadow-xl">
                <Link
                  to="/visualizer"
                  className="flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors duration-150 hover:bg-[#D9ECFF]/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="shrink-0 rounded-lg p-1.5 bg-[#D9ECFF] text-[#3B78C8]">
                      <Code className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold text-[#1A2340]">Algorithm Visualizer</span>
                      <span className="block text-xs text-[#3B78C8]">Step-by-step visualizations</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#3B78C8]" />
                </Link>

                <Link
                  to="/design-algorithm"
                  className="flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors duration-150 hover:bg-[#D9ECFF]/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="shrink-0 rounded-lg p-1.5 bg-[#D9ECFF] text-[#3B78C8]">
                      <BarChart2 className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold text-[#1A2340]">Design & Analysis</span>
                      <span className="block text-xs text-gray-500">Complexity & Algorithm design</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
                </Link>

                <Link
                  to="/blogs"
                  className="flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors duration-150 hover:bg-[#D9ECFF]/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="shrink-0 rounded-lg p-1.5 bg-orange-100 text-orange-600">
                      <FileText className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold text-[#1A2340]">Blogs</span>
                      <span className="block text-xs text-gray-500">Tutorials & Guides</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
                </Link>
              </div>
            </div>
          </li>

          {/* Login Button */}
          <li>
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full bg-[#3B78C8] hover:bg-[#1A2340] text-white font-bold text-sm transition duration-300 flex items-center gap-2 shadow-md shadow-[#3B78C8]/20"
            >
              <User className="h-4 w-4" />
              Login/Signup
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-[#D9ECFF] text-[#1A2340]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 rounded-b-2xl backdrop-blur-lg px-6 py-4 space-y-3 border-t border-[#9BC8FF]">
          <button 
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2 font-semibold text-[#1A2340] hover:text-[#3B78C8] transition duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('features')}
            className="block w-full text-left py-2 font-semibold text-[#1A2340] hover:text-[#3B78C8] transition duration-300"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left py-2 font-semibold text-[#1A2340] hover:text-[#3B78C8] transition duration-300"
          >
            How It Works
          </button>

          {/* About Mobile */}
          <div>
            <button
              onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
              className="w-full flex justify-between items-center py-2 font-semibold text-[#1A2340] hover:text-[#3B78C8]"
            >
              <span>About</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {aboutDropdownOpen && (
              <div className="pl-4 space-y-2 py-2 border-l-2 border-[#3B78C8] text-sm">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-medium text-[#1A2340] hover:text-[#3B78C8]">About Us</Link>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-medium text-[#1A2340] hover:text-[#3B78C8]">Contact Us</Link>
                <button onClick={() => scrollToSection('faq')} className="block py-1 font-medium text-[#1A2340] hover:text-[#3B78C8]">FAQs</button>
              </div>
            )}
          </div>

          {/* Services Mobile */}
          <div>
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="w-full flex justify-between items-center py-2 font-semibold text-[#1A2340] hover:text-[#3B78C8]"
            >
              <span>Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesDropdownOpen && (
              <div className="pl-4 space-y-2 py-2 border-l-2 border-[#3B78C8] text-sm">
                <Link to="/visualizer" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-medium text-[#1A2340] hover:text-[#3B78C8]">Algorithm Visualizer</Link>
                <Link to="/design-algorithm" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#3B78C8]">Design & Analysis</Link>
                <Link to="/blogs" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#3B78C8]">Blogs</Link>
              </div>
            )}
          </div>

          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-2.5 rounded-full font-bold bg-[#3B78C8] text-white shadow-md"
          >
            Login/Signup
          </Link>
        </div>
      )}
    </nav>
  );
};
