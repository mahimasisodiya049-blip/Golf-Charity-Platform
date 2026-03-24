'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Trophy, Heart, PlusCircle, History, Target, LogOut, Award } from 'lucide-react';
import ScoreEntry from '@/components/ScoreEntry';
import CharitySelector from '@/components/CharitySelector';
import DrawHistory from '@/components/DrawHistory';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [userScores, setUserScores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchScores = async () => {
    setLoading(true);
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    
    if (currentUser) {
      setUser(currentUser);
      const { data, error } = await supabase
        .from('golf_scores')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('score_date', { ascending: false })
        .limit(5);

      if (!error) setUserScores(data || []);
    } else {
      router.push('/login');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col lg:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 border-b lg:border-r border-white/5 p-6 flex lg:flex-col justify-between">
        <div>
          <div className="text-xl font-black mb-12 italic uppercase tracking-tighter">
            Digital <span className="text-amber-400">Heroes</span>
          </div>
          <nav className="space-y-2 text-sm font-bold uppercase tracking-widest">
            <div className="text-amber-400 flex items-center gap-3 bg-amber-400/10 p-4 rounded-2xl cursor-default">
              <Trophy size={18} /> Dashboard
            </div>
          </nav>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-xs font-black uppercase mt-auto p-4"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
            Hero <span className="text-amber-400">Control</span>
          </h1>
          <p className="text-gray-500 text-[10px] mt-2 uppercase font-black tracking-[0.3em]">
            Authenticated: {user?.email}
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Performance */}
          <section className="space-y-12">
            <div>
              <h3 className="text-xl font-black uppercase italic mb-6 flex items-center gap-2">
                <Target className="text-amber-400" /> Log Performance
              </h3>
              <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] shadow-2xl">
                <ScoreEntry userId={user?.id} onScoreAdded={fetchScores} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black uppercase italic mb-6 flex items-center gap-2">
                <History className="text-amber-400" /> Rolling 5 History
              </h3>
              <div className="space-y-3">
                {loading ? (
                  <div className="h-20 bg-white/5 animate-pulse rounded-2xl" />
                ) : userScores.length > 0 ? (
                  userScores.map((s) => (
                    <div key={s.id} className="flex justify-between items-center p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-400/50 transition-all group">
                      <span className="text-gray-500 font-bold text-[10px] uppercase">{new Date(s.score_date).toLocaleDateString()}</span>
                      <span className="text-3xl font-black italic group-hover:text-amber-400 transition-colors">
                        {s.score} <span className="text-[10px] not-italic text-gray-500">PTS</span>
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-[2rem] text-center text-gray-600 text-[10px] font-black uppercase tracking-widest">
                    No scores tracked. Record your first round.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Column: Impact & Rewards */}
          <section className="space-y-12">
             {/* Draw History / Prizes Section */}
            <div>
              <h3 className="text-xl font-black uppercase italic mb-6 flex items-center gap-2">
                <Award className="text-amber-400" /> Reward Center
              </h3>
              <div className="mb-12">
                <DrawHistory userId={user?.id} />
              </div>
            </div>

            {/* Charity Selection Section */}
            <div>
              <div className="bg-amber-400 text-black p-8 rounded-[2.5rem] relative overflow-hidden mb-6 shadow-[0_20px_50px_rgba(251,191,36,0.2)]">
                <Heart className="absolute -right-4 -bottom-4 opacity-10" size={120} />
                <h3 className="text-2xl font-black uppercase italic leading-tight mb-2">
                  Purpose <br />Selection
                </h3>
                <p className="text-xs font-bold opacity-80 uppercase tracking-tight">
                  Your 10% contribution target.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
                <CharitySelector userId={user?.id} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}