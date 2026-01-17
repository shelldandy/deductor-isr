import { useEffect, useRef } from 'react';
import { useCalculatorContext } from '../context/CalculatorContext';
import type { CalculatorInput } from '../lib/types';

const STORAGE_KEY = 'deductor-state-v1';

export function useLocalStorage() {
    const { state, dispatch } = useCalculatorContext();
    const isLoaded = useRef(false);

    // Load on mount
    useEffect(() => {
        if (isLoaded.current) return;
        
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved) as CalculatorInput;
                // Basic validation or migration could go here
                if (parsed.regime && parsed.deductions) {
                    dispatch({ type: 'SET_FULL_STATE', payload: parsed });
                }
            }
        } catch (e) {
            console.error('Failed to load state', e);
        }
        
        isLoaded.current = true;
    }, [dispatch]);

    // Save on change
    useEffect(() => {
        if (!isLoaded.current) return;
        
        const handler = setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                console.error('Failed to save state', e);
            }
        }, 1000); // Debounce saves

        return () => clearTimeout(handler);
    }, [state]);
}
