'use client';
import Link from 'next/link';
import { Trophy, ShieldCheck, Heart, ArrowRight, Activity, Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-400 selection:text-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto">
        <div className="text-2xl font-black italic uppercase tracking-tighter">
          Digital <span className="text-amber-400">Heroes</span>
        </div>
        <div className="flex gap-8 items-center">
          <Link href="/login" className="text-xs font-black uppercase tracking-widest hover:text-amber-400 transition-colors">
            Member Portal
          </Link>
          <Link href="/login" className="bg-white text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-amber-400 transition-all">
            Join the Movement
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-20 pb-32 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">March Draw: $12,450 Live</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.85] mb-8">
          Play for <span className="text-amber-400">More</span> <br />Than Par.
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          The world's first high-performance golf charity platform. Track your rolling 5 scores, compete for massive prize pools, and automate your social impact.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link href="/login" className="w-full md:w-auto bg-amber-400 text-black px-12 py-6 rounded-2xl font-black uppercase italic text-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(251,191,36,0.3)]">
            Start Your Journey <ArrowRight size={24} />
          </Link>
        </div>
      </header>

      {/* Features Grid */}
      <section className="bg-white/5 border-y border-white/5 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="bg-amber-400/10 p-4 w-fit rounded-2xl">
              <Activity className="text-amber-400" size={28} />
            </div>
            <h3 className="text-xl font-black uppercase italic">Rolling 5 Logic</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our proprietary algorithm tracks your 5 most recent Stableford rounds. Stay consistent, stay eligible.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-400/10 p-4 w-fit rounded-2xl">
              <Heart className="text-amber-400" size={28} />
            </div>
            <h3 className="text-xl font-black uppercase italic">Automated Impact</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              10% of every membership goes directly to your chosen charity. We handle the routing; you handle the fairways.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-amber-400/10 p-4 w-fit rounded-2xl">
              <ShieldCheck className="text-amber-400" size={28} />
            </div>
            <h3 className="text-xl font-black uppercase italic">Verified Draws</h3>
            <h4 className="text-gray-500 text-sm leading-relaxed">
              Transparent, monthly prize distributions calculated by the Digital Heroes verify engine.
            </h4>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-7xl mx-auto border border-white/10 rounded-[3rem] p-16 bg-gradient-to-b from-white/5 to-transparent">
          <Globe className="mx-auto text-amber-400 mb-8" size={48} />
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12">
            Joined by <span className="text-amber-400">1,200+</span> Heroes <br />Across 15 Countries.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="text-3xl font-black italic">$84k+</p>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Charity Raised</p>
            </div>
            <div>
              <p className="text-3xl font-black italic">4.2k</p>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Scores Logged</p>
            </div>
            <div>
              <p className="text-3xl font-black italic">$12.4k</p>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Avg. Monthly Pool</p>
            </div>
            <div>
              <p className="text-3xl font-black italic">100%</p>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Transparency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-12 border-t border-white/5 text-center text-gray-600 text-[10px] font-bold uppercase tracking-[0.5em]">
        © 2026 Digital Heroes • Built for the Bold
      </footer>
    </div>
  );
}