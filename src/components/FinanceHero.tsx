import { Button } from "@/components/ui/button";
import { TrendingUp, Calculator, PiggyBank, Target } from "lucide-react";

export const FinanceHero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              Domine Suas Finanças com
              <span className="block text-primary mt-2">Educação Financeira</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ferramentas interativas, simuladores práticos e conteúdo educativo para transformar sua relação com o dinheiro
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => scrollToSection('simulators')}
              className="text-base"
            >
              <Calculator className="w-5 h-5" />
              Começar Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('articles')}
              className="text-base"
            >
              Explorar Conteúdo
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card shadow-card hover:shadow-hover transition-all duration-300">
              <div className="p-3 rounded-full bg-primary/10">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Simuladores Interativos</h3>
              <p className="text-sm text-muted-foreground text-center">
                Teste cenários reais e veja o impacto nas suas finanças
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card shadow-card hover:shadow-hover transition-all duration-300">
              <div className="p-3 rounded-full bg-success/10">
                <PiggyBank className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Economize Mais</h3>
              <p className="text-sm text-muted-foreground text-center">
                Descubra onde e como economizar com nossas calculadoras
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card shadow-card hover:shadow-hover transition-all duration-300">
              <div className="p-3 rounded-full bg-accent/10">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Alcance Metas</h3>
              <p className="text-sm text-muted-foreground text-center">
                Planeje e acompanhe seu progresso financeiro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
