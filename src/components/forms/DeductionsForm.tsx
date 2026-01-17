import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { useCalculatorContext } from '@/context/CalculatorContext';
import { AlertCircle } from 'lucide-react';

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

    // TODO: Break down into sub-components as per plan
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="medical">
                <AccordionTrigger>Gastos Médicos y Salud</AccordionTrigger>
                <AccordionContent>
                    <div className="p-4 space-y-4">
                        <p className="text-sm text-muted-foreground">Coming soon: MedicalDeductions component</p>
                    </div>
                </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="education">
                <AccordionTrigger>Educación (Colegiaturas)</AccordionTrigger>
                <AccordionContent>
                    <div className="p-4 space-y-4">
                        <p className="text-sm text-muted-foreground">Coming soon: TuitionDeductions component</p>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="others">
                <AccordionTrigger>Otras Deducciones</AccordionTrigger>
                <AccordionContent>
                    <div className="p-4 space-y-4">
                        <p className="text-sm text-muted-foreground">Coming soon: Other categories</p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
