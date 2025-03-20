import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "../ui/button";

const AboutSolterra = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-white dark:bg-gray-900 shadow-lg">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            About Solterra Solar
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                alt="Solar Panels"
                className="rounded-lg w-full h-auto shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-300">
                At Solterra Solar, we're committed to providing sustainable
                energy solutions that help South African homes and businesses
                reduce their carbon footprint while saving on electricity costs.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Our team of experts designs and installs custom solar systems
                tailored to your specific energy needs and budget.
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-xl font-semibold">
              Why Choose Solterra Solar?
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Professional installation by certified technicians</li>
              <li>High-quality solar equipment with extended warranties</li>
              <li>
                Customized solutions for residential and commercial properties
              </li>
              <li>Ongoing maintenance and support services</li>
              <li>Financing options available</li>
            </ul>
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

export default AboutSolterra;
