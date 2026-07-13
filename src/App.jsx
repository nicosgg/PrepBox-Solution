import React, { useState } from 'react';
import { 
  Activity, Target, Flame, Utensils, CheckCircle2, CreditCard, Dumbbell, Beef, Wheat, Droplet, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState('onboarding');
  
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    activity: 'active',
    goal: 'cutting'
  });

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

    const loadingPhases = [
      "Menganalisis data biometrik...",
      "Menghitung BMR...",
      "Mengoptimalkan makronutrisi...",
      "Mencocokkan menu..."
    ];
    let phaseIndex = 0;
    setLoadingText(loadingPhases[0]);

    const interval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < loadingPhases.length) {
        setLoadingText(loadingPhases[phaseIndex]);
      }
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      const w = parseFloat(formData.weight);
      
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
        case 'beauty':
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

  const mealDatabase = [
    {
      id: 1,
      name: "Truffle Grilled Chicken",
      desc: "Dada ayam sous-vide dengan minyak truffle.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
      macros: { p: 45, c: 30, f: 12 },
      tags: ["High Protein"]
    },
    {
      id: 2,
      name: "Wagyu Beef & Broccolini",
      desc: "Potongan sapi Wagyu tanpa lemak.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
      macros: { p: 42, c: 15, f: 18 },
      tags: ["Low Carb"]
    },
    {
      id: 3,
      name: "Wild-Caught Salmon",
      desc: "Salmon dipanggang dengan puree ubi.",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
      macros: { p: 38, c: 40, f: 22 },
      tags: ["Omega-3"]
    }
  ];

  const renderOnboarding = () => (
    <div className="max-w-xl mx-auto pt-24 pb-12 px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1.5 rounded-full text-sm font-semibold mb-4 border border-indigo-500/20">
          <Zap className="w-4 h-4" /> AI Nutritionist
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Stop Counting. <br/>Start Eating.</h1>
        <p className="text-slate-400 text-lg">Masukkan metrik Anda untuk menyusun rencana makan mingguan.</p>
      </div>

      <form onSubmit={generateMealPlan} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Berat (kg)</label>
              <input 
                type="number" name="weight" required min="30" max="200"
                value={formData.weight} onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                placeholder="75"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Tinggi (cm)</label>
              <input 
                type="number" name="height" required min="120" max="250"
                value={formData.height} onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                placeholder="180"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Aktivitas</label>
            <select 
              name="activity" value={formData.activity} onChange={handleInputChange}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              <option value="sedentary">Jarang Olahraga</option>
              <option value="active">Aktif (3-5x/Mgg)</option>
              <option value="athlete">Atlet (Setiap Hari)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-3">Tujuan Utama</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div onClick={() => handleGoalSelect('cutting')} className={"cursor-pointer rounded-xl p-4 border-2 flex flex-col items-center text-center gap-2 " + (formData.goal === 'cutting' ? "border-indigo-500 bg-indigo-500/10" : "border-slate-700 bg-slate-950")}>
                <Flame className={"w-6 h-6 " + (formData.goal === 'cutting' ? "text-indigo-400" : "text-slate-500")} />
                <div className="font-bold text-white">Cutting</div>
              </div>
              <div onClick={() => handleGoalSelect('bulking')} className={"cursor-pointer rounded-xl p-4 border-2 flex flex-col items-center text-center gap-2 " + (formData.goal === 'bulking' ? "border-indigo-500 bg-indigo-500/10" : "border-slate-700 bg-slate-950")}>
                <Dumbbell className={"w-6 h-6 " + (formData.goal === 'bulking' ? "text-indigo-400" : "text-slate-500")} />
                <div className="font-bold text-white">Bulking</div>
              </div>
              <div onClick={() => handleGoalSelect('beauty')} className={"cursor-pointer rounded-xl p-4 border-2 flex flex-col items-center text-center gap-2 " + (formData.goal === 'beauty' ? "border-indigo-500 bg-indigo-500/10" : "border-slate-700 bg-slate-950")}>
                <Target className={"w-6 h-6 " + (formData.goal === 'beauty' ? "text-indigo-400" : "text-slate-500")} />
                <div className="font-bold text-white">Maintenance</div>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4">
            Buat Protokol <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );

  const renderProcessing = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-4 border-emerald-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        <Activity className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Memproses protokol...</h2>
      <p className="text-indigo-400 font-mono text-sm h-6">{loadingText}</p>
    </div>
  );

  const renderDashboard = () => (
    <div className="pb-40">
      <div className="bg-emerald-500/10 border-b border-emerald-500/20">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-center gap-2 text-emerald-400 text-sm font-semibold">
          <ShieldCheck className="w-5 h-5" /> Sistem berhasil mencocokkan 14 menu.
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-10">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-extrabold text-white">Protokol Makro Anda</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <Flame className="w-6 h-6 text-orange-500 mb-3" />
            <span className="text-sm font-medium text-slate-400">Kalori</span>
            <span className="text-3xl font-black text-white">{macros.kcal}</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <Beef className="w-6 h-6 text-rose-500 mb-3" />
            <span className="text-sm font-medium text-slate-400">Protein</span>
            <span className="text-3xl font-black text-white">{macros.protein}g</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <Wheat className="w-6 h-6 text-amber-500 mb-3" />
            <span className="text-sm font-medium text-slate-400">Karbo</span>
            <span className="text-3xl font-black text-white">{macros.carbs}g</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <Droplet className="w-6 h-6 text-blue-500 mb-3" />
            <span className="text-sm font-medium text-slate-400">Lemak</span>
            <span className="text-3xl font-black text-white">{macros.fat}g</span>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
            <Utensils className="w-6 h-6 text-indigo-500" /> Kurasi Menu Mingguan
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {mealDatabase.map((meal) => (
              <div key={meal.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="h-48">
                  <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold text-white mb-2">{meal.name}</h4>
                  <p className="text-sm text-slate-400 mb-4">{meal.desc}</p>
                  <div className="flex justify-between text-sm font-medium text-slate-300">
                    <span>{meal.macros.p}g Pro</span>
                    <span>{meal.macros.c}g Carb</span>
                    <span>{meal.macros.f}g Fat</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-white font-bold text-lg hidden md:block">Keanggotaan 14-Menu</div>
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="text-right hidden md:block">
              <div className="text-2xl font-black text-white">Rp 750.000<span className="text-sm text-slate-500">/mgg</span></div>
            </div>
            <button className="flex-1 md:flex-none bg-emerald-500 text-slate-950 font-black px-8 py-3.5 rounded-xl flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" /> Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-50">
      <header className="absolute top-0 w-full z-40 bg-transparent">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentStep('onboarding')}>
            <div className="bg-indigo-600 p-1.5 rounded-lg"><Activity className="w-5 h-5 text-white" strokeWidth={3} /></div>
            <span className="text-xl font-black tracking-tight text-white">PREP<span className="text-indigo-500">BOX</span></span>
          </div>
        </div>
      </header>
      <main className="relative min-h-screen">
        {currentStep === 'onboarding' && renderOnboarding()}
        {currentStep === 'processing' && renderProcessing()}
        {currentStep === 'dashboard' && renderDashboard()}
      </main>
    </div>
  );
}
