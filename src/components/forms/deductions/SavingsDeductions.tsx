import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';
import { LIMITE_AHORRO_CUENTAS } from '@/lib/constants';

const money = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

export function SavingsDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { savings } = state.deductions;

    const updateValue = (value: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: { ...state.deductions, savings: value }
        });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="savings">Cuentas Especiales de Ahorro</Label>
            <Input
                id="savings"
                type="number"
                placeholder="0.00"
                value={savings || ''}
                onChange={(e) => updateValue(parseFloat(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
                PPR, cuentas personales de ahorro. Límite: {money(LIMITE_AHORRO_CUENTAS)} anuales.
                <strong className="block mt-1">No sujeto al tope global.</strong>
            </p>
        </div>
    );
}
