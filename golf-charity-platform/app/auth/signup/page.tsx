'use client';
import { useState } from 'react';
import { Heart, ShieldCheck, ArrowRight, Search } from 'lucide-react';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [charityPercent, setCharityPercent] = useState(10);
  
  // Sample charities - in Phase 4 we will fetch these from your Supabase 'charities' table
  const charities = [
    { id: '1', name: 'Ocean CleanUp', desc: 'Removing plastic from the seas.' },
    { id: '2', name: 'Green Canopy', desc: 'Reforestation in urban areas.' },
    { id: '3', name: 'Education For All', desc: 'Building schools in remote areas.' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-3xl">
        
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-amber-400' : 'bg-white/10'}`} />
          <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-amber-400' : 'bg-white/10'}`} />
        </div>

        {step === 1 ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-black italic uppercase">Create <span className="text-amber-400">Account</span></h2>
            <div className="space-y-4">
              <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-400 outline-none" />
              <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-amber-400 outline-none" />
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-white text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors">
              Next: Select Charity <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <header>
              <h2 className="text-3xl font-black italic uppercase">Choose <span className="text-amber-400">Impact</span></h2>
              <p className="text-gray-400 text-sm mt-2">Pick a cause to support with your membership.</p>
            </header>

            {/* Charity List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {charities.map((c) => (
                <button key={c.id} className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:border-amber-400 transition-all group">
                  <h4 className="font-bold group-hover:text-amber-400">{c.name}</h4>
                  <p className="text-xs text-gray-500">{c.desc}</p>
                </button>
              ))}
            </div>

            {/* Contribution Slider - Enforces PRD Min 10% */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold">Contribution</span>
                <span className="text-amber-400 font-bold">{charityPercent}%</span>
              </div>
              <input 
                type="range" min="10" max="100" value={charityPercent} 
                onChange={(e) => setCharityPercent(parseInt(e.target.value))}
                className="w-full accent-amber-400 bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-[10px] text-gray-500 mt-2 italic">*10% is the mandatory minimum contribution per the Digital Heroes mandate.</p>
            </div>

            <button className="w-full bg-amber-400 text-black py-4 rounded-xl font-bold hover:bg-amber-500 transition-colors">
              Complete Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}