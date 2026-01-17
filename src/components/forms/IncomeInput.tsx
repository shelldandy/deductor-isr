import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';
import { CircleDollarSign } from 'lucide-react';

export function IncomeInput() {
    const { state, dispatch } = useCalculatorContext();

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        dispatch({ type: 'SET_INCOME', payload: value });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="income">Ingreso Mensual Bruto</Label>
            <div className="relative">
                <CircleDollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                    id="income"
                    type="number"
                    placeholder="0.00"
                    value={state.monthlyIncome || ''}
                    onChange={handleIncomeChange}
                    className="pl-10 text-lg"
                />
            </div>
            <p className="text-sm text-muted-foreground">
                Ingresa tu ingreso antes de impuestos.
            </p>
        </div>
    );
}
