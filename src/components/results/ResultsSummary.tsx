import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCalculator } from '@/hooks/useCalculator';
import { ArrowDown, ArrowUp, TrendingDown, Check, AlertCircle } from 'lucide-react';

const money = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);

export function ResultsSummary() {
    const result = useCalculator();

    const grossIncome = result.baseGravable + result.totalDeductions;
    const annualIncome = grossIncome * 12;
    const annualISR = result.totalPayable * 12;
    const effectiveRate = grossIncome > 0 ? (result.totalPayable / grossIncome) * 100 : 0;
    const annualSavings = result.savingsFromDeductions * 12;

    return (
        <div className="space-y-4">
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
                            <span className="font-medium">{money(grossIncome)}</span>
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

            {/* Comparison Card - Show only for non-RESICO */}
            {result.regime !== 'resico' && result.totalDeductions > 0 && (
                <Card className="border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-green-700 dark:text-green-400">
                            <Check className="h-4 w-4" />
                            Comparación: Ahorro por Deducciones
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Sin Deducciones</p>
                                <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                                    {money(result.isrWithoutDeductions)}
                                </p>
                            </div>
                            <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                                <p className="text-xs text-muted-foreground mb-1">Con Deducciones</p>
                                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                                    {money(result.totalPayable)}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="text-center">
                            <p className="text-xs text-muted-foreground mb-1">Ahorro Mensual</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {money(result.savingsFromDeductions)}
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Ahorro Anual Proyectado: <strong>{money(annualSavings)}</strong>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* RESICO Info Card */}
            {result.regime === 'resico' && grossIncome > 0 && (
                <Card className="border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-blue-700 dark:text-blue-400">
                            <AlertCircle className="h-4 w-4" />
                            Régimen RESICO
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            En RESICO no aplican deducciones personales. El impuesto se calcula
                            directamente sobre tus ingresos con tasas reducidas (1% a 2.5%).
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
