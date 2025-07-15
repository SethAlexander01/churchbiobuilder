import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Church, ArrowLeft, CreditCard } from "lucide-react";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ bioData }: { bioData: any }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  useLocation(); // if you need to call it for some side effect, otherwise remove it entirely
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/bio?${new URLSearchParams(bioData).toString()}`,
      },
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
      });
      setIsProcessing(false);
    } else {
      toast({
        title: "Payment Successful",
        description: "Creating your bio page now!",
      });
    }
  };

  return (
    <Card className="shadow-xl border-0">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--church-blue)] rounded-full mb-4">
            <CreditCard className="text-white text-2xl" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Purchase</h2>
          <p className="text-[var(--church-slate)] text-sm mb-4">Secure payment to create your bio page</p>
          
          {/* Order Summary */}
          <div className="bg-slate-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bio Page Creation for "{bioData.title}"</span>
              <span className="font-semibold text-gray-900">$3.00</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PaymentElement />
          <Button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-[var(--church-blue)] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Processing...
              </div>
            ) : (
              `Pay $3.00`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [bioData, setBioData] = useState<any>({});
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Get bio data from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const data = {
      title: urlParams.get('title') || '',
      sermon: urlParams.get('sermon') || '',
      donate: urlParams.get('donate') || '',
      contact: urlParams.get('contact') || '',
    };
    
    // Redirect if no title
    if (!data.title) {
      setLocation('/');
      return;
    }
    
    setBioData(data);

    // Create PaymentIntent as soon as the page loads
    apiRequest("POST", "/api/create-payment-intent", {})
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error('Error creating payment intent:', error);
      });
  }, [setLocation]);

  const handleGoBack = () => {
    setLocation('/');
  };

  if (!clientSecret || !bioData.title) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="shadow-xl border-0">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-[var(--church-blue)] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[var(--church-slate)]">Setting up secure payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--church-blue)] rounded-full mb-4">
            <Church className="text-white text-2xl" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Church BioLink Builder</h1>
        </div>

        {/* Make SURE to wrap the form in <Elements> which provides the stripe context. */}
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm bioData={bioData} />
        </Elements>

        {/* Back Button */}
        <div className="mt-6">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Form
          </Button>
        </div>
      </div>
    </div>
  );
}