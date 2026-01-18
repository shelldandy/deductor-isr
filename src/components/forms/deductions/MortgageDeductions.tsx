import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';

export function MortgageDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { mortgageInterest } = state.deductions;

    const updateValue = (value: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: { ...state.deductions, mortgageInterest: value }
        });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="mortgage">Intereses Reales Hipotecarios</Label>
            <Input
                id="mortgage"
                type="number"
                placeholder="0.00"
                value={mortgageInterest || ''}
                onChange={(e) => updateValue(parseFloat(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
                Solo la parte de intereses reales (descontando inflación). Créditos hasta 750,000 UDIs.
            </p>
        </div>
    );
}
