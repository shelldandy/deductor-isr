import { Calculator } from 'lucide-react';

export function Header() {
    return (
        <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-bold">Calculadora ISR México 2025</h1>
                </div>
                <div className="text-sm text-muted-foreground">
                    Cálculo mensual y anual
                </div>
            </div>
        </header>
    );
}
