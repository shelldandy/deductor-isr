import {
    LIMITE_GLOBAL_5_UMA,
    LIMITE_GLOBAL_PORCENTAJE,
    LIMITE_LENTES_OPTICOS,
    LIMITE_AHORRO_CUENTAS,
    LIMITE_RETIRO_PORCENTAJE,
    LIMITE_RETIRO_UMA,
    COLEGIATURAS,
    LIMITE_GASTOS_FUNERARIOS
} from '../constants';
import type { CalculatorInput } from '../types';

export interface DeductionResult {
    totalDeductible: number;
    totalExempt: number; // Deductions that are valid but exceed the cap or are not allowed
    breakdown: {
        subjectToGlobalCap: number; // Total amount eligible for global cap
        exemptFromGlobalCap: number; // Total amount not subject to global cap (e.g. retirement)
        globalCapApplied: number; // The actual cap value used
        cappedDeductions: number; // The amount deductible from the capped category
    };
}

export function calculateDeductions(input: CalculatorInput): DeductionResult {
    const { monthlyIncome, deductions } = input;
    const annualIncome = monthlyIncome * 12;
    
    // Helper to monthly-ize annual limits
    const monthly = (val: number) => val / 12;

    // --- Subject to Global Cap ---
    
    // Medical (General) - No specific limit, fully subject to global cap
    const medical = deductions.medical.general;

    // Funeral - Limit 1 UMA annual
    const funeralLimit = monthly(LIMITE_GASTOS_FUNERARIOS);
    const funeral = Math.min(deductions.funeral, funeralLimit);

    // Mortgage Interest - Real interest only, fully subject to global cap
    const mortgage = deductions.mortgageInterest;
    
    // Donations - Limit 7% of annual income
    const donationLimit = monthly(annualIncome * 0.07); // 7% of income
    const donations = Math.min(deductions.donations, donationLimit);

    // Transport (School mandatory) - No specific limit, subject to global cap
    const transport = deductions.transport;

    // Local Tax - Limit 5%
    const localTax = deductions.localTax;

    // Insurance (Medical premiums) - No specific limit, subject to global cap
    const insurance = deductions.insurance;

    // Glasses - Limit 2500 annual per person, subject to global cap
    const glassesLimit = monthly(LIMITE_LENTES_OPTICOS * deductions.medical.glassesCount);
    const glasses = Math.min(deductions.medical.glasses, glassesLimit);

    const totalSubjectToCap = medical + funeral + mortgage + donations + transport + localTax + insurance + glasses;

    // Calculate Global Cap
    const globalCapLimitAmount = monthly(LIMITE_GLOBAL_5_UMA);
    const globalCapPercentAmount = monthly(annualIncome * LIMITE_GLOBAL_PORCENTAJE);
    const globalCap = Math.min(globalCapLimitAmount, globalCapPercentAmount);

    const deductibleSubjectToCapFinal = Math.min(totalSubjectToCap, globalCap);


    // --- Exempt from Global Cap (Separate Limits) ---

    // Disability Medical - Fully deductible, no cap
    const disability = deductions.medical.disability;

    // Retirement (Aportaciones complementarias) - Limit 10% income or 5 UMA (whichever is less)
    const retirementLimit = Math.min(
        monthly(annualIncome * LIMITE_RETIRO_PORCENTAJE),
        monthly(LIMITE_RETIRO_UMA)
    );
    const retirement = Math.min(deductions.retirement, retirementLimit);

    // Savings (Cuentas especiales) - Limit $152,000 annual
    const savingsLimit = monthly(LIMITE_AHORRO_CUENTAS);
    const savings = Math.min(deductions.savings, savingsLimit);

    // Tuition (Colegiaturas) - Limit per student level
    let tuitionTotal = 0;
    for (const t of deductions.tuition) {
        const limit = monthly(COLEGIATURAS[t.level]);
        tuitionTotal += Math.min(t.amount, limit);
    }

    const totalExemptFromCap = disability + retirement + savings + tuitionTotal;

    return {
        totalDeductible: deductibleSubjectToCapFinal + totalExemptFromCap,
        totalExempt: (totalSubjectToCap - deductibleSubjectToCapFinal) + 
                     (deductions.retirement - retirement) + 
                     (deductions.savings - savings), // Simplified "excess" calculation
        breakdown: {
            subjectToGlobalCap: totalSubjectToCap,
            exemptFromGlobalCap: totalExemptFromCap,
            globalCapApplied: globalCap,
            cappedDeductions: deductibleSubjectToCapFinal
        }
    };
}
