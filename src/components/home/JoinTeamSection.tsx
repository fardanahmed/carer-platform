import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const JoinTeamSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', location: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API registration
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-slate-950/80 backdrop-blur-sm border-t border-white/5 relative overflow-hidden">
      {/* Glow background bubbles */}
      <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute left-1/4 -bottom-48 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          
          {/* Context Column */}
          <div className="space-y-8 lg:max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-900/20 px-5 py-2 text-xs font-bold text-cyan-300 shadow-[0_0_20px_rgba(8,145,178,0.15)] uppercase tracking-widest backdrop-blur-md">
              Join Our Network
            </div>
            <h2 className="font-heading text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400 sm:text-5xl drop-shadow-xl">
              Fascinated by Applied Research?
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed font-light">
              We are constantly seeking brilliant minds, research fellows, and industry collaborators. Join our mailing list to receive openings, research updates, and publication notifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="/contact" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold group transition-colors">
                <span className="border-b border-transparent group-hover:border-cyan-400/50 pb-0.5">Contact our hiring desk</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Glass Form Column */}
          <div className="relative">
            {/* Soft backdrop glow behind the form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-20" />
            
            <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/50 backdrop-blur-3xl p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/5">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 p-8 text-center space-y-5"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Successfully Registered!
                    </h3>
                    <p className="text-slate-300 mt-2 font-medium">
                      Thank you for your interest. We've added you to our talent pool.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-semibold text-slate-200">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/10 backdrop-blur-sm"
                      placeholder="e.g. Dr. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-200">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/10 backdrop-blur-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-semibold text-slate-200">Location</label>
                    <input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 focus:bg-white/10 backdrop-blur-sm"
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="pt-4">
                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl text-base font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 hover:brightness-110 border border-cyan-400/20">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
                        </span>
                      ) : (
                        'Register Interest'
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JoinTeamSection;
