import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';

export function InsuranceDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { insurance } = state.deductions;

    const updateValue = (value: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: { ...state.deductions, insurance: value }
        });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="insurance">Primas de Seguros de Gastos Médicos</Label>
            <Input
                id="insurance"
                type="number"
                placeholder="0.00"
                value={insurance || ''}
                onChange={(e) => updateValue(parseFloat(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
                Primas de seguros de gastos médicos mayores para ti o dependientes económicos.
            </p>
        </div>
    );
}
