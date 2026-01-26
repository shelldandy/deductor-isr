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

// Optimization Profiles
export const OPTIMIZATION_PROFILES = {
  maximo: {
    label: 'Máximo',
    description: 'Todas las deducciones al límite permitido',
    multipliers: {
      medical: 1.0,
      insurance: 0.5,
      mortgage: 0.5,
      donations: 1.0,
      retirement: 1.0,
      savings: 1.0,
      transport: 0.25,
      localTax: 0.25,
      funeral: 1.0,
      glasses: 1.0,
      tuitionAll: true,
      business: {
        purchases: 0.30,
        expenses: 0.10,
        investments: 0.05,
        salaries: 0.20,
        imss: 0.05,
        professionalServices: 0.05,
        rent: 0.10,
        utilities: 0.03,
        interest: 0.02,
        localTaxes: 0.02,
      },
      arrendamiento: {
        predial: 0.05,
        improvements: 0.10,
        maintenance: 0.08,
        water: 0.02,
        mortgageInterest: 0.15,
        salaries: 0.05,
        insurance: 0.03,
        depreciation: 0.05,
      },
    },
  },
  moderado: {
    label: 'Moderado',
    description: 'Balance entre ahorro fiscal y realismo',
    multipliers: {
      medical: 0.5,
      insurance: 0.3,
      mortgage: 0.3,
      donations: 0.5,
      retirement: 1.0,
      savings: 0.5,
      transport: 0.15,
      localTax: 0.15,
      funeral: 0.5,
      glasses: 1.0,
      tuitionAll: true,
      business: {
        purchases: 0.20,
        expenses: 0.08,
        investments: 0.03,
        salaries: 0.15,
        imss: 0.04,
        professionalServices: 0.03,
        rent: 0.08,
        utilities: 0.02,
        interest: 0.01,
        localTaxes: 0.01,
      },
      arrendamiento: {
        predial: 0.04,
        improvements: 0.06,
        maintenance: 0.05,
        water: 0.01,
        mortgageInterest: 0.10,
        salaries: 0.03,
        insurance: 0.02,
        depreciation: 0.03,
      },
    },
  },
  conservador: {
    label: 'Conservador',
    description: 'Solo deducciones esenciales y comprobables',
    multipliers: {
      medical: 0.25,
      insurance: 0.2,
      mortgage: 0.2,
      donations: 0,
      retirement: 0.5,
      savings: 0.25,
      transport: 0,
      localTax: 0.1,
      funeral: 0,
      glasses: 0.5,
      tuitionAll: false,
      business: {
        purchases: 0.15,
        expenses: 0.05,
        investments: 0.02,
        salaries: 0.10,
        imss: 0.03,
        professionalServices: 0.02,
        rent: 0.05,
        utilities: 0.01,
        interest: 0.01,
        localTaxes: 0.01,
      },
      arrendamiento: {
        predial: 0.03,
        improvements: 0.03,
        maintenance: 0.03,
        water: 0.01,
        mortgageInterest: 0.05,
        salaries: 0.02,
        insurance: 0.01,
        depreciation: 0.02,
      },
    },
  },
  retiro: {
    label: 'Enfoque Retiro',
    description: 'Maximiza ahorro para el retiro',
    multipliers: {
      medical: 0.3,
      insurance: 0.2,
      mortgage: 0.2,
      donations: 0,
      retirement: 1.0,
      savings: 1.0,
      transport: 0,
      localTax: 0.1,
      funeral: 0,
      glasses: 0.5,
      tuitionAll: false,
      business: {
        purchases: 0.15,
        expenses: 0.05,
        investments: 0.02,
        salaries: 0.10,
        imss: 0.03,
        professionalServices: 0.02,
        rent: 0.05,
        utilities: 0.01,
        interest: 0.01,
        localTaxes: 0.01,
      },
      arrendamiento: {
        predial: 0.03,
        improvements: 0.03,
        maintenance: 0.03,
        water: 0.01,
        mortgageInterest: 0.05,
        salaries: 0.02,
        insurance: 0.01,
        depreciation: 0.02,
      },
    },
  },
} as const;

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
