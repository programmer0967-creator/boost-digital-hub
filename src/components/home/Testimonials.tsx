import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "أحمد محمد",
    role: "صانع محتوى",
    content: "خدمة ممتازة! زاد عدد متابعيني بشكل ملحوظ خلال أسبوع واحد. التواصل كان سريع والنتائج أفضل مما توقعت.",
    rating: 5,
    avatar: "أ"
  },
  {
    name: "سارة العلي",
    role: "صاحبة متجر إلكتروني",
    content: "أفضل خدمة إدارة حسابات تعاملت معها. معين محترف جداً ويفهم احتياجات العمل. أنصح الجميع بالتعامل معه.",
    rating: 5,
    avatar: "س"
  },
  {
    name: "خالد الرشيدي",
    role: "رائد أعمال",
    content: "استفدت كثيراً من جلسات الاستشارة. نصائح عملية وقابلة للتطبيق. شكراً معين على الدعم المستمر.",
    rating: 5,
    avatar: "خ"
  }
];

export function Testimonials() {
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              variant="glass" 
              className="relative overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary/20 absolute top-4 left-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground/90 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
