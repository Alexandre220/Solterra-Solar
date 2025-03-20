import React from "react";
import { useNavigate } from "react-router-dom";
import InitialSetup from "../components/setup/InitialSetup";
import { Sun } from "lucide-react";

const SetupPage = () => {
  const navigate = useNavigate();

  const handleSetupComplete = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <Sun className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Solterra Solar</h1>
        <p className="text-gray-600 mt-2">
          Set up your solar system to start monitoring
        </p>
      </div>

      <InitialSetup onComplete={handleSetupComplete} />

      <p className="text-center text-gray-500 text-sm mt-8">
        &copy; {new Date().getFullYear()} Solterra Solar. All rights reserved.
      </p>
    </div>
  );
};

export default SetupPage;
