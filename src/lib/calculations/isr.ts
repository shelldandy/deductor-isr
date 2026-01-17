import { TABLA_ISR_MENSUAL_2024 } from '../constants';
import type { ISRResult } from '../types';

export function calculateISR(baseGravable: number): ISRResult {
    if (baseGravable <= 0) {
        return {
            baseGravable,
            isr: 0,
            subsidio: 0,
            totalPayable: 0,
            breakdown: {
                limitInferior: 0,
                excedente: 0,
                porcentaje: 0,
                impuestoMarginal: 0,
                cuotaFija: 0
            }
        };
    }

    // Find the corresponding bracket
    let bracket = TABLA_ISR_MENSUAL_2024[0];
    for (let i = 0; i < TABLA_ISR_MENSUAL_2024.length; i++) {
        if (baseGravable >= TABLA_ISR_MENSUAL_2024[i].limite_inferior) {
            bracket = TABLA_ISR_MENSUAL_2024[i];
        } else {
            break;
        }
    }

    const excedente = baseGravable - bracket.limite_inferior;
    const impuestoMarginal = excedente * bracket.porcentaje;
    const isr = impuestoMarginal + bracket.cuota_fija;

    return {
        baseGravable,
        isr,
        subsidio: 0, // Calculated separately
        totalPayable: isr,
        breakdown: {
            limitInferior: bracket.limite_inferior,
            excedente,
            porcentaje: bracket.porcentaje,
            impuestoMarginal,
            cuotaFija: bracket.cuota_fija
        }
    };
}
