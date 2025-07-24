import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Church, PlayCircle, Heart, Mail, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { isValidUrl } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, "Church name is required"),
  sermon: z.string().optional().refine((val) => !val || isValidUrl(val), "Please enter a valid URL"),
  donate: z.string().optional().refine((val) => !val || isValidUrl(val), "Please enter a valid URL"),
  contact: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const [, setLocation] = useLocation();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      sermon: "",
      donate: "",
      contact: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const params = new URLSearchParams();
    
    // Only add non-empty values to URL params
    Object.entries(data).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        params.append(key, value);
      }
    });

    // Redirect to checkout page with form data
    setLocation(`/checkout?${params.toString()}`);
  };



  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 p-4">
        <div className="min-h-screen bg-slate-50">
      <div className="max-w-md mx-auto px-6 py-8">
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--church-blue)] rounded-full mb-4">
                <Church className="text-white text-2xl" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Church BioLink Builder</h1>
              <p className="text-[var(--church-slate)] text-sm">Create a professional bio page for your church ministry</p>
            </div>

            {/* Form */}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Church className="mr-2 text-[var(--church-blue)]" size={16} />
                  Church Name
                </Label>
                <Input
                  {...form.register("title")}
                  placeholder="Enter your church name"
                  className="px-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--church-blue)] focus:border-transparent transition-all duration-200"
                />
                {form.formState.errors.title && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <PlayCircle className="mr-2 text-[var(--church-blue)]" size={16} />
                  Latest Sermon
                </Label>
                <Input
                  {...form.register("sermon")}
                  placeholder="https://your-sermon-link.com"
                  type="url"
                  className="px-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--church-blue)] focus:border-transparent transition-all duration-200"
                />
                {form.formState.errors.sermon && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.sermon.message}</p>
                )}
              </div>

              <div>
                <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Heart className="mr-2 text-[var(--church-blue)]" size={16} />
                  Donation Link
                </Label>
                <Input
                  {...form.register("donate")}
                  placeholder="https://your-donation-page.com"
                  type="url"
                  className="px-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--church-blue)] focus:border-transparent transition-all duration-200"
                />
                {form.formState.errors.donate && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.donate.message}</p>
                )}
              </div>

              <div>
                <Label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <Mail className="mr-2 text-[var(--church-blue)]" size={16} />
                  Contact Information
                </Label>
                <Input
                  {...form.register("contact")}
                  placeholder="mailto:info@church.com or contact page"
                  className="px-4 py-3 border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--church-blue)] focus:border-transparent transition-all duration-200"
                />
                {form.formState.errors.contact && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.contact.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[var(--church-blue)] hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <CreditCard className="mr-2" size={20} />
                Continue to Payment ($3)
              </Button>
            </form>


          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mt-8 text-center">
          <p className="text-[var(--church-slate)] text-sm mb-2">Perfect for social media bios and church communications</p>
          <p className="text-[var(--church-blue)] text-sm font-semibold mb-4">One-time payment of $3 • Create unlimited links</p>
          <div className="flex justify-center space-x-6 text-xs text-[var(--church-slate)]">
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Mobile Friendly
            </span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Easy Sharing
            </span>
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
