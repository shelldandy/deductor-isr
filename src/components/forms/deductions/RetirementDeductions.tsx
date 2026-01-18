import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';
import { LIMITE_RETIRO_UMA } from '@/lib/constants';

const money = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

export function RetirementDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { retirement } = state.deductions;

    const updateValue = (value: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: { ...state.deductions, retirement: value }
        });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="retirement">Aportaciones Complementarias para el Retiro</Label>
            <Input
                id="retirement"
                type="number"
                placeholder="0.00"
                value={retirement || ''}
                onChange={(e) => updateValue(parseFloat(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
                Límite: 10% de tu ingreso o {money(LIMITE_RETIRO_UMA)} anuales (5 UMAs), el menor.
                <strong className="block mt-1">No sujeto al tope global.</strong>
            </p>
        </div>
    );
}
