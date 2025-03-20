import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Shield, Lock, Eye, FileText, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const PrivacySecurity = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-white dark:bg-gray-900 shadow-lg">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              How We Protect Your Data
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              At Solterra Solar, we take your privacy and data security
              seriously. Our app implements industry-standard security measures
              to ensure your personal information and system data remain
              protected.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium">Secure Authentication</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your account is protected with secure authentication protocols
                  and encrypted password storage.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium">Data Privacy</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We only collect data necessary for the operation of your solar
                  system. Your personal information is never sold to third
                  parties.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Privacy Policies
            </h3>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Data Collection</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    We collect the following types of information:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Account information (name, email, contact details)</li>
                    <li>Solar system specifications and performance data</li>
                    <li>Energy usage patterns and statistics</li>
                    <li>App usage information to improve our services</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How We Use Your Data</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    Your data is used for the following purposes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Providing solar monitoring and management services</li>
                    <li>Optimizing your solar system performance</li>
                    <li>Sending important notifications about your system</li>
                    <li>Improving our products and services</li>
                    <li>Technical support and troubleshooting</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Data Sharing</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    We may share your data with service providers who help us
                    deliver our services, such as cloud hosting providers and
                    analytics services. All third parties are bound by strict
                    confidentiality agreements. We do not sell your personal
                    information to advertisers or other third parties.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Your Rights</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    You have the following rights regarding your data:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Right to access your personal data</li>
                    <li>Right to correct inaccurate information</li>
                    <li>
                      Right to delete your data (with certain limitations)
                    </li>
                    <li>Right to data portability</li>
                    <li>Right to object to certain processing activities</li>
                  </ul>
                  <p className="text-gray-700 dark:text-gray-300 mt-2">
                    To exercise these rights, please contact our privacy team at
                    privacy@solterrasolar.co.za
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold">Security Settings</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Manage your account security settings to keep your data protected.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-6">
              <div className="space-y-2">
                <h4 className="font-medium">Password Management</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We recommend changing your password regularly and using a
                  strong, unique password.
                </p>
                <Button className="mt-2 bg-blue-600 hover:bg-blue-700">
                  Change Password
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add an extra layer of security to your account by enabling
                  two-factor authentication.
                </p>
                <Button className="mt-2 bg-blue-600 hover:bg-blue-700">
                  Enable 2FA
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Login History</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Review recent login activity to ensure no unauthorized access
                  to your account.
                </p>
                <Button className="mt-2 bg-blue-600 hover:bg-blue-700">
                  View Login History
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={() =>
                window.open(
                  "https://www.solterrasolar.co.za/privacy-policy",
                  "_blank",
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              Full Privacy Policy <ExternalLink size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySecurity;
