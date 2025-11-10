import { FinanceHero } from "@/components/FinanceHero";
import { BudgetSimulator } from "@/components/BudgetSimulator";
import { InvestmentSimulator } from "@/components/InvestmentSimulator";
import { DebtCalculator } from "@/components/DebtCalculator";
import { FinanceQuiz } from "@/components/FinanceQuiz";
import { ArticleCard } from "@/components/ArticleCard";
import { BookOpen, TrendingUp, Shield, Wallet, Target, Lightbulb } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FinanceHero />

      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Simulators Section */}
        <section id="simulators" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ferramentas Interativas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experimente nossos simuladores e tome decisões financeiras mais inteligentes
            </p>
          </div>

          <div className="space-y-8">
            <BudgetSimulator />
            <InvestmentSimulator />
            <DebtCalculator />
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Teste Seus Conhecimentos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra seu nível de educação financeira e receba dicas personalizadas
            </p>
          </div>

          <FinanceQuiz />
        </section>

        {/* Financial Terms Glossary */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Termos Financeiros Importantes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passe o mouse sobre os termos para ver explicações simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-hover transition-all duration-300 cursor-help">
                    <h3 className="font-semibold text-primary mb-2">Juros Compostos</h3>
                    <p className="text-sm text-muted-foreground">
                      Clique para saber mais sobre este conceito fundamental
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Juros calculados sobre o valor inicial mais os juros acumulados. É o "efeito bola de neve" que faz investimentos crescerem exponencialmente ao longo do tempo.
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-hover transition-all duration-300 cursor-help">
                    <h3 className="font-semibold text-success mb-2">Diversificação</h3>
                    <p className="text-sm text-muted-foreground">
                      Estratégia essencial para investimentos seguros
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Distribuir investimentos em diferentes tipos de ativos para reduzir riscos. É como não colocar todos os ovos na mesma cesta.
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-hover transition-all duration-300 cursor-help">
                    <h3 className="font-semibold text-accent mb-2">Liquidez</h3>
                    <p className="text-sm text-muted-foreground">
                      Entenda a disponibilidade do seu dinheiro
                    </p>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>
                    Facilidade de converter um investimento em dinheiro rapidamente. Poupança tem alta liquidez, imóveis têm baixa liquidez.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Conteúdo Educativo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Artigos e guias práticos para melhorar sua educação financeira
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ArticleCard
              title="Como Começar a Investir com Pouco Dinheiro"
              description="Descubra estratégias práticas para dar os primeiros passos no mundo dos investimentos, mesmo com orçamento limitado."
              category="Investimentos"
              readTime="8 min"
              icon={<TrendingUp className="w-6 h-6" />}
              slug="como-comecar-investir"
            />
            <ArticleCard
              title="O Guia Completo do Orçamento Familiar"
              description="Aprenda a criar e manter um orçamento eficiente que ajudará você a alcançar suas metas financeiras."
              category="Planejamento"
              readTime="10 min"
              icon={<Wallet className="w-6 h-6" />}
              slug="guia-orcamento-familiar"
            />
            <ArticleCard
              title="Proteção Financeira: Seguros Essenciais"
              description="Entenda quais seguros são realmente necessários e como escolher a melhor cobertura para sua situação."
              category="Segurança"
              readTime="7 min"
              icon={<Shield className="w-6 h-6" />}
              slug="protecao-financeira-seguros"
            />
            <ArticleCard
              title="Estratégias para Sair das Dívidas"
              description="Métodos comprovados para eliminar dívidas de forma eficiente e recuperar sua saúde financeira."
              category="Dívidas"
              readTime="12 min"
              icon={<Target className="w-6 h-6" />}
              slug="estrategias-sair-dividas"
            />
            <ArticleCard
              title="Educação Financeira para Iniciantes"
              description="Os conceitos fundamentais que todo brasileiro deveria conhecer sobre finanças pessoais."
              category="Básico"
              readTime="6 min"
              icon={<BookOpen className="w-6 h-6" />}
              slug="educacao-financeira-iniciantes"
            />
            <ArticleCard
              title="Dicas de Economia no Dia a Dia"
              description="Pequenas mudanças de hábitos que podem gerar grandes economias no final do mês."
              category="Economia"
              readTime="5 min"
              icon={<Lightbulb className="w-6 h-6" />}
              slug="dicas-economia-dia-dia"
            />
          </div>
        </section>
      </main>

      <footer className="border-t mt-24 py-12 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <p className="text-muted-foreground">
            © 2024 Blog de Educação Financeira. Transformando vidas através do conhecimento financeiro.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
