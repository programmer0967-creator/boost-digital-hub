import { useState } from "react";
import { Star } from "lucide-react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { services } from "@/data/services";

// Validation schema for rating form
const serviceIds = services.map(s => s.id);
const ratingSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(100, "الاسم يجب أن لا يتجاوز 100 حرف"),
  rating: z.number()
    .int("التقييم يجب أن يكون رقماً صحيحاً")
    .min(1, "يرجى اختيار التقييم")
    .max(5, "التقييم يجب أن يكون بين 1 و 5"),
  serviceType: z.string()
    .min(1, "يرجى اختيار الخدمة")
    .refine(val => serviceIds.includes(val), "الخدمة المختارة غير صالحة"),
  comment: z.string()
    .trim()
    .max(1000, "التعليق يجب أن لا يتجاوز 1000 حرف")
    .optional()
    .or(z.literal("")),
});

interface RatingFormProps {
  onSuccess?: () => void;
}

export function RatingForm({ onSuccess }: RatingFormProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data with zod
    const validationResult = ratingSchema.safeParse({
      name,
      rating,
      serviceType,
      comment,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast({
        title: "خطأ في البيانات",
        description: firstError.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const validatedData = validationResult.data;

    const { error } = await supabase.from("ratings").insert({
      name: validatedData.name,
      rating: validatedData.rating,
      comment: validatedData.comment || null,
      service_type: validatedData.serviceType,
    });

    if (error) {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إرسال تقييمك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "شكراً لك!",
        description: "تم إرسال تقييمك بنجاح وسيظهر بعد المراجعة.",
      });
      setName("");
      setRating(0);
      setComment("");
      setServiceType("");
      onSuccess?.();
    }

    setIsSubmitting(false);
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <CardTitle className="text-xl">شاركنا رأيك</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rating-name">اسمك</Label>
            <Input
              id="rating-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك"
              required
              className="bg-card/50"
            />
          </div>

          <div className="space-y-2">
            <Label>الخدمة</Label>
            <Select value={serviceType} onValueChange={setServiceType} required>
              <SelectTrigger className="bg-card/50">
                <SelectValue placeholder="اختر الخدمة" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>تقييمك</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      value <= (hoveredRating || rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating-comment">تعليقك</Label>
            <Textarea
              id="rating-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="شاركنا تجربتك مع الخدمة..."
              rows={3}
              className="bg-card/50"
            />
          </div>

          <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
