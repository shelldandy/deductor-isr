import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';

export function DonationsDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { donations } = state.deductions;

    const updateValue = (value: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: { ...state.deductions, donations: value }
        });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="donations">Donativos</Label>
            <Input
                id="donations"
                type="number"
                placeholder="0.00"
                value={donations || ''}
                onChange={(e) => updateValue(parseFloat(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
                Límite: 7% de tus ingresos acumulables. A donatarias autorizadas.
            </p>
        </div>
    );
}
