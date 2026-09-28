import React from 'react';
import { Info, Code2, Cpu, Zap, Globe, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F8FBFF] text-[#1A2340]">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3B78C8] bg-[#D9ECFF] px-3.5 py-1 rounded-full border border-[#9BC8FF]">
            <Info className="w-4 h-4" />
            Our Mission
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1A2340]">
            About <span className="text-[#3B78C8]">DSA Visualizer</span>
          </h1>
          <p className="text-[#1A2340]/70 text-base md:text-lg leading-relaxed font-medium">
            Building an intuitive, zero-friction algorithm visualizer created by <strong className="text-[#3B78C8]">Pranshu Bodara</strong>.
          </p>
        </div>

        {/* Story & Vision */}
        <div className="bg-white border border-[#9BC8FF]/50 rounded-3xl p-8 md:p-12 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#9BC8FF]/30 pb-6">
            <h2 className="text-2xl font-extrabold text-[#1A2340] flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#3B78C8]" />
              Why Pranshu Built This Platform
            </h2>
          </div>
          <p className="text-[#1A2340]/80 leading-relaxed font-medium">
            Data Structures and Algorithms can feel abstract and daunting when studied solely through textbook pseudocode or static diagrams. Traditional tools either lack step-by-step control or force users into complex sign-up walls.
          </p>
          <p className="text-[#1A2340]/80 leading-relaxed font-medium">
            DSA Visualizer was engineered by Pranshu Bodara to bridge this gap: providing real-time, interactive execution traces, color-coded state transitions, custom input testing, customizable speed sliders, and zero friction.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#9BC8FF]/50 p-7 rounded-2xl shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-[#3B78C8]" />
            <h3 className="text-lg font-bold text-[#1A2340]">100% Free & Open</h3>
            <p className="text-xs text-[#1A2340]/70 leading-relaxed font-medium">
              No mandatory sign-ups, paywalls, or feature locks. Instant access to all visualizers and tutorials.
            </p>
          </div>

          <div className="bg-white border border-[#9BC8FF]/50 p-7 rounded-2xl shadow-sm space-y-3">
            <Code2 className="w-8 h-8 text-purple-500" />
            <h3 className="text-lg font-bold text-[#1A2340]">Adjustable Speed Controls</h3>
            <p className="text-xs text-[#1A2340]/70 leading-relaxed font-medium">
              Pause, step forward, step backward, adjust execution speed (100ms to 1500ms), and monitor pointers live.
            </p>
          </div>

          <div className="bg-white border border-[#9BC8FF]/50 p-7 rounded-2xl shadow-sm space-y-3">
            <Globe className="w-8 h-8 text-emerald-500" />
            <h3 className="text-lg font-bold text-[#1A2340]">Responsive & Modern</h3>
            <p className="text-xs text-[#1A2340]/70 leading-relaxed font-medium">
              Seamlessly optimized for desktop, tablet, and mobile browsers.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white border border-[#9BC8FF]/50 rounded-3xl p-8 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#1A2340] flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#3B78C8]" />
            Technology Stack
          </h3>
          <div className="flex flex-wrap gap-3 pt-2">
            {['React 19', 'TypeScript', 'Tailwind CSS v4', 'Vite', 'Framer Motion', 'Lucide React', 'Node.js & Express'].map((tech, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-[#D9ECFF]/60 border border-[#9BC8FF] text-xs font-bold text-[#3B78C8]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
