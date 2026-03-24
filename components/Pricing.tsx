'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Monthly Impact',
      price: isYearly ? 15 : 19,
      description: 'Perfect for consistent monthly supporters.',
      features: ['5-Number Match Eligibility', 'Rolling 5 Score Tracking', '10% Min Charity Contribution', 'Standard Draw Entry'],
      cta: 'Start Monthly',
      featured: false
    },
    {
      name: 'Yearly Hero',
      price: isYearly ? 150 : 190,
      description: 'Maximum impact with a discounted rate.',
      features: ['All Monthly Features', '2 Months Free (Yearly)', 'Priority Winner Verification', 'Enhanced Impact Reporting'],
      cta: 'Become a Hero',
      featured: true
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-black mb-4 uppercase italic">Choose Your <span className="text-amber-400">Impact</span></h2>
        
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-14 h-7 bg-amber-400 rounded-full p-1 transition-all flex items-center"
          >
            <div className={`w-5 h-5 bg-black rounded-full transition-all transform ${isYearly ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-500'}`}>Yearly <span className="text-amber-400 font-bold">(Save 20%)</span></span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className={`p-10 rounded-3xl border ${plan.featured ? 'border-amber-400 bg-amber-400/5' : 'border-white/10 bg-white/5'} text-left transition-all hover:scale-[1.02]`}>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
              <div className="mb-8">
                <span className="text-5xl font-black">${plan.price}</span>
                <span className="text-gray-500">/{isYearly ? 'yr' : 'mo'}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check size={18} className="text-amber-400" /> {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold transition-colors ${plan.featured ? 'bg-amber-400 text-black hover:bg-amber-500' : 'bg-white text-black hover:bg-gray-200'}`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}