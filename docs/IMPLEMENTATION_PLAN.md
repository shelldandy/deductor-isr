# Implementation Plan: Calculadora ISR México

## Summary

| Aspect | Decision |
|--------|----------|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Forms | React Hook Form + Zod |
| State | React Context + useReducer |
| Persistence | localStorage |
| Package Manager | npm |
| UI Language | Spanish |
| Focus | Monthly (with annual projections) |

---

## Implementation Steps (20 tasks)

### Phase 1: Project Setup (4 tasks)
1. Initialize Vite + React + TypeScript project
2. Install and configure Tailwind CSS
3. Initialize shadcn/ui with required components (Card, Button, Input, Select, Accordion, Tabs, Label, Separator, Switch, Tooltip)
4. Set up project structure (folders, base files)

### Phase 2: Core Library (5 tasks)
5. Create `lib/constants.ts` - UMA values, ISR tables (monthly/annual), RESICO rates, all deduction limits
6. Create `lib/types.ts` - TypeScript interfaces for all data models
7. Create `lib/calculations/isr.ts` - Progressive ISR bracket calculator
8. Create `lib/calculations/resico.ts` - RESICO flat rate calculator
9. Create `lib/calculations/deductions.ts` - Deduction limit logic, global cap, category-specific caps

### Phase 3: State Management (3 tasks)
10. Create `context/CalculatorContext.tsx` - Central state with useReducer, actions for all inputs
11. Create `hooks/useCalculator.ts` - Hook that computes all derived values (base gravable, ISR, subsidio, comparisons)
12. Create `hooks/useLocalStorage.ts` - Persistence hook for auto-save/restore

### Phase 4: UI Components (6 tasks)
13. Create layout components (`Header`, `Container`) + `App.tsx` shell
14. Create `RegimeSelector.tsx` - 4 regime cards with descriptions
15. Create `IncomeInput.tsx` - Monthly income input with formatting
16. Create `DeductionsForm.tsx` - Accordion with all deduction category sub-components:
    - `MedicalDeductions.tsx` (general, glasses, disability)
    - `InsuranceDeductions.tsx`
    - `FuneralDeductions.tsx`
    - `MortgageDeductions.tsx`
    - `DonationsDeductions.tsx`
    - `TuitionDeductions.tsx` (dynamic list of students)
    - `RetirementDeductions.tsx`
    - `SavingsDeductions.tsx`
    - `LocalTaxDeductions.tsx`
    - `TransportDeductions.tsx`
17. Create `ArrendamientoOptions.tsx` - Toggle for ciega/comprobados + respective inputs
18. Create `BusinessDeductions.tsx` - Form for Actividad Empresarial expenses

### Phase 5: Results Display (2 tasks)
19. Create `ResultsSummary.tsx` - Main results panel with:
    - Monthly ISR calculation
    - Annual projection (×12)
    - Comparison: "Sin deducciones" vs "Con deducciones" (savings shown)
    - Subsidio al empleo display (if applicable)
20. Create `DeductionBreakdown.tsx` - Detailed breakdown:
    - Deductions subject to global cap (itemized + total)
    - Deductions exempt from cap (itemized + total)
    - Global cap applied vs available
    - ISR calculation steps (límite inferior, excedente, cuota fija, etc.)

---

## File Structure

```
deductor/
├── docs/
│   ├── guide.md
│   └── IMPLEMENTATION_PLAN.md
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Container.tsx
│   │   ├── forms/
│   │   │   ├── RegimeSelector.tsx
│   │   │   ├── IncomeInput.tsx
│   │   │   ├── DeductionsForm.tsx
│   │   │   ├── deductions/
│   │   │   │   ├── MedicalDeductions.tsx
│   │   │   │   ├── InsuranceDeductions.tsx
│   │   │   │   ├── FuneralDeductions.tsx
│   │   │   │   ├── MortgageDeductions.tsx
│   │   │   │   ├── DonationsDeductions.tsx
│   │   │   │   ├── TuitionDeductions.tsx
│   │   │   │   ├── RetirementDeductions.tsx
│   │   │   │   ├── SavingsDeductions.tsx
│   │   │   │   ├── LocalTaxDeductions.tsx
│   │   │   │   └── TransportDeductions.tsx
│   │   │   ├── ArrendamientoOptions.tsx
│   │   │   └── BusinessDeductions.tsx
│   │   └── results/
│   │       ├── ResultsSummary.tsx
│   │       └── DeductionBreakdown.tsx
│   ├── context/
│   │   └── CalculatorContext.tsx
│   ├── hooks/
│   │   ├── useCalculator.ts
│   │   └── useLocalStorage.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── types.ts
│   │   ├── calculations/
│   │   │   ├── isr.ts
│   │   │   ├── resico.ts
│   │   │   └── deductions.ts
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── components.json          # shadcn config
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
└── index.html
```

---

## Core Data Models (TypeScript Interfaces)

```typescript
// Tax Regimes
type TaxRegime = 
  | 'resico' 
  | 'sueldos_salarios' 
  | 'actividad_empresarial' 
  | 'arrendamiento';

// Deduction method for Arrendamiento
type ArrendamientoMethod = 'ciega' | 'comprobados';

// User inputs
interface CalculatorInput {
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

interface MedicalDeductions {
  general: number;      // Honorarios médicos, dentales, hospital, etc.
  glasses: number;      // Lentes ópticos (limit $2,500/person)
  glassesCount: number; // Number of people claiming glasses
  disability: number;   // Gastos por incapacidad/discapacidad (NO LIMIT)
}

interface TuitionDeduction {
  level: 'preescolar' | 'primaria' | 'secundaria' | 'profesional_tecnico' | 'bachillerato';
  amount: number;
}

interface BusinessDeductions {
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

interface ArrendamientoDeductions {
  predial: number;
  improvements: number;
  maintenance: number;
  water: number;
  mortgageInterest: number;
  salaries: number;
  insurance: number;
  depreciation: number;
}
```

---

## Calculation Engine Logic

### 1. RESICO Calculation (Simplest)
```
ISR = Ingreso Mensual × Tasa (1.0% - 2.5% based on bracket)
```
- No deductions permitted
- Direct flat rate application

### 2. Non-RESICO ISR Calculation

**Step 1: Calculate Base Gravable**
```
Base Gravable = Ingreso Total - Deducciones Autorizadas
```

**Step 2: Apply Global Cap**
```typescript
const globalCap = Math.min(
  LIMITE_GLOBAL_5_UMA / 12,  // Monthly: $17,197.30
  monthlyIncome * 0.15
);
```

**Step 3: Categorize Deductions**
- **Subject to global cap:** Medical (general), insurance, funeral, mortgage, donations, transport, local tax
- **Exempt from cap (separate limits):** Disability medical, retirement (10% or 5 UMA), savings ($152,000/yr), tuition

**Step 4: Calculate ISR**
```
ISR = ((Base_Gravable - Límite_Inferior) × Tasa%) + Cuota_Fija
```

**Step 5: Apply Subsidio (Sueldos y Salarios only)**
```typescript
if (regime === 'sueldos_salarios' && baseGravable <= 10171) {
  isr = Math.max(0, isr - 474.65);
}
```

### 3. Arrendamiento Special Logic

**Blind Deduction (Deducción Ciega):**
```
Deducción = (Ingreso × 35%) + Predial
Base Gravable = Ingreso - Deducción
```

**Actual Deductions:**
```
Base Gravable = Ingreso - Sum(Gastos Comprobados)
```

---

## Regime-Specific Behavior

| Feature | RESICO | Sueldos y Salarios | Act. Empresarial | Arrendamiento |
|---------|--------|-------------------|------------------|---------------|
| Personal deductions | ❌ Hidden | ✅ Full form | ✅ Full form | ✅ Full form |
| Business deductions | ❌ | ❌ | ✅ Shown | ❌ |
| Arrendamiento options | ❌ | ❌ | ❌ | ✅ Ciega/Comprobados |
| Subsidio al empleo | ❌ | ✅ Applied | ❌ | ❌ |
| ISR calculation | Flat rate | Progressive | Progressive | Progressive |

---

## Results Display

### Main Summary
```
┌─────────────────────────────────────────────────────────────┐
│                 RESUMEN DE CÁLCULO                          │
├─────────────────────────────────────────────────────────────┤
│  Ingreso Mensual Bruto          $50,000.00                 │
│  (-) Deducciones Autorizadas    $12,500.00                 │
│  ─────────────────────────────────────────                 │
│  Base Gravable                  $37,500.00                 │
│                                                             │
│  ISR Mensual                    $5,432.10                  │
│  (-) Subsidio al Empleo         $0.00                      │
│  ─────────────────────────────────────────                 │
│  ISR a Pagar                    $5,432.10                  │
├─────────────────────────────────────────────────────────────┤
│  📊 PROYECCIÓN ANUAL                                        │
│  Ingreso Anual                  $600,000.00                │
│  ISR Anual Estimado             $65,185.20                 │
├─────────────────────────────────────────────────────────────┤
│  💰 COMPARACIÓN                                             │
│  ISR Sin Deducciones            $7,890.00                  │
│  ISR Con Deducciones            $5,432.10                  │
│  ─────────────────────────────────────────                 │
│  Ahorro Mensual                 $2,457.90  ✅              │
│  Ahorro Anual Proyectado        $29,494.80                 │
└─────────────────────────────────────────────────────────────┘
```

### Global Cap Visualization
```
┌─────────────────────────────────────────────────────────────┐
│  TOPE GLOBAL DE DEDUCCIONES                                 │
│                                                             │
│  Límite por 5 UMAs:    $17,197.30/mes ($206,367.60/año)   │
│  Límite por 15%:       $7,500.00/mes ($90,000.00/año)     │
│  ─────────────────────────────────────────                 │
│  Tope Aplicable:       $7,500.00/mes  ← menor             │
│                                                             │
│  Deducciones sujetas al tope:  $8,200.00                   │
│  Deducciones aplicadas:        $7,500.00  (tope alcanzado) │
│  Excedente no deducible:       $700.00    ⚠️               │
│                                                             │
│  Deducciones SIN tope:         $5,000.00  (retiro, etc.)   │
│  ─────────────────────────────────────────                 │
│  TOTAL DEDUCCIONES:            $12,500.00                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Constants Reference (from guide.md)

```javascript
// UMA Values 2025
const UMA_DIARIA_2025 = 113.14;
const UMA_MENSUAL_2025 = 3439.46;
const UMA_ANUAL_2025 = 41273.52;

// Global deduction limits
const LIMITE_GLOBAL_5_UMA = 206367.6;
const LIMITE_GLOBAL_PORCENTAJE = 0.15;

// Personal deduction specific limits
const LIMITE_GASTOS_FUNERARIOS = 41273.52; // 1 UMA anual
const LIMITE_LENTES_OPTICOS = 2500.0;
const LIMITE_DONATIVOS_PORCENTAJE = 0.07;
const LIMITE_AHORRO_CUENTAS = 152000.0;
const LIMITE_RETIRO_UMA = 206367.6; // 5 UMA
const LIMITE_RETIRO_PORCENTAJE = 0.1;
const LIMITE_HIPOTECA_UDIS = 750000;

// School tuition limits
const COLEGIATURAS = {
  preescolar: 14200,
  primaria: 12900,
  secundaria: 19900,
  profesional_tecnico: 17100,
  bachillerato: 24500,
};

// RESICO monthly rates
const RESICO_MENSUAL = [
  { limite: 25000, tasa: 0.01 },
  { limite: 50000, tasa: 0.011 },
  { limite: 83333.33, tasa: 0.015 },
  { limite: 208333.33, tasa: 0.02 },
  { limite: 291666.67, tasa: 0.025 },
];

// Subsidio al empleo 2025
const SUBSIDIO_PORCENTAJE = 0.138;
const SUBSIDIO_MENSUAL = 474.65;
const SUBSIDIO_LIMITE_INGRESO = 10171.0;

// Arrendamiento blind deduction
const DEDUCCION_CIEGA_PORCENTAJE = 0.35;
```

---

## Estimated Implementation Time

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| Phase 1: Setup | 4 | ~15 min |
| Phase 2: Core Library | 5 | ~30 min |
| Phase 3: State | 3 | ~20 min |
| Phase 4: UI Components | 6 | ~45 min |
| Phase 5: Results | 2 | ~20 min |
| **Total** | **20** | **~2 hours** |
