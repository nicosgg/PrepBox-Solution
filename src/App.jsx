```react
import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Target, 
  Flame, 
  Utensils, 
  CheckCircle2, 
  CreditCard,
  Dumbbell,
  Beef,
  Wheat,
  Droplet,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function PrepboxSaaS() {
  // --- STATE MANAGEMENT ---
  // Steps: 'onboarding' | 'processing' | 'dashboard'
  const [currentStep, setCurrentStep] = useState('onboarding');
  
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    activity: 'active',
    goal: 'cutting'
  });

  const [macros, setMacros] = useState({ kcal: 0, protein: 0, carbs: 0, fat: 0 });
  const [loadingText, setLoadingText] = useState('');

  // --- BUSINESS LOGIC ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGoalSelect = (goal) => {
    setFormData(prev => ({ ...prev, goal }));
  };

  const generateMealPlan = (e) => {
    e.preventDefault();
    if (!formData.weight || !formData.height) return;
    
    setCurrentStep('processing');

    // Simulate algorithmic processing phases
    const loadingPhases = [
      "Analyzing biometric data...",
      "Calculating Basal Metabolic Rate (BMR)...",
      "Optimizing macronutrient splits...",
      "Curating weekly menu match..."
    ];

    let phaseIndex = 0;
    setLoadingText(loadingPhases[0]);

    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < loadingPhases.length) {
        setLoadingText(loadingPhases[phaseIndex]);
      }
    }, 800);

    // Calculate Macros (Simulated Logic)
    setTimeout(() => {
      clearInterval(interval);
      const w = parseFloat(formData.weight);
      
      // Simplified TDEE Calculation
      const base = w * 22; 
      const activityMultipliers = { sedentary: 1.2, active: 1.5, athlete: 1.8 };
      const tdee = base * activityMultipliers[formData.activity];

      let kcal, protein, fat, carbs;

      switch(formData.goal) {
        case 'cutting':
          kcal = Math.round(tdee - 500);
          protein = Math.round(w * 2.2);
          fat = Math.round(w * 0.8);
          break;
        case 'bulking':
          kcal = Math.round(tdee + 500);
          protein = Math.round(w * 2.0);
          fat = Math.round(w * 1.0);
          break;
        case 'beauty': // Maintenance
          kcal = Math.round(tdee);
          protein = Math.round(w * 1.6);
          fat = Math.round(w * 1.0);
          break;
        default:
          kcal = 2000; protein = 150; fat = 60;
      }
      
      carbs = Math.max(0, Math.round((kcal - (protein * 4 + fat * 9)) / 4));

      setMacros({ kcal, protein, carbs, fat });
      setCurrentStep('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3500);
  };

  // --- MOCK DATA ---
  const mealDatabase = [
    {
      id: 1,
      name: "Herb-Crusted Salmon & Asparagus",
      desc: "Wild-caught salmon with a dill crust, roasted asparagus, and wild rice.",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
      macros: { p: 42, c: 35, f: 18 },
      tags: ["High Protein", "Omega-3"]
    },
    {
      id: 2,
      name: "Lean Steak & Sweet Potato Mash",
      desc: "Grass-fed sirloin, whipped sweet potatoes, and steamed broccolini.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
      macros: { p: 45, c: 40, f: 15 },
      tags: ["Iron Rich", "Muscle Builder"]
    },
    {
      id: 3,
      name: "Mediterranean Chicken Bowl",
      desc: "Grilled chicken breast, quinoa, kalamata olives, feta, and tzatziki.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      macros: { p: 38, c: 30, f: 12 },
      tags: ["Low Calorie", "Balanced"]
    }
  ];

  // --- RENDER HELPERS ---
  const renderOnboarding = () => (
    <div className="max-w-xl mx-auto pt-24 pb-12 px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-indigo-500/20">
          <Zap className="w-4 h-4" /> AI Nutritionist
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Stop Counting. <br/>Start Eating.</h1>
        <p className="text-slate-400 text-lg">Input your metrics and let our algorithm engineer your perfect weekly meal plan.</p>
      </div>

      <form onSubmit={generateMealPlan} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="space-y-6">
          
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Weight (kg)</label>
              <input 
                type="number" name="weight" required min="30" max="200"
                value={formData.weight} onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                placeholder="e.g. 75"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Height (cm)</label>
              <input 
                type="number" name="height" required min="120" max="250"
                value={formData.height} onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                placeholder="e.g. 180"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Activity Level</label>
            <select 
              name="activity" value={formData.activity} onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition-all"
            >
              <option value="sedentary">Sedentary (Desk job, little exercise)</option>
              <option value="active">Active (Workout 3-4x/week)</option>
              <option value="athlete">Athlete (Intense daily training)</option>
            </select>
          </div>

          {/* Goal (Custom Radio Cards) */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Primary Goal</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: 'cutting', label: 'Cutting', sub: 'Lose Fat', icon: Flame },
                { id: 'bulking', label: 'Bulking', sub: 'Build Muscle', icon: Dumbbell },
                { id: 'beauty', label: 'Beauty', sub: 'Maintain & Glow', icon: Target }
              ].map((goalOption) => {
                const Icon = goalOption.icon;
                const isActive = formData.goal === goalOption.id;
                return (
                  <div 
                    key={goalOption.id}
                    onClick={() => handleGoalSelect(goalOption.id)}
                    className={`cursor-pointer rounded-xl p-4 border-2 transition-all flex flex-col items-center text-center gap-2 ${
                      isActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 bg-slate-950 hover:border-slate-600'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <div>
                      <div className={`font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>{goalOption.label}</div>
                      <div className="text-xs text-slate-500">{goalOption.sub}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
          >
            Generate My Meal Plan <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );

  const renderProcessing = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-4 border-emerald-400 rounded-full animate-spin-reverse" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <Activity className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Engineering your protocol...</h2>
      <p className="text-indigo-400 font-mono text-sm h-6">{loadingText}</p>
    </div>
  );

  const renderDashboard = () => (
    <div className="pb-40"> {/* Padding bottom for fixed checkout bar */}
      
      {/* Success Banner */}
      <div className="bg-emerald-500/10 border-b border-emerald-500/20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold">
          <ShieldCheck className="w-5 h-5" />
          System successfully matched 14 meals to your biometric targets.
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-10">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-white">Your Macro Protocol</h2>
          <p className="text-slate-400 mt-2">To achieve your goal of <strong className="text-indigo-400 capitalize">{formData.goal}</strong>, you need to hit these daily targets:</p>
        </div>

        {/* Macro Targets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col relative overflow-hidden">
            <Flame className="w-6 h-6 text-orange-500 mb-3" />
            <span className="text-sm font-medium text-slate-400">Daily Calories</span>
            <span className="text-3xl font-black text-white">{macros.kcal}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col relative overflow-hidden">
            <Beef className="w-6 h-6 text-rose-500 mb-3" />
            <span className="text-sm font-medium text-slate-400">Protein</span>
            <span className="text-3xl font-black text-white">{macros.protein}g</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col relative overflow-hidden">
            <Wheat className="w-6 h-6 text-amber-500 mb-3" />
            <span className="text-sm font-medium text-slate-400">Carbs</span>
            <span className="text-3xl font-black text-white">{macros.carbs}g</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col relative overflow-hidden">
            <Droplet className="w-6 h-6 text-blue-500 mb-3" />
            <span className="text-sm font-medium text-slate-400">Fats</span>
            <span className="text-3xl font-black text-white">{macros.fat}g</span>
          </div>
        </div>

        {/* Curated Meals Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Utensils className="w-6 h-6 text-indigo-500" />
                Your Curated Menu
              </h3>
              <p className="text-slate-400 mt-1 text-sm">
                These specific meals were auto-selected to perfectly hit your <strong>{macros.kcal} kcal</strong> target.
              </p>
            </div>
            <div className="text-sm font-semibold bg-slate-800 text-slate-300 px-4 py-2 rounded-lg">
              Showing 3 of 14 meals
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mealDatabase.map((meal) => (
              <div key={meal.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
                <div className="h-48 relative">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {meal.tags.map(tag => (
                      <span key={tag} className="bg-slate-900/90 backdrop-blur-sm text-xs font-bold text-white px-2.5 py-1 rounded-md border border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="text-lg font-bold text-white mb-2 leading-snug">{meal.name}</h4>
                  <p className="text-sm text-slate-400 mb-6 flex-1">{meal.desc}</p>
                  
                  {/* Meal Macros */}
                  <div className="pt-4 border-t border-slate-800">
                    <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-semibold">Macros per serving</div>
                    <div className="flex items-center justify-between text-sm font-medium text-slate-300">
                      <span>{meal.macros.p}g <span className="text-slate-500">Pro</span></span>
                      <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                      <span>{meal.macros.c}g <span className="text-slate-500">Carb</span></span>
                      <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                      <span>{meal.macros.f}g <span className="text-slate-500">Fat</span></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Fixed Bottom Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="bg-indigo-500/20 p-3 rounded-full hidden md:block">
              <CheckCircle2 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">14-Meal Weekly Subscription</div>
              <div className="text-slate-400 text-sm">Chef-prepared lunch & dinner. Paused or cancelled anytime.</div>
            </div>
          </div>

          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="text-right hidden md:block">
              <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Total Price</div>
              <div className="text-2xl font-black text-white">Rp 750.000<span className="text-sm text-slate-500 font-medium">/week</span></div>
            </div>
            <button className="flex-1 md:flex-none bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" /> Subscribe & Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 text-slate-50">
      
      {/* Minimal Header */}
      <header className="absolute top-0 w-full z-40 bg-transparent">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentStep('onboarding')}
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Activity className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              PREP<span className="text-indigo-500">BOX</span>
            </span>
          </div>
          {currentStep === 'dashboard' && (
            <button 
              onClick={() => setCurrentStep('onboarding')}
              className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Recalculate Macros
            </button>
          )}
        </div>
      </header>

      {/* State Machine Rendering */}
      <main className="relative min-h-screen">
        {currentStep === 'onboarding' && renderOnboarding()}
        {currentStep === 'processing' && renderProcessing()}
        {currentStep === 'dashboard' && renderDashboard()}
      </main>

    </div>
  );
}


```
