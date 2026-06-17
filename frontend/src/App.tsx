import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { SortingVisualizer } from './visualizers/SortingVisualizer';
import { SearchingVisualizer } from './visualizers/SearchingVisualizer';
import { StackVisualizer } from './visualizers/StackVisualizer';
import { QueueVisualizer } from './visualizers/QueueVisualizer';
import { LinkedListVisualizer } from './visualizers/LinkedListVisualizer';
import { TreeVisualizer } from './visualizers/TreeVisualizer';
import { GraphVisualizer } from './visualizers/GraphVisualizer';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col transition-colors duration-200">
          {/* Top Navigation */}
          <Navbar />

          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Sidebar Visualizer Menu */}
            <Sidebar />

            {/* Main Visualizer Canvas Panel */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sorting" element={<SortingVisualizer />} />
                  <Route path="/searching" element={<SearchingVisualizer />} />
                  <Route path="/stack" element={<StackVisualizer />} />
                  <Route path="/queue" element={<QueueVisualizer />} />
                  <Route path="/linked-list" element={<LinkedListVisualizer />} />
                  <Route path="/tree" element={<TreeVisualizer />} />
                  <Route path="/graph" element={<GraphVisualizer />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
