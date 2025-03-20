import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Phone, Mail, HelpCircle, FileText, ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

const HelpSupport = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-white dark:bg-gray-900 shadow-lg">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Help & Support
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How do I monitor my solar system?
                </AccordionTrigger>
                <AccordionContent>
                  You can monitor your solar system's performance through the
                  Monitor tab in this app. It provides real-time data on energy
                  production, consumption, and system health.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What do I do if my system isn't producing energy?
                </AccordionTrigger>
                <AccordionContent>
                  First, check if there are any alerts in the app. If you don't
                  see any issues reported, contact our technical support team at
                  +27 (0)82 446 6769 for immediate assistance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How often should I clean my solar panels?
                </AccordionTrigger>
                <AccordionContent>
                  We recommend cleaning your solar panels every 3-6 months,
                  depending on your location and local conditions. Regular
                  cleaning ensures optimal performance and longevity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  What maintenance does my solar system require?
                </AccordionTrigger>
                <AccordionContent>
                  Your solar system requires minimal maintenance. We recommend
                  an annual inspection by our technicians to ensure everything
                  is functioning properly. The app will also alert you if any
                  maintenance is required.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">Contact Support</h3>
            <p className="text-gray-700 dark:text-gray-300">
              If you need additional help, our support team is available during
              business hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card className="p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-600" size={20} />
                  <div>
                    <h4 className="font-medium">Phone Support</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      +27 (0)82 446 6769
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-600" size={20} />
                  <div>
                    <h4 className="font-medium">Email Support</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      support@solterrasolar.co.za
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="text-blue-600" size={20} />
                  <div>
                    <h4 className="font-medium">Online Help Center</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Visit our website for guides
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <FileText className="text-blue-600" size={20} />
                  <div>
                    <h4 className="font-medium">System Documentation</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Access user manuals
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              onClick={() =>
                window.open("https://www.solterrasolar.co.za", "_blank")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              Visit Our Website <ExternalLink size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupport;
