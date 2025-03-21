import { CallerDetailsData } from '@/lib/types';

// Define the store as a simple module with state and update functions
let callerDetailsState: CallerDetailsData = {};
const listeners: Array<() => void> = [];

// Get the current state
export function getCallerDetails(): CallerDetailsData {
  return { ...callerDetailsState };
}

// Update the state with new data
export function updateCallerDetails(newData: Partial<CallerDetailsData>): void {
  // Merge new data with existing data
  callerDetailsState = {
    ...callerDetailsState,
    ...newData
  };
  
  // Notify all listeners
  listeners.forEach(listener => listener());
  
  // Debug logging
  console.debug('Updated caller details state:', callerDetailsState);
}

// Reset the state (e.g., when call ends)
export function resetCallerDetails(): void {
  callerDetailsState = {};
  
  // Notify all listeners
  listeners.forEach(listener => listener());
  
  console.debug('Reset caller details state');
}

// Subscribe to changes
export function subscribeToCallerDetails(listener: () => void): () => void {
  listeners.push(listener);
  
  // Return unsubscribe function
  return () => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
}
