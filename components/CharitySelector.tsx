'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart, Search, CheckCircle2, Globe } from 'lucide-react';

const CHARITIES = [
  { id: '1', name: 'Youth Golf Alliance', category: 'Education', description: 'Providing equipment and coaching to underprivileged youth.' },
  { id: '2', name: 'Green Fairways Initative', category: 'Environment', description: 'Promoting sustainable water management on golf courses.' },
  { id: '3', name: 'Vets on the Green', category: 'Health', description: 'Using golf as physical and mental therapy for veterans.' },
  { id: '4', name: 'The First Tee', category: 'Community', description: 'Building character and life skills through the game of golf.' },
];

export default function CharitySelector({ userId }: { userId: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (charityId: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ charity_id: charityId })
      .eq('id', userId);

    if (!error) {
      setSelectedId(charityId);
    }
    setLoading(false);
  };

  const filteredCharities = CHARITIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input 
          type="text" 
          placeholder="Search Charities..." 
          className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-amber-400 transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4">
        {filteredCharities.map((charity) => (
          <div 
            key={charity.id}
            onClick={() => handleSelect(charity.id)}
            className={`p-5 rounded-3xl border transition-all cursor-pointer flex justify-between items-center ${
              selectedId === charity.id 
                ? 'bg-amber-400/10 border-amber-400' 
                : 'bg-white/5 border-white/10 hover:border-white/30'
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  {charity.category}
                </span>
              </div>
              <h4 className="font-bold text-lg">{charity.name}</h4>
              <p className="text-gray-500 text-xs mt-1">{charity.description}</p>
            </div>
            
            {selectedId === charity.id ? (
              <CheckCircle2 className="text-amber-400" size={24} />
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-white/10" />
            )}
          </div>
        ))}
      </div>
      
      <p className="text-[10px] text-gray-600 uppercase font-bold text-center tracking-widest">
        *10% of your subscription is automatically routed to your selection.
      </p>
    </div>
  );
}