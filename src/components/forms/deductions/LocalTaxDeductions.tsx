import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';

export function LocalTaxDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { localTax } = state.deductions;

    const updateValue = (value: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: { ...state.deductions, localTax: value }
        });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="localTax">Impuesto Local sobre Salarios</Label>
            <Input
                id="localTax"
                type="number"
                placeholder="0.00"
                value={localTax || ''}
                onChange={(e) => updateValue(parseFloat(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
                Solo si tu estado retiene impuesto sobre nómina (máx. 5%). Consulta tu recibo de nómina.
            </p>
        </div>
    );
}
