'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, Zap, Users, DollarSign, CheckCircle } from 'lucide-react';

export default function AdminDrawPanel() {
  const [winNumbers, setWinNumbers] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');

  const runDrawSimulation = async () => {
    setIsProcessing(true);
    setStatus('Analyzing Rolling 5 scores across all users...');

    const numbersArray = winNumbers.split(',').map(n => parseInt(n.trim()));
    if (numbersArray.length !== 5) {
      alert("Please enter exactly 5 numbers (e.g., 32, 41, 12, 5, 22)");
      setIsProcessing(false);
      return;
    }

    // 1. Record the Draw
    const { data: drawData, error: drawError } = await supabase
      .from('draws')
      .insert([{ 
        month_year: new Date().toLocaleString('default', { month: 'short', year: 'numeric' }).toUpperCase(),
        winning_numbers: numbersArray,
        total_prize_pool: 12450
      }])
      .select()
      .single();

    if (drawError) { setStatus('Error creating draw'); setIsProcessing(false); return; }

    // 2. Logic: Find matching scores (Simulated Logic for PRD)
    // In a production app, this would be a Postgres Function (RPC)
    const { data: allScores } = await supabase.from('golf_scores').select('*');
    
    let winnersFound = 0;
    if (allScores) {
      for (const scoreEntry of allScores) {
        if (numbersArray.includes(scoreEntry.score)) {
          winnersFound++;
          // Assign a prize (Simplified: $500 for any match for the demo)
          await supabase.from('winners').insert({
            user_id: scoreEntry.user_id,
            draw_id: drawData.id,
            match_tier: 3,
            prize_amount: 500.00
          });
        }
      }
    }

    setStatus(`Draw Complete! ${winnersFound} winners identified. Prize pool distributed.`);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-2xl">
            <ShieldAlert className="text-red-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase italic">Admin Command</h1>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Draw Authorization Required</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] space-y-6">
            <h2 className="text-xl font-black uppercase italic flex items-center gap-2">
              <Zap className="text-amber-400" size={20} /> Execute Draw
            </h2>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-2">Winning Numbers (Comma Separated)</label>
              <input 
                type="text" 
                placeholder="e.g. 38, 42, 15, 22, 5"
                className="w-full bg-black border border-white/10 p-5 rounded-2xl outline-none focus:border-amber-400 font-mono text-xl"
                value={winNumbers}
                onChange={(e) => setWinNumbers(e.target.value)}
              />
            </div>
            <button 
              onClick={runDrawSimulation}
              disabled={isProcessing}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase italic hover:bg-amber-400 transition-all disabled:opacity-50"
            >
              {isProcessing ? 'Processing Algorithm...' : 'Release Prize Pool'}
            </button>
            {status && (
              <div className="p-4 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-start gap-3">
                <CheckCircle className="text-amber-400 mt-1" size={16} />
                <p className="text-xs font-bold text-amber-400 uppercase tracking-tight">{status}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase">Active Pool</p>
                <h3 className="text-2xl font-black italic">$12,450.00</h3>
              </div>
              <DollarSign className="text-gray-700" size={32} />
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-[10px] font-black uppercase">Total Heroes</p>
                <h3 className="text-2xl font-black italic">1,204</h3>
              </div>
              <Users className="text-gray-700" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}