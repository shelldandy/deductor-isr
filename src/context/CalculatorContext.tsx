import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import type { CalculatorInput, TaxRegime, ArrendamientoMethod } from '../lib/types';

// Initial State
const initialState: CalculatorInput = {
    regime: 'sueldos_salarios',
    monthlyIncome: 0,
    deductions: {
        medical: { general: 0, glasses: 0, glassesCount: 0, disability: 0 },
        insurance: 0,
        funeral: 0,
        mortgageInterest: 0,
        donations: 0,
        tuition: [],
        transport: 0,
        retirement: 0,
        savings: 0,
        localTax: 0,
    },
};

// Actions
type Action =
    | { type: 'SET_REGIME'; payload: TaxRegime }
    | { type: 'SET_INCOME'; payload: number }
    | { type: 'SET_DEDUCTIONS'; payload: CalculatorInput['deductions'] }
    | { type: 'SET_ARRENDAMIENTO_METHOD'; payload: ArrendamientoMethod }
    | { type: 'SET_BUSINESS_DEDUCTIONS'; payload: CalculatorInput['businessDeductions'] }
    | { type: 'SET_ARRENDAMIENTO_DEDUCTIONS'; payload: CalculatorInput['arrendamientoDeductions'] }
    | { type: 'SET_FULL_STATE'; payload: CalculatorInput }; // For local storage restore

// Reducer
function calculatorReducer(state: CalculatorInput, action: Action): CalculatorInput {
    switch (action.type) {
        case 'SET_REGIME':
            return { ...state, regime: action.payload };
        case 'SET_INCOME':
            return { ...state, monthlyIncome: action.payload };
        case 'SET_DEDUCTIONS':
            return { ...state, deductions: action.payload };
        case 'SET_ARRENDAMIENTO_METHOD':
            return { ...state, arrendamientoMethod: action.payload };
        case 'SET_BUSINESS_DEDUCTIONS':
            return { ...state, businessDeductions: action.payload };
        case 'SET_ARRENDAMIENTO_DEDUCTIONS':
            return { ...state, arrendamientoDeductions: action.payload };
        case 'SET_FULL_STATE':
            return action.payload;
        default:
            return state;
    }
}

// Context
interface CalculatorContextType {
    state: CalculatorInput;
    dispatch: Dispatch<Action>;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

// Provider
export function CalculatorProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(calculatorReducer, initialState);

    return (
        <CalculatorContext.Provider value={{ state, dispatch }}>
            {children}
        </CalculatorContext.Provider>
    );
}

// Hook
export function useCalculatorContext() {
    const context = useContext(CalculatorContext);
    if (context === undefined) {
        throw new Error('useCalculatorContext must be used within a CalculatorProvider');
    }
    return context;
}
