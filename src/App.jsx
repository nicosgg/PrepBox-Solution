import React, { useState } from 'react';
import { 
  Activity, Target, Flame, Utensils, CheckCircle2, CreditCard, Dumbbell, Beef, Wheat, Droplet, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState('onboarding');
  const [formData, setFormData] = useState({ weight: '', height: '', activity: 'active', goal: 'cutting' });
  const [macros, setMacros] = useState({ kcal: 0, protein: 0, carbs: 0, fat: 0 });
  const [loadingText, setLoadingText] = useState('');

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

    const loadingPhases = ["Analyzing biometric data...", "Calculating BMR...", "Optimizing macros...", "Curating menu..."];
    let phaseIndex = 0;
    setLoadingText(loadingPhases[0]);

    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < loadingPhases.length) setLoadingText(loadingPhases[phaseIndex]);
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      const w = parseFloat(formData.weight);
      const base = w * 22; 
      const activityMultipliers = { sedentary: 1.2, active: 1.5, athlete: 1.8 };
      const tdee = base * activityMultipliers[formData.activity];

      let kcal, protein, fat, carbs;
      switch(formData.goal) {
        case 'cutting': kcal = Math.round(tdee - 500); protein = Math.round(w * 2.2); fat = Math.round(w * 0.8); break;
        case 'bulking': kcal = Math.round(tdee + 500); protein = Math.round(w * 2.0); fat = Math.round(w * 1.0); break;
        case 'beauty': kcal = Math.round(tdee); protein = Math.round(w * 1.6); fat = Math.round(w * 1.0); break;
        default: kcal = 2000; protein = 150; fat = 60;
      }
      carbs = Math.max(0, Math.round((kcal - (protein * 4 + fat * 9)) / 4));

      setMacros({ kcal, protein, carbs, fat });
      setCurrentStep('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3500);
  };

  const renderOnboarding = () => (
    <div className="max-w-xl mx-auto pt-24 pb-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Prepbox SaaS</h1>
        <p className="text-slate-400 text-lg">Input your metrics to generate a plan.</p>
      </div>
      <form onSubmit={generateMealPlan} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Weight (kg)</label>
              <input type="number" name="weight" required min="30" max="200" value={formData.weight} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600" placeholder="75" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Height (cm)</label>
              <input type="number" name="height" required min="120" max="250" value={formData.height} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600" placeholder="180" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Activity</label>
            <select name="activity" value={formData.activity} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
              <option value="sedentary">Sedentary</option><option value="active">Active</option><option value="athlete">Athlete</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4">
            Generate Plan <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );

  const renderProcessing = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-2xl font-bold text-white mb-2">Processing...</h2>
      <p className="text-indigo-400 font-mono text-sm h-6">{loadingText}</p>
    </div>
  );

  const renderDashboard = () => (
    <div className="pb-40 max-w-5xl mx-auto px-6 pt-10">
      <h2 className="text-3xl font-extrabold text-white mb-6">Your Macros</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col"><Flame className="w-6 h-6 text-orange-500 mb-3" /><span className="text-sm font-medium text-slate-400">Calories</span><span className="text-3xl font-black text-white">{macros.kcal}</span></div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col"><Beef className="w-6 h-6 text-rose-500 mb-3" /><span className="text-sm font-medium text-slate-400">Protein</span><span className="text-3xl font-black text-white">{macros.protein}g</span></div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col"><Wheat className="w-6 h-6 text-amber-500 mb-3" /><span className="text-sm font-medium text-slate-400">Carbs</span><span className="text-3xl font-black text-white">{macros.carbs}g</span></div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col"><Droplet className="w-6 h-6 text-blue-500 mb-3" /><span className="text-sm font-medium text-slate-400">Fats</span><span className="text-3xl font-black text-white">{macros.fat}g</span></div>
      </div>
      <button onClick={() => setCurrentStep('onboarding')} className="bg-indigo-600 text-white px-6 py-2 rounded-lg">Recalculate</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50">
      <main className="relative min-h-screen">
        {currentStep === 'onboarding' && renderOnboarding()}
        {currentStep === 'processing' && renderProcessing()}
        {currentStep === 'dashboard' && renderDashboard()}
      </main>
    </div>
  );
}
```eof

Perhatikan bahwa baris `export default function App()` sekarang dinamai **App**, bukan `PrepboxSaaS` atau lainnya, yang memastikan cocok dengan nama fungsi yang dipanggil oleh `main.jsx`.

**Langkah 2: Perbarui Vercel (Redeploy)**
Setelah mengedit `src/App.jsx` dan menyimpannya di GitHub, Vercel akan otomatis melakukan build. Beri tahu saya jika langkah "sapu bersih" ini berhasil!
