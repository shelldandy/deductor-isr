import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCalculatorContext } from '@/context/CalculatorContext';
import { useCalculator } from '@/hooks/useCalculator';
import { calculateDeductions } from '@/lib/calculations/deductions';
import { LIMITE_GLOBAL_5_UMA, LIMITE_GLOBAL_PORCENTAJE } from '@/lib/constants';
import { Calculator, AlertTriangle, Info } from 'lucide-react';

const money = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);
const pct = (val: number) => (val * 100).toFixed(2) + '%';

export function DeductionBreakdown() {
    const { state } = useCalculatorContext();
    const result = useCalculator();

    if (state.regime === 'resico') {
        return null;
    }

    const deductionResult = calculateDeductions(state);
    const { breakdown } = deductionResult;
    const annualIncome = state.monthlyIncome * 12;
    const monthlyGlobalCapUMA = LIMITE_GLOBAL_5_UMA / 12;
    const monthlyGlobalCapPct = (annualIncome * LIMITE_GLOBAL_PORCENTAJE) / 12;

    const capReached = breakdown.subjectToGlobalCap > breakdown.globalCapApplied;
    const excessAmount = Math.max(0, breakdown.subjectToGlobalCap - breakdown.cappedDeductions);

    if (result.totalDeductions === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Desglose de Deducciones
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                {/* Global Cap Section */}
                <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                    <h4 className="font-semibold flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        Tope Global de Deducciones
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <span className="text-muted-foreground">Límite 5 UMAs:</span>
                            <span className="ml-1 font-medium">{money(monthlyGlobalCapUMA)}/mes</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Límite 15%:</span>
                            <span className="ml-1 font-medium">{money(monthlyGlobalCapPct)}/mes</span>
                        </div>
                    </div>
                    <div className="pt-2 border-t">
                        <span className="text-muted-foreground">Tope Aplicable:</span>
                        <span className="ml-2 font-bold text-primary">{money(breakdown.globalCapApplied)}/mes</span>
                        <span className="text-xs text-muted-foreground ml-1">(el menor)</span>
                    </div>
                </div>

                {/* Subject to Cap */}
                <div className="space-y-2">
                    <h4 className="font-semibold">Deducciones Sujetas al Tope</h4>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total solicitado:</span>
                        <span>{money(breakdown.subjectToGlobalCap)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Deducible (hasta el tope):</span>
                        <span className="font-medium text-green-600 dark:text-green-400">{money(breakdown.cappedDeductions)}</span>
                    </div>
                    {capReached && (
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2 rounded">
                            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                            <span className="text-xs">Excedente no deducible: {money(excessAmount)}</span>
                        </div>
                    )}
                </div>

                <Separator />

                {/* Exempt from Cap */}
                <div className="space-y-2">
                    <h4 className="font-semibold">Deducciones Sin Tope Global</h4>
                    <p className="text-xs text-muted-foreground">
                        Retiro, ahorro, colegiaturas y gastos de discapacidad (con límites propios).
                    </p>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">{money(breakdown.exemptFromGlobalCap)}</span>
                    </div>
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center pt-2">
                    <span className="font-bold">Total Deducciones Aplicadas</span>
                    <span className="font-bold text-lg text-primary">{money(deductionResult.totalDeductible)}</span>
                </div>

                {/* ISR Breakdown */}
                {result.breakdown && result.breakdown.limitInferior > 0 && (
                    <>
                        <Separator />
                        <div className="space-y-2">
                            <h4 className="font-semibold">Cálculo del ISR</h4>
                            <div className="grid gap-1 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Base Gravable:</span>
                                    <span>{money(result.baseGravable)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">(-) Límite Inferior:</span>
                                    <span>{money(result.breakdown.limitInferior)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">(=) Excedente:</span>
                                    <span>{money(result.breakdown.excedente)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">(×) Tasa Marginal:</span>
                                    <span>{pct(result.breakdown.porcentaje)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">(=) Impuesto Marginal:</span>
                                    <span>{money(result.breakdown.impuestoMarginal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">(+) Cuota Fija:</span>
                                    <span>{money(result.breakdown.cuotaFija)}</span>
                                </div>
                                <div className="flex justify-between font-semibold pt-1 border-t">
                                    <span>ISR Determinado:</span>
                                    <span>{money(result.isr)}</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
