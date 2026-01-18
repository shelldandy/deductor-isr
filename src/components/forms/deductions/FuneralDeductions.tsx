import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';
import { LIMITE_GASTOS_FUNERARIOS } from '@/lib/constants';

const money = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

export function FuneralDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { funeral } = state.deductions;

    const updateValue = (value: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: { ...state.deductions, funeral: value }
        });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="funeral">Gastos Funerarios</Label>
            <Input
                id="funeral"
                type="number"
                placeholder="0.00"
                value={funeral || ''}
                onChange={(e) => updateValue(parseFloat(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
                Límite: {money(LIMITE_GASTOS_FUNERARIOS)} anuales (1 UMA anual).
            </p>
        </div>
    );
}
