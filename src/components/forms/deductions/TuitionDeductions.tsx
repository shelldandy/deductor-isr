import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCalculatorContext } from '@/context/CalculatorContext';
import { COLEGIATURAS } from '@/lib/constants';
import type { TuitionDeduction } from '@/lib/types';
import { Plus, Trash2 } from 'lucide-react';

const money = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

const LEVELS: { value: TuitionDeduction['level']; label: string }[] = [
    { value: 'preescolar', label: 'Preescolar' },
    { value: 'primaria', label: 'Primaria' },
    { value: 'secundaria', label: 'Secundaria' },
    { value: 'profesional_tecnico', label: 'Profesional Técnico' },
    { value: 'bachillerato', label: 'Bachillerato' },
];

export function TuitionDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const { tuition } = state.deductions;

    const addStudent = () => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: {
                ...state.deductions,
                tuition: [...tuition, { level: 'primaria', amount: 0 }]
            }
        });
    };

    const removeStudent = (index: number) => {
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: {
                ...state.deductions,
                tuition: tuition.filter((_, i) => i !== index)
            }
        });
    };

    const updateStudent = (index: number, field: 'level' | 'amount', value: string | number) => {
        const updated = [...tuition];
        if (field === 'level') {
            updated[index] = { ...updated[index], level: value as TuitionDeduction['level'] };
        } else {
            updated[index] = { ...updated[index], amount: value as number };
        }
        dispatch({
            type: 'SET_DEDUCTIONS',
            payload: { ...state.deductions, tuition: updated }
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label>Colegiaturas por Estudiante</Label>
                <Button type="button" variant="outline" size="sm" onClick={addStudent}>
                    <Plus className="h-4 w-4 mr-1" /> Agregar
                </Button>
            </div>

            {tuition.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                    No hay estudiantes registrados. Haz clic en "Agregar" para añadir uno.
                </p>
            )}

            {tuition.map((student, index) => (
                <div key={index} className="flex items-end gap-2 p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 space-y-1">
                        <Label className="text-xs">Nivel</Label>
                        <Select
                            value={student.level}
                            onValueChange={(val) => updateStudent(index, 'level', val)}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {LEVELS.map((lvl) => (
                                    <SelectItem key={lvl.value} value={lvl.value}>
                                        {lvl.label} (máx. {money(COLEGIATURAS[lvl.value])}/año)
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex-1 space-y-1">
                        <Label className="text-xs">Monto Mensual</Label>
                        <Input
                            type="number"
                            placeholder="0.00"
                            value={student.amount || ''}
                            onChange={(e) => updateStudent(index, 'amount', parseFloat(e.target.value) || 0)}
                        />
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive/90"
                        onClick={() => removeStudent(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}

            <p className="text-xs text-muted-foreground">
                Colegiaturas de escuelas privadas con validez oficial.
                <strong className="block mt-1">No sujeto al tope global.</strong>
            </p>
        </div>
    );
}
