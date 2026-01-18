import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCalculatorContext } from '@/context/CalculatorContext';
import { LIMITE_LENTES_OPTICOS } from '@/lib/constants';

const money = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

export function MedicalDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { medical } = state.deductions;

    const updateMedical = (field: keyof typeof medical, value: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: {
                ...state.deductions,
                medical: { ...medical, [field]: value }
            }
        });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="medical-general">Gastos Médicos Generales</Label>
                <Input
                    id="medical-general"
                    type="number"
                    placeholder="0.00"
                    value={medical.general || ''}
                    onChange={(e) => updateMedical('general', parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                    Honorarios médicos, dentales, hospitalarios, análisis, estudios clínicos, etc.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="medical-glasses">Lentes Ópticos Graduados</Label>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <Input
                            id="medical-glasses"
                            type="number"
                            placeholder="0.00"
                            value={medical.glasses || ''}
                            onChange={(e) => updateMedical('glasses', parseFloat(e.target.value) || 0)}
                        />
                    </div>
                    <div>
                        <Input
                            id="medical-glasses-count"
                            type="number"
                            placeholder="# personas"
                            min="0"
                            value={medical.glassesCount || ''}
                            onChange={(e) => updateMedical('glassesCount', parseInt(e.target.value) || 0)}
                        />
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                    Límite: {money(LIMITE_LENTES_OPTICOS)} anuales por persona.
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="medical-disability">Gastos por Discapacidad/Incapacidad</Label>
                <Input
                    id="medical-disability"
                    type="number"
                    placeholder="0.00"
                    value={medical.disability || ''}
                    onChange={(e) => updateMedical('disability', parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                    Sin límite. Incluye transportación, adquisición de equipos, etc.
                </p>
            </div>
        </div>
    );
}
