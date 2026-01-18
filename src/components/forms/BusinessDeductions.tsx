import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useCalculatorContext } from '@/context/CalculatorContext';
import type { BusinessDeductions as BusinessDeductionsType } from '@/lib/types';
import { Briefcase, Receipt, Users, Building2, Wrench } from 'lucide-react';

export function BusinessDeductions() {
    const { state, dispatch } = useCalculatorContext();
    const deductions: BusinessDeductionsType = state.businessDeductions || {
        purchases: 0,
        expenses: 0,
        investments: 0,
        interest: 0,
        imss: 0,
        localTaxes: 0,
        salaries: 0,
        rent: 0,
        professionalServices: 0,
        utilities: 0
    };

    const updateDeduction = (field: keyof BusinessDeductionsType, value: number) => {
        dispatch({
            type: 'SET_BUSINESS_DEDUCTIONS',
            payload: { ...deductions, [field]: value }
        });
    };

    const totalBusinessDeductions = Object.values(deductions).reduce((sum, val) => sum + (val || 0), 0);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Deducciones del Negocio</span>
                </div>
                <span className="text-sm text-muted-foreground">
                    Total: <strong className="text-foreground">${totalBusinessDeductions.toLocaleString('es-MX')}</strong>
                </span>
            </div>

            <p className="text-sm text-muted-foreground">
                Ingresa los gastos mensuales promedio de tu actividad empresarial. Estos se restan antes de calcular el ISR.
            </p>

            <Accordion type="multiple" className="w-full">
                <AccordionItem value="operations">
                    <AccordionTrigger className="text-sm hover:no-underline">
                        <span className="flex items-center gap-2">
                            <Receipt className="h-4 w-4" />
                            Compras y Gastos Operativos
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-4 pt-2">
                            <div className="space-y-1">
                                <Label className="text-xs">Compras de Mercancía / Materia Prima</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.purchases || ''}
                                    onChange={(e) => updateDeduction('purchases', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Gastos Generales de Operación</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.expenses || ''}
                                    onChange={(e) => updateDeduction('expenses', parseFloat(e.target.value) || 0)}
                                />
                                <p className="text-xs text-muted-foreground">Papelería, insumos, etc.</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Inversiones (Equipo, Maquinaria)</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.investments || ''}
                                    onChange={(e) => updateDeduction('investments', parseFloat(e.target.value) || 0)}
                                />
                                <p className="text-xs text-muted-foreground">Depreciación mensual de activos fijos</p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="personnel">
                    <AccordionTrigger className="text-sm hover:no-underline">
                        <span className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Nómina y Personal
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-4 pt-2">
                            <div className="space-y-1">
                                <Label className="text-xs">Salarios y Prestaciones</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.salaries || ''}
                                    onChange={(e) => updateDeduction('salaries', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Cuotas IMSS e INFONAVIT</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.imss || ''}
                                    onChange={(e) => updateDeduction('imss', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Servicios Profesionales (Honorarios)</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.professionalServices || ''}
                                    onChange={(e) => updateDeduction('professionalServices', parseFloat(e.target.value) || 0)}
                                />
                                <p className="text-xs text-muted-foreground">Contador, abogado, consultores, etc.</p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="premises">
                    <AccordionTrigger className="text-sm hover:no-underline">
                        <span className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Local y Servicios
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-4 pt-2">
                            <div className="space-y-1">
                                <Label className="text-xs">Renta del Local</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.rent || ''}
                                    onChange={(e) => updateDeduction('rent', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Servicios (Luz, Agua, Teléfono, Internet)</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.utilities || ''}
                                    onChange={(e) => updateDeduction('utilities', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="financial">
                    <AccordionTrigger className="text-sm hover:no-underline">
                        <span className="flex items-center gap-2">
                            <Wrench className="h-4 w-4" />
                            Financieros e Impuestos
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="grid gap-4 pt-2">
                            <div className="space-y-1">
                                <Label className="text-xs">Intereses de Créditos</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.interest || ''}
                                    onChange={(e) => updateDeduction('interest', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs">Impuestos Locales (excepto ISR)</Label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={deductions.localTaxes || ''}
                                    onChange={(e) => updateDeduction('localTaxes', parseFloat(e.target.value) || 0)}
                                />
                                <p className="text-xs text-muted-foreground">Predial, tenencia, derechos, etc.</p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
