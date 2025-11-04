import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface InvestmentType {
  name: string;
  rate: number;
  riskLevel: string;
}

const investmentTypes: InvestmentType[] = [
  { name: "Poupança", rate: 0.06, riskLevel: "Muito Baixo" },
  { name: "Tesouro Selic", rate: 0.12, riskLevel: "Baixo" },
  { name: "CDB", rate: 0.13, riskLevel: "Baixo" },
  { name: "Fundos Imobiliários", rate: 0.10, riskLevel: "Médio" },
  { name: "Ações", rate: 0.15, riskLevel: "Alto" },
  { name: "Criptomoedas", rate: 0.25, riskLevel: "Muito Alto" },
];

export const InvestmentSimulator = () => {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100);
  const [timeInMonths, setTimeInMonths] = useState<number>(12);
  const [selectedInvestment, setSelectedInvestment] = useState<string>("Tesouro Selic");

  const calculateInvestment = () => {
    const investment = investmentTypes.find(inv => inv.name === selectedInvestment);
    if (!investment) return [];

    const monthlyRate = investment.rate / 12;
    const data = [];
    let total = initialAmount;

    for (let month = 0; month <= timeInMonths; month++) {
      if (month > 0) {
        total = (total + monthlyContribution) * (1 + monthlyRate);
      }
      
      data.push({
        month: month,
        value: Math.round(total * 100) / 100,
        invested: initialAmount + (monthlyContribution * month),
      });
    }

    return data;
  };

  const data = calculateInvestment();
  const finalValue = data[data.length - 1]?.value || 0;
  const totalInvested = data[data.length - 1]?.invested || 0;
  const earnings = finalValue - totalInvested;
  const returnPercentage = totalInvested > 0 ? ((earnings / totalInvested) * 100) : 0;

  const currentInvestment = investmentTypes.find(inv => inv.name === selectedInvestment);

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-success" />
          Simulador de Investimentos
        </CardTitle>
        <CardDescription>
          Veja como seus investimentos podem crescer ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initial">Valor Inicial (R$)</Label>
            <Input
              id="initial"
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(parseFloat(e.target.value) || 0)}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthly">Aporte Mensal (R$)</Label>
            <Input
              id="monthly"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Período (meses)</Label>
            <Input
              id="time"
              type="number"
              value={timeInMonths}
              onChange={(e) => setTimeInMonths(parseInt(e.target.value) || 12)}
              min="1"
              max="360"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="investment">Tipo de Investimento</Label>
            <Select value={selectedInvestment} onValueChange={setSelectedInvestment}>
              <SelectTrigger id="investment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {investmentTypes.map((inv) => (
                  <SelectItem key={inv.name} value={inv.name}>
                    {inv.name} ({(inv.rate * 100).toFixed(1)}% a.a.)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {currentInvestment && (
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground mb-1">Nível de Risco</p>
            <p className="font-semibold text-foreground">{currentInvestment.riskLevel}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm text-muted-foreground">Valor Investido</p>
            <p className="text-2xl font-bold text-foreground">
              R$ {totalInvested.toFixed(2)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-success/10">
            <p className="text-sm text-muted-foreground">Rendimento</p>
            <p className="text-2xl font-bold text-success">
              R$ {earnings.toFixed(2)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-primary/10">
            <p className="text-sm text-muted-foreground">Valor Final</p>
            <p className="text-2xl font-bold text-primary">
              R$ {finalValue.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-accent/10 border border-accent">
          <p className="text-sm font-medium">
            Retorno Total: <span className="text-accent font-bold">{returnPercentage.toFixed(2)}%</span>
          </p>
        </div>

        {data.length > 0 && (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  label={{ value: 'Meses', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
                  labelFormatter={(label) => `Mês ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#64748B" 
                  name="Investido"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#059669" 
                  name="Valor Total"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
