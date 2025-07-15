import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Church, PlayCircle, Heart, Mail, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { isValidUrl } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, "Church name is required"),
  sermon: z
    .string()
    .optional()
    .refine((val) => !val || isValidUrl(val), "Please enter a valid URL"),
  donate: z
    .string()
    .optional()
    .refine((val) => !val || isValidUrl(val), "Please enter a valid URL"),
  contact: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const navigate = useNavigate();
  useToast();

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
    Object.entries(data).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        params.append(key, value);
      }
    });
    navigate(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Church className="text-white" size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Church BioLink Builder
          </h1>
          <p className="text-gray-500 text-sm">
            Create a beautiful bio page for your ministry in seconds
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label className="text-sm text-gray-700 mb-1 flex items-center">
              <Church className="mr-2 text-blue-600" size={16} /> Church Name
            </Label>
            <Input
              {...form.register("title")}
              placeholder="Enter your church name"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm text-gray-700 mb-1 flex items-center">
              <PlayCircle className="mr-2 text-blue-600" size={16} /> Latest Sermon
            </Label>
            <Input
              {...form.register("sermon")}
              placeholder="https://your-sermon-link.com"
              type="url"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.sermon && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.sermon.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm text-gray-700 mb-1 flex items-center">
              <Heart className="mr-2 text-blue-600" size={16} /> Donation Link
            </Label>
            <Input
              {...form.register("donate")}
              placeholder="https://your-donation-page.com"
              type="url"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.donate && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.donate.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm text-gray-700 mb-1 flex items-center">
              <Mail className="mr-2 text-blue-600" size={16} /> Contact Information
            </Label>
            <Input
              {...form.register("contact")}
              placeholder="mailto:info@church.com"
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.contact && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.contact.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md"
          >
            <CreditCard className="mr-2" size={20} />
            Continue to Payment ($3)
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Perfect for social bios, church websites, and sharing links</p>
          <p className="text-blue-600 font-semibold mt-2">
            One-time payment of $3 • Unlimited links
          </p>
        </div>
      </div>
    </div>
  );
}
