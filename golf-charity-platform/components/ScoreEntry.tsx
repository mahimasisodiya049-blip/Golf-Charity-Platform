'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PlusCircle } from 'lucide-react';

export default function ScoreEntry({ userId, onScoreAdded }: { userId: string, onScoreAdded: () => void }) {
  const [score, setScore] = useState<number>(1);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // PRD Requirement: Ensure score is in Stableford format (1-45)
    if (score < 1 || score > 45) {
      alert("Please enter a valid Stableford score between 1 and 45.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('golf_scores')
      .insert([{ user_id: userId, score: score, score_date: date }]);

    if (error) {
      console.error('Error saving score:', error.message);
      alert("Failed to save score. Please check your connection.");
    } else {
      setScore(1);
      onScoreAdded(); // Refresh the list in the parent dashboard
      alert("Score added! Your oldest score has been automatically rotated out.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Stableford Score</label>
          <input 
            type="number" min="1" max="45" value={score}
            onChange={(e) => setScore(parseInt(e.target.value))}
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-amber-400 outline-none text-xl font-black italic"
            required
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Date Played</label>
          <input 
            type="date" value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 p-3 rounded-xl focus:border-amber-400 outline-none text-sm"
            required
          />
        </div>
      </div>
      <button 
        type="submit" disabled={loading}
        className="w-full bg-amber-400 text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-500 transition-all disabled:opacity-50"
      >
        <PlusCircle size={18} /> {loading ? 'Processing...' : 'Add to Rolling 5'}
      </button>
    </form>
  );
}