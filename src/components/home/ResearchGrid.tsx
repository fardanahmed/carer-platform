import React, { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Zap, Activity, Sprout, Cpu, Calculator, ArrowRight, type LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import type { ResearchArea } from '@/types';

const iconMap: Record<string, LucideIcon> = { Zap, Activity, Sprout, Cpu, Calculator };

const TiltCard = ({ area, index }: { area: ResearchArea, index: number }) => {
  const Icon = iconMap[area.icon] || Zap;
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mX = e.clientX - rect.left;
    const mY = e.clientY - rect.top;
    
    mouseX.set(mX);
    mouseY.set(mY);

    const xPct = mX / width - 0.5;
    const yPct = mY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      key={area.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`h-full perspective-[1200px] flex min-h-[450px] ${index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        <Card className="group relative overflow-hidden border-white/10 bg-slate-900/40 backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:border-purple-500/40 h-full flex flex-col will-change-transform">
          {/* Decorative hover spotlight */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 rounded-[inherit]"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(168, 85, 247, 0.15),
                  transparent 80%
                )
              `,
            }}
          />

          {/* Dot matrix texture */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:16px_16px] pointer-events-none" />

          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <CardHeader className="flex-none relative z-20" style={{ transform: "translateZ(50px)" }}>
            <div className="flex items-start justify-between w-full mb-6">
              <div className="rounded-full bg-cyan-500/10 w-fit p-4 ring-1 ring-inset ring-cyan-500/30 shadow-[0_0_20px_rgba(8,145,178,0.2)] transition-all duration-500 group-hover:bg-purple-500/20 group-hover:ring-purple-400/50 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] group-hover:scale-110">
                <Icon className="h-8 w-8 text-cyan-400 transition-colors duration-500 group-hover:text-purple-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              </div>
              {index === 0 && (
                <div className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300 backdrop-blur-md">
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  Flagship Domain
                </div>
              )}
            </div>
            <CardTitle className="line-clamp-2 text-3xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-md">
              {area.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow relative z-20" style={{ transform: "translateZ(30px)" }}>
            <p className="text-slate-300 leading-relaxed text-base line-clamp-4 font-medium">
              {area.description}
            </p>
          </CardContent>

          <CardFooter className="flex-none pt-0 relative z-20" style={{ transform: "translateZ(40px)" }}>
            <a
              href="/research"
              className="text-sm font-bold text-cyan-400 flex items-center gap-2 transition-all duration-300 group-hover:translate-x-2 group-hover:text-cyan-300"
            >
              <span className="border-b border-transparent group-hover:border-cyan-400/50 pb-0.5">Explore research</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

interface ResearchGridProps {
  areas: ResearchArea[];
}

const ResearchGrid = ({ areas }: ResearchGridProps) => {
  return (
    <section className="w-full py-32 bg-slate-950 relative overflow-hidden">
      {/* Top glowing divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      
      {/* Abstract 3D ambient glows */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1000px] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 flex flex-col items-center text-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-900/20 px-5 py-2 text-xs font-bold text-cyan-300 shadow-[0_0_20px_rgba(8,145,178,0.15)] uppercase tracking-widest backdrop-blur-md">
            Research Areas
          </div>
          <h2 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-[4rem] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400 drop-shadow-xl uppercase">
            Emerging Research Frontiers
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {areas.map((area, index) => (
            <TiltCard key={area.id} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchGrid;
