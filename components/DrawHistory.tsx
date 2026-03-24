'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Ticket, Award, Timer, ChevronRight } from 'lucide-react';

export default function DrawHistory({ userId }: { userId: string }) {
  const [winnings, setWinnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinnings = async () => {
      const { data, error } = await supabase
        .from('winners')
        .select(`
          prize_amount,
          match_tier,
          verification_status,
          draws (month_year, winning_numbers)
        `)
        .eq('user_id', userId);

      if (!error) setWinnings(data || []);
      setLoading(false);
    };

    if (userId) fetchWinnings();
  }, [userId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Your Rewards</h4>
        <Timer size={14} className="text-gray-600" />
      </div>

      {loading ? (
        <div className="h-24 bg-white/5 animate-pulse rounded-3xl" />
      ) : winnings.length > 0 ? (
        winnings.map((win, idx) => (
          <div key={idx} className="bg-gradient-to-br from-amber-400/20 to-transparent border border-amber-400/20 p-5 rounded-[2rem] flex items-center justify-between group hover:border-amber-400 transition-all">
            <div className="flex items-center gap-4">
              <div className="bg-amber-400 text-black p-3 rounded-2xl shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                <Award size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-amber-400 uppercase">{win.draws.month_year} WINNER</p>
                <h5 className="text-xl font-black italic">+${win.prize_amount}</h5>
                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">
                  {win.match_tier} Number Match • {win.verification_status}
                </p>
              </div>
            </div>
            <ChevronRight className="text-gray-700 group-hover:text-white transition-colors" />
          </div>
        ))
      ) : (
        <div className="p-10 border border-white/5 rounded-[2rem] text-center">
          <Ticket className="mx-auto text-gray-800 mb-3" size={32} />
          <p className="text-gray-600 text-xs font-bold uppercase italic">Next draw in 7 days</p>
        </div>
      )}
    </div>
  );
}