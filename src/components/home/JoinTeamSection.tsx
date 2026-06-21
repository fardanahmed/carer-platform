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
    <section className="py-24 bg-gradient-to-b from-background to-muted/20 border-t border-border/50 relative overflow-hidden">
      {/* Glow background bubbles */}
      <div className="absolute -right-48 top-1/3 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute left-1/4 -bottom-48 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Context Column */}
          <div className="space-y-6 lg:max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Join Our Network
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Fascinated by Applied Research?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We are constantly seeking brilliant minds, research fellows, and industry collaborators. Join our mailing list to receive openings, research updates, and publication notifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="/contact" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-semibold group">
                Contact our hiring desk
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Glass Form Column */}
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-15" />
            <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-md p-8 md:p-10 shadow-xl">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-xl bg-green-500/10 border border-green-500/20 p-6 text-center space-y-4"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      Successfully Registered!
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Thank you for your interest. We've added you to our talent pool.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="flex h-11 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g. Dr. John Doe"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="flex h-11 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="location" className="text-sm font-medium text-foreground">Location</label>
                    <input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="flex h-11 w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="pt-2">
                    <Button type="submit" disabled={isSubmitting} className="w-full h-11 rounded-xl font-bold shadow-lg shadow-primary/10">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
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
