'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Check, X, ExternalLink, ShieldCheck, Clock } from 'lucide-react';

export default function WinnerVerification() {
  const [pendingWinners, setPendingWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingWinners();
  }, []);

  const fetchPendingWinners = async () => {
    // Fetches winners joined with their profiles and the draw details
    const { data, error } = await supabase
      .from('winners')
      .select(`
        id,
        match_tier,
        prize_amount,
        proof_url,
        verification_status,
        profiles (full_name),
        draws (month_year)
      `)
      .eq('verification_status', 'pending');

    if (!error) setPendingWinners(data || []);
    setLoading(false);
  };

  const handleVerify = async (id: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('winners')
      .update({ verification_status: status })
      .eq('id', id);

    if (!error) {
      alert(`Winner ${status}!`);
      fetchPendingWinners(); // Refresh list
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Winner <span className="text-amber-400">Verification</span>
          </h1>
          <p className="text-gray-500 text-sm">Review submitted proof against database records.</p>
        </header>

        {loading ? (
          <p className="text-amber-400 animate-pulse text-center py-20">Accessing secure records...</p>
        ) : pendingWinners.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <ShieldCheck size={48} className="mx-auto text-gray-700 mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest">Queue Clear</p>
            <p className="text-xs text-gray-600">All winners have been processed.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingWinners.map((winner) => (
              <div key={winner.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded">
                      {winner.match_tier}-NUMBER MATCH
                    </span>
                    <span className="text-gray-500 text-xs">Draw: {winner.draws.month_year}</span>
                  </div>
                  <h3 className="text-xl font-bold">{winner.profiles.full_name}</h3>
                  <p className="text-2xl font-black text-amber-400">${winner.prize_amount}</p>
                </div>

                <div className="flex items-center gap-4">
                  {winner.proof_url && (
                    <a 
                      href={winner.proof_url} 
                      target="_blank" 
                      className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
                    >
                      VIEW PROOF <ExternalLink size={14} />
                    </a>
                  )}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleVerify(winner.id, 'rejected')}
                      className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <X size={20} />
                    </button>
                    <button 
                      onClick={() => handleVerify(winner.id, 'approved')}
                      className="p-3 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all"
                    >
                      <Check size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}