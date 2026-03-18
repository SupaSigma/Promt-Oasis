/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PROMPTS = [
  "Describe a city built inside a giant clockwork mechanism.",
  "Write a Python script that automates sentimental analysis for garden journals.",
  "Imagine a world where music is the only source of light.",
  "Design a futuristic library that stores memories instead of books.",
  "Create a recipe for a dish that tastes like a summer sunset.",
  "Write a dialogue between a time traveler and their younger self.",
  "Develop a concept for a sustainable city floating on the ocean.",
  "Describe the first contact between humans and a bioluminescent alien species.",
  "Write a short story about a sentient AI that discovers a love for poetry.",
  "Design a board game based on the migration patterns of monarch butterflies.",
  "Architect a skyscraper that breathes and purifies the surrounding air.",
  "Compose a melody that represents the feeling of waking up in a dream.",
  "Draft a manifesto for a society that values silence above all else.",
  "Explain the physics of a planet where gravity is determined by emotion.",
  "Choreograph a dance that tells the history of a dying star."
];

export default function App() {
  const [currentPrompt, setCurrentPrompt] = useState(PROMPTS[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePrompt = useCallback(() => {
    setIsGenerating(true);
    
    // Artificial delay for "smoothness" and to allow animation to reset
    setTimeout(() => {
      let nextPrompt;
      do {
        nextPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
      } while (nextPrompt === currentPrompt);
      
      setCurrentPrompt(nextPrompt);
      setIsGenerating(false);
    }, 400);
  }, [currentPrompt]);

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-110"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1490806678282-284e4470179e?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      
      {/* Blur Overlay & Flowy Lines */}
      <div 
        className="absolute inset-0 bg-blur-overlay overflow-hidden" 
        style={{ backgroundColor: '#c6c6c6' }}
      >
        <motion.svg 
          className="absolute inset-0 w-full h-full opacity-25" 
          xmlns="http://www.w3.org/2000/svg"
          animate={{
            x: [-30, 30, -30],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <defs>
            <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
          </defs>
          {/* 8 Evenly Spread Lines */}
          <path 
            d="M-400,-600 C100,0 600,500 1600,1000" 
            fill="none" 
            stroke="#2a1a1a" 
            strokeWidth="100" 
            filter="url(#soft-glow)"
          />
          <path 
            d="M-100,-500 C400,100 900,600 1900,1100" 
            fill="none" 
            stroke="#2a1a1a" 
            strokeWidth="80" 
            filter="url(#soft-glow)"
          />
          <path 
            d="M200,-400 C700,200 1200,700 2200,1200" 
            fill="none" 
            stroke="#2a1a1a" 
            strokeWidth="110" 
            filter="url(#soft-glow)"
          />
          <path 
            d="M-700,-200 C-200,400 300,900 1300,1400" 
            fill="none" 
            stroke="#2a1a1a" 
            strokeWidth="130" 
            filter="url(#soft-glow)"
          />
          <path 
            d="M-1000,100 C-500,700 0,1200 1000,1700" 
            fill="none" 
            stroke="#2a1a1a" 
            strokeWidth="90" 
            filter="url(#soft-glow)"
          />
          <path 
            d="M-1300,400 C-800,1000 -300,1500 700,2000" 
            fill="none" 
            stroke="#2a1a1a" 
            strokeWidth="120" 
            filter="url(#soft-glow)"
          />
          <path 
            d="M-1600,700 C-1100,1300 -600,1800 400,2300" 
            fill="none" 
            stroke="#2a1a1a" 
            strokeWidth="100" 
            filter="url(#soft-glow)"
          />
          <path 
            d="M-1900,1000 C-1400,1600 -900,2100 100,2600" 
            fill="none" 
            stroke="#2a1a1a" 
            strokeWidth="140" 
            filter="url(#soft-glow)"
          />
        </motion.svg>
      </div>

      {/* Main Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl px-6"
      >
        <div 
          className="glass-card rounded-3xl p-12 text-center space-y-8"
          style={{ backgroundColor: '#513131', borderColor: '#bca8a8' }}
        >
          <header className="space-y-2">
            <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tighter uppercase">
              Prompt Oasis
            </h1>
          </header>

          <div className="min-h-[160px] flex items-center justify-center py-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentPrompt}
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="text-xl md:text-2xl font-medium leading-relaxed italic"
              >
                "{currentPrompt}"
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="pt-4">
            <button
              onClick={generatePrompt}
              disabled={isGenerating}
              className="group relative px-10 py-4 font-display text-sm tracking-[0.2em] uppercase transition-all duration-300 ease-in-out disabled:opacity-50"
            >
              {/* Button Border */}
              <div className="absolute inset-0 border border-eggshell/40 rounded-full group-hover:border-eggshell transition-colors duration-300" />
              
              {/* Button Glow */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md bg-eggshell/10 transition-opacity duration-300" />
              
              <span className="relative z-10">
                {isGenerating ? "Seeking..." : "Generate"}
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Subtle Footer Accent */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-script text-xl opacity-40 pointer-events-none">
        Serenity in every word
      </div>
    </div>
  );
}
