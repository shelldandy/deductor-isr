import type { CalculatorInput, TaxRegime, BusinessDeductions, ArrendamientoDeductions, OptimizationProfile } from '../types';
import {
  LIMITE_GLOBAL_5_UMA,
  LIMITE_GLOBAL_PORCENTAJE,
  LIMITE_GASTOS_FUNERARIOS,
  LIMITE_LENTES_OPTICOS,
  LIMITE_DONATIVOS_PORCENTAJE,
  LIMITE_AHORRO_CUENTAS,
  LIMITE_RETIRO_UMA,
  LIMITE_RETIRO_PORCENTAJE,
  COLEGIATURAS,
  OPTIMIZATION_PROFILES,
} from '../constants';

export interface OptimizedDeductions {
  deductions: CalculatorInput['deductions'];
  businessDeductions?: BusinessDeductions;
  arrendamientoDeductions?: ArrendamientoDeductions;
  predial?: number;
}

/**
 * Calculates optimal deductions to maximize tax savings based on regime and profile.
 *
 * Strategy:
 * 1. Fill ALL deductions exempt from global cap to their individual limits (scaled by profile)
 * 2. Fill ALL capped deductions (the system caps the total anyway, scaled by profile)
 * 3. For Actividad Empresarial: also fill business deductions (no cap)
 * 4. For Arrendamiento: also fill rental deductions
 *
 * @param monthlyIncome - Monthly gross income
 * @param regime - Tax regime
 * @param profile - Optimization profile (default: 'maximo')
 * @returns Optimized deductions for all applicable categories
 */
export function calculateOptimalDeductions(
  monthlyIncome: number,
  regime: TaxRegime,
  profile: OptimizationProfile = 'maximo'
): OptimizedDeductions {
  const config = OPTIMIZATION_PROFILES[profile];
  const m = config.multipliers;
  const annualIncome = monthlyIncome * 12;
  const monthly = (val: number) => val / 12;

  // === PERSONAL DEDUCTIONS (for all regimes except RESICO) ===

  // EXEMPT FROM GLOBAL CAP (fill to individual limits, scaled by profile)
  const retirementMonthly = monthly(
    Math.min(annualIncome * LIMITE_RETIRO_PORCENTAJE, LIMITE_RETIRO_UMA)
  ) * m.retirement;
  const savingsMonthly = monthly(LIMITE_AHORRO_CUENTAS) * m.savings;

  // Tuition entries based on profile
  let tuitionEntries: CalculatorInput['deductions']['tuition'] = [];
  if (m.tuitionAll) {
    tuitionEntries = [
      { level: 'bachillerato', amount: monthly(COLEGIATURAS.bachillerato) },
      { level: 'secundaria', amount: monthly(COLEGIATURAS.secundaria) },
      { level: 'profesional_tecnico', amount: monthly(COLEGIATURAS.profesional_tecnico) },
      { level: 'primaria', amount: monthly(COLEGIATURAS.primaria) },
      { level: 'preescolar', amount: monthly(COLEGIATURAS.preescolar) },
    ];
  } else {
    // Conservative: only 2 children (most common scenario)
    tuitionEntries = [
      { level: 'primaria', amount: monthly(COLEGIATURAS.primaria) },
      { level: 'secundaria', amount: monthly(COLEGIATURAS.secundaria) },
    ];
  }

  // SUBJECT TO GLOBAL CAP (fill all, scaled by profile - system caps total)
  const globalCap = Math.min(LIMITE_GLOBAL_5_UMA, annualIncome * LIMITE_GLOBAL_PORCENTAJE);
  const funeralMonthly = monthly(LIMITE_GASTOS_FUNERARIOS) * m.funeral;
  const donationsMonthly = monthly(annualIncome * LIMITE_DONATIVOS_PORCENTAJE) * m.donations;
  const glassesMonthly = monthly(LIMITE_LENTES_OPTICOS) * m.glasses;
  const medicalGeneralMonthly = monthly(globalCap) * m.medical;
  const insuranceMonthly = monthly(globalCap * 0.5) * m.insurance;
  const mortgageMonthly = monthly(globalCap * 0.5) * m.mortgage;
  const transportMonthly = monthly(globalCap * 0.25) * m.transport;
  const localTaxMonthly = monthly(globalCap * 0.25) * m.localTax;

  const personalDeductions: CalculatorInput['deductions'] = {
    medical: {
      general: medicalGeneralMonthly,
      glasses: glassesMonthly,
      glassesCount: m.glasses > 0 ? 1 : 0,
      disability: 0,
    },
    insurance: insuranceMonthly,
    funeral: funeralMonthly,
    mortgageInterest: mortgageMonthly,
    donations: donationsMonthly,
    tuition: tuitionEntries,
    transport: transportMonthly,
    retirement: retirementMonthly,
    savings: savingsMonthly,
    localTax: localTaxMonthly,
  };

  const result: OptimizedDeductions = {
    deductions: personalDeductions,
  };

  // === BUSINESS DEDUCTIONS (Actividad Empresarial only) ===
  // These are subtracted BEFORE calculating ISR - no cap!
  if (regime === 'actividad_empresarial') {
    const bm = m.business;
    result.businessDeductions = {
      purchases: monthlyIncome * bm.purchases,
      expenses: monthlyIncome * bm.expenses,
      investments: monthlyIncome * bm.investments,
      salaries: monthlyIncome * bm.salaries,
      imss: monthlyIncome * bm.imss,
      professionalServices: monthlyIncome * bm.professionalServices,
      rent: monthlyIncome * bm.rent,
      utilities: monthlyIncome * bm.utilities,
      interest: monthlyIncome * bm.interest,
      localTaxes: monthlyIncome * bm.localTaxes,
    };
  }

  // === ARRENDAMIENTO DEDUCTIONS (Rental income) ===
  // Fill rental-specific deductions
  if (regime === 'arrendamiento') {
    const am = m.arrendamiento;
    result.predial = monthlyIncome * am.predial;
    result.arrendamientoDeductions = {
      predial: monthlyIncome * am.predial,
      improvements: monthlyIncome * am.improvements,
      maintenance: monthlyIncome * am.maintenance,
      water: monthlyIncome * am.water,
      mortgageInterest: monthlyIncome * am.mortgageInterest,
      salaries: monthlyIncome * am.salaries,
      insurance: monthlyIncome * am.insurance,
      depreciation: monthlyIncome * am.depreciation,
    };
  }

  return result;
}
