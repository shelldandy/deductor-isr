import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCalculatorContext } from "@/context/CalculatorContext";
import {
  AlertCircle,
  Heart,
  GraduationCap,
  Banknote,
  Home,
  Gift,
  Shield,
  PiggyBank,
  Sparkles,
} from "lucide-react";
import { calculateOptimalDeductions } from "@/lib/calculations/optimizer";
import { OPTIMIZATION_PROFILES } from "@/lib/constants";
import type { OptimizationProfile } from "@/lib/types";
import { MedicalDeductions } from "./deductions/MedicalDeductions";
import { InsuranceDeductions } from "./deductions/InsuranceDeductions";
import { FuneralDeductions } from "./deductions/FuneralDeductions";
import { MortgageDeductions } from "./deductions/MortgageDeductions";
import { DonationsDeductions } from "./deductions/DonationsDeductions";
import { TuitionDeductions } from "./deductions/TuitionDeductions";
import { RetirementDeductions } from "./deductions/RetirementDeductions";
import { SavingsDeductions } from "./deductions/SavingsDeductions";
import { LocalTaxDeductions } from "./deductions/LocalTaxDeductions";
import { TransportDeductions } from "./deductions/TransportDeductions";

export function DeductionsForm() {
  const { state, dispatch } = useCalculatorContext();
  const [selectedProfile, setSelectedProfile] =
    useState<OptimizationProfile | null>(null);

  const handleOptimize = (profile: OptimizationProfile) => {
    setSelectedProfile(profile);
    const optimized = calculateOptimalDeductions(
      state.monthlyIncome,
      state.regime,
      profile,
    );
    dispatch({ type: "SET_DEDUCTIONS", payload: optimized.deductions });

    // For Actividad Empresarial, also set business deductions
    if (optimized.businessDeductions) {
      dispatch({
        type: "SET_BUSINESS_DEDUCTIONS",
        payload: optimized.businessDeductions,
      });
    }

    // For Arrendamiento, set rental deductions and switch to 'comprobados' method
    if (optimized.arrendamientoDeductions) {
      dispatch({ type: "SET_ARRENDAMIENTO_METHOD", payload: "comprobados" });
      dispatch({
        type: "SET_ARRENDAMIENTO_DEDUCTIONS",
        payload: optimized.arrendamientoDeductions,
      });
      if (optimized.predial !== undefined) {
        dispatch({
          type: "SET_FULL_STATE",
          payload: { ...state, predial: optimized.predial },
        });
      }
    }
  };

  const canOptimize = state.monthlyIncome > 0;

  if (state.regime === "resico") {
    return (
      <Card className="bg-muted/50 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-2">
          <AlertCircle className="h-8 w-8" />
          <p className="font-medium">
            El régimen RESICO no admite deducciones personales.
          </p>
          <p className="text-sm">
            El cálculo se realiza sobre el ingreso bruto con tasas reducidas.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-4 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="py-5">
          <div className="flex flex-col items-center text-center gap-3">
            <Sparkles className="h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold text-lg">Optimizador Automático</p>
              <p className="text-sm text-foreground/70">
                Selecciona una estrategia de optimización
              </p>
            </div>
            <Select
              value={selectedProfile ?? undefined}
              onValueChange={(value) =>
                handleOptimize(value as OptimizationProfile)
              }
              disabled={!canOptimize}
            >
              <SelectTrigger className="w-auto min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90 border-primary focus:ring-primary [&>svg]:text-primary-foreground [&>svg]:opacity-100 data-[placeholder]:text-primary-foreground">
                <SelectValue placeholder="Seleccionar estrategia..." />
              </SelectTrigger>
              <SelectContent className="min-w-[280px]">
                {Object.entries(OPTIMIZATION_PROFILES).map(([id, profile]) => (
                  <SelectItem key={id} value={id} className="py-3 cursor-pointer">
                    <span className="font-medium">{profile.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-foreground/60 max-w-[320px]">
              {selectedProfile
                ? OPTIMIZATION_PROFILES[selectedProfile].description
                : "Máximo llena todo al límite, Moderado es balanceado, Conservador solo lo esencial, y Retiro prioriza el ahorro."}
            </p>
          </div>
        </CardContent>
      </Card>

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
    </>
  );
}
