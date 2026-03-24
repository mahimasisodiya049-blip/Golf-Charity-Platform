'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Trophy, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = isSignUp 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      if (isSignUp) {
        alert("Check your email for the confirmation link!");
      } else {
        router.push('/dashboard');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
        <div className="text-center">
          <div className="inline-flex p-4 bg-amber-400 rounded-2xl mb-6">
            <Trophy className="text-black" size={32} />
          </div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Digital <span className="text-amber-400">Heroes</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            {isSignUp ? 'Create your hero profile' : 'Welcome back to the green'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="email" placeholder="Email Address" required
              className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-amber-400 transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="password" placeholder="Password" required
              className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-amber-400 transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-amber-400 text-black py-4 rounded-2xl font-black uppercase italic flex items-center justify-center gap-2 hover:bg-amber-500 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isSignUp ? 'Join the Movement' : 'Enter Dashboard'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center pt-4">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-gray-500 hover:text-amber-400 uppercase font-bold tracking-widest transition-colors"
          >
            {isSignUp ? 'Already a member? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}