import { CalculatorProvider } from '@/context/CalculatorContext';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Toaster } from 'sonner';

// Placeholders for now, will implement in next steps
const RegimeSelector = () => <div>Regime Selector (Coming Soon)</div>;
const IncomeInput = () => <div>Income Input (Coming Soon)</div>;
const DeductionsForm = () => <div>Deductions Form (Coming Soon)</div>;
const ResultsSummary = () => <div>Results Summary (Coming Soon)</div>;

function CalculatorApp() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Container className="space-y-8">
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

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold tracking-tight">3. Deducciones</h2>
                    <DeductionsForm />
                </section>
            </div>
            
            <div className="space-y-8">
                <section className="sticky top-8">
                    <h2 className="text-2xl font-semibold tracking-tight mb-4">Resultados</h2>
                    <ResultsSummary />
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
