import { ClientToolImplementation } from 'ultravox-client';

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

  if (typeof window !== "undefined") {
    const event = new CustomEvent("callerDetailsUpdated", {
      detail: callerData.callerDetailsData,
    });
    window.dispatchEvent(event);
  }

  return "Updated the caller details.";
};
