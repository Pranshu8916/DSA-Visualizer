import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Code, 
  BarChart2, Search, Layers, Network, Workflow, HelpCircle, 
  ChevronDown, ChevronUp, Sparkles, Terminal, Play, Sliders, Cpu, Lightbulb, FileText
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const coreServices = [
    {
      id: 'visualizer',
      title: 'Algorithm Visualizer',
      subtitle: 'Step-by-step visualizations',
      description: 'Interactive execution environment for 15+ Data Structures & Algorithms with speed sliders, memory pointer tracking, and variable traces.',
      features: [
        'Sorting & Searching (Bubble, Merge, Quick, Binary)',
        'Data Structures (Stack, Queue, Linked Lists)',
        'Trees, Graphs, MST & Call Stack Recursion'
      ],
      icon: Code,
      link: '/visualizer',
      badge: 'Interactive Playground'
    },
    {
      id: 'design-analysis',
      title: 'Design & Analysis',
      subtitle: 'Complexity & Algorithm design',
      description: 'Master algorithmic design paradigms (Divide & Conquer, Greedy, Dynamic Programming) with formal Big-O time & space complexity analysis.',
      features: [
        'Time Complexity (Best, Average, Worst Case)',
        'Space Complexity & Memory Bounds',
        'Algorithm Design Paradigms & Trade-offs'
      ],
      icon: BarChart2,
      link: '/design-algorithm',
      badge: 'Algorithmic Mastery'
    },
    {
      id: 'blogs',
      title: 'Blogs',
      subtitle: 'Tutorials & Guides',
      description: 'In-depth conceptual articles, coding interview problem-solving frameworks, and step-by-step tutorials curated by Pranshu Bodara.',
      features: [
        'Data Structure Fundamentals & Implementations',
        'LeetCode & Technical Interview Strategies',
        'Step-by-step Code Walkthroughs'
      ],
      icon: FileText,
      link: '/blogs',
      badge: 'Articles & Guides'
    }
  ];

  const featureCards = [
    {
      id: 'sorting',
      title: 'Sorting Algorithms',
      description: 'Visualize Bubble, Selection, Insertion, Merge, Quick, and Heap Sort with real-time bar animation and custom speed control.',
      icon: BarChart2,
      color: 'from-[#3B78C8] to-[#1A2340]',
      badge: '6 Algorithms',
      link: '/visualizer?tab=sorting'
    },
    {
      id: 'searching',
      title: 'Searching Algorithms',
      description: 'Observe Linear Search and Binary Search dividing interval bounds to locate target items efficiently.',
      icon: Search,
      color: 'from-cyan-600 to-[#3B78C8]',
      badge: 'Linear & Binary',
      link: '/visualizer?tab=searching'
    },
    {
      id: 'stack-queue',
      title: 'Stack & Queue',
      description: 'Master Last-In First-Out (LIFO) Push/Pop operations and First-In First-Out (FIFO) Enqueue/Dequeue tracks.',
      icon: Layers,
      color: 'from-purple-600 to-[#3B78C8]',
      badge: 'LIFO & FIFO',
      link: '/visualizer?tab=stack'
    },
    {
      id: 'linked-list',
      title: 'Linked List',
      description: 'Interact with Singly, Doubly, and Circular Linked Lists. Perform node insertion, deletion, search, and list reversing.',
      icon: Network,
      color: 'from-emerald-600 to-[#3B78C8]',
      badge: 'Singly / Doubly / Circular',
      link: '/visualizer?tab=linkedlist'
    },
    {
      id: 'tree',
      title: 'Trees & BST',
      description: 'Construct Binary Search Trees and trigger step-by-step Inorder, Preorder, Postorder, and Level Order traversals.',
      icon: Network,
      color: 'from-amber-600 to-[#3B78C8]',
      badge: 'BST & Traversals',
      link: '/visualizer?tab=tree'
    },
    {
      id: 'graph',
      title: 'Graph Traversals',
      description: 'Build custom node network graphs and execute Breadth-First Search (BFS) and Depth-First Search (DFS).',
      icon: Workflow,
      color: 'from-rose-600 to-[#3B78C8]',
      badge: 'BFS & DFS',
      link: '/visualizer?tab=graph'
    }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Select an Algorithm',
      description: 'Choose from 15+ Data Structures & Algorithms including Sorting, Binary Trees, Graphs, Stacks, Queues, and Searching.',
      icon: Code,
      badge: 'Step 1'
    },
    {
      step: '02',
      title: 'Input Custom Data',
      description: 'Provide your own array numbers, target search values, or custom node structures to test real interview testcases.',
      icon: Sliders,
      badge: 'Step 2'
    },
    {
      step: '03',
      title: 'Step Through Execution',
      description: 'Play, pause, step backward, or step forward at your own pace. Adjust animation speed from 100ms to 1500ms per step.',
      icon: Play,
      badge: 'Step 3'
    },
    {
      step: '04',
      title: 'Analyze Logic & Complexity',
      description: 'Watch variables transform live, inspect color-coded comparisons, and master Time (Big-O) & Space complexity bounds.',
      icon: Cpu,
      badge: 'Step 4'
    }
  ];

  const faqs = [
    {
      question: "Is DSA Visualizer free to use?",
      answer: "Yes! DSA Visualizer created by Pranshu Bodara is 100% free for students, educators, and developers. No credit card or compulsory sign-up is required."
    },
    {
      question: "How can I adjust algorithm visualization speed?",
      answer: "Each visualizer has a custom speed slider allowing you to slow down step execution up to 1500ms per step or speed it up according to your preference."
    },
    {
      question: "Which data structures and algorithms are included?",
      answer: "We support Sorting (Bubble, Selection, Insertion, Merge, Quick, Heap), Searching (Linear, Binary), Stacks, Queues, Linked Lists (Singly, Doubly, Circular), Trees (BST, Inorder, Preorder, Postorder), and Graphs (BFS, DFS)."
    },
    {
      question: "Can I test custom array or value inputs?",
      answer: "Absolutely! Each visualizer includes a custom input field where you can provide comma-separated numbers or target values to test your custom testcases."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FBFF] text-[#1A2340]">
      {/* HERO SECTION */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-[#D9ECFF]/50 via-[#F8FBFF] to-white overflow-hidden">
        
        <div className="max-w-6xl mx-auto px-6 pt-6 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-12">
          {/* Hero Text */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B78C8] to-[#1A2340]">
                Master DSA
              </span>
              <br />
              Through Interactive Visualization
            </h1>

            <p className="text-base sm:text-lg text-[#1A2340]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              See algorithms come to life step-by-step with customizable playback speeds, variable traces, and execution pointers. Designed by Pranshu Bodara.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start pt-2">
              <button
                onClick={() => navigate('/visualizer')}
                className="px-8 py-4 bg-[#3B78C8] hover:bg-[#1A2340] text-white font-bold rounded-xl transition-all duration-300 shadow-xl shadow-[#3B78C8]/25 flex items-center justify-center gap-2 group"
              >
                <span>Start Visualizing Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-[#9BC8FF] bg-white px-6 py-4 shadow-sm text-xs font-bold text-[#3B78C8] hover:bg-[#D9ECFF]/50 transition"
              >
                <span>Explore Features</span>
                <ChevronDown className="w-4 h-4 text-[#3B78C8]" />
              </button>
            </div>

            {/* No login badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm font-bold text-emerald-600">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>100% Free • No login required</span>
            </div>
          </div>

          {/* Right Side: Sleek DSA Code & Motivation Card */}
          <div className="lg:w-1/2 flex justify-center items-center relative min-h-[380px]">
            <div className="w-full max-w-lg bg-white rounded-3xl border-2 border-[#9BC8FF] shadow-2xl overflow-hidden transition-all duration-300">
              {/* Code Window Header Bar */}
              <div className="bg-[#D9ECFF]/60 px-4 py-3 border-b border-[#9BC8FF]/40 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-xs font-mono font-bold text-[#3B78C8] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  dsa_mindset.cpp
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Interactive</span>
              </div>

              {/* Code Editor Body */}
              <div className="p-6 font-mono text-xs leading-relaxed space-y-3 bg-[#F8FBFF] text-[#1A2340]">
                <div className="text-gray-400 font-italic">// The DSA Developer Mindset</div>
                <div>
                  <span className="text-[#3B78C8] font-bold">void</span> <span className="text-purple-600 font-bold">masterAlgorithms</span>() &#123;
                </div>
                <div className="pl-4">
                  <span className="text-[#3B78C8] font-bold">while</span> (problem.<span className="text-amber-600">isUnsolved</span>()) &#123;
                </div>
                <div className="pl-8 text-emerald-600">
                  analyzePattern(); <span className="text-gray-400">// DP, Graph, or Binary Search</span>
                </div>
                <div className="pl-8 text-emerald-600">
                  visualizeDataFlow(); <span className="text-gray-400">// Track pointers live</span>
                </div>
                <div className="pl-8 text-[#3B78C8]">
                  optimizeLogic(); <span className="text-purple-500">// O(n²) ➔ O(n log n)</span>
                </div>
                <div className="pl-4">&#125;</div>
                <div className="pl-4 text-emerald-600 font-bold">
                  cout &lt;&lt; <span className="text-amber-600">"LeetCode Accepted! 🚀"</span>;
                </div>
                <div>&#125;</div>
              </div>

              {/* Motivational Banner */}
              <div className="bg-[#D9ECFF]/80 p-4 border-t border-[#9BC8FF]/40 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-[#1A2340] leading-relaxed">
                  <strong className="text-[#3B78C8] block mb-0.5">Algorithm Mantra:</strong>
                  Don't just memorize code — visualize the data flow, master the pattern, and optimize step-by-step.
                </p>
              </div>

              {/* Live Complexity Badges */}
              <div className="px-6 py-3 bg-white border-t border-[#9BC8FF]/30 flex items-center justify-between text-[11px] font-bold">
                <span className="text-[#3B78C8] bg-[#D9ECFF] px-2.5 py-1 rounded-md border border-[#9BC8FF]/40">
                  Time: O(n log n)
                </span>
                <span className="text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                  Space: O(1)
                </span>
                <span className="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Step Execution: Live
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES HIGHLIGHT SECTION */}
      <section className="py-16 bg-[#F8FBFF] border-t border-[#9BC8FF]/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#3B78C8] px-3.5 py-1 bg-[#D9ECFF] rounded-full border border-[#9BC8FF]">
              Platform Services
            </span>
            <h2 className="text-3xl font-extrabold text-[#1A2340]">
              Everything You Need to <span className="text-[#3B78C8]">Master DSA</span>
            </h2>
            <p className="text-sm text-[#1A2340]/70 font-medium">
              Explore our primary learning pillars designed for comprehensive algorithmic mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  onClick={() => navigate(service.link)}
                  className="group bg-white rounded-2xl p-6 border-2 border-[#9BC8FF]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-xl bg-[#D9ECFF] text-[#3B78C8] border border-[#9BC8FF]/40">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#D9ECFF] text-[#3B78C8] border border-[#9BC8FF]/50">
                        {service.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1A2340] group-hover:text-[#3B78C8] transition-colors">
                        {service.title}
                      </h3>
                      <span className="text-xs font-semibold text-[#3B78C8] block mt-0.5">
                        {service.subtitle}
                      </span>
                    </div>

                    <p className="text-xs text-[#1A2340]/75 leading-relaxed font-medium">
                      {service.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#9BC8FF]/30">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-semibold text-[#1A2340]/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3B78C8] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#9BC8FF]/30 flex items-center justify-between text-xs font-bold text-[#3B78C8] group-hover:gap-2 transition-all">
                    <span>Explore {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white border-t border-[#9BC8FF]/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#3B78C8] px-3.5 py-1 bg-[#D9ECFF] rounded-full border border-[#9BC8FF]">
              Interactive Modules
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2340]">
              Explore All <span className="text-[#3B78C8]">DSA Visualizers</span>
            </h2>
            <p className="text-[#1A2340]/70 text-base font-medium">
              Click on any module to step into interactive animations with adjustable speed controls and custom inputs.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  onClick={() => navigate(card.link)}
                  className="group relative bg-[#F8FBFF] rounded-2xl p-7 border border-[#9BC8FF]/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3.5 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#D9ECFF] text-[#3B78C8] border border-[#9BC8FF]/40">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1A2340] group-hover:text-[#3B78C8] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#1A2340]/70 mt-2 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#9BC8FF]/30 flex items-center justify-between text-xs font-bold text-[#3B78C8] group-hover:gap-2 transition-all">
                    <span>Try Visualizer</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 bg-[#F8FBFF] border-t border-[#9BC8FF]/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3B78C8] bg-[#D9ECFF] px-3.5 py-1 rounded-full border border-[#9BC8FF]">
              <Sparkles className="w-4 h-4" />
              Learning Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2340]">
              How DSA Visualizer <span className="text-[#3B78C8]">Works</span>
            </h2>
            <p className="text-[#1A2340]/70 text-sm md:text-base font-medium">
              Master complex data structures & algorithms in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-7 border border-[#9BC8FF]/50 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-[#D9ECFF] text-[#3B78C8] font-bold">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black font-mono text-[#3B78C8]/40">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1A2340] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#1A2340]/75 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#9BC8FF]/20 text-[11px] font-bold text-[#3B78C8]">
                    {item.badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section id="faq" className="py-20 bg-white border-t border-[#9BC8FF]/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#3B78C8]">
              <HelpCircle className="w-4 h-4" />
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A2340]">
              Got Questions? <span className="text-[#3B78C8]">We've Got Answers</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#F8FBFF] border border-[#9BC8FF]/50 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left font-bold text-[#1A2340] text-base md:text-lg hover:text-[#3B78C8] transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#3B78C8] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-sm text-[#1A2340]/80 leading-relaxed border-t border-[#9BC8FF]/20 pt-4 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
