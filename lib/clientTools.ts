import { ClientToolImplementation } from 'ultravox-client';
import { updateCallerDetails } from './callerDetailsStore';

// Client-implemented tool for Order Details
export const updateOrderTool: ClientToolImplementation = (parameters) => {
  const { ...orderData } = parameters;
  console.debug("Received order details update:", orderData.orderDetailsData);

  if (typeof window !== "undefined") {
    const event = new CustomEvent("orderDetailsUpdated", {
      detail: orderData.orderDetailsData,
    });
    window.dispatchEvent(event);
  }

  return "Updated the order details.";
};

// Client-implemented tool for Caller Details
export const updateCallerDetailsTool: ClientToolImplementation = (parameters) => {
  const { ...callerData } = parameters;
  console.debug("Received caller details update:", callerData.callerDetailsData);
  
  // Parse and store the caller details in our global store
  if (callerData.callerDetailsData) {
    const details = typeof callerData.callerDetailsData === 'string' 
      ? JSON.parse(callerData.callerDetailsData) 
      : callerData.callerDetailsData;
    
    // Update the global store with the new details
    updateCallerDetails(details);
    
    // Log each field for better debugging
    console.debug("Caller name:", details.name);
    console.debug("Caller age:", details.age);
    console.debug("Situation:", details.situation);
    console.debug("Support needed:", details.supportNeeded);
    console.debug("Previous help:", details.previousHelp);
  }

  if (typeof window !== "undefined") {
    const event = new CustomEvent("callerDetailsUpdated", {
      detail: callerData.callerDetailsData,
    });
    window.dispatchEvent(event);
  }

  return "Updated the caller details.";
};
