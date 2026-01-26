// Tax Regimes
export type TaxRegime =
  | 'resico'
  | 'sueldos_salarios'
  | 'actividad_empresarial'
  | 'arrendamiento';

// Optimization Profiles
export type OptimizationProfile = 'maximo' | 'moderado' | 'conservador' | 'retiro';

// Deduction method for Arrendamiento
export type ArrendamientoMethod = 'ciega' | 'comprobados';

// Core Input Interface
export interface CalculatorInput {
  regime: TaxRegime;
  monthlyIncome: number;
  
  // Arrendamiento specific
  arrendamientoMethod?: ArrendamientoMethod;
  predial?: number; // Property tax (used in both methods)
  
  // Personal deductions (for non-RESICO)
  deductions: {
    medical: MedicalDeductions;
    insurance: number;           // Primas de seguros médicos
    funeral: number;             // Gastos funerarios
    mortgageInterest: number;    // Intereses reales hipotecarios
    donations: number;           // Donativos
    tuition: TuitionDeduction[]; // Per-student
    transport: number;           // Transporte escolar obligatorio
    retirement: number;          // Aportaciones complementarias
    savings: number;             // Cuentas especiales ahorro
    localTax: number;            // Impuesto local sobre salarios
  };
  
  // Business deductions (Actividad Empresarial only)
  businessDeductions?: BusinessDeductions;
  
  // Arrendamiento actual deductions (when method = 'comprobados')
  arrendamientoDeductions?: ArrendamientoDeductions;
}

export interface MedicalDeductions {
  general: number;      // Honorarios médicos, dentales, hospital, etc.
  glasses: number;      // Lentes ópticos (limit $2,500/person)
  glassesCount: number; // Number of people claiming glasses
  disability: number;   // Gastos por incapacidad/discapacidad (NO LIMIT)
}

export interface TuitionDeduction {
  level: 'preescolar' | 'primaria' | 'secundaria' | 'profesional_tecnico' | 'bachillerato';
  amount: number;
}

export interface BusinessDeductions {
  purchases: number;
  expenses: number;
  investments: number;
  interest: number;
  imss: number;
  localTaxes: number;
  salaries: number;
  rent: number;
  professionalServices: number;
  utilities: number;
}

export interface ArrendamientoDeductions {
  predial: number;
  improvements: number;
  maintenance: number;
  water: number;
  mortgageInterest: number;
  salaries: number;
  insurance: number;
  depreciation: number;
}

// Result Types
export interface ISRResult {
    baseGravable: number;
    isr: number;
    subsidio: number;
    totalPayable: number;
    breakdown: {
        limitInferior: number;
        excedente: number;
        porcentaje: number;
        impuestoMarginal: number;
        cuotaFija: number;
    };
}
