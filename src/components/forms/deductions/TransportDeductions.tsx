import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';

export function TransportDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { transport } = state.deductions;

    const updateValue = (value: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: { ...state.deductions, transport: value }
        });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="transport">Transporte Escolar Obligatorio</Label>
            <Input
                id="transport"
                type="number"
                placeholder="0.00"
                value={transport || ''}
                onChange={(e) => updateValue(parseFloat(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
                Solo cuando sea obligatorio o incluido en colegiatura. Obtén constancia de la escuela.
            </p>
        </div>
    );
}
