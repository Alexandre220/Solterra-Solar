import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Phone, Mail, MapPin, ExternalLink, Clock } from "lucide-react";
import { Button } from "../ui/button";

const ContactUs = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="bg-white dark:bg-gray-900 shadow-lg">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Contact Solterra Solar
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Get In Touch</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Have questions about solar energy solutions? Our team is here
                  to help you with any inquiries about our products and
                  services.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      +27 (0)82 446 6769
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      info@solterrasolar.co.za
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Cape Town, South Africa
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium">Business Hours</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Monday - Friday: 8:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() =>
                    window.open(
                      "https://www.solterrasolar.co.za/contact",
                      "_blank",
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  Visit Our Website <ExternalLink size={16} />
                </Button>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80"
                alt="Solar Installation"
                className="rounded-lg w-full h-auto shadow-md"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUs;
