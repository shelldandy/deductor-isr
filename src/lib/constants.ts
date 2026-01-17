// UMA Values 2025
export const UMA_DIARIA_2025 = 113.14;
export const UMA_MENSUAL_2025 = 3439.46;
export const UMA_ANUAL_2025 = 41273.52;

// Global deduction limits
export const LIMITE_GLOBAL_5_UMA = 206367.6;
export const LIMITE_GLOBAL_PORCENTAJE = 0.15;

// Personal deduction specific limits
export const LIMITE_GASTOS_FUNERARIOS = 41273.52; // 1 UMA anual
export const LIMITE_LENTES_OPTICOS = 2500.0;
export const LIMITE_DONATIVOS_PORCENTAJE = 0.07;
export const LIMITE_AHORRO_CUENTAS = 152000.0;
export const LIMITE_RETIRO_UMA = 206367.6; // 5 UMA
export const LIMITE_RETIRO_PORCENTAJE = 0.1;
export const LIMITE_HIPOTECA_UDIS = 750000;

// School tuition limits
export const COLEGIATURAS = {
  preescolar: 14200,
  primaria: 12900,
  secundaria: 19900,
  profesional_tecnico: 17100,
  bachillerato: 24500,
};

// RESICO monthly rates
export const RESICO_MENSUAL = [
  { limite: 25000, tasa: 0.01 },
  { limite: 50000, tasa: 0.011 },
  { limite: 83333.33, tasa: 0.015 },
  { limite: 208333.33, tasa: 0.02 },
  { limite: 291666.67, tasa: 0.025 },
];

// Subsidio al empleo 2025
export const SUBSIDIO_PORCENTAJE = 0.138;
export const SUBSIDIO_MENSUAL = 474.65;
export const SUBSIDIO_LIMITE_INGRESO = 10171.0;

// Arrendamiento blind deduction
export const DEDUCCION_CIEGA_PORCENTAJE = 0.35;

// ISR Monthly Tables 2025 (Approximation based on standard brackets - values would need to be exact for 2025 official table)
// Using standard 2024 tables as placeholders until 2025 official release or update
export const TABLA_ISR_MENSUAL_2024 = [
    { limite_inferior: 0.01, cuota_fija: 0.00, porcentaje: 0.0192 },
    { limite_inferior: 746.05, cuota_fija: 14.32, porcentaje: 0.0640 },
    { limite_inferior: 6332.06, cuota_fija: 371.83, porcentaje: 0.1088 },
    { limite_inferior: 11128.02, cuota_fija: 893.63, porcentaje: 0.1600 },
    { limite_inferior: 12935.83, cuota_fija: 1182.88, porcentaje: 0.1792 },
    { limite_inferior: 15487.72, cuota_fija: 1640.18, porcentaje: 0.2136 },
    { limite_inferior: 31236.50, cuota_fija: 5004.12, porcentaje: 0.2352 },
    { limite_inferior: 49233.01, cuota_fija: 9236.89, porcentaje: 0.3000 },
    { limite_inferior: 93993.91, cuota_fija: 22665.17, porcentaje: 0.3200 },
    { limite_inferior: 125325.21, cuota_fija: 32691.18, porcentaje: 0.3400 },
    { limite_inferior: 375975.62, cuota_fija: 117912.32, porcentaje: 0.3500 },
];
