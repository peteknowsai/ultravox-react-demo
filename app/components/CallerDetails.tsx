'use client';

import React, { useState, useEffect } from 'react';

interface CallerDetailsData {
  name?: string;
  age?: number;
  situation?: string;
  supportNeeded?: string;
  previousHelp?: string;
}

function prepCallerDetails(callerDetailsData: string | CallerDetailsData): CallerDetailsData {
  try {
    // Handle both cases: either a JSON string or direct object
    const parsedData: CallerDetailsData = typeof callerDetailsData === 'string' 
      ? JSON.parse(callerDetailsData) 
      : callerDetailsData;
      
    return parsedData;
  } catch (error) {
    console.error("Error parsing caller details:", error);
    // Return empty caller details instead of throwing
    return {};
  }
}

const CallerDetails: React.FC = () => {
  const [callerDetails, setCallerDetails] = useState<CallerDetailsData>({});

  useEffect(() => {
    const handleCallerUpdate = (event: CustomEvent<string>) => {
      console.log(`got caller details event: ${JSON.stringify(event.detail)}`);

      const formattedData: CallerDetailsData = prepCallerDetails(event.detail);
      setCallerDetails(formattedData);
    };

    const handleCallEnded = () => {
      setCallerDetails({});
    };

    window.addEventListener('callerDetailsUpdated', handleCallerUpdate as EventListener);
    window.addEventListener('callEnded', handleCallEnded as EventListener);

    return () => {
      window.removeEventListener('callerDetailsUpdated', handleCallerUpdate as EventListener);
      window.removeEventListener('callEnded', handleCallEnded as EventListener);
    };
  }, []);

  // Only render if we have at least one piece of information
  const hasDetails = Object.values(callerDetails).some(value => value !== undefined && value !== '');

  if (!hasDetails) {
    return null;
  }

  return (
    <div className="mt-10">
      <h1 className="text-xl font-bold mb-4">Caller Information</h1>
      <div className="shadow-md rounded p-4">
        {callerDetails.name && (
          <div className="mb-2">
            <span className="text-gray-400 font-mono">Name: </span>
            <span className="font-medium">{callerDetails.name}</span>
          </div>
        )}
        
        {callerDetails.age && (
          <div className="mb-2">
            <span className="text-gray-400 font-mono">Age: </span>
            <span className="font-medium">{callerDetails.age}</span>
          </div>
        )}
        
        {callerDetails.situation && (
          <div className="mb-2">
            <span className="text-gray-400 font-mono">Situation: </span>
            <span className="font-medium">{callerDetails.situation}</span>
          </div>
        )}
        
        {callerDetails.supportNeeded && (
          <div className="mb-2">
            <span className="text-gray-400 font-mono">Support Needed: </span>
            <span className="font-medium">{callerDetails.supportNeeded}</span>
          </div>
        )}
        
        {callerDetails.previousHelp && (
          <div className="mb-2">
            <span className="text-gray-400 font-mono">Previous Help: </span>
            <span className="font-medium">{callerDetails.previousHelp}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallerDetails;
