import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RatingForm } from "@/components/RatingForm";
import { supabase } from "@/integrations/supabase/client";

interface Rating {
  id: string;
  name: string;
  rating: number;
  comment: string | null;
  service_type: string;
}

export function Testimonials() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRatings = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("ratings")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(6);

    if (data) {
      setRatings(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <section className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-medium mb-4 block">آراء العملاء</span>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            ماذا يقول عملاؤنا؟
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            نفخر بثقة عملائنا ورضاهم عن خدماتنا
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Testimonials */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-muted-foreground">جاري تحميل التقييمات...</div>
              </div>
            ) : ratings.length === 0 ? (
              <div className="flex items-center justify-center h-64 bg-card/30 rounded-2xl border border-border/50">
                <div className="text-center">
                  <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">لا توجد تقييمات حتى الآن</p>
                  <p className="text-sm text-muted-foreground/70">كن أول من يقيم خدماتنا!</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ratings.slice(0, 4).map((testimonial) => (
                  <Card 
                    key={testimonial.id} 
                    variant="glass" 
                    className="relative overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <Quote className="w-10 h-10 text-primary/20 absolute top-4 left-4" />
                      
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>

                      <p className="text-foreground/90 mb-6 leading-relaxed">
                        "{testimonial.comment}"
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.service_type}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Rating Form */}
          <div>
            <RatingForm onSuccess={fetchRatings} />
          </div>
        </div>
      </div>
    </section>
  );
}
