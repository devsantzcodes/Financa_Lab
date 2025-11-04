import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

interface BudgetData {
  income: number;
  housing: number;
  food: number;
  transport: number;
  entertainment: number;
  others: number;
}

export const BudgetSimulator = () => {
  const [budget, setBudget] = useState<BudgetData>({
    income: 0,
    housing: 0,
    food: 0,
    transport: 0,
    entertainment: 0,
    others: 0,
  });

  const totalExpenses = budget.housing + budget.food + budget.transport + budget.entertainment + budget.others;
  const savings = budget.income - totalExpenses;
  const savingsPercentage = budget.income > 0 ? (savings / budget.income) * 100 : 0;

  const chartData = [
    { name: "Moradia", value: budget.housing, color: "#0F766E" },
    { name: "Alimentação", value: budget.food, color: "#059669" },
    { name: "Transporte", value: budget.transport, color: "#0891B2" },
    { name: "Lazer", value: budget.entertainment, color: "#3B82F6" },
    { name: "Outros", value: budget.others, color: "#64748B" },
  ].filter(item => item.value > 0);

  const handleInputChange = (field: keyof BudgetData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setBudget(prev => ({ ...prev, [field]: numValue }));
  };

  const getSuggestion = () => {
    if (budget.income === 0) return null;
    
    const foodPercentage = (budget.food / budget.income) * 100;
    const housingPercentage = (budget.housing / budget.income) * 100;
    
    if (savingsPercentage < 10) {
      return {
        type: "warning",
        message: "Você está economizando menos de 10% da sua renda. Tente reduzir despesas não essenciais."
      };
    } else if (foodPercentage > 30) {
      return {
        type: "warning",
        message: "Seus gastos com alimentação excedem 30% da renda. Considere planejar refeições e reduzir pedidos de delivery."
      };
    } else if (housingPercentage > 35) {
      return {
        type: "warning",
        message: "Moradia consome mais de 35% da sua renda. Avalie se é possível renegociar ou buscar alternativas mais econômicas."
      };
    } else if (savingsPercentage >= 20) {
      return {
        type: "success",
        message: "Excelente! Você está economizando 20% ou mais da sua renda. Continue assim!"
      };
    }
    
    return {
      type: "info",
      message: "Seu orçamento está equilibrado. Continue monitorando seus gastos regularmente."
    };
  };

  const suggestion = getSuggestion();

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Simulador de Orçamento Pessoal
        </CardTitle>
        <CardDescription>
          Insira seus rendimentos e despesas para calcular quanto você pode economizar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="income">Renda Mensal (R$)</Label>
            <Input
              id="income"
              type="number"
              placeholder="0,00"
              value={budget.income || ""}
              onChange={(e) => handleInputChange("income", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Despesas Mensais</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="housing">Moradia (R$)</Label>
              <Input
                id="housing"
                type="number"
                placeholder="0,00"
                value={budget.housing || ""}
                onChange={(e) => handleInputChange("housing", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="food">Alimentação (R$)</Label>
              <Input
                id="food"
                type="number"
                placeholder="0,00"
                value={budget.food || ""}
                onChange={(e) => handleInputChange("food", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="transport">Transporte (R$)</Label>
              <Input
                id="transport"
                type="number"
                placeholder="0,00"
                value={budget.transport || ""}
                onChange={(e) => handleInputChange("transport", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entertainment">Lazer (R$)</Label>
              <Input
                id="entertainment"
                type="number"
                placeholder="0,00"
                value={budget.entertainment || ""}
                onChange={(e) => handleInputChange("entertainment", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="others">Outros (R$)</Label>
              <Input
                id="others"
                type="number"
                placeholder="0,00"
                value={budget.others || ""}
                onChange={(e) => handleInputChange("others", e.target.value)}
              />
            </div>
          </div>
        </div>

        {budget.income > 0 && (
          <div className="space-y-6 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Total de Despesas</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {totalExpenses.toFixed(2)}
                </p>
              </div>
              <div className={`p-4 rounded-lg ${savings >= 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                <p className="text-sm text-muted-foreground">Economia</p>
                <p className={`text-2xl font-bold flex items-center gap-1 ${savings >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {savings >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  R$ {Math.abs(savings).toFixed(2)}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">% Poupança</p>
                <p className="text-2xl font-bold text-foreground">
                  {savingsPercentage.toFixed(1)}%
                </p>
                <Progress value={Math.max(0, savingsPercentage)} className="mt-2" />
              </div>
            </div>

            {chartData.length > 0 && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {suggestion && (
              <div className={`p-4 rounded-lg border ${
                suggestion.type === 'success' ? 'bg-success/10 border-success' :
                suggestion.type === 'warning' ? 'bg-destructive/10 border-destructive' :
                'bg-accent/10 border-accent'
              }`}>
                <p className="text-sm font-medium">{suggestion.message}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
