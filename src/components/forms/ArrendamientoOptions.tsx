import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useCalculatorContext } from '@/context/CalculatorContext';
import type { ArrendamientoMethod, ArrendamientoDeductions } from '@/lib/types';
import { DEDUCCION_CIEGA_PORCENTAJE } from '@/lib/constants';
import { Home, FileText, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

const money = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

export function ArrendamientoOptions() {
    const { state, dispatch } = useCalculatorContext();
    const method = state.arrendamientoMethod || 'ciega';
    const deductions = state.arrendamientoDeductions || {
        predial: 0,
        improvements: 0,
        maintenance: 0,
        water: 0,
        mortgageInterest: 0,
        salaries: 0,
        insurance: 0,
        depreciation: 0
    };

    const blindDeduction = state.monthlyIncome * DEDUCCION_CIEGA_PORCENTAJE;
    const predial = state.predial || 0;

    const setMethod = (value: ArrendamientoMethod) => {
        dispatch({ type: 'SET_ARRENDAMIENTO_METHOD', payload: value });
    };

    const setPredial = (value: number) => {
        dispatch({
            type: 'SET_FULL_STATE',
            payload: { ...state, predial: value }
        });
    };

    const updateDeduction = (field: keyof ArrendamientoDeductions, value: number) => {
        dispatch({
            type: 'SET_ARRENDAMIENTO_DEDUCTIONS',
            payload: { ...deductions, [field]: value }
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <Label>Método de Deducción</Label>
                <RadioGroup
                    value={method}
                    onValueChange={(val) => setMethod(val as ArrendamientoMethod)}
                    className="grid gap-3"
                >
                    <div>
                        <RadioGroupItem value="ciega" id="ciega" className="peer sr-only" />
                        <Label
                            htmlFor="ciega"
                            className={cn(
                                "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer hover:bg-accent/50",
                                method === 'ciega' && "border-primary bg-primary/5"
                            )}
                        >
                            <Calculator className="h-5 w-5 mt-0.5 text-primary" />
                            <div className="flex-1">
                                <span className="font-semibold block">Deducción Ciega (35%)</span>
                                <span className="text-sm text-muted-foreground">
                                    Deduce el 35% de tus ingresos automáticamente, más el predial. No necesitas comprobantes.
                                </span>
                                {state.monthlyIncome > 0 && (
                                    <span className="text-sm font-medium text-green-600 dark:text-green-400 block mt-1">
                                        Deducción estimada: {money(blindDeduction)} + predial
                                    </span>
                                )}
                            </div>
                        </Label>
                    </div>

                    <div>
                        <RadioGroupItem value="comprobados" id="comprobados" className="peer sr-only" />
                        <Label
                            htmlFor="comprobados"
                            className={cn(
                                "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer hover:bg-accent/50",
                                method === 'comprobados' && "border-primary bg-primary/5"
                            )}
                        >
                            <FileText className="h-5 w-5 mt-0.5 text-primary" />
                            <div className="flex-1">
                                <span className="font-semibold block">Gastos Comprobados</span>
                                <span className="text-sm text-muted-foreground">
                                    Deduce los gastos reales del inmueble con comprobantes fiscales. Útil si tus gastos superan el 35%.
                                </span>
                            </div>
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Predial - applies to both methods */}
            <div className="space-y-2">
                <Label htmlFor="predial">Predial (Impuesto Predial Mensual)</Label>
                <Input
                    id="predial"
                    type="number"
                    placeholder="0.00"
                    value={predial || ''}
                    onChange={(e) => setPredial(parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                    El predial es deducible en ambos métodos. Ingresa el monto mensual.
                </p>
            </div>

            {/* Detailed deductions for 'comprobados' method */}
            {method === 'comprobados' && (
                <Card className="border-dashed">
                    <CardContent className="pt-4">
                        <Accordion type="single" collapsible defaultValue="expenses">
                            <AccordionItem value="expenses">
                                <AccordionTrigger className="text-sm hover:no-underline">
                                    <span className="flex items-center gap-2">
                                        <Home className="h-4 w-4" />
                                        Gastos del Inmueble
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid gap-4 pt-2">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Predial (ya ingresado arriba)</Label>
                                            <Input
                                                type="number"
                                                disabled
                                                value={predial || ''}
                                                className="bg-muted"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Mejoras y Construcciones</Label>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={deductions.improvements || ''}
                                                onChange={(e) => updateDeduction('improvements', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Mantenimiento y Conservación</Label>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={deductions.maintenance || ''}
                                                onChange={(e) => updateDeduction('maintenance', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Consumo de Agua</Label>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={deductions.water || ''}
                                                onChange={(e) => updateDeduction('water', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Intereses Hipotecarios</Label>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={deductions.mortgageInterest || ''}
                                                onChange={(e) => updateDeduction('mortgageInterest', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Salarios y Comisiones</Label>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={deductions.salaries || ''}
                                                onChange={(e) => updateDeduction('salaries', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Primas de Seguros</Label>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={deductions.insurance || ''}
                                                onChange={(e) => updateDeduction('insurance', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Depreciación (Deducción de Inversiones)</Label>
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={deductions.depreciation || ''}
                                                onChange={(e) => updateDeduction('depreciation', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
