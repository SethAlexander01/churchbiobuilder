import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Church, PlayCircle, Heart, Mail, ArrowLeft, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BioData {
  title?: string;
  sermon?: string;
  donate?: string;
  contact?: string;
}

export default function Bio() {
  const [, setLocation] = useLocation();
  const [bioData, setBioData] = useState<BioData>({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const data: BioData = {
      title: urlParams.get('title') || undefined,
      sermon: urlParams.get('sermon') || undefined,
      donate: urlParams.get('donate') || undefined,
      contact: urlParams.get('contact') || undefined,
    };
    setBioData(data);
  }, []);

  const handleGoBack = () => {
    setLocation('/');
  };

  // If no church name is provided, redirect to home
  if (!bioData.title) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-xl font-semibold mb-4">Invalid Bio Page</h1>
            <p className="text-gray-600 mb-4">This bio page link appears to be incomplete or invalid.</p>
            <Button onClick={handleGoBack} className="bg-[var(--church-blue)] hover:bg-blue-700">
              Create a New Bio Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto px-6 py-8">
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardContent className="p-0">
            {/* Hero Section */}
            <div className="relative h-32 church-gradient-blue">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative flex items-center justify-center h-full">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Church className="text-[var(--church-blue)] text-2xl" size={32} />
                </div>
              </div>
            </div>

            {/* Church Info */}
            <div className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {bioData.title}
              </h1>
              <p className="text-[var(--church-slate)] mb-6">Welcome to our ministry</p>

              {/* Links Section */}
              <div className="space-y-4">
                {bioData.sermon && (
                  <a
                    href={bioData.sermon}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full church-gradient-red text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <PlayCircle className="mr-3 text-xl" size={24} />
                    <span>Watch Latest Sermon</span>
                  </a>
                )}

                {bioData.donate && (
                  <a
                    href={bioData.donate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full church-gradient-green text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <Heart className="mr-3 text-xl" size={24} />
                    <span>Support Our Ministry</span>
                  </a>
                )}

                {bioData.contact && (
                  <a
                    href={bioData.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full church-gradient-blue text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <Mail className="mr-3 text-xl" size={24} />
                    <span>Get In Touch</span>
                  </a>
                )}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-[var(--church-slate)] text-sm flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
                  </svg>
                  Spreading God's love in our community
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <Facebook 
                    size={20} 
                    className="text-[var(--church-slate)] hover:text-[var(--church-blue)] cursor-pointer transition-colors"
                  />
                  <Instagram 
                    size={20} 
                    className="text-[var(--church-slate)] hover:text-[var(--church-blue)] cursor-pointer transition-colors"
                  />
                  <Youtube 
                    size={20} 
                    className="text-[var(--church-slate)] hover:text-[var(--church-blue)] cursor-pointer transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="px-8 pb-8">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"
              >
                <ArrowLeft className="mr-2" size={16} />
                Create Another Bio Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
