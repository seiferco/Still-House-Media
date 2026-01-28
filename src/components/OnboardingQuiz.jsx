import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Home, 
  TrendingUp, 
  DollarSign, 
  Link as LinkIcon, 
  Mail, 
  Loader2, 
  X,
  ChevronLeft,
  Users
} from "lucide-react";

// Animation Variants
const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function OnboardingQuiz({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    propertyCount: "",
    goal: "",
    listingUrl: "",
    name: "",
    email: ""
  });

  if (!isOpen) return null;

  const totalSteps = 6;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleNext = (key, value) => {
    if (key) setFormData(prev => ({ ...prev, [key]: value }));
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      submitForm();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      console.log("Submitting Form Data:", formData);
      
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }
      
      const data = await res.json();
      console.log("Success:", data);
      
      // Move to success step
      setStep(totalSteps); 
    } catch (error) {
      console.error("Error submitting form:", error);
      // Optionally show error state to user here
    } finally {
      setLoading(false);
    }
  };

  // --- Step Components ---

  const StepWelcome = () => (
    <motion.div variants={slideIn} initial="hidden" animate="visible" exit="exit" className="text-center space-y-6">
      <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
        <TrendingUp className="text-amber-500" size={32} />
      </div>
      <h3 className="text-3xl font-bold text-white font-['Space_Grotesk']">Let's Build Your Strategy</h3>
      <p className="text-gray-400 text-lg">
        Answer 4 quick questions to get a personalized direct booking plan for your business.
      </p>
      <button 
        onClick={() => setStep(1)}
        className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 mt-8"
      >
        Start Assessment <ArrowRight size={20} />
      </button>
    </motion.div>
  );

  const StepExperience = () => (
    <motion.div variants={slideIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      <h3 className="text-2xl font-bold text-white text-center mb-8">How long have you been hosting?</h3>
      <div className="grid gap-4">
        {[
          { label: "Just getting started", value: "new" },
          { label: "1 - 3 Years", value: "intermediate" },
          { label: "3+ Years (Veteran)", value: "pro" }
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleNext("experience", opt.value)}
            className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/50 hover:text-white text-gray-300 transition-all text-left flex justify-between items-center group"
          >
            <span className="font-medium text-lg">{opt.label}</span>
            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" size={20} />
          </button>
        ))}
      </div>
    </motion.div>
  );

  const StepCount = () => (
    <motion.div variants={slideIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      <h3 className="text-2xl font-bold text-white text-center mb-8">How many properties do you manage?</h3>
      <div className="grid gap-4">
        {[
          { label: "Just one gem", value: "1" },
          { label: "2 - 5 properties", value: "2-5" },
          { label: "6 - 20 properties", value: "6-20" },
          { label: "20+ (Portfolio)", value: "20+" }
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleNext("propertyCount", opt.value)}
            className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/50 hover:text-white text-gray-300 transition-all text-left flex justify-between items-center group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                <Home size={18} className="group-hover:text-amber-500 transition-colors" />
              </div>
              <span className="font-medium text-lg">{opt.label}</span>
            </div>
            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" size={20} />
          </button>
        ))}
      </div>
    </motion.div>
  );

  const StepGoal = () => (
    <motion.div variants={slideIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      <h3 className="text-2xl font-bold text-white text-center mb-8">What's your #1 goal right now?</h3>
      <div className="grid gap-4">
        {[
          { label: "Eliminate Platform Fees", value: "fees", icon: DollarSign },
          { label: "Own My Guest Data", value: "data", icon: Users },
          { label: "Automate My Operations", value: "time", icon: Loader2 } // Using Loader2 as 'Automation' visual
        ].map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleNext("goal", opt.value)}
            className="w-full p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/50 hover:text-white text-gray-300 transition-all text-left flex justify-between items-center group"
          >
             <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-amber-500/10 transition-colors">
                <opt.icon size={18} className="group-hover:text-amber-500 transition-colors" />
              </div>
              <span className="font-medium text-lg">{opt.label}</span>
            </div>
            <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" size={20} />
          </button>
        ))}
      </div>
    </motion.div>
  );

  const StepListing = () => (
    <motion.div variants={slideIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-2xl font-bold text-white">Do you have a listing URL?</h3>
        <p className="text-gray-400">Optional. Helps us analyze your current setup.</p>
      </div>

      <div className="relative">
        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
        <input 
          type="url" 
          placeholder="airbnb.com/h/your-listing"
          value={formData.listingUrl}
          onChange={(e) => setFormData(prev => ({...prev, listingUrl: e.target.value}))}
          className="w-full pl-12 pr-4 py-4 bg-[#0b1120] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
        />
      </div>

      <button 
        onClick={() => handleNext()}
        className="w-full py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
      >
        {formData.listingUrl ? "Next Step" : "Skip This Step"} <ArrowRight size={20} />
      </button>
    </motion.div>
  );

  const StepContact = () => (
    <motion.div variants={slideIn} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-2xl font-bold text-white">Where should we send your plan?</h3>
        <p className="text-gray-400">You'll receive your custom strategy & ROI analysis.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1 ml-1">Your Name</label>
          <input 
            type="text" 
            placeholder="Jane Host"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
            className="w-full px-4 py-4 bg-[#0b1120] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
          />
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-500 mb-1 ml-1">Email Address</label>
           <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="email" 
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
              className="w-full pl-12 pr-4 py-4 bg-[#0b1120] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <button 
        onClick={() => submitForm()}
        disabled={!formData.email || !formData.name || loading}
        className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Get My Strategy"} 
        {!loading && <ArrowRight size={20} />}
      </button>
    </motion.div>
  );

  const StepSuccess = () => (
    <motion.div variants={slideIn} initial="hidden" animate="visible" exit="exit" className="text-center py-10">
      <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
        <CheckCircle2 size={40} />
      </div>
      <h3 className="text-3xl font-bold text-white mb-4">You're All Set!</h3>
      <p className="text-gray-400 text-lg mb-8 max-w-sm mx-auto">
        We've received your details. One of our direct booking experts is analyzing your setup and will be in touch shortly.
      </p>
      <button 
        onClick={onClose}
        className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
      >
        Back to Site
      </button>
    </motion.div>
  );

  // Helper to render current step
  const renderStep = () => {
    switch(step) {
      case 0: return <StepWelcome />;
      case 1: return <StepExperience />;
      case 2: return <StepCount />;
      case 3: return <StepGoal />;
      case 4: return <StepListing />;
      case 5: return <StepContact />;
      default: return <StepSuccess />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Main Modal Card */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header (Progress & Controls) */}
        {step < totalSteps && (
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between mb-6">
              {step > 0 ? (
                <button onClick={handleBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                  <ChevronLeft size={24} />
                </button>
              ) : <div className="w-10" />} {/* Spacer */}
              
              <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                Step {step + 1} of {totalSteps}
              </div>

              <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-full">
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-amber-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 px-8 pb-10 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <div key={step}>
              {renderStep()}
            </div>
          </AnimatePresence>
        </div>

        {/* Decorative Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-[80px] pointer-events-none rounded-full" />
      </motion.div>
    </div>
  );
}
