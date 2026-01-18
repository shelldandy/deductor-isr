import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { useCalculatorContext } from '@/context/CalculatorContext';
import { AlertCircle, Heart, GraduationCap, Banknote, Home, Gift, Shield, PiggyBank } from 'lucide-react';
import { MedicalDeductions } from './deductions/MedicalDeductions';
import { InsuranceDeductions } from './deductions/InsuranceDeductions';
import { FuneralDeductions } from './deductions/FuneralDeductions';
import { MortgageDeductions } from './deductions/MortgageDeductions';
import { DonationsDeductions } from './deductions/DonationsDeductions';
import { TuitionDeductions } from './deductions/TuitionDeductions';
import { RetirementDeductions } from './deductions/RetirementDeductions';
import { SavingsDeductions } from './deductions/SavingsDeductions';
import { LocalTaxDeductions } from './deductions/LocalTaxDeductions';
import { TransportDeductions } from './deductions/TransportDeductions';

export function DeductionsForm() {
    const { state } = useCalculatorContext();

    if (state.regime === 'resico') {
        return (
            <Card className="bg-muted/50 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                    <p className="font-medium text-muted-foreground">
                        El régimen RESICO no admite deducciones personales.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        El cálculo se realiza sobre el ingreso bruto con tasas reducidas.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="medical">
                <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        Gastos Médicos y Salud
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-4 space-y-6">
                        <MedicalDeductions />
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="insurance">
                <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        Seguros Médicos
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-4">
                        <InsuranceDeductions />
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="education">
                <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-purple-500" />
                        Educación (Colegiaturas)
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-4 space-y-4">
                        <TuitionDeductions />
                        <TransportDeductions />
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="housing">
                <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-orange-500" />
                        Vivienda e Hipoteca
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-4">
                        <MortgageDeductions />
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="retirement">
                <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2">
                        <PiggyBank className="h-4 w-4 text-green-500" />
                        Ahorro y Retiro
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-4 space-y-4">
                        <RetirementDeductions />
                        <SavingsDeductions />
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="donations">
                <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2">
                        <Gift className="h-4 w-4 text-pink-500" />
                        Donativos
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-4">
                        <DonationsDeductions />
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="other">
                <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-slate-500" />
                        Otros Gastos Deducibles
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="p-4 space-y-4">
                        <FuneralDeductions />
                        <LocalTaxDeductions />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
