import React, { useState } from 'react';
import { Mail, Send, CheckCircle, Bug, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Bug Report',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F8FBFF] text-[#1A2340]">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3B78C8] bg-[#D9ECFF] px-3.5 py-1 rounded-full border border-[#9BC8FF]">
            <Mail className="w-4 h-4" />
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A2340]">
            Contact <span className="text-[#3B78C8]">DSA Visualizer</span>
          </h1>
          <p className="text-[#1A2340]/70 text-base md:text-lg leading-relaxed font-medium">
            Report a bug, suggest a module, or send feedback directly to Pranshu Bodara.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2 bg-white border border-[#9BC8FF]/50 rounded-3xl p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A2340]">Message Sent!</h3>
                <p className="text-sm text-[#1A2340]/70 max-w-md mx-auto font-medium">
                  Thank you for contacting Pranshu Bodara. We have received your query and will reply shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', category: 'Bug Report', message: '' });
                  }}
                  className="px-6 py-2.5 bg-[#3B78C8] text-white font-bold rounded-xl text-xs hover:bg-[#1A2340] transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-[#1A2340]">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F8FBFF] border border-[#9BC8FF]/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3B78C8] font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-[#1A2340]">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F8FBFF] border border-[#9BC8FF]/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3B78C8] font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-[#1A2340]">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#F8FBFF] border border-[#9BC8FF]/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3B78C8] font-medium"
                  >
                    <option value="Bug Report">🐛 Bug Report</option>
                    <option value="Module Suggestion">💡 Module Suggestion</option>
                    <option value="General Question">❓ General Question</option>
                    <option value="Other">💬 Other Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-[#1A2340]">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your suggestion or issue..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#F8FBFF] border border-[#9BC8FF]/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#3B78C8] font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#3B78C8] hover:bg-[#1A2340] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#3B78C8]/25 flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white border border-[#9BC8FF]/50 rounded-3xl p-7 shadow-sm space-y-4">
              <Bug className="w-7 h-7 text-amber-500" />
              <h3 className="text-lg font-bold text-[#1A2340]">Found a Bug?</h3>
              <p className="text-xs text-[#1A2340]/70 leading-relaxed font-medium">
                If an algorithm visualization step behaves unexpectedly, select "Bug Report" and include the array values or graph steps used.
              </p>
            </div>

            <div className="bg-white border border-[#9BC8FF]/50 rounded-3xl p-7 shadow-sm space-y-4">
              <HelpCircle className="w-7 h-7 text-[#3B78C8]" />
              <h3 className="text-lg font-bold text-[#1A2340]">Need Answers Fast?</h3>
              <p className="text-xs text-[#1A2340]/70 leading-relaxed font-medium">
                Check our Frequently Asked Questions section on the home page for quick solutions.
              </p>
              <Link to="/#faq" className="text-xs font-bold text-[#3B78C8] hover:underline block">
                View FAQs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
