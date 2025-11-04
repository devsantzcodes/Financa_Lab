import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, CheckCircle2, XCircle } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Qual é a regra básica para começar a poupar dinheiro?",
    options: [
      "Poupar apenas se sobrar dinheiro no fim do mês",
      "Poupar primeiro, gastar depois (Pague-se primeiro)",
      "Poupar somente em meses que ganhar mais",
      "Investir todo o dinheiro em ações"
    ],
    correctAnswer: 1,
    explanation: "A regra 'Pague-se primeiro' significa separar uma parte da renda para poupança assim que receber, antes de pagar as contas."
  },
  {
    id: 2,
    question: "O que são juros compostos?",
    options: [
      "Juros que incidem apenas sobre o valor inicial",
      "Juros que incidem sobre o capital inicial e sobre os juros acumulados",
      "Taxa fixa cobrada pelos bancos",
      "Desconto em compras parceladas"
    ],
    correctAnswer: 1,
    explanation: "Juros compostos são 'juros sobre juros'. Eles fazem seu dinheiro crescer exponencialmente ao longo do tempo."
  },
  {
    id: 3,
    question: "Qual percentual da renda é recomendado para gastos com moradia?",
    options: [
      "Até 10%",
      "Até 20%",
      "Até 30-35%",
      "Até 50%"
    ],
    correctAnswer: 2,
    explanation: "Especialistas recomendam que gastos com moradia (aluguel ou financiamento) não ultrapassem 30-35% da renda mensal."
  },
  {
    id: 4,
    question: "O que é um fundo de emergência?",
    options: [
      "Dinheiro para viagens de última hora",
      "Reserva financeira para imprevistos de 3-6 meses de despesas",
      "Investimento de alto risco",
      "Dinheiro para compras impulsivas"
    ],
    correctAnswer: 1,
    explanation: "O fundo de emergência é uma reserva financeira para cobrir de 3 a 6 meses de despesas em caso de imprevistos como desemprego ou emergências médicas."
  },
  {
    id: 5,
    question: "Qual a melhor estratégia para sair de dívidas?",
    options: [
      "Pagar apenas o mínimo de cada dívida",
      "Fazer novos empréstimos para pagar dívidas antigas",
      "Priorizar dívidas com maiores juros ou menores valores",
      "Ignorar as dívidas e focar em investir"
    ],
    correctAnswer: 2,
    explanation: "As estratégias mais eficazes são o Método Avalanche (pagar dívidas com maiores juros) ou Bola de Neve (pagar dívidas menores primeiro)."
  }
];

export const FinanceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    
    setAnswered(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
  };

  const getPerformanceMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { text: "Excelente! Você tem um ótimo conhecimento financeiro!", color: "text-success" };
    if (percentage >= 60) return { text: "Bom trabalho! Continue aprendendo para melhorar ainda mais.", color: "text-primary" };
    if (percentage >= 40) return { text: "Você está no caminho certo. Explore nossos simuladores para aprender mais!", color: "text-accent" };
    return { text: "Não desanime! Use nossas ferramentas educativas para melhorar seus conhecimentos.", color: "text-muted-foreground" };
  };

  if (showResult) {
    const performance = getPerformanceMessage();
    return (
      <Card className="shadow-card hover:shadow-hover transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Resultado do Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10">
              <span className="text-4xl font-bold text-primary">
                {score}/{questions.length}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-2">
                {((score / questions.length) * 100).toFixed(0)}% de acertos
              </p>
              <p className={`text-lg ${performance.color}`}>
                {performance.text}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Próximos Passos:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Use nossos simuladores para praticar planejamento financeiro</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Leia nossos artigos sobre os temas que você errou</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Compartilhe seu resultado e desafie amigos!</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button onClick={resetQuiz} variant="hero" className="flex-1">
              Refazer Quiz
            </Button>
            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="outline" className="flex-1">
              Voltar ao Início
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Quiz de Educação Financeira
        </CardTitle>
        <CardDescription>
          Questão {currentQuestion + 1} de {questions.length}
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>
          
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            disabled={answered}
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                  answered
                    ? index === question.correctAnswer
                      ? "bg-success/10 border-success"
                      : selectedAnswer === index
                      ? "bg-destructive/10 border-destructive"
                      : "bg-muted"
                    : "hover:bg-muted"
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer flex items-center gap-2"
                >
                  {option}
                  {answered && index === question.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-success ml-auto" />
                  )}
                  {answered && selectedAnswer === index && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-destructive ml-auto" />
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {answered && (
          <div className="p-4 rounded-lg bg-accent/10 border border-accent">
            <p className="text-sm font-medium text-foreground mb-1">Explicação:</p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        <div className="flex gap-3">
          {!answered ? (
            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              variant="hero"
              className="flex-1"
            >
              Confirmar Resposta
            </Button>
          ) : (
            <Button onClick={handleNext} variant="success" className="flex-1">
              {currentQuestion < questions.length - 1 ? "Próxima Questão" : "Ver Resultado"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
