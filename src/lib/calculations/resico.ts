import { RESICO_MENSUAL } from '../constants';

export function calculateResico(monthlyIncome: number): number {
    if (monthlyIncome <= 0) return 0;
    
    // Limits in table are inclusive upper bounds
    for (const bracket of RESICO_MENSUAL) {
        if (monthlyIncome <= bracket.limite) {
            return monthlyIncome * bracket.tasa;
        }
    }

    // Fallback for highest bracket (same rate as last defined bracket usually, 
    // but typically RESICO has an absolute income cap of ~3.5M/yr, so ~291k/mo. 
    // Assuming simple calculator logic: apply highest rate if exceeds)
    const lastBracket = RESICO_MENSUAL[RESICO_MENSUAL.length - 1];
    return monthlyIncome * lastBracket.tasa;
}
