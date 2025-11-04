import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Calculator } from "lucide-react";

interface Debt {
  id: number;
  name: string;
  amount: number;
  interestRate: number;
  minimumPayment: number;
}

export const DebtCalculator = () => {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [newDebt, setNewDebt] = useState<Omit<Debt, "id">>({
    name: "",
    amount: 0,
    interestRate: 0,
    minimumPayment: 0,
  });
  const [extraPayment, setExtraPayment] = useState<number>(0);

  const addDebt = () => {
    if (newDebt.name && newDebt.amount > 0) {
      setDebts([...debts, { ...newDebt, id: Date.now() }]);
      setNewDebt({ name: "", amount: 0, interestRate: 0, minimumPayment: 0 });
    }
  };

  const removeDebt = (id: number) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const calculateSnowball = () => {
    const sortedDebts = [...debts].sort((a, b) => a.amount - b.amount);
    return calculatePayoffTime(sortedDebts);
  };

  const calculateAvalanche = () => {
    const sortedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);
    return calculatePayoffTime(sortedDebts);
  };

  const calculatePayoffTime = (sortedDebts: Debt[]) => {
    let months = 0;
    let totalInterest = 0;
    const remainingDebts = sortedDebts.map(d => ({ ...d }));
    const totalPayment = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0) + extraPayment;

    while (remainingDebts.length > 0 && months < 600) {
      months++;
      let availablePayment = totalPayment;

      for (let i = 0; i < remainingDebts.length; i++) {
        const debt = remainingDebts[i];
        const monthlyInterest = (debt.amount * debt.interestRate) / 100 / 12;
        totalInterest += monthlyInterest;
        debt.amount += monthlyInterest;

        const payment = i === 0 ? availablePayment : debt.minimumPayment;
        const actualPayment = Math.min(payment, debt.amount);
        debt.amount -= actualPayment;
        availablePayment -= actualPayment;

        if (debt.amount <= 0) {
          remainingDebts.splice(i, 1);
          i--;
        }
      }
    }

    return { months, totalInterest };
  };

  const totalDebt = debts.reduce((sum, debt) => sum + debt.amount, 0);
  const snowballResult = debts.length > 0 ? calculateSnowball() : null;
  const avalancheResult = debts.length > 0 ? calculateAvalanche() : null;

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-accent" />
          Calculadora de Dívidas
        </CardTitle>
        <CardDescription>
          Adicione suas dívidas e descubra a melhor estratégia para quitá-las
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Adicionar Nova Dívida</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debt-name">Nome da Dívida</Label>
              <Input
                id="debt-name"
                placeholder="Ex: Cartão de Crédito"
                value={newDebt.name}
                onChange={(e) => setNewDebt({ ...newDebt, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debt-amount">Valor Total (R$)</Label>
              <Input
                id="debt-amount"
                type="number"
                placeholder="0,00"
                value={newDebt.amount || ""}
                onChange={(e) => setNewDebt({ ...newDebt, amount: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debt-rate">Taxa de Juros (% a.a.)</Label>
              <Input
                id="debt-rate"
                type="number"
                placeholder="0"
                value={newDebt.interestRate || ""}
                onChange={(e) => setNewDebt({ ...newDebt, interestRate: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debt-min">Pagamento Mínimo (R$)</Label>
              <Input
                id="debt-min"
                type="number"
                placeholder="0,00"
                value={newDebt.minimumPayment || ""}
                onChange={(e) => setNewDebt({ ...newDebt, minimumPayment: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          <Button onClick={addDebt} variant="secondary" className="w-full">
            Adicionar Dívida
          </Button>
        </div>

        {debts.length > 0 && (
          <>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Suas Dívidas</h4>
              {debts.map((debt) => (
                <div key={debt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{debt.name}</p>
                    <p className="text-sm text-muted-foreground">
                      R$ {debt.amount.toFixed(2)} • {debt.interestRate}% a.a. • Min: R$ {debt.minimumPayment.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDebt(debt.id)}
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive">
              <p className="text-sm text-muted-foreground">Total das Dívidas</p>
              <p className="text-2xl font-bold text-destructive">
                R$ {totalDebt.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="extra-payment">Pagamento Extra Mensal (R$)</Label>
              <Input
                id="extra-payment"
                type="number"
                placeholder="0,00"
                value={extraPayment || ""}
                onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
              />
            </div>

            <Tabs defaultValue="snowball" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="snowball">Método Bola de Neve</TabsTrigger>
                <TabsTrigger value="avalanche">Método Avalanche</TabsTrigger>
              </TabsList>
              <TabsContent value="snowball" className="space-y-4">
                <div className="p-4 rounded-lg bg-muted space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Método Bola de Neve</p>
                      <p className="text-sm text-muted-foreground">
                        Paga primeiro as dívidas menores, criando momentum psicológico
                      </p>
                    </div>
                  </div>
                  {snowballResult && (
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Tempo para quitar</p>
                        <p className="text-xl font-bold text-foreground">
                          {Math.ceil(snowballResult.months)} meses
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Juros totais</p>
                        <p className="text-xl font-bold text-destructive">
                          R$ {snowballResult.totalInterest.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="avalanche" className="space-y-4">
                <div className="p-4 rounded-lg bg-muted space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Método Avalanche</p>
                      <p className="text-sm text-muted-foreground">
                        Paga primeiro as dívidas com maior juros, economizando mais dinheiro
                      </p>
                    </div>
                  </div>
                  {avalancheResult && (
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                      <div>
                        <p className="text-sm text-muted-foreground">Tempo para quitar</p>
                        <p className="text-xl font-bold text-foreground">
                          {Math.ceil(avalancheResult.months)} meses
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Juros totais</p>
                        <p className="text-xl font-bold text-destructive">
                          R$ {avalancheResult.totalInterest.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  );
};
