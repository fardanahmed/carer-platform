import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Activity, Sprout, Cpu, Calculator, ArrowUpRight, ArrowRight, type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ResearchArea } from '@/types';

const iconMap: Record<string, LucideIcon> = { Zap, Activity, Sprout, Cpu, Calculator };

interface ResearchGridProps {
  areas: ResearchArea[];
}

const ResearchGrid = ({ areas }: ResearchGridProps) => {
  return (
    <section className="container mx-auto px-6 py-24 bg-background">
      <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end max-w-7xl mx-auto">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4">
            Our Work
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
            Research Frontiers
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground text-lg">
            Our interdisciplinary teams are tackling the most pressing challenges of our time, bridging foundational science with applied engineering.
          </p>
        </div>
        <Button variant="ghost" className="group text-primary hover:text-primary/80 hover:bg-primary/10 rounded-full" asChild>
          <a href="/research" className="flex items-center gap-1.5 text-base font-semibold">
            View All Areas
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {areas.map((area, index) => {
          const Icon = iconMap[area.icon] || Zap;
          return (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="h-full"
            >
              <Card className="group relative overflow-hidden border-border bg-card/45 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/50 hover:bg-card h-full flex flex-col">
                {/* Decorative hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <CardHeader className="flex-none">
                  <div className="mb-5 rounded-xl bg-primary/10 w-fit p-3.5 ring-1 ring-inset ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:ring-primary">
                    <Icon className="h-7 w-7 text-primary transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <CardTitle className="line-clamp-2 text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {area.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground leading-relaxed text-base line-clamp-4">
                    {area.description}
                  </p>
                </CardContent>
                
                <CardFooter className="flex-none pt-0">
                  <a 
                    href="/research"
                    className="text-sm font-semibold text-primary flex items-center gap-1.5 transition-all group-hover:translate-x-1"
                  >
                    <span>Explore research</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ResearchGrid;
