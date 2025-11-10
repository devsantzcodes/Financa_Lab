import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ArticleContent {
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
}

const articles: Record<string, ArticleContent> = {
  "como-comecar-investir": {
    title: "Como Começar a Investir com Pouco Dinheiro",
    description: "Descubra estratégias práticas para dar os primeiros passos no mundo dos investimentos, mesmo com orçamento limitado.",
    category: "Investimentos",
    readTime: "8 min",
    date: "10 de novembro, 2024",
    content: {
      introduction: "Muitas pessoas acreditam que é necessário ter muito dinheiro para começar a investir. Esse é um dos maiores mitos sobre investimentos! A verdade é que você pode começar com valores modestos e, com disciplina e conhecimento, construir um patrimônio sólido ao longo do tempo.",
      sections: [
        {
          title: "1. Comece com uma Reserva de Emergência",
          content: "Antes de investir, é fundamental ter uma reserva de emergência. Ela deve cobrir de 3 a 6 meses das suas despesas essenciais e deve ficar em investimentos de alta liquidez, como a poupança ou o Tesouro Selic. Essa reserva é sua proteção contra imprevistos e evita que você precise resgatar investimentos de longo prazo prematuramente."
        },
        {
          title: "2. Conheça seu Perfil de Investidor",
          content: "Existem três perfis principais: conservador (prioriza segurança), moderado (equilibra risco e retorno) e arrojado (aceita mais riscos por maiores retornos). Conhecer seu perfil ajuda a escolher investimentos alinhados com sua tolerância ao risco e seus objetivos financeiros."
        },
        {
          title: "3. Investimentos para Começar",
          content: "Com pouco dinheiro, você pode começar pelo Tesouro Direto (a partir de R$ 30), CDBs de bancos digitais, ou fundos de investimento com aplicação mínima baixa. Muitas corretoras não cobram taxas e oferecem aplicativos intuitivos para facilitar seus investimentos."
        },
        {
          title: "4. A Importância da Consistência",
          content: "Mais importante que o valor inicial é a consistência. Invista regularmente, mesmo que seja R$ 50 ou R$ 100 por mês. Com o tempo e os juros compostos, esses valores se multiplicam. É o famoso efeito bola de neve: quanto mais cedo você começa, mais seu dinheiro trabalha para você."
        },
        {
          title: "5. Diversifique seus Investimentos",
          content: "Não coloque todos os ovos na mesma cesta. Diversificar significa distribuir seus investimentos entre diferentes tipos de ativos (renda fixa, ações, fundos imobiliários) para reduzir riscos. À medida que seu patrimônio cresce, vá ampliando sua diversificação."
        },
        {
          title: "6. Educação Financeira é Fundamental",
          content: "Invista tempo em aprender sobre finanças. Leia livros, assista vídeos, faça cursos gratuitos. Quanto mais você entende sobre investimentos, melhores decisões você toma e mais confiante se sente para investir valores maiores."
        }
      ],
      conclusion: "Começar a investir com pouco dinheiro não só é possível, como é o primeiro passo para construir sua independência financeira. O importante é dar o primeiro passo, manter a disciplina e continuar aprendendo. Lembre-se: o melhor momento para começar a investir é agora!"
    }
  },
  "guia-orcamento-familiar": {
    title: "O Guia Completo do Orçamento Familiar",
    description: "Aprenda a criar e manter um orçamento eficiente que ajudará você a alcançar suas metas financeiras.",
    category: "Planejamento",
    readTime: "10 min",
    date: "10 de novembro, 2024",
    content: {
      introduction: "Um orçamento familiar bem estruturado é a base para uma vida financeira saudável. Ele permite que você tenha controle sobre seus gastos, economize para seus objetivos e evite surpresas desagradáveis no final do mês.",
      sections: [
        {
          title: "1. Por que fazer um Orçamento?",
          content: "O orçamento familiar é essencial para visualizar para onde está indo seu dinheiro, identificar gastos desnecessários, planejar compras importantes e criar uma reserva financeira. Sem um orçamento, é fácil gastar mais do que ganha e acumular dívidas."
        },
        {
          title: "2. Mapeie todas as suas Receitas",
          content: "Liste todas as fontes de renda da família: salários, trabalhos freelance, aluguéis, investimentos, etc. Considere apenas os valores líquidos (após impostos e descontos). Se sua renda varia, use uma média dos últimos 3-6 meses para ter uma base realista."
        },
        {
          title: "3. Categorize suas Despesas",
          content: "Divida seus gastos em categorias: despesas fixas (aluguel, condomínio, plano de saúde), despesas variáveis (alimentação, transporte, lazer) e despesas eventuais (manutenções, presentes). Durante um mês, anote TODOS os gastos para ter uma visão real do seu padrão de consumo."
        },
        {
          title: "4. A Regra 50-30-20",
          content: "Uma fórmula simples e eficaz: destine 50% da renda para necessidades (moradia, alimentação, transporte), 30% para desejos (lazer, hobbies, jantares fora) e 20% para poupança e investimentos. Ajuste conforme sua realidade, mas sempre priorize a poupança."
        },
        {
          title: "5. Use Ferramentas de Controle",
          content: "Aplicativos de gestão financeira facilitam muito o controle do orçamento. Eles categorizam despesas automaticamente, enviam alertas e geram relatórios visuais. Planilhas também funcionam bem para quem prefere algo mais personalizado."
        },
        {
          title: "6. Revise e Ajuste Mensalmente",
          content: "Reserve um dia no fim do mês para revisar o orçamento. Compare o planejado com o realizado, identifique desvios e ajuste para o próximo mês. Com o tempo, você desenvolverá uma consciência financeira que torna o processo natural."
        },
        {
          title: "7. Envolva Toda a Família",
          content: "Quando todos entendem o orçamento e participam das decisões, fica mais fácil cumprir as metas. Converse abertamente sobre dinheiro, estabeleça objetivos comuns e celebre as conquistas juntos."
        }
      ],
      conclusion: "Criar e manter um orçamento familiar pode parecer trabalhoso no início, mas logo se torna um hábito que traz paz e segurança financeira. Comece hoje mesmo: anote seus gastos, organize suas finanças e veja como sua vida financeira se transforma!"
    }
  },
  "protecao-financeira-seguros": {
    title: "Proteção Financeira: Seguros Essenciais",
    description: "Entenda quais seguros são realmente necessários e como escolher a melhor cobertura para sua situação.",
    category: "Segurança",
    readTime: "7 min",
    date: "10 de novembro, 2024",
    content: {
      introduction: "Seguros são ferramentas de proteção financeira que oferecem tranquilidade em momentos difíceis. No entanto, é importante saber quais são essenciais e como escolher coberturas adequadas sem gastar demais.",
      sections: [
        {
          title: "1. Seguro de Vida",
          content: "Essencial para quem tem dependentes financeiros (cônjuge, filhos). Ele garante que sua família mantenha o padrão de vida caso você falte. Calcule o valor da cobertura considerando dívidas, despesas mensais da família e custos futuros como educação dos filhos."
        },
        {
          title: "2. Seguro Saúde",
          content: "Um dos mais importantes, especialmente considerando os altos custos de tratamentos médicos. Avalie se o plano oferecido pela empresa é suficiente ou se vale a pena um plano particular. Compare coberturas, redes credenciadas e carências antes de contratar."
        },
        {
          title: "3. Seguro Residencial",
          content: "Protege seu maior patrimônio contra incêndios, roubos, danos elétricos e desastres naturais. Muitas pessoas ignoram esse seguro, mas ele pode evitar prejuízos devastadores. Inclua também responsabilidade civil para acidentes que possam ocorrer em sua propriedade."
        },
        {
          title: "4. Seguro Automóvel",
          content: "Obrigatório por lei apenas o DPVAT, mas o seguro completo vale a pena para proteger seu veículo e terceiros. Compare franquias, coberturas de vidros, assistência 24h e carro reserva. Carros mais antigos podem não justificar o custo do seguro completo."
        },
        {
          title: "5. Seguro de Invalidez",
          content: "Pouco lembrado, mas crucial. Protege sua renda caso você fique impossibilitado de trabalhar por acidente ou doença. É especialmente importante para profissionais autônomos e quem não tem benefícios corporativos robustos."
        },
        {
          title: "6. Como Escolher e Economizar",
          content: "Compare propostas de diferentes seguradoras, leia atentamente as condições gerais, entenda o que está e não está coberto, e ajuste franquias conforme sua capacidade de pagamento. Evite coberturas desnecessárias e reavalie anualmente suas necessidades."
        }
      ],
      conclusion: "Seguros são investimentos em tranquilidade. Não espere acontecer algo ruim para pensar nisso. Avalie sua situação, contrate as proteções essenciais e durma tranquilo sabendo que você e sua família estão protegidos."
    }
  },
  "estrategias-sair-dividas": {
    title: "Estratégias para Sair das Dívidas",
    description: "Métodos comprovados para eliminar dívidas de forma eficiente e recuperar sua saúde financeira.",
    category: "Dívidas",
    readTime: "12 min",
    date: "10 de novembro, 2024",
    content: {
      introduction: "Estar endividado é uma situação estressante, mas com estratégia e disciplina é totalmente possível sair dessa. Neste guia, você aprenderá métodos comprovados para eliminar suas dívidas e recuperar o controle das suas finanças.",
      sections: [
        {
          title: "1. Faça um Diagnóstico Completo",
          content: "Liste todas as suas dívidas: valor total, taxa de juros, parcela mensal e prazo. Separe por categoria (cartão de crédito, empréstimos, financiamentos). Ter essa visão clara é o primeiro passo para criar um plano de ação efetivo."
        },
        {
          title: "2. Método Snowball (Bola de Neve)",
          content: "Comece pagando as dívidas menores primeiro, independente da taxa de juros. Isso gera motivação psicológica ao eliminar dívidas rapidamente. Quando uma dívida é quitada, use o valor que pagava nela para acelerar a próxima. O impulso emocional das pequenas vitórias ajuda a manter o foco."
        },
        {
          title: "3. Método Avalanche",
          content: "Mais eficiente matematicamente: priorize as dívidas com maiores taxas de juros. Pague o mínimo nas outras e concentre todo recurso extra na dívida mais cara. Isso economiza dinheiro em juros no longo prazo, embora possa demorar mais para ver resultados."
        },
        {
          title: "4. Negocie suas Dívidas",
          content: "Entre em contato com os credores e negocie. Muitas empresas oferecem descontos significativos (30-70%) para quitação à vista ou parcelamento com juros menores. Seja honesto sobre sua situação e peça condições melhores. O não você já tem, não custa tentar!"
        },
        {
          title: "5. Aumente sua Renda",
          content: "Além de cortar gastos, busque aumentar sua renda. Trabalhos extras, freelances, venda de itens não usados, prestação de serviços - toda renda extra deve ir para as dívidas. É temporário, mas acelera muito o processo de quitação."
        },
        {
          title: "6. Evite Novas Dívidas",
          content: "Corte o cartão de crédito se necessário. Use apenas débito ou dinheiro. Não faça novos empréstimos para pagar dívidas antigas - isso só aumenta o buraco. Aprenda a viver com o que tem e resista às tentações de consumo."
        },
        {
          title: "7. Crie um Orçamento de Emergência",
          content: "Mesmo endividado, tente guardar algo (R$ 50-100) para emergências pequenas. Isso evita recorrer ao cartão de crédito ou empréstimos quando surgem imprevistos, quebrando o ciclo vicioso das dívidas."
        },
        {
          title: "8. Celebre as Conquistas",
          content: "Cada dívida quitada é uma vitória! Celebre (sem gastar muito) para manter a motivação. Visualize seu progresso em gráficos, compartilhe com família. Sair das dívidas é uma jornada que exige persistência."
        }
      ],
      conclusion: "Sair das dívidas não é fácil e requer sacrifícios, mas é totalmente possível. Escolha o método que funciona melhor para você, mantenha o foco e a disciplina. Em alguns meses ou anos, você estará livre das dívidas e poderá começar a construir patrimônio. O importante é começar agora!"
    }
  },
  "educacao-financeira-iniciantes": {
    title: "Educação Financeira para Iniciantes",
    description: "Os conceitos fundamentais que todo brasileiro deveria conhecer sobre finanças pessoais.",
    category: "Básico",
    readTime: "6 min",
    date: "10 de novembro, 2024",
    content: {
      introduction: "A educação financeira é a base para uma vida próspera e tranquila. Infelizmente, esse conhecimento essencial não é ensinado nas escolas. Vamos cobrir os conceitos fundamentais que todos deveriam conhecer.",
      sections: [
        {
          title: "1. Gaste Menos do que Ganha",
          content: "Parece óbvio, mas é o princípio mais importante. Se você gasta tudo o que ganha (ou mais), nunca conseguirá poupar ou investir. Crie o hábito de viver abaixo das suas possibilidades. A diferença entre renda e gastos é o que constrói seu patrimônio."
        },
        {
          title: "2. Pague Você Primeiro",
          content: "Quando receber o salário, separe imediatamente uma porcentagem para poupança/investimentos (idealmente 20%). Trate isso como uma conta obrigatória. O restante é para suas despesas. Assim você prioriza seu futuro financeiro."
        },
        {
          title: "3. Entenda Juros Compostos",
          content: "É a mágica que faz investimentos crescerem exponencialmente. Quando você investe, ganha juros sobre o valor inicial e sobre os juros acumulados. Com tempo, mesmo valores pequenos se transformam em grandes patrimônios. É também por isso que dívidas crescem tão rápido - os juros trabalham contra você."
        },
        {
          title: "4. Diferencie Ativos de Passivos",
          content: "Ativos colocam dinheiro no seu bolso (investimentos, imóveis alugados, negócios). Passivos tiram dinheiro (carro, financiamentos, bens que depreciam). Pessoas ricas acumulam ativos; pessoas endividadas acumulam passivos. Foque em adquirir ativos."
        },
        {
          title: "5. Tenha Metas Financeiras Claras",
          content: "Defina objetivos específicos: reserva de emergência, aposentadoria, compra de um imóvel, viagem. Metas claras motivam você a poupar e investir. Divida em curto prazo (1 ano), médio prazo (1-5 anos) e longo prazo (5+ anos)."
        },
        {
          title: "6. Cuidado com o Consumismo",
          content: "Marketing e redes sociais nos bombardeiam com mensagens de consumo. Antes de comprar, pergunte-se: preciso realmente disso? Isso me aproxima dos meus objetivos? Evite compras por impulso. Espere 24-48h antes de compras não essenciais."
        }
      ],
      conclusion: "Educação financeira é uma jornada, não um destino. Comece aplicando esses princípios básicos e continue aprendendo. Com tempo e consistência, você desenvolverá hábitos financeiros saudáveis que transformarão sua relação com dinheiro e seu futuro."
    }
  },
  "dicas-economia-dia-dia": {
    title: "Dicas de Economia no Dia a Dia",
    description: "Pequenas mudanças de hábitos que podem gerar grandes economias no final do mês.",
    category: "Economia",
    readTime: "5 min",
    date: "10 de novembro, 2024",
    content: {
      introduction: "Economizar não significa viver miseravelmente. São pequenas mudanças de hábitos que, somadas, fazem grande diferença no final do mês. Veja dicas práticas para economizar sem perder qualidade de vida.",
      sections: [
        {
          title: "1. Alimentação Consciente",
          content: "Planeje refeições semanais e faça lista de compras. Compre no atacado itens não perecíveis. Cozinhe em casa em vez de pedir delivery todo dia. Leve marmita para o trabalho. Uma refeição caseira custa 1/3 de um delivery. Em um mês, a economia é substancial."
        },
        {
          title: "2. Revise Assinaturas e Serviços",
          content: "Faça uma auditoria: quantos streamings você paga? Realmente usa a academia? Aquele seguro tem a melhor oferta? Cancele o que não usa, negocie preços, compartilhe contas (onde permitido). R$ 50 aqui, R$ 30 ali, logo são centenas de reais por mês."
        },
        {
          title: "3. Transporte Inteligente",
          content: "Use transporte público quando possível. Carona solidária reduz custos. Para distâncias curtas, vá a pé ou de bicicleta (ainda faz bem à saúde). Se tem carro, dirija economicamente, mantenha manutenção em dia para evitar gastos maiores."
        },
        {
          title: "4. Energia e Água",
          content: "Desligue aparelhos da tomada, use lâmpadas LED, aproveite luz natural, reduza tempo de banho, conserte vazamentos. Essas atitudes simples podem reduzir contas em 20-30%. É economia e sustentabilidade juntos."
        },
        {
          title: "5. Compras Inteligentes",
          content: "Compare preços online antes de comprar. Use cupons e cashback. Compre em promoções sazonais (Black Friday, pós-natal). Considere produtos usados em bom estado. Espere um pouco antes de compras por impulso - muitas vezes você desiste."
        },
        {
          title: "6. Lazer Gratuito ou Barato",
          content: "Muitos museus têm dias gratuitos. Parques, praias, trilhas são de graça. Jogue em casa com amigos em vez de bares caros. Assista filmes em casa. Lazer não precisa custar caro para ser divertido."
        }
      ],
      conclusion: "A economia está nos detalhes do dia a dia. Não é sobre viver com restrições, mas sobre fazer escolhas conscientes. Pequenas economias diárias se transformam em grandes valores ao longo do ano. Comece hoje e surpreenda-se com os resultados!"
    }
  }
};

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Artigo não encontrado</h1>
          <Button onClick={() => navigate("/")}>Voltar para Home</Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      title: "Link copiado!",
      description: "O link do artigo foi copiado para sua área de transferência.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
        <div className="container mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleShare}
            title="Compartilhar artigo"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Article Content */}
      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Article Header */}
        <div className="mb-8">
          <Badge className="mb-4">{article.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {article.description}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} de leitura</span>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-border mb-8" />

        {/* Article Body */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-lg text-foreground leading-relaxed mb-8">
            {article.content.introduction}
          </p>

          {/* Sections */}
          {article.content.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {section.title}
              </h2>
              <p className="text-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}

          {/* Conclusion */}
          <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="text-xl font-bold text-foreground mb-3">Conclusão</h3>
            <p className="text-foreground leading-relaxed">
              {article.content.conclusion}
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Button onClick={() => navigate("/")} size="lg">
            Voltar para Home
          </Button>
        </div>
      </article>

      {/* Footer */}
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

export default ArticlePage;
