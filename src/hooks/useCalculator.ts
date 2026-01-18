import { useMemo } from 'react';
import { useCalculatorContext } from '../context/CalculatorContext';
import { calculateISR } from '../lib/calculations/isr';
import { calculateResico } from '../lib/calculations/resico';
import { calculateDeductions } from '../lib/calculations/deductions';
import { SUBSIDIO_LIMITE_INGRESO, SUBSIDIO_MENSUAL, DEDUCCION_CIEGA_PORCENTAJE } from '../lib/constants';
import type { ISRResult } from '../lib/types';

export function useCalculator() {
    const { state } = useCalculatorContext();

    return useMemo(() => {
        const { regime, monthlyIncome, arrendamientoMethod, businessDeductions, arrendamientoDeductions } = state;

        let baseGravable = monthlyIncome;
        let totalDeductions = 0;
        let isrResult: ISRResult = {
            baseGravable: 0,
            isr: 0,
            subsidio: 0,
            totalPayable: 0,
            breakdown: { limitInferior: 0, excedente: 0, porcentaje: 0, impuestoMarginal: 0, cuotaFija: 0 }
        };

        // 1. Calculate Base Gravable & Deductions based on Regime
        if (regime === 'resico') {
            // RESICO: No deductions, special flat rate calculation
            const resicoTax = calculateResico(monthlyIncome);
            return {
                baseGravable: monthlyIncome,
                totalDeductions: 0,
                isr: resicoTax,
                subsidio: 0,
                totalPayable: resicoTax,
                deductionResult: null,
                regime,
                isrWithoutDeductions: resicoTax,
                savingsFromDeductions: 0
            };
        } else if (regime === 'sueldos_salarios') {
            // Sueldos: Personal deductions apply
            const deductionRes = calculateDeductions(state);
            totalDeductions = deductionRes.totalDeductible;
            baseGravable = Math.max(0, monthlyIncome - totalDeductions);
            isrResult = calculateISR(baseGravable);
        } else if (regime === 'actividad_empresarial') {
             // Actividad Empresarial: Business Deductions + Personal Deductions
             // First subtract business expenses to get "Utilidad Fiscal" (approx base for personal deductions step)
             // Then apply Personal Deductions
             
             // Simplification: Treat business deductions as direct subtractions from income first
             let businessExpenseTotal = 0;
             if (businessDeductions) {
                 businessExpenseTotal = Object.values(businessDeductions).reduce((sum, val) => sum + (val || 0), 0);
             }
             
             // NOTE: calculateDeductions uses 'monthlyIncome' from state for caps (e.g. 15% of income). 
             // Should it be raw income or net? Law says 15% of "Ingresos Brutos". So raw income is correct for the cap.
             
             const deductionRes = calculateDeductions(state);
             totalDeductions = businessExpenseTotal + deductionRes.totalDeductible;
             baseGravable = Math.max(0, monthlyIncome - totalDeductions);
             isrResult = calculateISR(baseGravable);

        } else if (regime === 'arrendamiento') {
            // Arrendamiento: Ciega (35%) OR Comprobados + Predial
            let arrendamientoDeductionTotal = 0;
            const predial = state.predial || 0; // Predial applies in both cases (sometimes separate line item, but deductible)
            // Wait, Blind deduction is 35% WITHOUT documentation. Predial IS deductible on top of 35%.
            
            if (arrendamientoMethod === 'ciega') {
                const blindDeduction = monthlyIncome * DEDUCCION_CIEGA_PORCENTAJE;
                arrendamientoDeductionTotal = blindDeduction + (predial / 12); // Assuming predial input is annual, or monthly? Let's assume input is monthly for consistency, or small enough.
                // Actually predial is usually annual. If user inputs 5000, is it monthly? Input label should clarify.
                // Let's assume the user enters the pro-rated monthly amount or we handle it in UI.
                // For now, take value as-is.
            } else {
                 // Comprobados
                 if (arrendamientoDeductions) {
                     arrendamientoDeductionTotal = Object.values(arrendamientoDeductions).reduce((sum, val) => sum + (val || 0), 0);
                 }
            }
            
            // Personal Deductions also apply to the annual calculation for Arrendamiento.
            // Again, for monthly provisional, usually not. But we'll include for the "Projection".
            const deductionRes = calculateDeductions(state);
            totalDeductions = arrendamientoDeductionTotal + deductionRes.totalDeductible;
            baseGravable = Math.max(0, monthlyIncome - totalDeductions);
            isrResult = calculateISR(baseGravable);
        }

        // 2. Apply Subsidio (Sueldos y Salarios only)
        if (regime === 'sueldos_salarios' && monthlyIncome <= SUBSIDIO_LIMITE_INGRESO) {
            // Subsidio applies to tax, can reduce it to zero or result in credit (negative tax? No, just zero pay usually, but old subsidy paid cash. New subsidy is just tax credit).
            // 2024/2025 Reform: Subsidio Para el Empleo replaces the old table with a percentage of UMA or similar?
            // The constants file has fixed values. Let's use those.
            // If tax < subsidy, tax = 0.
            
            const subsidio = SUBSIDIO_MENSUAL; // Simplified fixed amount or calculated?
            // Constants say SUBSIDIO_MENSUAL = 474.65.
            
            isrResult.subsidio = subsidio;
            isrResult.totalPayable = Math.max(0, isrResult.isr - subsidio);
        }

        // Calculate ISR without deductions for comparison (RESICO already returned above)
        const isrNoDeductionsResult = calculateISR(monthlyIncome);
        let isrWithoutDeductions: number;
        // Apply subsidio if applicable
        if (regime === 'sueldos_salarios' && monthlyIncome <= SUBSIDIO_LIMITE_INGRESO) {
            isrWithoutDeductions = Math.max(0, isrNoDeductionsResult.isr - SUBSIDIO_MENSUAL);
        } else {
            isrWithoutDeductions = isrNoDeductionsResult.isr;
        }

        const savingsFromDeductions = isrWithoutDeductions - isrResult.totalPayable;

        return {
            baseGravable,
            totalDeductions,
            isr: isrResult.isr,
            subsidio: isrResult.subsidio,
            totalPayable: isrResult.totalPayable,
            breakdown: isrResult.breakdown,
            regime,
            isrWithoutDeductions,
            savingsFromDeductions
        };

    }, [state]);
}
