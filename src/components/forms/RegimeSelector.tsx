import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCalculatorContext } from '@/context/CalculatorContext';
import type { TaxRegime } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Briefcase, Building, Home, User } from 'lucide-react';
import type { ElementType } from 'react';

export function RegimeSelector() {
    const { state, dispatch } = useCalculatorContext();

    const regimes: { value: TaxRegime; label: string; description: string; icon: ElementType }[] = [
        {
            value: 'sueldos_salarios',
            label: 'Sueldos y Salarios',
            description: 'Para empleados asalariados.',
            icon: User
        },
        {
            value: 'actividad_empresarial',
            label: 'Actividad Empresarial',
            description: 'Para personas con negocio propio.',
            icon: Briefcase
        },
        {
            value: 'resico',
            label: 'RESICO',
            description: 'Régimen Simplificado de Confianza.',
            icon: Building
        },
        {
            value: 'arrendamiento',
            label: 'Arrendamiento',
            description: 'Para quienes rentan inmuebles.',
            icon: Home
        }
    ];

    return (
        <RadioGroup
            value={state.regime}
            onValueChange={(value: string) => dispatch({ type: 'SET_REGIME', payload: value as TaxRegime })}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            {regimes.map((regime) => (
                <div key={regime.value}>
                    <RadioGroupItem value={regime.value} id={regime.value} className="peer sr-only" />
                    <Label
                        htmlFor={regime.value}
                        className={cn(
                            "flex flex-col h-full bg-card hover:bg-accent/50 cursor-pointer rounded-xl border-2 border-muted p-4 transition-all hover:border-primary peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                            state.regime === regime.value ? "border-primary bg-accent/10" : ""
                        )}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className={cn("p-2 rounded-full bg-secondary", state.regime === regime.value && "bg-primary/20 text-primary")}>
                                <regime.icon className="w-5 h-5" />
                            </div>
                            <span className="font-semibold">{regime.label}</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-[3.25rem]">
                            {regime.description}
                        </p>
                    </Label>
                </div>
            ))}
        </RadioGroup>
    );
}
