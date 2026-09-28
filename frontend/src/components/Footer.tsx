import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#9BC8FF]/40 text-[#1A2340] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#9BC8FF]/30">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tight text-[#1A2340] flex items-center">
              DSA<span className="text-[#3B78C8]">Visualizer</span>
            </Link>
            <p className="text-xs text-[#1A2340]/70 leading-relaxed font-medium">
              Interactive Data Structures & Algorithms Playground created by <strong className="text-[#3B78C8]">Pranshu Bodara</strong>. See execution traces, compare complexity, and master problem-solving.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#1A2340] text-base mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/" className="hover:text-[#3B78C8] transition">Home</Link></li>
              <li><Link to="/visualizer" className="hover:text-[#3B78C8] transition">Algorithm Visualizer</Link></li>
              <li><Link to="/design-algorithm" className="hover:text-[#3B78C8] transition">Design & Analysis</Link></li>
              <li><Link to="/blogs" className="hover:text-[#3B78C8] transition">Blogs & Tutorials</Link></li>
            </ul>
          </div>

          {/* Algorithms */}
          <div>
            <h4 className="font-bold text-[#1A2340] text-base mb-4">Algorithms</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/visualizer?tab=sorting" className="hover:text-[#3B78C8] transition">Sorting Visualizer</Link></li>
              <li><Link to="/visualizer?tab=searching" className="hover:text-[#3B78C8] transition">Searching Visualizer</Link></li>
              <li><Link to="/visualizer?tab=stack" className="hover:text-[#3B78C8] transition">Stack & Queue</Link></li>
              <li><Link to="/visualizer?tab=linkedlist" className="hover:text-[#3B78C8] transition">Linked List</Link></li>
              <li><Link to="/visualizer?tab=tree" className="hover:text-[#3B78C8] transition">Trees & Graphs</Link></li>
            </ul>
          </div>

          {/* Platform Info */}
          <div>
            <h4 className="font-bold text-[#1A2340] text-base mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/about" className="hover:text-[#3B78C8] transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#3B78C8] transition">Contact & Support</Link></li>
              <li><Link to="/#faq" className="hover:text-[#3B78C8] transition">FAQs</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#1A2340]/60">
          <p>© {new Date().getFullYear()} DSA Visualizer. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>by <strong className="text-[#3B78C8]">Pranshu Bodara</strong>.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
