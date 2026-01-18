import { CalculatorProvider, useCalculatorContext } from '@/context/CalculatorContext';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { RegimeSelector } from '@/components/forms/RegimeSelector';
import { IncomeInput } from '@/components/forms/IncomeInput';
import { DeductionsForm } from '@/components/forms/DeductionsForm';
import { ArrendamientoOptions } from '@/components/forms/ArrendamientoOptions';
import { BusinessDeductions } from '@/components/forms/BusinessDeductions';
import { ResultsSummary } from '@/components/results/ResultsSummary';
import { DeductionBreakdown } from '@/components/results/DeductionBreakdown';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Toaster } from 'sonner';

function CalculatorApp() {
    const { state } = useCalculatorContext();

    // Auto-save/restore state from localStorage
    useLocalStorage();
    const showArrendamiento = state.regime === 'arrendamiento';
    const showBusiness = state.regime === 'actividad_empresarial';
    const showDeductions = state.regime !== 'resico';

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <Container className="space-y-8 pb-12">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight">1. Régimen Fiscal</h2>
                            <RegimeSelector />
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight">2. Ingresos</h2>
                            <IncomeInput />
                        </section>

                        {showArrendamiento && (
                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight">3. Opciones de Arrendamiento</h2>
                                <ArrendamientoOptions />
                            </section>
                        )}

                        {showBusiness && (
                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight">3. Deducciones del Negocio</h2>
                                <BusinessDeductions />
                            </section>
                        )}

                        {showDeductions && (
                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    {showArrendamiento || showBusiness ? '4' : '3'}. Deducciones Personales
                                </h2>
                                <DeductionsForm />
                            </section>
                        )}

                        {!showDeductions && (
                            <section className="space-y-4">
                                <h2 className="text-2xl font-semibold tracking-tight">3. Deducciones</h2>
                                <DeductionsForm />
                            </section>
                        )}
                    </div>

                    <div className="space-y-6">
                        <section className="lg:sticky lg:top-8 space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight">Resultados</h2>
                            <ResultsSummary />
                            <DeductionBreakdown />
                        </section>
                    </div>
                </div>
            </Container>
            <Toaster />
        </div>
    );
}

export default function App() {
    return (
        <CalculatorProvider>
            <CalculatorApp />
        </CalculatorProvider>
    );
}
