import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

const TestAuthStatus = () => {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Checking Authentication Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Authentication Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {user ? (
          <>
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                You are successfully authenticated
              </AlertDescription>
            </Alert>

            <div className="space-y-2 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium">User Information</h3>
              <p className="text-sm">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">User ID:</span> {user.id}
              </p>
            </div>

            <div className="pt-2">
              <Button
                onClick={signOut}
                variant="destructive"
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </>
        ) : (
          <>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>You are not authenticated</AlertDescription>
            </Alert>

            <div className="pt-2">
              <Button
                onClick={() => (window.location.href = "/login")}
                className="w-full"
              >
                Go to Login
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TestAuthStatus;
