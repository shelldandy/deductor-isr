import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCalculator } from '@/hooks/useCalculator';
import { ArrowDown, ArrowUp, TrendingDown } from 'lucide-react';

// Helper for currency formatting
const money = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

export function ResultsSummary() {
    const result = useCalculator();
    
    // Annual projection
    const annualIncome = (result.baseGravable + result.totalDeductions) * 12; // Approximation from monthly
    const annualISR = result.totalPayable * 12;
    const effectiveRate = result.baseGravable > 0 ? (result.totalPayable / (result.baseGravable + result.totalDeductions)) * 100 : 0;

    return (
        <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-primary" />
                    Resumen de Cálculo
                </CardTitle>
                <CardDescription>Cálculo mensual estimado para 2025</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                {/* Monthly Summary */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ingreso Mensual Bruto</span>
                        <span className="font-medium">{money(result.baseGravable + result.totalDeductions)}</span>
                    </div>
                    {result.totalDeductions > 0 && (
                         <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                            <span className="flex items-center gap-1"><ArrowDown className="h-3 w-3" /> Deducciones</span>
                            <span>- {money(result.totalDeductions)}</span>
                        </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base Gravable</span>
                        <span className="font-medium">{money(result.baseGravable)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm pt-2">
                        <span className="text-muted-foreground">ISR Determinado</span>
                        <span>{money(result.isr)}</span>
                    </div>
                    
                    {result.subsidio > 0 && (
                        <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                             <span className="flex items-center gap-1"><ArrowDown className="h-3 w-3" /> Subsidio al Empleo</span>
                             <span>- {money(result.subsidio)}</span>
                        </div>
                    )}

                    <div className="flex justify-between items-end pt-2 border-t mt-2">
                        <span className="font-bold text-lg">ISR a Pagar</span>
                        <span className="font-bold text-2xl text-primary">{money(result.totalPayable)}</span>
                    </div>
                     <div className="flex justify-end text-xs text-muted-foreground">
                        Tasa efectiva: {effectiveRate.toFixed(2)}%
                    </div>
                </div>

                {/* Annual Projection */}
                <div className="rounded-lg bg-muted p-4 space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                        <ArrowUp className="h-4 w-4" /> Proyección Anual
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-muted-foreground text-xs">Ingreso Anual</p>
                            <p className="font-medium">{money(annualIncome)}</p>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs">ISR Anual Est.</p>
                            <p className="font-medium">{money(annualISR)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
