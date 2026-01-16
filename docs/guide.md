# Complete Guide to Mexican Individual Tax Deductions for Calculator Development

Building an accurate Mexican tax deduction calculator requires understanding four distinct tax regimes, their specific deduction rules, and the current ISR rate tables. **RESICO taxpayers cannot claim personal deductions**, while the other three regimes permit extensive personal deductions subject to a global cap of 5 UMAs or 15% of income—whichever is lower. The 2024-2025 ISR tables remain unchanged, but UMA values updated in February 2025 to **$113.14 daily** ($41,273.52 annually), directly affecting all deduction limits.

---

## The four tax regimes serve different taxpayer profiles

Each regime has fundamentally different deduction rules that your calculator must handle separately:

| Regime                                  | Who It Serves                                             | Personal Deductions Allowed? | Business Deductions? |
| --------------------------------------- | --------------------------------------------------------- | ---------------------------- | -------------------- |
| **RESICO**                              | Self-employed, freelancers, landlords earning ≤$3.5M/year | ❌ NO                        | ❌ NO                |
| **Sueldos y Salarios**                  | Employees                                                 | ✅ YES                       | N/A                  |
| **Actividad Empresarial y Profesional** | Freelancers, business owners >$3.5M                       | ✅ YES                       | ✅ YES               |
| **Arrendamiento**                       | Landlords not in RESICO                                   | ✅ YES                       | ✅ Limited           |

**RESICO** (Régimen Simplificado de Confianza) applies ultra-low flat rates of **1.0% to 2.5%** directly to gross income with no deductions permitted—this is the trade-off for simplified taxation. The SAT officially states that RESICO taxpayers "no pueden aplicar deducciones personales."

---

## RESICO rate structure is elegantly simple

RESICO taxpayers pay a flat percentage based on income brackets, calculated on gross revenue without any deductions:

**Monthly RESICO Rates:**
| Monthly Income (MXN) | ISR Rate |
|---------------------|----------|
| Up to $25,000 | 1.00% |
| $25,000.01 – $50,000 | 1.10% |
| $50,000.01 – $83,333.33 | 1.50% |
| $83,333.34 – $208,333.33 | 2.00% |
| $208,333.34 – $291,666.67 | 2.50% |

**Annual RESICO Rates:**
| Annual Income (MXN) | ISR Rate |
|--------------------|----------|
| Up to $300,000 | 1.00% |
| $300,000.01 – $600,000 | 1.10% |
| $600,000.01 – $1,000,000 | 1.50% |
| $1,000,000.01 – $2,500,000 | 2.00% |
| $2,500,000.01 – $3,500,000 | 2.50% |

**Key restrictions:** Income cap of **$3.5 million annually**. Taxpayers who invoice primarily to Personas Morales have **1.25% withheld** at source. Those exceeding income limits or failing to maintain e.firma/buzón tributario are moved to the general regime.

---

## Progressive ISR tables apply to all non-RESICO regimes

The remaining three regimes use progressive tax brackets with límite inferior, cuota fija, and marginal rate calculations.

### Annual ISR Table (2024-2025)

| Límite Inferior | Límite Superior | Cuota Fija    | Rate on Excess |
| --------------- | --------------- | ------------- | -------------- |
| $0.01           | $8,952.49       | $0.00         | 1.92%          |
| $8,952.50       | $75,984.55      | $171.88       | 6.40%          |
| $75,984.56      | $133,536.07     | $4,461.94     | 10.88%         |
| $133,536.08     | $155,229.80     | $10,723.55    | 16.00%         |
| $155,229.81     | $185,852.57     | $14,194.54    | 17.92%         |
| $185,852.58     | $374,837.88     | $19,682.13    | 21.36%         |
| $374,837.89     | $590,795.99     | $60,049.40    | 23.52%         |
| $590,796.00     | $1,127,926.84   | $110,842.74   | 30.00%         |
| $1,127,926.85   | $1,503,902.46   | $271,981.99   | 32.00%         |
| $1,503,902.47   | $4,511,707.37   | $392,294.17   | 34.00%         |
| $4,511,707.38   | onwards         | $1,414,947.85 | **35.00%**     |

### Monthly ISR Table (2024-2025)

| Límite Inferior | Límite Superior | Cuota Fija  | Rate on Excess |
| --------------- | --------------- | ----------- | -------------- |
| $0.01           | $746.04         | $0.00       | 1.92%          |
| $746.05         | $6,332.05       | $14.32      | 6.40%          |
| $6,332.06       | $11,128.01      | $371.83     | 10.88%         |
| $11,128.02      | $12,935.82      | $893.63     | 16.00%         |
| $12,935.83      | $15,487.71      | $1,182.88   | 17.92%         |
| $15,487.72      | $31,236.49      | $1,640.18   | 21.36%         |
| $31,236.50      | $49,233.00      | $5,004.12   | 23.52%         |
| $49,233.01      | $93,993.90      | $9,236.89   | 30.00%         |
| $93,993.91      | $125,325.20     | $22,665.17  | 32.00%         |
| $125,325.21     | $375,975.61     | $32,691.18  | 34.00%         |
| $375,975.62     | onwards         | $117,912.32 | **35.00%**     |

### ISR calculation formula

```
ISR = ((Base_Gravable - Límite_Inferior) × Tasa%) + Cuota_Fija
```

**Step-by-step:**

1. Calculate **Base Gravable** = Total Income − Authorized Deductions
2. Find the bracket where Límite_Inferior ≤ Base_Gravable ≤ Límite_Superior
3. Calculate **Excedente** = Base_Gravable − Límite_Inferior
4. Apply **Impuesto_Marginal** = Excedente × Rate%
5. Add **ISR_Total** = Impuesto_Marginal + Cuota_Fija

---

## Personal deductions have a global cap with key exceptions

The combined total of personal deductions cannot exceed the **LESSER** of:

- **5 UMAs anuales** = $206,367.60 (2025)
- **15% of total income** (including exempt income)

**Equilibrium point:** At annual income of ~$1,375,784, both limits are equal. Below this, the 15% limit applies; above it, the 5 UMA cap applies.

### Deductions EXCLUDED from the global cap (can be claimed additionally):

- Gastos médicos por **incapacidad o discapacidad** (requires medical certificate)
- **Aportaciones complementarias de retiro** (up to 10% of income or 5 UMAs, separate limit)
- **Depósitos en cuentas especiales para el ahorro** (up to $152,000 annually)
- **Colegiaturas** (school tuition—stimulus fiscal, separate limits by level)

---

## Complete personal deductions catalog with specific limits

### Medical, dental, and hospital expenses (LISR Art. 151, Frac. I)

| Deduction Type                      | Limit                  | Beneficiaries                         |
| ----------------------------------- | ---------------------- | ------------------------------------- |
| Honorarios médicos                  | Global cap             | Taxpayer, spouse, parents, children\* |
| Honorarios dentales                 | Global cap             | Taxpayer, spouse, parents, children\* |
| Servicios de psicología             | Global cap             | Taxpayer, spouse, parents, children\* |
| Servicios de nutrición              | Global cap             | Taxpayer, spouse, parents, children\* |
| Gastos hospitalarios                | Global cap             | Taxpayer, spouse, parents, children\* |
| Análisis clínicos/laboratorios      | Global cap             | Taxpayer, spouse, parents, children\* |
| Prótesis y aparatos rehabilitación  | Global cap             | Taxpayer, spouse, parents, children\* |
| **Lentes ópticos graduados**        | **$2,500/person/year** | Each beneficiary                      |
| Gastos por incapacidad/discapacidad | **NO LIMIT**           | With medical certificate              |

\*Family members must not earn >1 UMA annual ($41,273.52 in 2025)

**Payment restriction:** Must be paid via transfer, card, or nominative check—**cash payments are NOT deductible** for medical expenses.

### Primas de seguros de gastos médicos

| Deduction                                           | Limit                 |
| --------------------------------------------------- | --------------------- |
| Medical insurance premiums (gastos médicos mayores) | Subject to global cap |

Covers taxpayer, spouse, and direct-line family members. Does not include life insurance or retirement insurance.

### Gastos funerarios (LISR Art. 151, Frac. II)

| Year | Maximum Deduction            |
| ---- | ---------------------------- |
| 2024 | **$39,606.36** (1 UMA anual) |
| 2025 | **$41,273.52** (1 UMA anual) |

Only actual funeral expenses are deductible—not prepaid funeral services or plans. Cash payment IS permitted for funeral expenses.

### Intereses reales de créditos hipotecarios (LISR Art. 151, Frac. IV)

| Requirement       | Specification                                    |
| ----------------- | ------------------------------------------------ |
| Credit limit      | **750,000 UDIS** (~$6.2 million MXN)             |
| Deductible amount | Only **real interest** (nominal minus inflation) |
| Eligible lenders  | Sistema financiero, INFONAVIT, FOVISSSTE         |
| Property use      | Must be primary residence (casa habitación)      |
| Subject to        | Global cap                                       |

Banks automatically provide the Constancia de Intereses with the breakdown—this is pre-populated in annual declarations.

### Donativos (LISR Art. 151, Frac. III)

| Recipient Type                     | Specific Limit                                 |
| ---------------------------------- | ---------------------------------------------- |
| Donatarias autorizadas             | Up to **7%** of prior year's acumulable income |
| Federation, states, municipalities | Up to **4%** of prior year's income            |
| **Combined maximum**               | **7% total**                                   |

**Important 2022 reform:** Donations are now included within the global cap calculation, though they retain their separate 7%/4% limits.

### Colegiaturas—School tuition (Decree DOF 26/12/2013)

**Per-student annual limits by education level:**

| Education Level     | Maximum Deduction |
| ------------------- | ----------------- |
| Preescolar          | **$14,200**       |
| Primaria            | **$12,900**       |
| Secundaria          | **$19,900**       |
| Profesional técnico | **$17,100**       |
| Bachillerato        | **$24,500**       |

**Key rules:**

- **EXCLUDED from global cap**—additional to other deductions
- Each student has their own limit
- If student attends two levels in same year, higher limit applies
- School must have RVOE (official validity)
- CFDI must include Complemento IEDU with student name, CURP, and level
- **NOT included:** Inscription fees, uniforms, supplies, extracurricular activities

### Transporte escolar (LISR Art. 151, Frac. VII)

Deductible only when school transportation is **obligatory** per school rules or included in tuition for all students. Must be invoiced separately. Subject to global cap.

### Aportaciones complementarias de retiro (LISR Art. 151, Frac. V)

| Type                            | Limit                                               |
| ------------------------------- | --------------------------------------------------- |
| Voluntary AFORE contributions   | **10% of income** OR **5 UMAs** (whichever is less) |
| Personal retirement plans (PPR) | **10% of income** OR **5 UMAs** (whichever is less) |

**2025 maximum:** $206,367.60

**Critical:** These are **EXCLUDED from the global cap**—they have their own separate limit. Funds must remain until age 65 or permanent disability; early withdrawal triggers 20% ISR retention.

### Cuentas especiales para el ahorro (LISR Art. 185)

| Type                             | Annual Limit |
| -------------------------------- | ------------ |
| Special savings account deposits | **$152,000** |
| Personal pension plan premiums   | **$152,000** |
| Investment fund shares           | **$152,000** |

**EXCLUDED from global cap**—can be claimed additionally.

### Impuesto local sobre salarios (LISR Art. 151, Frac. VIII)

Local payroll taxes are deductible only if the local tax rate does **not exceed 5%**. Subject to global cap.

---

## Business deductions for Actividad Empresarial y Profesional

This regime permits extensive business expense deductions beyond personal deductions:

### Authorized business deductions (LISR Art. 103)

| Category              | Examples                                                     |
| --------------------- | ------------------------------------------------------------ |
| Purchases             | Merchandise, raw materials, finished goods for sale          |
| Necessary expenses    | All expenses "estrictamente indispensables" for the activity |
| Investments           | Fixed assets (depreciated per Art. 34 rates)                 |
| Interest              | Business-related interest payments                           |
| IMSS contributions    | Employer social security payments                            |
| Local taxes           | Local taxes on business/professional income                  |
| Salaries and wages    | Including payroll taxes and IMSS                             |
| Rent                  | Business premises                                            |
| Professional services | Accounting, legal, consulting                                |
| Utilities             | Electricity, telephone, internet for business                |

### Depreciation rates for fixed assets (LISR Art. 34)

| Asset Type                     | Annual Rate |
| ------------------------------ | ----------- |
| Buildings                      | 5%          |
| Office furniture and equipment | 10%         |
| **Computers**                  | **30%**     |
| Automobiles, buses, trucks     | 25%         |
| Medical equipment              | 12%         |
| Energy generation equipment    | 100%        |
| Disability adaptations         | 100%        |

### Vehicle deduction limits (LISR Art. 36)

| Vehicle Type              | Maximum Deductible Value |
| ------------------------- | ------------------------ |
| Standard automobiles      | **$175,000**             |
| Electric/hybrid vehicles  | **$250,000**             |
| Vehicle rental (standard) | **$200/day**             |
| Vehicle rental (electric) | **$285/day**             |

Pick-up trucks classified as cargo vehicles are **not subject** to automobile limits.

---

## Arrendamiento offers two deduction methods

Landlords must choose ONE method for the entire fiscal year:

### Option A: Deducción ciega (blind deduction)

| Calculation                  | Rate          |
| ---------------------------- | ------------- |
| Gross rental income × 35%    | **35%**       |
| Plus: Property tax (predial) | Actual amount |

No CFDIs required for the 35% portion. Simple and automatic.

### Option B: Actual deductions (gastos comprobados)

| Deductible Expense      | Notes                                          |
| ----------------------- | ---------------------------------------------- |
| Impuesto predial        | Property tax                                   |
| Local improvement taxes | Contribuciones de mejoras                      |
| Maintenance             | Repairs, painting, plumbing (not improvements) |
| Water consumption       | If not paid by tenant                          |
| Real mortgage interest  | For purchase/construction/improvements         |
| Salaries/commissions    | Property management                            |
| Insurance premiums      | Property insurance                             |
| Building depreciation   | **5% annual** on construction value (not land) |

**Provisional payments:** Monthly (due 17th) or quarterly if monthly rent ≤10 minimum wages (~$26,412).

**ISR withholding:** When a Persona Moral pays rent to a Persona Física, they withhold **10% ISR**.

---

## Subsidio al empleo applies only to Sueldos y Salarios

The May 2024 reform replaced variable tables with a fixed percentage of UMA:

### 2025 Subsidio al empleo parameters

| Parameter       | Value                               |
| --------------- | ----------------------------------- |
| Percentage      | **13.8%** of UMA mensual            |
| Monthly subsidy | **$474.65**                         |
| Income limit    | ≤ **$10,171** monthly base gravable |

| Pay Period | Subsidy Amount |
| ---------- | -------------- |
| Daily      | $15.61         |
| Weekly     | $109.30        |
| Biweekly   | $234.21        |
| Monthly    | $474.65        |

**Calculation:** Subsidy reduces ISR owed. If ISR < subsidy, ISR becomes $0 (excess is NOT paid to worker—this is a change from prior rules).

**Minimum wage workers:** Per LISR Art. 96, workers earning only minimum wage have **NO ISR retention**.

---

## UMA values drive all deduction limit calculations

| Year     | Daily   | Monthly (×30.4) | Annual (×12)   |
| -------- | ------- | --------------- | -------------- |
| **2024** | $108.57 | $3,300.53       | $39,606.36     |
| **2025** | $113.14 | $3,439.46       | **$41,273.52** |

**Update schedule:** UMA values change annually on **February 1** based on December INPC inflation.

### Key limits using 2025 UMA values

| Concept                                        | 2025 Amount     |
| ---------------------------------------------- | --------------- |
| Global deduction cap (5 UMAs)                  | **$206,367.60** |
| Family income limit for beneficiary deductions | $41,273.52      |
| Funeral expenses maximum                       | $41,273.52      |
| Retirement contributions maximum               | $206,367.60     |

---

## Legal requirements for valid deductions

### CFDI 4.0 mandatory requirements

Every deduction requires a valid CFDI with:

- Taxpayer's **exact RFC** (13 characters for individuals)
- Taxpayer's name exactly as in Constancia de Situación Fiscal
- Correct **Uso de CFDI** code for deduction type
- Código Postal of fiscal domicile
- Régimen fiscal of receptor
- Folio fiscal (UUID)

### Uso de CFDI codes by deduction type

| Code | Deduction Type                     |
| ---- | ---------------------------------- |
| D01  | Medical/dental/hospital expenses   |
| D02  | Medical expenses for disability    |
| D04  | Donations (donativos)              |
| D05  | Real mortgage interest             |
| D06  | Voluntary retirement contributions |
| D08  | School transportation              |
| D10  | School tuition (colegiaturas)      |

### Payment method restrictions

| Payment Method    | Accepted?                                                 |
| ----------------- | --------------------------------------------------------- |
| Bank transfer     | ✅ Yes                                                    |
| Credit card       | ✅ Yes                                                    |
| Debit card        | ✅ Yes                                                    |
| Nominative check  | ✅ Yes                                                    |
| Electronic wallet | ✅ Yes                                                    |
| **Cash**          | ❌ **NO** (except funeral expenses and donations ≤$2,000) |

**Critical rule:** All payments for medical expenses, school tuition, insurance premiums, mortgage interest, and retirement contributions must be made via electronic banking methods—**cash payments invalidate these deductions**.

### Special documentation requirements

| Deduction      | Additional Requirements                               |
| -------------- | ----------------------------------------------------- |
| Medical        | Provider must have registered cédula profesional      |
| Disability     | Certificate from Sistema Nacional de Salud            |
| Optical lenses | Diagnosis from ophthalmologist/optometrist            |
| Colegiaturas   | CFDI must include Complemento IEDU with student CURP  |
| Donations      | Complemento de Donatarias with authorization number   |
| Mortgage       | Constancia de Intereses from financial institution    |
| Retirement     | Constancia Fiscal from AFORE showing permanence terms |

---

## Implementation constants for the calculator

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

// RESICO rates
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

## Conclusion: Key rules for calculator logic

Your calculator must implement these critical decision points:

1. **RESICO users get NO deductions**—apply flat rates to gross income directly
2. **Global cap calculation:** Compare 5 UMAs ($206,367.60) vs 15% of total income; use the lower value
3. **Four deduction categories escape the global cap:** disability medical expenses, retirement contributions, special savings accounts, and school tuition
4. **School tuition has per-student, per-level limits** that stack across multiple children
5. **Subsidio al empleo** applies only to Sueldos y Salarios and reduces ISR owed (but doesn't generate refunds if ISR < subsidy)
6. **Arrendamiento** requires users to choose between 35% blind deduction + predial OR itemized actual deductions
7. **Family members' medical expenses** are deductible only if they earn <1 UMA annually ($41,273.52)
8. **Payment method validation** is essential—most deductions require electronic payment proof

The ISR tables for 2024 and 2025 are identical; they update only when accumulated inflation exceeds 10% since the last update (November 2021). However, UMA-based limits change annually every February 1.
